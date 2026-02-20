import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@glinui/ui"
import { createDocsMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = createDocsMetadata({
  title: "Documentation Overview",
  description:
    "Navigate setup, components, accessibility guides, and API automation from the Glin UI docs home.",
  path: "/docs",
  keywords: ["Glin UI docs", "React component documentation", "glass UI documentation"]
})

const docsSections = [
  {
    href: "/docs/getting-started",
    title: "Getting Started",
    description: "Install the packages, wire tokens, and launch your first component in Next.js, React, or Vue."
  },
  {
    href: "/docs/components",
    title: "Components",
    description: "Browse primitives and signature surfaces with implementation-aware routes and API references."
  },
  {
    href: "/docs/accessibility",
    title: "Accessibility Hub",
    description: "Review forms, focus, screen-reader, and color-contrast guidance used in release checks."
  },
  {
    href: "/docs/forms-recipes",
    title: "Form Recipes",
    description: "Copy complete auth, checkout, and settings patterns built with Glin UI primitives."
  },
  {
    href: "/docs/tokens",
    title: "Design Tokens",
    description: "Inspect glass surfaces, refraction edges, color ramps, and spacing foundations."
  },
  {
    href: "/docs/api-metadata",
    title: "API Metadata",
    description: "See generated TypeScript props metadata used to prevent docs API drift."
  }
] as const

export default function DocsOverviewPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Docs Home
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Documentation Overview</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Navigate setup, components, accessibility guidance, and API automation from one entry point.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="default">
              <Link href="/docs/getting-started">
                Start setup
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass">
              <Link href="/docs/components">Browse components</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {docsSections.map((section) => (
          <Card key={section.href} variant="glass" className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="sm" variant="outline">
                <Link href={section.href}>
                  Open
                  <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
