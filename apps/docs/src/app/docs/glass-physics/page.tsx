import type { Metadata } from "next"
import {
  glassLevelTokens,
  glassLuminanceTokens,
  glassOpacityScaleTokens,
  glassPerformanceTokens
} from "@glinui/tokens"
import { createDocsMetadata } from "@/lib/docs-metadata"

const glassLevelIds = ["glass-1", "glass-2", "glass-3", "glass-4", "glass-5"] as const
const glassLevels = glassLevelIds.map((id) => ({
  id,
  ...glassLevelTokens[id]
}))

const glassOpacityScale = [
  {
    step: 1,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-1))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-1))]"
  },
  {
    step: 2,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-2))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-2))]"
  },
  {
    step: 3,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-3))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-3))]"
  },
  {
    step: 4,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-4))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-4))]"
  },
  {
    step: 5,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-5))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-5))]"
  },
  {
    step: 6,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-6))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-6))]"
  },
  {
    step: 7,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-7))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-7))]"
  },
  {
    step: 8,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-8))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-8))]"
  },
  {
    step: 9,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-9))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-9))]"
  },
  {
    step: 10,
    swatchClassName:
      "bg-[rgb(255_255_255_/_var(--glass-opacity-10))] dark:bg-[rgb(0_0_0_/_var(--glass-opacity-10))]"
  }
] as const

export const metadata: Metadata = createDocsMetadata({
  title: "Glass Physics",
  description:
    "Understand Glin UI glass elevation tokens, opacity scales, luminance adaptation, and performance hints.",
  path: "/docs/glass-physics",
  keywords: ["glassmorphism tokens", "glass elevation", "opacity scale", "UI performance"]
})

export default function GlassPhysicsPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Glass Physics</h1>
        <p className="max-w-2xl text-neutral-600">
          Five elevation levels combine blur, opacity, refraction border, and shadow depth into reusable surfaces.
        </p>
      </section>

      <section className="rounded-3xl border border-border/60 bg-gradient-to-br from-white/45 via-sky-100/30 to-violet-200/35 p-5 dark:from-slate-900/55 dark:via-slate-800/45 dark:to-slate-700/40">
        <div className="grid gap-4 md:grid-cols-5">
          {glassLevels.map((level) => (
            <article key={level.id} className={`${level.id} rounded-xl p-4`}>
              <p className="text-sm font-semibold">{level.id}</p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">blur {level.blur}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                opacity L:{level.opacity.light} D:{level.opacity.dark}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">shadow {level.shadow}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-border/60 bg-gradient-to-br from-white/50 via-cyan-100/25 to-blue-100/25 p-5 dark:from-slate-900/55 dark:via-slate-800/40 dark:to-slate-700/35">
        <h2 className="text-xl font-semibold">Opacity Scale</h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Ten stops from crystal to frosted. Glass levels currently map to steps 2, 4, 6, 8, and 10.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {glassOpacityScale.map((stop) => (
            <article key={stop.step} className="space-y-2 rounded-xl border border-border/60 bg-[var(--glass-2-surface)] p-3 backdrop-blur-xl">
              <div className={`h-16 rounded-lg border border-white/25 [border-top-color:var(--glass-refraction-top)] ${stop.swatchClassName}`} />
              <p className="text-xs font-medium text-foreground">opacity-{stop.step}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                L:{glassOpacityScaleTokens.light[stop.step]} D:{glassOpacityScaleTokens.dark[stop.step]}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-border/60 bg-gradient-to-br from-white/55 via-amber-100/25 to-orange-100/25 p-5 dark:from-slate-900/55 dark:via-slate-800/40 dark:to-slate-700/35">
        <h2 className="text-xl font-semibold">Luminance Adaptation</h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Set a luminance context so glass surfaces adjust opacity, borders, and saturation to surrounding brightness.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <article data-glass-luminance="bright" className="rounded-xl border border-border/60 bg-gradient-to-br from-white/70 to-slate-100/60 p-3">
            <div className="glass-3 rounded-lg p-3">
              <p className="text-xs font-medium">`data-glass-luminance=\"bright\"`</p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                surface x{glassLuminanceTokens.bright.surfaceMultiplier}
              </p>
            </div>
          </article>
          <article data-glass-luminance="neutral" className="rounded-xl border border-border/60 bg-gradient-to-br from-slate-200/40 to-slate-300/30 p-3 dark:from-slate-700/45 dark:to-slate-600/35">
            <div className="glass-3 rounded-lg p-3">
              <p className="text-xs font-medium">`data-glass-luminance=\"neutral\"`</p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                surface x{glassLuminanceTokens.neutral.surfaceMultiplier}
              </p>
            </div>
          </article>
          <article data-glass-luminance="dim" className="rounded-xl border border-border/60 bg-gradient-to-br from-slate-900/75 to-slate-800/70 p-3">
            <div className="glass-3 rounded-lg p-3">
              <p className="text-xs font-medium">`data-glass-luminance=\"dim\"`</p>
              <p className="mt-1 text-xs text-neutral-300">
                surface x{glassLuminanceTokens.dim.surfaceMultiplier}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-border/60 bg-gradient-to-br from-white/55 via-emerald-100/20 to-teal-100/25 p-5 dark:from-slate-900/55 dark:via-slate-800/40 dark:to-slate-700/35">
        <h2 className="text-xl font-semibold">Performance Hints</h2>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Use utility classes for heavy glass surfaces to keep composition on the GPU and reduce repaint churn.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <article className="glass-gpu-hint glass-2 rounded-xl p-4">
            <p className="text-sm font-medium">`.glass-gpu-hint`</p>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
              will-change: {glassPerformanceTokens.gpuHint.willChange}
            </p>
          </article>
          <article className="glass-heavy glass-3 rounded-xl p-4">
            <p className="text-sm font-medium">`.glass-heavy`</p>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
              will-change: {glassPerformanceTokens.heavySurface.willChange}
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
