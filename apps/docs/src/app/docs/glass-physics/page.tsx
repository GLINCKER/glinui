import { glassLevelTokens } from "@glinr/tokens"

const glassLevelIds = ["glass-1", "glass-2", "glass-3", "glass-4", "glass-5"] as const
const glassLevels = glassLevelIds.map((id) => ({
  id,
  ...glassLevelTokens[id]
}))

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
              <p className="text-xs text-neutral-600 dark:text-neutral-300">opacity {level.opacity}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">shadow {level.shadow}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
