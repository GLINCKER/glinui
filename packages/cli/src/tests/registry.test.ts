import { afterEach, describe, expect, it, vi } from "vitest"
import { fetchRegistryIndex, fetchRegistryItem } from "../registry/api.js"

const mockedFetch = vi.fn<typeof fetch>()

vi.stubGlobal("fetch", mockedFetch)

afterEach(() => {
  mockedFetch.mockReset()
})

describe("registry api", () => {
  it("fetchRegistryIndex returns parsed index when response is valid", async () => {
    mockedFetch.mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            name: "button",
            type: "primitive",
            description: "Button",
            dependencies: ["@glinui/ui"],
            registryDependencies: []
          }
        ]),
        { status: 200 }
      )
    )

    const result = await fetchRegistryIndex()

    expect(result).toEqual([
      {
        name: "button",
        type: "primitive",
        description: "Button",
        dependencies: ["@glinui/ui"],
        registryDependencies: []
      }
    ])
  })

  it("fetchRegistryIndex returns null when schema is invalid", async () => {
    mockedFetch.mockResolvedValue(new Response(JSON.stringify({ name: "button" }), { status: 200 }))

    const result = await fetchRegistryIndex()

    expect(result).toBeNull()
  })

  it("fetchRegistryItem returns parsed item when response is valid", async () => {
    mockedFetch.mockResolvedValue(
      new Response(
        JSON.stringify({
          name: "button",
          type: "primitive",
          description: "Button",
          dependencies: ["@glinui/ui"],
          files: [{ path: "packages/ui/src/components/button.tsx", content: "export const Button = () => null" }]
        }),
        { status: 200 }
      )
    )

    const result = await fetchRegistryItem("button")

    expect(result).toEqual({
      name: "button",
      type: "primitive",
      description: "Button",
      dependencies: ["@glinui/ui"],
      files: [{ path: "packages/ui/src/components/button.tsx", content: "export const Button = () => null" }]
    })
  })

  it("fetchRegistryItem returns null for non-ok responses", async () => {
    mockedFetch.mockResolvedValue(new Response(null, { status: 404 }))

    const result = await fetchRegistryItem("missing")

    expect(result).toBeNull()
  })
})
