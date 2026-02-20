import type { Metadata } from "next"
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@glinui/ui"
import {
  generatedApiMetadata,
  generatedApiMetadataGeneratedAt
} from "@/lib/generated-api-metadata"
import { createDocsMetadata } from "@/lib/docs-metadata"

const entries = Object.entries(generatedApiMetadata).sort(([a], [b]) => a.localeCompare(b))
const totalPropsTypes = entries.reduce((count, [, entry]) => count + entry.propsTypes.length, 0)
const totalFields = entries.reduce(
  (count, [, entry]) => count + entry.propsTypes.reduce((inner, propsType) => inner + propsType.fields.length, 0),
  0
)

export const metadata: Metadata = createDocsMetadata({
  title: "API Metadata",
  description:
    "Generated TypeScript props metadata for Glin UI components, used to automate API tables and prevent docs drift.",
  path: "/docs/api-metadata",
  keywords: ["TypeScript API metadata", "component props reference", "docs automation"]
})

export default function ApiMetadataPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            API Automation
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">API Metadata Index</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Generated prop metadata from `packages/ui` type definitions. This is the baseline for API-table automation
            and drift prevention.
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Generated: {generatedApiMetadataGeneratedAt}
          </p>
        </div>
      </section>

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Extracted Components: {entries.length}</CardTitle>
          <CardDescription>
            Exported props are extracted from TypeScript AST (type aliases + interfaces), including intersected and
            inherited local declarations.
          </CardDescription>
          <div className="flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="rounded-md border border-border/60 bg-background/30 px-2 py-1">Props types: {totalPropsTypes}</span>
            <span className="rounded-md border border-border/60 bg-background/30 px-2 py-1">Explicit fields: {totalFields}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-black/5 dark:bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-semibold">Component</th>
                  <th className="px-3 py-2 font-semibold">Primary Props Type</th>
                  <th className="px-3 py-2 font-semibold">Props Types</th>
                  <th className="px-3 py-2 font-semibold">Extracted Fields</th>
                  <th className="px-3 py-2 font-semibold">Source File</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(([name, meta]) => (
                  <tr key={name} className="border-t border-border/60 align-top">
                    <td className="px-3 py-2 font-medium">{name}</td>
                    <td className="px-3 py-2">
                      <code>{meta.primaryPropsType ?? "-"}</code>
                    </td>
                    <td className="px-3 py-2">
                      {meta.propsTypes.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {meta.propsTypes.map((propsType) => (
                            <code
                              key={`${name}-${propsType.name}`}
                              className="rounded border border-border/60 bg-neutral-100/60 px-1.5 py-0.5 text-xs dark:bg-white/[0.05]"
                            >
                              {propsType.name}
                            </code>
                          ))}
                        </div>
                      ) : (
                        <span className="text-neutral-500 dark:text-neutral-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {meta.explicitProps.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {meta.explicitProps.map((prop) => (
                            <code
                              key={`${name}-${prop}`}
                              className="rounded border border-border/60 bg-neutral-100/60 px-1.5 py-0.5 text-xs dark:bg-white/[0.05]"
                            >
                              {prop}
                            </code>
                          ))}
                        </div>
                      ) : (
                        <span className="text-neutral-500 dark:text-neutral-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <code className="text-xs">{meta.sourceFile}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
