export const DOCS_IMPLEMENTATIONS = ["radix", "base"] as const

export type DocsImplementation = (typeof DOCS_IMPLEMENTATIONS)[number]

const rawDefault = (process.env.NEXT_PUBLIC_DEFAULT_UI_IMPL ?? "").toLowerCase()

export const DEFAULT_DOCS_IMPLEMENTATION: DocsImplementation = DOCS_IMPLEMENTATIONS.includes(
  rawDefault as DocsImplementation
)
  ? (rawDefault as DocsImplementation)
  : "radix"
