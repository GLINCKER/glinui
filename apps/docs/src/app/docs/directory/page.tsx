import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Boxes, Gem, Package } from "lucide-react"

import { Badge } from "@glinui/ui"
import { DirectoryList } from "@/components/docs/directory-list"
import { generatedRegistryItems } from "@/lib/generated-registry-metadata"
import { createDocsMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = createDocsMetadata({
  title: "Component Directory",
  description:
    "Browse, search, and install all Glin UI components. Primitives, signature glass visuals, and more — with one-click install commands.",
  path: "/docs/directory",
  keywords: [
    "component directory",
    "UI component catalog",
    "glassmorphism components",
    "component registry",
    "install components"
  ]
})

export default function DirectoryPage() {
  const primitiveCount = generatedRegistryItems.filter((i) => i.type === "primitive").length
  const signatureCount = generatedRegistryItems.filter((i) => i.type === "signature").length

  return (
    <main className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Component Directory
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Directory</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Browse and install all {generatedRegistryItems.length} Glin UI components. Search by name, filter by
            category, and copy install commands instantly.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard icon={Package} label="Total" value={generatedRegistryItems.length} />
            <StatCard icon={Boxes} label="Primitives" value={primitiveCount} />
            <StatCard icon={Gem} label="Signature" value={signatureCount} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] px-3 py-1.5 text-xs font-medium text-foreground shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,var(--shadow-soft)] transition-all duration-150 hover:bg-[var(--glass-5-surface)] dark:border-white/[0.1]"
            >
              Getting Started
              <ArrowRight className="size-3" />
            </Link>
            <Link
              href="/docs/components"
              className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-foreground hover:bg-white/[0.06] dark:text-neutral-400"
            >
              Components Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Directory List */}
      <DirectoryList items={generatedRegistryItems} />
    </main>
  )
}

function StatCard({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[var(--glass-2-surface)] px-4 py-3 backdrop-blur-xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.04)_inset] dark:border-white/[0.06]">
      <Icon className="size-4 text-neutral-400 dark:text-neutral-500" />
      <div>
        <p className="text-lg font-semibold tabular-nums text-foreground">{value}</p>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{label}</p>
      </div>
    </div>
  )
}
