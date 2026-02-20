import type { Metadata } from "next"
import Link from "next/link"

import { Badge, Button, GlassCard, Separator } from "@glinui/ui"

import { createDocsMetadata } from "@/lib/docs-metadata"
import { createAbsoluteUrl } from "@/lib/seo"

export const metadata: Metadata = createDocsMetadata({
  title: "Glin UI vs Magic UI",
  description:
    "Compare Glin UI and Magic UI across accessibility, surface variants, design-system consistency, and production-readiness for React teams.",
  path: "/docs/magicui-alternative",
  keywords: [
    "magic ui alternative",
    "glin ui vs magic ui",
    "react ui library comparison",
    "glass ui components",
    "accessible react components"
  ]
})

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Glin UI a Magic UI alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Glin UI is a strong alternative if your team needs a consistent liquid-glass design system with accessibility defaults and production-focused component APIs."
      }
    },
    {
      "@type": "Question",
      name: "What is the main difference between Glin UI and Magic UI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glin UI focuses on a complete glass design language with shared tokens and predictable variants, while Magic UI is often used as a source of visual effects and snippets."
      }
    }
  ]
}

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Docs",
      item: createAbsoluteUrl("/docs")
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Glin UI vs Magic UI",
      item: createAbsoluteUrl("/docs/magicui-alternative")
    }
  ]
}

const rows = [
  {
    category: "Visual system",
    glinui: "Unified liquid-glass language with reusable surfaces and elevation levels.",
    magicui: "Collection of animated patterns and effects with more assembly work."
  },
  {
    category: "Component consistency",
    glinui: "Shared API patterns and variants across primitives and signature components.",
    magicui: "Pattern quality can vary between individual effects."
  },
  {
    category: "Accessibility baseline",
    glinui: "Radix-backed primitives and documented QA flows.",
    magicui: "Depends on how each effect/component is integrated."
  },
  {
    category: "Production workflow",
    glinui: "Registry + docs + CLI flow for scalable team usage.",
    magicui: "Often copied/adapted per feature."
  }
]

export default function MagicUiAlternativePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Badge variant="glass" className="w-fit tracking-[0.14em]">
        COMPARISON
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Glin UI vs Magic UI</h1>
      <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-300 sm:text-base">
        Teams choose Glin UI when they want visual depth and motion with a stable, reusable system that can scale beyond one landing page.
      </p>

      <GlassCard className="overflow-hidden border-white/20">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1.1fr_1fr_1fr]">
          <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Category</div>
          <div className="bg-white/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
            Glin UI
          </div>
          <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Magic UI</div>
        </div>
        <Separator />
        {rows.map((row) => (
          <div key={row.category} className="grid grid-cols-1 gap-0 sm:grid-cols-[1.1fr_1fr_1fr]">
            <div className="px-4 py-4 text-sm font-medium">{row.category}</div>
            <div className="bg-white/50 px-4 py-4 text-sm text-neutral-700 dark:bg-white/5 dark:text-neutral-200">{row.glinui}</div>
            <div className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{row.magicui}</div>
            <div className="sm:col-span-3">
              <Separator />
            </div>
          </div>
        ))}
      </GlassCard>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="default">
          <Link href="/docs/getting-started">Start with Glin UI</Link>
        </Button>
        <Button asChild variant="glass">
          <Link href="/docs/components">Browse components</Link>
        </Button>
      </div>
    </main>
  )
}
