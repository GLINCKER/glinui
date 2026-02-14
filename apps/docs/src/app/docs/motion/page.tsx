export default function MotionPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Motion</h1>
        <p className="max-w-2xl text-neutral-600">
          Motion tokens define fast, normal, and slow durations with standard and emphasize easing curves. Every
          transition in docs and components respects reduced-motion preferences.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="glass-2 rounded-2xl p-5">
          <p className="text-sm font-semibold">Fast</p>
          <p className="mt-2 text-xs text-neutral-600">var(--motion-fast) = 120ms</p>
        </article>
        <article className="glass-2 rounded-2xl p-5">
          <p className="text-sm font-semibold">Normal</p>
          <p className="mt-2 text-xs text-neutral-600">var(--motion-normal) = 220ms</p>
        </article>
        <article className="glass-2 rounded-2xl p-5">
          <p className="text-sm font-semibold">Slow</p>
          <p className="mt-2 text-xs text-neutral-600">var(--motion-slow) = 360ms</p>
        </article>
      </section>
    </main>
  )
}
