import type { Metadata } from "next"
import Link from "next/link"

import { Badge, Button, GlassCard, Separator } from "@glinui/ui"

import { createDocsMetadata } from "@/lib/docs-metadata"
import { createAbsoluteUrl } from "@/lib/seo"

export const metadata: Metadata = createDocsMetadata({
  title: "Glin UI vs shadcn/ui",
  description:
    "Compare Glin UI and shadcn/ui for glassmorphism, component variants, motion, accessibility defaults, and production readiness.",
  path: "/docs/shadcn-alternative",
  keywords: [
    "shadcn alternative",
    "shadcn ui alternative",
    "glin ui vs shadcn",
    "glassmorphism component library",
    "react component library comparison"
  ]
})

const comparison = [
  {
    category: "Design system",
    glinui: "Liquid-glass-first visual language with shared tokens and elevation model.",
    shadcn: "Composable baseline kit styled per project."
  },
  {
    category: "Out-of-box variants",
    glinui: "Multiple glass-aware surfaces and semantic variants per component.",
    shadcn: "You define and maintain variants manually."
  },
  {
    category: "Motion + reduced motion",
    glinui: "Motion presets and reduced-motion-safe defaults included.",
    shadcn: "No built-in motion model by default."
  },
  {
    category: "Accessibility baseline",
    glinui: "Radix-backed primitives plus docs and QA workflows baked into the library.",
    shadcn: "Radix primitives available, implementation quality depends on project usage."
  }
]

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Glin UI a shadcn/ui alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Glin UI is a shadcn/ui alternative for teams that want a complete liquid-glass design system with consistent variants and accessibility defaults out of the box."
      }
    },
    {
      "@type": "Question",
      name: "What is the difference between Glin UI and shadcn/ui?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "shadcn/ui gives you composable building blocks that you style and standardize yourself, while Glin UI layers a production-ready glass visual system, token model, and motion-safe defaults on top of Radix primitives."
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
      name: "Glin UI vs shadcn/ui",
      item: createAbsoluteUrl("/docs/shadcn-alternative")
    }
  ]
}

export default function ShadcnAlternativePage() {
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
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Glin UI vs shadcn/ui</h1>
      <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-300 sm:text-base">
        If you want to move fast with a complete liquid-glass design system, Glin UI is optimized for that workflow.
        If you prefer assembling and styling everything from primitives, shadcn/ui remains a flexible option.
      </p>

      <GlassCard className="overflow-hidden border-white/20">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1.1fr_1fr_1fr]">
          <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Category</div>
          <div className="bg-white/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
            Glin UI
          </div>
          <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">shadcn/ui</div>
        </div>
        <Separator />
        {comparison.map((row) => (
          <div key={row.category} className="grid grid-cols-1 gap-0 sm:grid-cols-[1.1fr_1fr_1fr]">
            <div className="px-4 py-4 text-sm font-medium">{row.category}</div>
            <div className="bg-white/50 px-4 py-4 text-sm text-neutral-700 dark:bg-white/5 dark:text-neutral-200">
              {row.glinui}
            </div>
            <div className="px-4 py-4 text-sm text-neutral-600 dark:text-neutral-300">{row.shadcn}</div>
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
