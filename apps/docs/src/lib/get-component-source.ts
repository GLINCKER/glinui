import fs from "node:fs"
import path from "node:path"

export type ComponentSourceFile = {
  fileName: string
  code: string
  language: string
}

/**
 * Reads component source files from the monorepo at build time.
 * Only works in server context (Node.js fs).
 */
export function getComponentSources(files?: string[]): ComponentSourceFile[] {
  if (!files || files.length === 0) return []

  const monorepoRoot = path.resolve(process.cwd(), "../..")

  return files
    .map((filePath) => {
      try {
        const absolutePath = path.resolve(monorepoRoot, filePath)
        const code = fs.readFileSync(absolutePath, "utf-8")
        const fileName = path.basename(filePath)
        const ext = path.extname(filePath).slice(1)
        const language = ext === "ts" || ext === "tsx" ? "tsx" : ext === "css" ? "css" : ext
        return { fileName, code, language }
      } catch {
        return null
      }
    })
    .filter((source): source is ComponentSourceFile => source !== null)
}
