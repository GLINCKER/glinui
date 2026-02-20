import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import pc from "picocolors"
import { fetchRegistryItem } from "../registry/api.js"

type DiffLine = {
  kind: "context" | "add" | "remove"
  value: string
}

function splitLines(value: string) {
  return value.replace(/\r\n/g, "\n").split("\n")
}

function createLineDiff(before: string, after: string): DiffLine[] {
  const left = splitLines(before)
  const right = splitLines(after)
  const n = left.length
  const m = right.length

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0))

  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      if (left[i] === right[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1])
      }
    }
  }

  const lines: DiffLine[] = []
  let i = 0
  let j = 0

  while (i < n && j < m) {
    if (left[i] === right[j]) {
      lines.push({ kind: "context", value: left[i] })
      i += 1
      j += 1
      continue
    }

    if (dp[i + 1][j] >= dp[i][j + 1]) {
      lines.push({ kind: "remove", value: left[i] })
      i += 1
      continue
    }

    lines.push({ kind: "add", value: right[j] })
    j += 1
  }

  while (i < n) {
    lines.push({ kind: "remove", value: left[i] })
    i += 1
  }

  while (j < m) {
    lines.push({ kind: "add", value: right[j] })
    j += 1
  }

  return lines
}

function readComponentConfig(cwd: string) {
  const configPath = path.join(cwd, "glinui.json")
  if (!fs.existsSync(configPath)) {
    return { components: "src/components/ui" }
  }

  try {
    const config = fs.readJsonSync(configPath)
    return { components: config?.aliases?.components ?? "src/components/ui" }
  } catch {
    return { components: "src/components/ui" }
  }
}

function printDiff(name: string, localPath: string, diffLines: DiffLine[]) {
  const relativePath = path.relative(process.cwd(), localPath)
  let added = 0
  let removed = 0

  console.log("")
  console.log(pc.bold(`diff ${relativePath} registry/${name}.tsx`))
  console.log(pc.red(`--- ${relativePath}`))
  console.log(pc.green(`+++ registry/${name}.tsx`))

  for (const line of diffLines) {
    if (line.kind === "add") {
      added += 1
      console.log(pc.green(`+${line.value}`))
      continue
    }

    if (line.kind === "remove") {
      removed += 1
      console.log(pc.red(`-${line.value}`))
      continue
    }

    console.log(pc.dim(` ${line.value}`))
  }

  console.log(pc.dim(`\n${added} additions, ${removed} deletions\n`))
}

export const diffCommand = new Command()
  .name("diff")
  .description("Show diff between your local component file and the registry source.")
  .argument("<component>", "Component name")
  .option("--cwd <path>", "Working directory", process.cwd())
  .action(async (component: string, options) => {
    const cwd = path.resolve(options.cwd)

    const item = await fetchRegistryItem(component)
    if (!item) {
      console.error(pc.red(`  Component \"${component}\" was not found in the registry.`))
      process.exit(1)
    }

    const sourceFile = item.files.find((file) => path.basename(file.path) === `${component}.tsx`) ?? item.files[0]

    if (!sourceFile?.content) {
      console.error(pc.red(`  Registry entry for \"${component}\" has no source file content.`))
      process.exit(1)
    }

    const config = readComponentConfig(cwd)
    const localPath = path.join(cwd, config.components, `${component}.tsx`)

    if (!await fs.pathExists(localPath)) {
      console.error(pc.red(`  Local file not found: ${path.relative(cwd, localPath)}`))
      process.exit(1)
    }

    const localSource = await fs.readFile(localPath, "utf8")
    if (localSource === sourceFile.content) {
      console.log(pc.green(`\n  ${component}.tsx is up to date with registry.\n`))
      return
    }

    const diffLines = createLineDiff(localSource, sourceFile.content)
    printDiff(component, localPath, diffLines)
  })
