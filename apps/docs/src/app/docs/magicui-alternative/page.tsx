import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Gauge, Layers, Minus, Sparkles, Wand2, X } from "lucide-react"

import { Badge, Button, GlassCard, Separator } from "@glinui/ui"

import { createDocsMetadata } from "@/lib/docs-metadata"
import { createAbsoluteUrl } from "@/lib/seo"

export const metadata: Metadata = createDocsMetadata({
  title: "Glin UI vs Magic UI",
  description:
    "Feature-by-feature comparison of Glin UI vs Magic UI with pricing-style matrix and checkmark verdicts.",
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
        text: "Yes. Glin UI is a strong alternative for teams that need a complete and consistent liquid-glass component system with accessibility defaults."
      }
    },
    {
      "@type": "Question",
      name: "What is the main difference between Glin UI and Magic UI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glin UI is a cohesive production library with shared API and surface standards, while Magic UI is commonly used as a source of visual effects and snippets."
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

type FeatureState = "yes" | "partial" | "no"

type FeatureRow = {
  feature: string
  detail: string
  glinui: { state: FeatureState; note: string }
  magicui: { state: FeatureState; note: string }
}

const highlights = [
  {
    title: "System consistency",
    detail: "Shared variants, tokens, and behavior across primitives and signatures.",
    icon: Layers
  },
  {
    title: "Production velocity",
    detail: "Less snippet refactoring and fewer one-off style branches.",
    icon: Gauge
  },
  {
    title: "Visual depth",
    detail: "Glass surfaces are built into the component contract, not patched per screen.",
    icon: Sparkles
  }
]

const features: FeatureRow[] = [
  {
    feature: "Design system cohesion",
    detail: "Consistency across many pages and product workflows.",
    glinui: { state: "yes", note: "Unified liquid-glass language with shared surfaces and elevation." },
    magicui: { state: "partial", note: "Great effects, but cohesion depends on manual curation." }
  },
  {
    feature: "Component API consistency",
    detail: "Same mental model across components.",
    glinui: { state: "yes", note: "Predictable variant and behavior patterns across library components." },
    magicui: { state: "partial", note: "API shape can vary between blocks and effects." }
  },
  {
    feature: "Accessibility baseline",
    detail: "Keyboard, focus, and screen-reader reliability.",
    glinui: { state: "yes", note: "Radix-backed primitives with docs-driven QA guidance." },
    magicui: { state: "partial", note: "Quality depends on each snippet and integration context." }
  },
  {
    feature: "Dark mode parity",
    detail: "Balanced UI in both themes.",
    glinui: { state: "yes", note: "Tokenized surfaces are tuned for light and dark parity." },
    magicui: { state: "partial", note: "Per-pattern adjustments are often needed." }
  },
  {
    feature: "Motion governance",
    detail: "Expressive motion with policy control.",
    glinui: { state: "yes", note: "Motion defaults include reduced-motion-safe behavior." },
    magicui: { state: "partial", note: "Effects can require extra guardrails in product apps." }
  },
  {
    feature: "Scaling across teams",
    detail: "Reduced design drift between squads.",
    glinui: { state: "yes", note: "Shared tokens and patterns support multi-team shipping." },
    magicui: { state: "partial", note: "Local customizations can increase drift risk." }
  },
  {
    feature: "Long-term maintenance",
    detail: "Lower cost after launch.",
    glinui: { state: "yes", note: "Fewer one-off overrides and clearer system contracts." },
    magicui: { state: "no", note: "Snippet-heavy usage can increase maintenance overhead." }
  },
  {
    feature: "Prototype speed",
    detail: "How fast you can test visual concepts.",
    glinui: { state: "yes", note: "Fast when building reusable product surfaces." },
    magicui: { state: "yes", note: "Very fast for effect-led experimentation." }
  }
]

const switchWins = [
  "Replace effect-by-effect styling decisions with a unified visual language.",
  "Reduce design drift by standardizing component APIs and surfaces.",
  "Improve dark mode and reduced-motion consistency without per-screen rework.",
  "Lower review overhead with repeatable implementation patterns.",
  "Scale from landing effects to full product workflows more cleanly.",
  "Cut post-launch polish debt by avoiding one-off interaction forks."
]

const migrationPlan = [
  "Start with high-impact surfaces first: navbar, hero, modals, key actions.",
  "Migrate one feature slice at a time to avoid high-risk rewrites.",
  "Adopt token-first theming so old and new UI can coexist safely.",
  "Lock agreed variants in docs examples to stop new one-off branches.",
  "QA keyboard and reduced-motion behavior before broad rollout."
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

export default function MagicUiAlternativePage() {
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

      <section className="relative overflow-hidden rounded-3xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_16%_8%,rgb(125_211_252_/_0.18),transparent_38%),radial-gradient(circle_at_84%_10%,rgb(167_243_208_/_0.14),transparent_40%),var(--glass-3-surface)] p-6 shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="glass" className="tracking-[0.14em]">
            COMPARISON GUIDE
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/45 px-3 py-1 text-[11px] font-medium text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
            <Wand2 className="size-3.5" />
            Pricing-style matrix
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Glin UI vs Magic UI</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
          Quick read: Magic UI is great for visual experimentation. Glin UI is stronger when you need a complete,
          scalable product system with consistent behavior and lower maintenance drift.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="default">
            <Link href="/docs/getting-started">
              Start with Glin UI
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="glass">
            <Link href="/docs/components">Explore component catalog</Link>
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
            Left column = capability area. Right columns = at-a-glance verdict plus implementation note.
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
              <FeatureCell title="Magic UI" state={row.magicui.state} note={row.magicui.note} />
            </div>
          ))}
        </div>
      </GlassCard>

      <section className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="border-white/20 p-5 dark:border-white/[0.1]">
          <h2 className="text-lg font-semibold">Why teams switch</h2>
          <Separator className="my-4" />
          <ul className="space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
            {switchWins.map((item) => (
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
          <h2 className="text-lg font-semibold">Suggested migration path</h2>
          <Separator className="my-4" />
          <ol className="space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
            {migrationPlan.map((item, index) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/55 text-[11px] font-semibold dark:border-white/10 dark:bg-white/5">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </section>
    </main>
  )
}
