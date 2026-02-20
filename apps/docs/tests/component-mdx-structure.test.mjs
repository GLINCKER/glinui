import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import test from "node:test"

function walk(dir) {
  const entries = readdirSync(dir)
  let files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stats = statSync(fullPath)
    if (stats.isDirectory()) {
      files = files.concat(walk(fullPath))
      continue
    }
    files.push(fullPath)
  }
  return files
}

test("component MDX pages keep required docs sections", () => {
  const componentsDir = join(process.cwd(), "src/app/docs/components")
  const mdxFiles = walk(componentsDir)
    .filter((file) => file.endsWith("page.mdx"))
    .sort()

  const requiredTokens = [
    "<InstallTabs",
    "## Installation",
    "## Usage",
    "## Accessibility",
    "## Reduced Motion",
    "## API Reference",
    "## Source"
  ]

  for (const file of mdxFiles) {
    const source = readFileSync(file, "utf8")

    for (const token of requiredTokens) {
      assert.match(
        source,
        new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        `${file} should include ${token}`
      )
    }
  }
})
