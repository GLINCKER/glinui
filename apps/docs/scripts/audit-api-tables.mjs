import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, "..", "..", "..")

const generatedMetadataFile = join(root, "apps", "docs", "src", "lib", "generated-api-metadata.ts")
const mdxComponentsDir = join(root, "apps", "docs", "src", "app", "docs", "components")
const reportFile = join(root, "docs-local", "analysis", "api-table-audit.md")

function normalizeType(type) {
  return String(type ?? "")
    .replace(/\s+/g, " ")
    .trim()
}

function extractGeneratedMetadata() {
  const source = readFileSync(generatedMetadataFile, "utf8")
  const match = source.match(/export const generatedApiMetadata = (\{[\s\S]*\}) as const satisfies/)
  if (!match) {
    throw new Error("Unable to parse generatedApiMetadata object")
  }
  return JSON.parse(match[1])
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const next = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walk(next))
      continue
    }
    files.push(next)
  }
  return files
}

function captureStringValue(segment, key) {
  const match = segment.match(new RegExp(`${key}:\\s*(?:"([^"]*)"|'([^']*)'|\\\`([^\\\`]*)\\\`)`))
  return match?.[1] ?? match?.[2] ?? match?.[3]
}

function captureBareValue(segment, key) {
  const match = segment.match(new RegExp(`${key}:\\s*([^,}]+)`))
  return match ? match[1].trim() : undefined
}

function parseRows(rowsExpression) {
  const rows = []
  const rowMatches = rowsExpression.matchAll(/\{([^{}]*)\}/g)

  for (const match of rowMatches) {
    const segment = match[1]
    const prop = captureStringValue(segment, "prop")
    if (!prop) {
      continue
    }

    rows.push({
      prop,
      type: captureStringValue(segment, "type"),
      defaultValue: captureStringValue(segment, "defaultValue") ?? captureBareValue(segment, "defaultValue"),
      description: captureStringValue(segment, "description")
    })
  }

  return rows
}

function resolveGeneratedFields(entry, propsType) {
  if (!entry) {
    return []
  }

  const targetType = propsType
    ? entry.propsTypes.find((candidate) => candidate.name === propsType)
    : entry.propsTypes.find((candidate) => candidate.name === entry.primaryPropsType) ?? entry.propsTypes[0]

  return targetType?.fields ?? []
}

function audit() {
  const generated = extractGeneratedMetadata()
  const mdxFiles = walk(mdxComponentsDir).filter((file) => file.endsWith("page.mdx")).sort()
  const rows = []

  for (const file of mdxFiles) {
    const source = readFileSync(file, "utf8")
    const fileComponentId = source.match(/componentId="([^"]+)"/)?.[1]
    const tableMatches = source.matchAll(/<PropsTable([\s\S]*?)\/>/g)
    let tableIndex = 0

    for (const match of tableMatches) {
      tableIndex += 1
      const tableSource = match[1]
      const tableComponentId = tableSource.match(/componentId="([^"]+)"/)?.[1] ?? fileComponentId
      const propsType = tableSource.match(/propsType="([^"]+)"/)?.[1]
      const rowsExpression = tableSource.match(/rows=\{\[([\s\S]*?)\]\}/)?.[1] ?? ""
      const manualRows = parseRows(rowsExpression)
      const generatedEntry = tableComponentId ? generated[tableComponentId] : null
      const generatedFields = resolveGeneratedFields(generatedEntry, propsType)

      const manualSet = new Set(manualRows.map((row) => row.prop))
      const generatedSet = new Set(generatedFields.map((field) => field.name))
      const manualOnly = [...manualSet].filter((name) => !generatedSet.has(name)).sort()
      const generatedOnly = [...generatedSet].filter((name) => !manualSet.has(name)).sort()

      const typeMismatches = []
      for (const manualRow of manualRows) {
        const generatedField = generatedFields.find((field) => field.name === manualRow.prop)
        if (!generatedField || !manualRow.type) {
          continue
        }
        if (normalizeType(manualRow.type) !== normalizeType(generatedField.type)) {
          typeMismatches.push({
            prop: manualRow.prop,
            manual: normalizeType(manualRow.type),
            generated: normalizeType(generatedField.type)
          })
        }
      }

      let status = "match"
      if (!generatedEntry) {
        status = "missing-generated-entry"
      } else if (generatedFields.length === 0 && manualRows.length > 0) {
        status = "generated-empty"
      } else if (manualRows.length === 0 && generatedFields.length > 0) {
        status = "generated-only"
      } else if (manualOnly.length > 0 || generatedOnly.length > 0 || typeMismatches.length > 0) {
        status = "drift"
      }

      rows.push({
        file: relative(root, file),
        tableIndex,
        componentId: tableComponentId ?? "-",
        propsType: propsType ?? "-",
        manualCount: manualRows.length,
        generatedCount: generatedFields.length,
        manualOnly,
        generatedOnly,
        typeMismatches,
        status
      })
    }
  }

  return rows
}

function buildReport(rows) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.total += 1
      acc[row.status] = (acc[row.status] ?? 0) + 1
      return acc
    },
    { total: 0 }
  )

  const driftRows = rows.filter((row) => row.status === "drift" || row.status === "generated-empty")
  const generatedOnlyRows = rows.filter((row) => row.status === "generated-only")
  const safeCleanupRows = rows.filter((row) => row.status === "match" && row.manualCount > 0)

  const lines = [
    "# API Table Audit",
    "",
    "Generated by `apps/docs/scripts/audit-api-tables.mjs`.",
    "",
    "## Summary",
    "",
    `- Total \`<PropsTable>\` blocks: ${totals.total}`,
    `- Match: ${totals.match ?? 0}`,
    `- Drift: ${totals.drift ?? 0}`,
    `- Generated empty: ${totals["generated-empty"] ?? 0}`,
    `- Generated only: ${totals["generated-only"] ?? 0}`,
    `- Missing generated entry: ${totals["missing-generated-entry"] ?? 0}`,
    "",
    "## Drift / Empty (review first)",
    ""
  ]

  if (driftRows.length === 0) {
    lines.push("- None")
  } else {
    for (const row of driftRows) {
      lines.push(`- ${row.file} [table ${row.tableIndex}] (${row.componentId}) -> ${row.status}`)
      if (row.manualOnly.length > 0) {
        lines.push(`  manual-only: ${row.manualOnly.join(", ")}`)
      }
      if (row.generatedOnly.length > 0) {
        lines.push(`  generated-only: ${row.generatedOnly.join(", ")}`)
      }
      if (row.typeMismatches.length > 0) {
        for (const mismatch of row.typeMismatches) {
          lines.push(`  type mismatch ${mismatch.prop}: manual=${mismatch.manual} generated=${mismatch.generated}`)
        }
      }
    }
  }

  lines.push("", "## Safe Cleanup Candidates (match + hardcoded rows)", "")
  if (safeCleanupRows.length === 0) {
    lines.push("- None")
  } else {
    for (const row of safeCleanupRows) {
      lines.push(`- ${row.file} [table ${row.tableIndex}] (${row.componentId}) manual rows: ${row.manualCount}`)
    }
  }

  lines.push("", "## Generated-only Tables (cleaned)", "")
  if (generatedOnlyRows.length === 0) {
    lines.push("- None")
  } else {
    for (const row of generatedOnlyRows) {
      lines.push(`- ${row.file} [table ${row.tableIndex}] (${row.componentId})`)
    }
  }

  return `${lines.join("\n")}\n`
}

function main() {
  const rows = audit()
  const report = buildReport(rows)
  mkdirSync(dirname(reportFile), { recursive: true })
  writeFileSync(reportFile, report, "utf8")
  // eslint-disable-next-line no-console
  console.log(`audited ${rows.length} props tables -> ${reportFile}`)
}

main()
