import type { Metadata } from "next"
import Link from "next/link"
import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@glinui/ui"
import { Eye, Focus, Headphones, ShieldCheck } from "lucide-react"
import { createDocsMetadata } from "@/lib/docs-metadata"

const guides = [
  {
    title: "Forms Accessibility",
    href: "/docs/forms-accessibility",
    description: "Labeling contracts for Input, Select, Textarea, Checkbox, Radio Group, and Switch.",
    icon: ShieldCheck
  },
  {
    title: "Screen Reader Testing",
    href: "/docs/screen-reader-testing",
    description: "Release QA checklist across VoiceOver, NVDA, and mobile screen readers.",
    icon: Headphones
  },
  {
    title: "Focus Management",
    href: "/docs/focus-management",
    description: "Focus trap and focus-restore patterns for dialogs, sheets, and interactive flows.",
    icon: Focus
  },
  {
    title: "Color Contrast",
    href: "/docs/color-contrast",
    description: "WCAG-oriented contrast validation for glass surfaces in light and dark themes.",
    icon: Eye
  }
]

export const metadata: Metadata = createDocsMetadata({
  title: "Accessibility Hub",
  description:
    "Centralized accessibility guidance for forms, screen readers, focus management, and contrast across Glin UI.",
  path: "/docs/accessibility",
  keywords: ["UI accessibility", "WCAG guidance", "screen reader testing", "keyboard navigation"]
})

export default function AccessibilityPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Accessibility
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Accessibility Hub</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Centralized guidance for form semantics, screen-reader QA, keyboard focus, and contrast validation across
            the Glin UI docs and component system.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => {
          const Icon = guide.icon
          return (
            <Card key={guide.href} variant="glass" className="transition-colors hover:bg-white/10 dark:hover:bg-white/[0.06]">
              <CardHeader className="space-y-2">
                <CardTitle className="inline-flex items-center gap-2 text-base">
                  <Icon className="h-4 w-4" />
                  <Link href={guide.href} className="underline-offset-4 hover:underline">
                    {guide.title}
                  </Link>
                </CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </section>
    </main>
  )
}
