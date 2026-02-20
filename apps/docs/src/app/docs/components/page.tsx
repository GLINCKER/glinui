import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@glinui/ui"
import { PrimitiveCatalog } from "@/components/primitives-demo"
import { buildComponentHref } from "@/lib/docs-route"
import { DEFAULT_DOCS_IMPLEMENTATION } from "@/lib/docs-config"
import { createDocsMetadata } from "@/lib/docs-metadata"
import {
  primitiveComponentIds,
  primitiveMaturity,
  primitiveTitles,
  signatureComponentIds,
  signatureDescriptions,
  signatureTitles
} from "@/lib/primitives"

export const metadata: Metadata = createDocsMetadata({
  title: "Components",
  description:
    "Browse Glin UI primitive and signature component docs with implementation-aware routes and generated API references.",
  path: "/docs/components",
  keywords: ["React components", "UI component catalog", "glassmorphism components", "Radix UI wrappers"]
})

export default function ComponentsIndexPage() {
  const betaPrimitives = primitiveComponentIds.filter((id) => primitiveMaturity[id] === "beta")

  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Component Catalog
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Components</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Browse production primitives and signature glass visuals. Primitive docs use the{" "}
            <code>{DEFAULT_DOCS_IMPLEMENTATION}</code> implementation route by default.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Card variant="glass">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Primitives</CardTitle>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{primitiveComponentIds.length} components</p>
              </CardHeader>
            </Card>
            <Card variant="glass">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Signature</CardTitle>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{signatureComponentIds.length} components</p>
              </CardHeader>
            </Card>
            <Card variant="glass">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Beta Primitives</CardTitle>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{betaPrimitives.length} components</p>
              </CardHeader>
            </Card>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="default" size="sm">
              <Link href={buildComponentHref("button", DEFAULT_DOCS_IMPLEMENTATION)}>
                Start with Button
                <ArrowRight className="ml-1.5 size-3.5" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="sm">
              <Link href="/docs/api-metadata">View API Metadata</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Primitive Components</h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Accessible building blocks with consistent API conventions, glass variants, and production-ready defaults.
        </p>
      </section>

      <PrimitiveCatalog implementation={DEFAULT_DOCS_IMPLEMENTATION} />

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 id="signature" className="text-2xl font-semibold tracking-tight">Signature Components</h2>
          <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
            Expressive visual components for hero sections, motion accents, and premium interactions.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {signatureComponentIds.map((id) => (
            <Link
              key={id}
              href={buildComponentHref(id, DEFAULT_DOCS_IMPLEMENTATION)}
              className="rounded-2xl border border-border/60 bg-[var(--glass-2-surface)] p-4 backdrop-blur-xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,var(--shadow-soft)] transition duration-fast ease-standard hover:-translate-y-0.5 hover:bg-[var(--glass-3-surface)]"
            >
              <p className="text-sm font-semibold">{signatureTitles[id]}</p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{signatureDescriptions[id]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 id="beta-primitives" className="text-2xl font-semibold tracking-tight">Beta Primitive Focus</h2>
          <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
            These primitives are production usable but still evolving. Track their docs and API metadata before
            upgrades.
          </p>
        </div>
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {betaPrimitives.map((id) => (
                <Link
                  key={id}
                  href={buildComponentHref(id, DEFAULT_DOCS_IMPLEMENTATION)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/30 px-2.5 py-1 text-xs text-neutral-700 transition-colors hover:text-foreground dark:text-neutral-300"
                >
                  <span>{primitiveTitles[id]}</span>
                  <span className="rounded-full border border-amber-300/50 bg-amber-100/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300">
                    Beta
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
              Reference docs and source snapshots for beta components are generated at <code>/docs/api-metadata</code>.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
