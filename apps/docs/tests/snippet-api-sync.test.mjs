import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { extname, join, resolve } from "node:path"
import test from "node:test"
import ts from "typescript"

const DOCS_ROOT = process.cwd()
const DOCS_SRC_DIR = join(DOCS_ROOT, "src")
const WORKSPACE_ROOT = resolve(DOCS_ROOT, "..", "..")
const UI_INDEX_FILE = join(WORKSPACE_ROOT, "packages", "ui", "src", "index.ts")
const SCANNED_EXTENSIONS = new Set([".ts", ".tsx", ".mdx"])
const UI_IMPORT_PATTERN = /import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+["']@glinui\/ui["']/g

function listDocsFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...listDocsFiles(fullPath))
      continue
    }

    if (SCANNED_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

function normalizeImportToken(token) {
  return token
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .trim()
}

function extractNamedUiImports(source) {
  const imports = []
  UI_IMPORT_PATTERN.lastIndex = 0
  let match = UI_IMPORT_PATTERN.exec(source)

  while (match) {
    const clause = match[1] ?? ""
    const parts = clause.split(",")

    for (const part of parts) {
      const normalized = normalizeImportToken(part)
      if (!normalized) continue

      const withoutType = normalized.replace(/^type\s+/, "").trim()
      if (!withoutType) continue

      const importedName = withoutType.split(/\s+as\s+/i)[0]?.trim()
      if (!importedName) continue
      imports.push(importedName)
    }

    match = UI_IMPORT_PATTERN.exec(source)
  }

  return imports
}

function getUiExportSet() {
  const program = ts.createProgram([UI_INDEX_FILE], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    skipLibCheck: true
  })

  const checker = program.getTypeChecker()
  const source = program.getSourceFile(UI_INDEX_FILE)
  assert.ok(source, `missing source file: ${UI_INDEX_FILE}`)

  const moduleSymbol = checker.getSymbolAtLocation(source)
  assert.ok(moduleSymbol, `unable to resolve module symbol for ${UI_INDEX_FILE}`)

  const exportedNames = checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.getName())
  return new Set(exportedNames)
}

test("docs snippets only import public @glinui/ui exports", () => {
  const uiExports = getUiExportSet()
  const docsFiles = listDocsFiles(DOCS_SRC_DIR)
  const violations = []
  let importCount = 0

  for (const file of docsFiles) {
    const source = readFileSync(file, "utf8")
    const imports = extractNamedUiImports(source)
    if (imports.length === 0) continue

    importCount += imports.length

    for (const importedName of imports) {
      if (!uiExports.has(importedName)) {
        violations.push({
          file: file.replace(`${DOCS_ROOT}/`, ""),
          importedName
        })
      }
    }
  }

  assert.ok(importCount > 0, "expected at least one @glinui/ui import in docs source")

  assert.equal(
    violations.length,
    0,
    `Found docs snippet imports missing from @glinui/ui public API:\n${violations
      .map(({ file, importedName }) => `- ${importedName} in ${file}`)
      .join("\n")}`
  )
})
