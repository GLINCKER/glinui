"use client"

import { useMemo, useState } from "react"
import { resolveSpringPhysics } from "@glinui/motion"

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <label className="space-y-1">
      <div className="flex items-center justify-between text-xs text-neutral-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[var(--color-accent)]"
      />
    </label>
  )
}

export function MotionPlayground() {
  const [tension, setTension] = useState(220)
  const [friction, setFriction] = useState(24)
  const [mass, setMass] = useState(1)

  const spring = useMemo(
    () => resolveSpringPhysics({ tension, friction, mass }),
    [friction, mass, tension]
  )

  return (
    <section className="space-y-4 rounded-2xl border border-border/60 bg-[var(--glass-2-surface)] p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <SliderControl
          label="Tension"
          value={tension}
          min={80}
          max={420}
          step={2}
          onChange={setTension}
        />
        <SliderControl
          label="Friction"
          value={friction}
          min={8}
          max={60}
          step={1}
          onChange={setFriction}
        />
        <SliderControl
          label="Mass"
          value={mass}
          min={0.6}
          max={2}
          step={0.05}
          onChange={setMass}
        />
      </div>

      <div className="grid gap-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-border/60 bg-[var(--glass-3-surface)] p-3">
          <p className="font-medium">Damping Ratio</p>
          <p className="mt-1 text-neutral-600">{spring.dampingRatio.toFixed(3)}</p>
        </article>
        <article className="rounded-xl border border-border/60 bg-[var(--glass-3-surface)] p-3">
          <p className="font-medium">Angular Frequency</p>
          <p className="mt-1 text-neutral-600">{spring.angularFrequency.toFixed(3)}</p>
        </article>
        <article className="rounded-xl border border-border/60 bg-[var(--glass-3-surface)] p-3">
          <p className="font-medium">Settle Duration</p>
          <p className="mt-1 text-neutral-600">{Math.round(spring.settlingDurationMs)}ms</p>
        </article>
        <article className="rounded-xl border border-border/60 bg-[var(--glass-3-surface)] p-3">
          <p className="font-medium">CSS Easing</p>
          <p className="mt-1 break-all text-neutral-600">{spring.cssEasing}</p>
        </article>
      </div>
    </section>
  )
}
