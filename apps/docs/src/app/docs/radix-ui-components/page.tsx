import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Minus, ShieldCheck, Sparkles, X } from "lucide-react"

import { Badge, Button, GlassCard, Separator } from "@glinui/ui"

import { createDocsMetadata } from "@/lib/docs-metadata"
import { createAbsoluteUrl } from "@/lib/seo"

export const metadata: Metadata = createDocsMetadata({
  title: "Radix UI Components with Glin UI",
  description:
    "Pricing-style comparison between raw Radix primitives and Glin UI's Radix-based component system.",
  path: "/docs/radix-ui-components",
  keywords: [
    "radix ui components",
    "radix ui react",
    "accessible radix components",
    "react radix component library",
    "radix ui design system"
  ]
})

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Glin UI use Radix UI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Glin UI uses Radix primitives for accessibility and layers a full liquid-glass design system on top."
      }
    },
    {
      "@type": "Question",
      name: "What does Glin UI add on top of Radix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glin UI adds consistent styling variants, tokenized surfaces, docs patterns, and production-ready defaults while preserving Radix accessibility foundations."
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
      name: "Radix UI Components",
      item: createAbsoluteUrl("/docs/radix-ui-components")
    }
  ]
}

type FeatureState = "yes" | "partial" | "no"

type FeatureRow = {
  feature: string
  detail: string
  glinui: { state: FeatureState; note: string }
  radixOnly: { state: FeatureState; note: string }
}

const featureRows: FeatureRow[] = [
  {
    feature: "Accessibility primitives",
    detail: "Keyboard, focus management, ARIA semantics.",
    glinui: { state: "yes", note: "Built directly on Radix primitives." },
    radixOnly: { state: "yes", note: "Core Radix strength." }
  },
  {
    feature: "Visual system out of the box",
    detail: "Ready design language and surfaces.",
    glinui: { state: "yes", note: "Glass variants, elevations, and semantic states included." },
    radixOnly: { state: "no", note: "Styling system must be assembled separately." }
  },
  {
    feature: "Cross-component consistency",
    detail: "Shared API and variant patterns.",
    glinui: { state: "yes", note: "Unified contracts across primitives and signatures." },
    radixOnly: { state: "partial", note: "Depends on your local abstraction quality." }
  },
  {
    feature: "Dark mode parity",
    detail: "Theme consistency for all component states.",
    glinui: { state: "yes", note: "Tokenized surface behavior across dark and light." },
    radixOnly: { state: "partial", note: "Requires custom theming implementation." }
  },
  {
    feature: "Motion safety defaults",
    detail: "Reduced-motion-aware interaction behavior.",
    glinui: { state: "yes", note: "System-level motion guidance and defaults." },
    radixOnly: { state: "no", note: "Motion policy must be defined in app code." }
  },
  {
    feature: "Time to polished UI",
    detail: "Speed from setup to production-feel interface.",
    glinui: { state: "yes", note: "Designed for immediate product-ready output." },
    radixOnly: { state: "partial", note: "Fast primitives, slower full-system assembly." }
  },
  {
    feature: "Design-system governance",
    detail: "Managing consistency across teams.",
    glinui: { state: "yes", note: "Shared variants and docs patterns reduce drift." },
    radixOnly: { state: "partial", note: "Governance is fully custom and team-dependent." }
  },
  {
    feature: "Maximum styling freedom",
    detail: "Unopinionated customization control.",
    glinui: { state: "partial", note: "Highly customizable, but optimized around glass language." },
    radixOnly: { state: "yes", note: "Ideal for building fully custom systems from scratch." }
  }
]

function StatePill({ state }: { state: FeatureState }) {
  if (state === "yes") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/55 bg-emerald-100/65 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-400/15 dark:text-emerald-300">
        <Check className="size-3.5" />
        Yes
      </span>
    )
  }

  if (state === "partial") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/55 bg-amber-100/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-700 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300">
        <Minus className="size-3.5" />
        Partial
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-rose-300/55 bg-rose-100/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-rose-700 dark:border-rose-400/35 dark:bg-rose-400/15 dark:text-rose-300">
      <X className="size-3.5" />
      No
    </span>
  )
}

function FeatureCell({
  title,
  state,
  note
}: {
  title: string
  state: FeatureState
  note: string
}) {
  return (
    <div className="space-y-2 rounded-xl border border-white/20 bg-white/55 p-3 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600 dark:text-neutral-300">{title}</p>
        <StatePill state={state} />
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{note}</p>
    </div>
  )
}

export default function RadixUiComponentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
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

      <section className="relative overflow-hidden rounded-3xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_14%_8%,rgb(125_211_252_/_0.18),transparent_38%),radial-gradient(circle_at_86%_10%,rgb(167_243_208_/_0.12),transparent_42%),var(--glass-3-surface)] p-6 shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="glass" className="tracking-[0.14em]">
            RADIX COMPARISON
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/45 px-3 py-1 text-[11px] font-medium text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
            <Sparkles className="size-3.5" />
            Pricing-style matrix
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Glin UI + Radix vs Raw Radix</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
          Both paths keep Radix accessibility. The difference is whether you also want a complete visual system and
          production defaults out of the box.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="default">
            <Link href="/docs/components">
              See all components
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="glass">
            <Link href="/docs/accessibility">
              <ShieldCheck className="size-4" />
              Review accessibility docs
            </Link>
          </Button>
        </div>
      </section>

      <GlassCard className="space-y-4 border-white/20 p-4 sm:p-5 dark:border-white/[0.1]">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Feature comparison</h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            Left column = capability area. Right columns = side-by-side verdict and implementation notes.
          </p>
        </div>
        <Separator />
        <div className="space-y-3">
          {featureRows.map((row) => (
            <div key={row.feature} className="grid gap-3 rounded-2xl border border-white/20 bg-white/45 p-4 dark:border-white/10 dark:bg-white/[0.03] lg:grid-cols-[1.1fr_1fr_1fr]">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700 dark:text-neutral-200">{row.feature}</h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{row.detail}</p>
              </div>
              <FeatureCell title="Glin UI + Radix" state={row.glinui.state} note={row.glinui.note} />
              <FeatureCell title="Raw Radix" state={row.radixOnly.state} note={row.radixOnly.note} />
            </div>
          ))}
        </div>
      </GlassCard>
    </main>
  )
}
