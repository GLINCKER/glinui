import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Layers, Minus, ShieldCheck, Sparkles, X } from "lucide-react"

import { Badge, Button, GlassCard, Separator } from "@glinui/ui"

import { createDocsMetadata } from "@/lib/docs-metadata"
import { createAbsoluteUrl } from "@/lib/seo"

export const metadata: Metadata = createDocsMetadata({
  title: "Glin UI vs shadcn/ui",
  description:
    "Feature-by-feature comparison of Glin UI and shadcn/ui with checkmark matrix for faster decision-making.",
  path: "/docs/shadcn-alternative",
  keywords: [
    "shadcn alternative",
    "shadcn ui alternative",
    "glin ui vs shadcn",
    "glassmorphism component library",
    "react component library comparison"
  ]
})

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Glin UI a shadcn/ui alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Glin UI is a shadcn/ui alternative for teams that want a complete and cohesive liquid-glass design system with strong defaults."
      }
    },
    {
      "@type": "Question",
      name: "What is the main difference between Glin UI and shadcn/ui?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "shadcn/ui is a flexible baseline assembled per project, while Glin UI provides a full visual system with pre-structured variants and consistent behavior."
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

type FeatureState = "yes" | "partial" | "no"

type FeatureRow = {
  feature: string
  detail: string
  glinui: { state: FeatureState; note: string }
  shadcn: { state: FeatureState; note: string }
}

const highlights = [
  {
    title: "Out-of-box visual system",
    detail: "Glass variants, elevations, and semantic states are built into the component contract.",
    icon: Sparkles
  },
  {
    title: "Operational consistency",
    detail: "Lower variance between squads through shared component behavior.",
    icon: Layers
  },
  {
    title: "Accessibility confidence",
    detail: "Stronger defaults for keyboard, focus, contrast, and reduced motion.",
    icon: ShieldCheck
  }
]

const features: FeatureRow[] = [
  {
    feature: "Design language completeness",
    detail: "Ready visual direction across many screens.",
    glinui: { state: "yes", note: "Complete liquid-glass language with reusable surfaces." },
    shadcn: { state: "partial", note: "Baseline kit; style language is project-owned." }
  },
  {
    feature: "Variant governance",
    detail: "Keeping variants consistent across teams.",
    glinui: { state: "yes", note: "Variant model is pre-structured across components." },
    shadcn: { state: "partial", note: "Teams maintain variants and drift controls manually." }
  },
  {
    feature: "Scalability across squads",
    detail: "Shipping with less style drift.",
    glinui: { state: "yes", note: "Shared token and surface model scales cleanly." },
    shadcn: { state: "partial", note: "Scales well with strict internal governance." }
  },
  {
    feature: "Accessibility baseline",
    detail: "Reliable keyboard and screen-reader behavior.",
    glinui: { state: "yes", note: "Radix-backed primitives plus docs-first QA guidance." },
    shadcn: { state: "partial", note: "Strong primitives, final quality depends on implementation." }
  },
  {
    feature: "Dark mode parity",
    detail: "Balanced visuals in both themes.",
    glinui: { state: "yes", note: "Surface behavior tuned for dark and light consistency." },
    shadcn: { state: "partial", note: "Depends on custom theme and per-component tuning." }
  },
  {
    feature: "Motion consistency",
    detail: "Expressive animation without chaos.",
    glinui: { state: "yes", note: "Motion intent and reduced-motion behavior are system-level." },
    shadcn: { state: "partial", note: "Motion policy is usually assembled per project." }
  },
  {
    feature: "Initial flexibility",
    detail: "Ability to fully customize from primitives.",
    glinui: { state: "partial", note: "Customizable but optimized around glass-first system." },
    shadcn: { state: "yes", note: "Excellent for full custom assembly workflows." }
  },
  {
    feature: "Long-term maintenance",
    detail: "Cost of keeping UI clean after launch.",
    glinui: { state: "yes", note: "Lower with system-driven usage and fewer one-offs." },
    shadcn: { state: "no", note: "Can increase if variant and style decisions fragment." }
  }
]

const chooseGlin = [
  "You want polished glass UI without defining every variant from scratch.",
  "You need consistent behavior across many feature teams.",
  "You care about predictable accessibility and motion defaults.",
  "You want to ship quickly and reduce post-launch design debt.",
  "You need a design language that scales with product growth."
]

const chooseShadcn = [
  "You need maximum compose-from-primitives control.",
  "You already have strong in-house design-system governance.",
  "You are not targeting a glass-first visual language.",
  "You accept higher implementation ownership per component."
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

export default function ShadcnAlternativePage() {
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

      <section className="relative overflow-hidden rounded-3xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_14%_8%,rgb(147_197_253_/_0.2),transparent_36%),radial-gradient(circle_at_86%_10%,rgb(167_243_208_/_0.15),transparent_42%),var(--glass-3-surface)] p-6 shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="glass" className="tracking-[0.14em]">
            COMPARISON GUIDE
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/45 px-3 py-1 text-[11px] font-medium text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
            <Sparkles className="size-3.5" />
            Pricing-style matrix
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Glin UI vs shadcn/ui</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
          Quick read: shadcn/ui is ideal for compose-it-yourself workflows. Glin UI is ideal when you want a
          system-level glass language that is production-ready and easier to scale.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="default">
            <Link href="/docs/getting-started">
              Start with Glin UI
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="glass">
            <Link href="/docs/components">Browse all components</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <GlassCard key={item.title} className="border-white/20 p-4 dark:border-white/[0.1]">
            <div className="inline-flex size-9 items-center justify-center rounded-xl border border-white/20 bg-white/50 dark:border-white/10 dark:bg-white/5">
              <item.icon className="size-4 text-foreground" />
            </div>
            <h2 className="mt-3 text-base font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{item.detail}</p>
          </GlassCard>
        ))}
      </section>

      <GlassCard className="space-y-4 border-white/20 p-4 sm:p-5 dark:border-white/[0.1]">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Feature comparison</h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            Left column = capability area. Right columns = verdict plus practical implementation note.
          </p>
        </div>
        <Separator />
        <div className="space-y-3">
          {features.map((row) => (
            <div key={row.feature} className="grid gap-3 rounded-2xl border border-white/20 bg-white/45 p-4 dark:border-white/10 dark:bg-white/[0.03] lg:grid-cols-[1.1fr_1fr_1fr]">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700 dark:text-neutral-200">{row.feature}</h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{row.detail}</p>
              </div>
              <FeatureCell title="Glin UI" state={row.glinui.state} note={row.glinui.note} />
              <FeatureCell title="shadcn/ui" state={row.shadcn.state} note={row.shadcn.note} />
            </div>
          ))}
        </div>
      </GlassCard>

      <section className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="border-white/20 p-5 dark:border-white/[0.1]">
          <h2 className="text-lg font-semibold">Choose Glin UI when...</h2>
          <Separator className="my-4" />
          <ul className="space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
            {chooseGlin.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex size-4 items-center justify-center rounded-full border border-emerald-300/55 bg-emerald-100/70 text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-400/15 dark:text-emerald-300">
                  <Check className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="border-white/20 p-5 dark:border-white/[0.1]">
          <h2 className="text-lg font-semibold">Choose shadcn/ui when...</h2>
          <Separator className="my-4" />
          <ul className="space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
            {chooseShadcn.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex size-4 items-center justify-center rounded-full border border-amber-300/55 bg-amber-100/70 text-amber-700 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300">
                  <Minus className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>
    </main>
  )
}
