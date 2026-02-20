import { readdirSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, "..", "..")
const packagesDir = join(root, "packages")

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"))
}

function validatePackage(packagePath) {
  const pkg = readJson(packagePath)
  const issues = []

  if (pkg.private === true) {
    return issues
  }

  if (!pkg.exports || typeof pkg.exports !== "object" || Object.keys(pkg.exports).length === 0) {
    issues.push("missing exports map")
  }

  if (!Array.isArray(pkg.files) || pkg.files.length === 0) {
    issues.push("missing files whitelist")
  }

  if (pkg.publishConfig?.access !== "public") {
    issues.push('publishConfig.access must be "public"')
  }

  if (!pkg.license) {
    issues.push("missing license")
  }

  if (!pkg.repository) {
    issues.push("missing repository")
  }

  if (!pkg.homepage) {
    issues.push("missing homepage")
  }

  if (pkg.name === "@glinui/ui") {
    if (!pkg.peerDependencies?.react) {
      issues.push("@glinui/ui must declare react in peerDependencies")
    }

    if (pkg.dependencies?.react) {
      issues.push("@glinui/ui must not declare react in dependencies")
    }
  }

  return issues
}

function main() {
  const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  const results = []

  for (const dir of packageDirs) {
    const packagePath = join(packagesDir, dir, "package.json")
    let issues = []

    try {
      issues = validatePackage(packagePath)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      issues = [`failed to read package.json: ${message}`]
    }

    if (issues.length > 0) {
      const name = (() => {
        try {
          return readJson(packagePath).name ?? dir
        } catch {
          return dir
        }
      })()

      results.push({
        name,
        packagePath,
        issues
      })
    }
  }

  if (results.length > 0) {
    console.error("Publish validation failed:\n")
    for (const result of results) {
      console.error(`- ${result.name} (${result.packagePath})`)
      for (const issue of result.issues) {
        console.error(`  - ${issue}`)
      }
    }
    process.exit(1)
  }

  console.log("Publish validation passed for all publishable packages.")
}

main()
