import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { afterEach, describe, expect, it, vi } from "vitest"
import { createDiffCommand, createHunks, createLineDiff, getStats, parseContextValue } from "../commands/diff.js"

const mockedFetch = vi.fn<typeof fetch>()
vi.stubGlobal("fetch", mockedFetch)

const tempDirs: string[] = []

async function createTempProject() {
  const dir = await mkdtemp(path.join(tmpdir(), "glinui-cli-diff-"))
  tempDirs.push(dir)
  await writeFile(path.join(dir, "package.json"), JSON.stringify({ name: "diff-app" }, null, 2), "utf8")
  await writeFile(
    path.join(dir, "glinui.json"),
    JSON.stringify(
      {
        aliases: {
          components: "src/components/ui"
        }
      },
      null,
      2
    ),
    "utf8"
  )
  return dir
}

afterEach(async () => {
  mockedFetch.mockReset()
  vi.restoreAllMocks()
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })))
})

describe("diff helpers", () => {
  it("parses valid context and rejects invalid context", () => {
    expect(parseContextValue("0")).toBe(0)
    expect(parseContextValue("3")).toBe(3)
    expect(() => parseContextValue("-1")).toThrow("context must be a non-negative integer")
  })

  it("creates separated hunks and accurate stats", () => {
    const before = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj"
    const after = "a\nB\nc\nd\ne\nf\ng\nh\nI\nj"

    const lines = createLineDiff(before, after)
    const hunks = createHunks(lines, 1)
    const stats = getStats(lines)

    expect(stats).toEqual({ added: 2, removed: 2 })
    expect(hunks).toHaveLength(2)
    expect(hunks[0]).toMatchObject({ oldStart: 1, newStart: 1, oldLines: 3, newLines: 3 })
    expect(hunks[1]).toMatchObject({ oldStart: 8, newStart: 8, oldLines: 3, newLines: 3 })
  })
})

describe("diff command json", () => {
  it("emits stable json output shape for changed files", async () => {
    const cwd = await createTempProject()
    const localFile = path.join(cwd, "src/components/ui/button.tsx")
    await mkdir(path.dirname(localFile), { recursive: true })
    await writeFile(localFile, "export const Button = () => <button>Local</button>\n", "utf8")

    mockedFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          name: "button",
          type: "primitive",
          files: [
            {
              path: "packages/ui/src/components/button.tsx",
              content: "export const Button = () => <button>Registry</button>\n"
            }
          ]
        }),
        { status: 200 }
      )
    )

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined)

    const command = createDiffCommand()
    await command.parseAsync(["button", "--cwd", cwd, "--context", "1", "--json"], { from: "user" })

    expect(logSpy).toHaveBeenCalled()

    const payloadRaw = String(logSpy.mock.calls[0]?.[0] ?? "")
    const payload = JSON.parse(payloadRaw) as {
      component: string
      upToDate: boolean
      context: number
      stats: { added: number; removed: number }
      hunks: unknown[]
      localPath: string
      registryPath: string
    }

    expect(payload.component).toBe("button")
    expect(payload.upToDate).toBe(false)
    expect(payload.context).toBe(1)
    expect(payload.registryPath).toBe("registry/button.tsx")
    expect(payload.localPath).toBe("src/components/ui/button.tsx")
    expect(payload.stats.added).toBeGreaterThan(0)
    expect(payload.stats.removed).toBeGreaterThan(0)
    expect(payload.hunks.length).toBeGreaterThan(0)
  })

  it("emits upToDate json payload when local and registry sources match", async () => {
    const cwd = await createTempProject()
    const localFile = path.join(cwd, "src/components/ui/button.tsx")
    await mkdir(path.dirname(localFile), { recursive: true })
    const source = "export const Button = () => <button>Same</button>\n"
    await writeFile(localFile, source, "utf8")

    mockedFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          name: "button",
          type: "primitive",
          files: [
            {
              path: "packages/ui/src/components/button.tsx",
              content: source
            }
          ]
        }),
        { status: 200 }
      )
    )

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined)

    const command = createDiffCommand()
    await command.parseAsync(["button", "--cwd", cwd, "--json"], { from: "user" })

    expect(logSpy).toHaveBeenCalledTimes(1)

    const payloadRaw = String(logSpy.mock.calls[0]?.[0] ?? "")
    const payload = JSON.parse(payloadRaw) as {
      component: string
      upToDate: boolean
      stats: { added: number; removed: number }
      hunks: unknown[]
      localPath: string
      registryPath: string
    }

    expect(payload.component).toBe("button")
    expect(payload.upToDate).toBe(true)
    expect(payload.registryPath).toBe("registry/button.tsx")
    expect(payload.localPath).toBe("src/components/ui/button.tsx")
    expect(payload.stats).toEqual({ added: 0, removed: 0 })
    expect(payload.hunks).toEqual([])
  })
})
