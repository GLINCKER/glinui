import type { Metadata } from "next"
import Link from "next/link"
import { BadgeCheck, Palette, ScanSearch } from "lucide-react"

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"
import { createDocsMetadata } from "@/lib/docs-metadata"

const contrastExampleSnippet = `<div className="rounded-xl border border-border/60 bg-[var(--glass-3-surface)] p-4">
  <p className="text-sm text-neutral-700 dark:text-neutral-200">
    Secondary copy keeps AA contrast on glass surfaces.
  </p>
  <a
    href="#"
    className="mt-2 inline-flex text-sm font-medium text-[var(--color-foreground)] underline underline-offset-4"
  >
    Read the full accessibility spec
  </a>
</div>`

const auditSnippet = `# Suggested release audit workflow
pnpm --filter @glinui/docs build

# Then validate key routes with browser accessibility tooling:
# - /docs/getting-started
# - /docs/components/radix/button
# - /docs/components/radix/table
# - /docs/forms-accessibility`

const contrastChecklist = [
  "Body copy on glass surfaces meets WCAG AA contrast ratio.",
  "Muted labels remain readable in light and dark themes.",
  "Focus rings and active states are visible against frosted backgrounds.",
  "Status colors (success/warning/error) are never color-only without text."
]

export const metadata: Metadata = createDocsMetadata({
  title: "Color Contrast Validation",
  description:
    "WCAG-oriented contrast validation patterns for glass UI surfaces, semantic states, and focus visibility.",
  path: "/docs/color-contrast",
  keywords: ["color contrast", "WCAG AA", "visual accessibility", "dark mode readability"]
})

export default function ColorContrastPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Visual Accessibility
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Color Contrast Validation</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Validate contrast ratios across light and dark themes so glass depth never compromises readability.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Palette className="h-4 w-4" />
              Contrast Checklist
            </CardTitle>
            <CardDescription>Run this pass for every major visual update.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              {contrastChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <ScanSearch className="h-4 w-4" />
              Audit Scope
            </CardTitle>
            <CardDescription>Prioritize high-traffic docs and demos first.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            <p>Landing hero + topbar controls</p>
            <p>Component docs tables and code blocks</p>
            <p>States: hover, focus-visible, selected, disabled</p>
            <p>Semantic variants: success, warning, error badges and alerts</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Reference Surface Pattern</h2>
        <CodeBlock language="tsx" code={contrastExampleSnippet} />
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Release Audit Script</h2>
        <CodeBlock language="bash" code={auditSnippet} />
      </section>

      <section className="space-y-2 rounded-2xl border border-border/60 bg-background/40 p-4">
        <h2 className="text-base font-semibold">Related Guides</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/docs/forms-accessibility" className="underline decoration-border underline-offset-4">
            Forms Accessibility
          </Link>
          <Link href="/docs/focus-management" className="underline decoration-border underline-offset-4">
            Focus Management
          </Link>
          <Link href="/docs/screen-reader-testing" className="underline decoration-border underline-offset-4">
            Screen Reader Testing
          </Link>
        </div>
      </section>
    </main>
  )
}
