import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Headphones, ListChecks } from "lucide-react"

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

const announceSnippet = `import { useEffect, useState } from "react"
import { Input } from "@glinui/ui"

export function SearchAnnounce() {
  const [query, setQuery] = useState("")
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Replace with real search call
      setCount(query ? 12 : 0)
    }, 120)
    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div className="space-y-2">
      <Input
        aria-label="Search components"
        placeholder="Search components"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p aria-live="polite" className="text-sm text-neutral-500">
        {count} results
      </p>
    </div>
  )
}`

const srChecklist = [
  "Every interactive control has an accessible name.",
  "Focus order follows visual order without traps.",
  "Status updates are announced via aria-live when needed.",
  "Modal/dialog open and close restores focus correctly.",
  "Tables expose headers and meaningful row context."
]

export const metadata: Metadata = createDocsMetadata({
  title: "Screen Reader Testing",
  description:
    "Release QA checklist for spoken UX across VoiceOver, NVDA, and mobile screen readers in Glin UI flows.",
  path: "/docs/screen-reader-testing",
  keywords: ["screen reader QA", "VoiceOver testing", "NVDA testing", "aria-live patterns"]
})

export default function ScreenReaderTestingPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Accessibility QA
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Screen Reader Testing</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Run this test pass before each release to verify spoken UX quality across forms, dialogs, and data views.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Headphones className="h-4 w-4" />
              Test Matrix
            </CardTitle>
            <CardDescription>Validate with at least one desktop and one mobile screen reader.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            <p>
              Desktop: VoiceOver (macOS) or NVDA (Windows)
            </p>
            <p>
              Mobile: VoiceOver (iOS) or TalkBack (Android)
            </p>
            <p>
              Browsers: Safari + Chromium baseline
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <ListChecks className="h-4 w-4" />
              Release Checklist
            </CardTitle>
            <CardDescription>Mark each item during manual QA.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              {srChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Announced Search Results Pattern</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Use `aria-live="polite"` for async updates that should be spoken without interrupting active navigation.
        </p>
        <CodeBlock language="tsx" code={announceSnippet} />
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
          <Link href="/docs/color-contrast" className="underline decoration-border underline-offset-4">
            Color Contrast
          </Link>
        </div>
      </section>
    </main>
  )
}
