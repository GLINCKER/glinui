import assert from "node:assert/strict"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join, resolve } from "node:path"
import test from "node:test"

const docsRoot = process.cwd()
const repoRoot = resolve(docsRoot, "..", "..")
const registryRoot = join(docsRoot, "public", "r")

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"))
}

test("registry endpoints keep index and item payloads in sync with source files", () => {
  const indexPath = join(registryRoot, "index.json")
  assert.ok(existsSync(indexPath), "public/r/index.json should exist")

  const index = readJson(indexPath)
  assert.ok(Array.isArray(index), "index.json should be an array")
  assert.ok(index.length > 0, "index.json should not be empty")

  const itemsDirectory = join(registryRoot, "items")
  const itemFiles = readdirSync(itemsDirectory).filter((entry) => entry.endsWith(".json"))
  assert.equal(itemFiles.length, index.length, "items directory should have one json file per index entry")

  for (const summary of index) {
    assert.equal(typeof summary.name, "string")
    assert.ok(summary.name.length > 0)
    assert.equal(typeof summary.type, "string")

    const itemPath = join(itemsDirectory, `${summary.name}.json`)
    assert.ok(existsSync(itemPath), `missing item file for ${summary.name}`)

    const item = readJson(itemPath)
    assert.equal(item.name, summary.name)
    assert.equal(item.type, summary.type)
    assert.equal(item.description, summary.description)
    assert.deepEqual(item.dependencies ?? [], summary.dependencies ?? [])

    assert.ok(Array.isArray(item.files), `${summary.name} must include files[]`)
    assert.ok(item.files.length > 0, `${summary.name} must include at least one file`)

    const componentFile =
      item.files.find((file) => file.path === `packages/ui/src/components/${summary.name}.tsx`) ?? item.files[0]

    assert.equal(
      componentFile.path,
      `packages/ui/src/components/${summary.name}.tsx`,
      `${summary.name} should expose component source path`
    )
    assert.equal(typeof componentFile.content, "string")
    assert.ok(componentFile.content.trim().length > 0, `${summary.name} should include non-empty source content`)

    const sourcePath = join(repoRoot, componentFile.path)
    assert.ok(existsSync(sourcePath), `source file missing for ${summary.name}`)

    const sourceContent = readFileSync(sourcePath, "utf8")
    assert.equal(componentFile.content, sourceContent, `${summary.name} endpoint content should match source file`)
  }
})

test("registry schema endpoint is generated and stable", () => {
  const schemaPath = join(registryRoot, "schema.json")
  assert.ok(existsSync(schemaPath), "public/r/schema.json should exist")

  const schema = readJson(schemaPath)
  assert.equal(schema.$id, "https://glinui.com/r/schema.json")
  assert.equal(schema.type, "object")
  assert.ok(Array.isArray(schema.required))
  assert.deepEqual(schema.required, ["$schema", "style", "tailwind", "aliases"])

  assert.equal(schema.properties?.style?.enum?.[0], "default")
  assert.equal(schema.properties?.tailwind?.properties?.css?.type, "string")
  assert.equal(schema.properties?.aliases?.properties?.components?.type, "string")
  assert.equal(schema.properties?.aliases?.properties?.utils?.type, "string")
})

test("registry endpoints configure cache headers for static deployment", () => {
  const headersPath = join(docsRoot, "public", "_headers")
  assert.ok(existsSync(headersPath), "public/_headers should exist")

  const headersFile = readFileSync(headersPath, "utf8")
  assert.match(headersFile, /^\/r\/\*/m)
  assert.match(
    headersFile,
    /Cache-Control:\s*public,\s*max-age=300,\s*s-maxage=3600,\s*stale-while-revalidate=86400/
  )
})
