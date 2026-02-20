import type { Metadata } from "next"
import {
  createStaggerSequence,
  createScrollLinkedEffect,
  resolveViewTransition,
  resolveSpringPhysics,
  springPresets
} from "@glinui/motion"
import { MotionPlayground } from "@/components/docs/motion-playground"
import { createDocsMetadata } from "@/lib/docs-metadata"

const springOrder = ["gentle", "smooth", "snappy", "bouncy"] as const
const springCards = springOrder.map((name) => ({
  name,
  config: springPresets[name],
  resolved: resolveSpringPhysics(name)
}))

const scrollEffect = createScrollLinkedEffect({
  start: 0,
  end: 600,
  opacity: [0.6, 1],
  blur: [12, 0],
  translateY: [32, 0],
  scale: [0.96, 1]
})

const scrollSamples = [0, 150, 300, 450, 600].map((scrollY) => ({
  scrollY,
  values: scrollEffect.resolve(scrollY),
  style: scrollEffect.style(scrollY)
}))

const viewTransitionCards = ["pageFade", "pageSlide", "glassLift"] as const
const resolvedTransitions = viewTransitionCards.map((name) => ({
  name,
  transition: resolveViewTransition(name)
}))

const stagger = createStaggerSequence({
  count: 8,
  direction: "center-out",
  stepMs: 48,
  initialDelayMs: 40
})

export const metadata: Metadata = createDocsMetadata({
  title: "Motion",
  description:
    "Reference motion tokens, spring presets, scroll-linked effects, view transitions, and reduced-motion fallbacks.",
  path: "/docs/motion",
  keywords: ["motion system", "spring physics", "view transitions", "reduced motion"]
})

export default function MotionPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Motion</h1>
        <p className="max-w-2xl text-neutral-600">
          Motion tokens provide baseline durations and easing curves, while spring physics presets add configurable
          tension, friction, and mass with deterministic settle durations.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="glass-2 rounded-2xl p-5">
          <p className="text-sm font-semibold">Fast</p>
          <p className="mt-2 text-xs text-neutral-600">var(--motion-fast)</p>
        </article>
        <article className="glass-2 rounded-2xl p-5">
          <p className="text-sm font-semibold">Normal</p>
          <p className="mt-2 text-xs text-neutral-600">var(--motion-normal)</p>
        </article>
        <article className="glass-2 rounded-2xl p-5">
          <p className="text-sm font-semibold">Slow</p>
          <p className="mt-2 text-xs text-neutral-600">var(--motion-slow)</p>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Spring Physics</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Phase 7.1 introduces configurable spring dynamics. Use preset names or pass custom
          <code className="mx-1 rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">tension</code>,
          <code className="mx-1 rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">friction</code>, and
          <code className="mx-1 rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">mass</code> values.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {springCards.map((card) => (
            <article key={card.name} className="glass-2 rounded-2xl p-5">
              <p className="text-sm font-semibold capitalize">{card.name}</p>
              <p className="mt-2 text-xs text-neutral-600">
                tension {card.config.tension} / friction {card.config.friction} / mass {card.config.mass}
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                damping {card.resolved.dampingRatio.toFixed(2)} / settle{" "}
                {Math.round(card.resolved.settlingDurationMs)}ms
              </p>
              <p className="mt-1 text-xs text-neutral-600">{card.resolved.cssEasing}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Gesture Primitives</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Use pointer-based primitives for drag, swipe, and pinch without adding runtime dependencies.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="glass-2 rounded-2xl p-5">
            <p className="text-sm font-semibold">Drag</p>
            <p className="mt-2 text-xs text-neutral-600">
              `createDragGesture` / `useDragGesture`
            </p>
          </article>
          <article className="glass-2 rounded-2xl p-5">
            <p className="text-sm font-semibold">Swipe</p>
            <p className="mt-2 text-xs text-neutral-600">
              `createSwipeGesture` / `useSwipeGesture`
            </p>
          </article>
          <article className="glass-2 rounded-2xl p-5">
            <p className="text-sm font-semibold">Pinch</p>
            <p className="mt-2 text-xs text-neutral-600">
              `createPinchGesture` / `usePinchGesture`
            </p>
          </article>
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border/60 bg-[var(--glass-2-surface)] p-4 text-xs">
          <code>{`import { createSwipeGesture } from "@glinui/motion"

const swipe = createSwipeGesture({
  axis: "x",
  onSwipe: ({ swipe }) => {
    if (!swipe) return
    console.log(swipe.direction, swipe.velocity)
  }
})

element.onpointerdown = swipe.onPointerDown
element.onpointermove = swipe.onPointerMove
element.onpointerup = swipe.onPointerUp
element.onpointercancel = swipe.onPointerCancel`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Scroll-linked Effects</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Tie blur, opacity, and transform values to scroll progress with one resolver.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {scrollSamples.map((sample) => (
            <article key={sample.scrollY} className="glass-2 rounded-2xl p-5">
              <p className="text-sm font-semibold">scrollY {sample.scrollY}px</p>
              <p className="mt-2 text-xs text-neutral-600">
                progress {sample.values.progress.toFixed(2)} / opacity {sample.values.opacity?.toFixed(2)}
              </p>
              <p className="mt-1 text-xs text-neutral-600">filter {sample.style.filter ?? "none"}</p>
              <p className="mt-1 text-xs text-neutral-600">transform {sample.style.transform ?? "none"}</p>
            </article>
          ))}
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border/60 bg-[var(--glass-2-surface)] p-4 text-xs">
          <code>{`import { createScrollLinkedEffect } from "@glinui/motion"

const heroEffect = createScrollLinkedEffect({
  start: 0,
  end: 600,
  opacity: [0.6, 1],
  blur: [12, 0],
  translateY: [32, 0]
})

const style = heroEffect.style(window.scrollY)`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">View Transitions</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Presets provide page and component enter/exit choreography with consistent opacity and transform transitions.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {resolvedTransitions.map((item) => (
            <article key={item.name} className="glass-2 rounded-2xl p-5">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="mt-2 text-xs text-neutral-600">
                enter {item.transition.enterDurationMs}ms / exit {item.transition.exitDurationMs}ms
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                {item.transition.enter.transition}
              </p>
            </article>
          ))}
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border/60 bg-[var(--glass-2-surface)] p-4 text-xs">
          <code>{`import { resolveViewTransition } from "@glinui/motion"

const transition = resolveViewTransition("pageSlide")

// Initial render style
const initialStyle = transition.initial
// Apply on mount
const enterStyle = transition.enter
// Apply before unmount
const exitStyle = transition.exit`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Stagger System</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Orchestrate list and grid choreography with deterministic stagger delays.
        </p>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {stagger.delays.map((delay, index) => (
            <article key={index} className="glass-2 rounded-xl p-3 text-center">
              <p className="text-xs font-medium">#{index + 1}</p>
              <p className="mt-1 text-[11px] text-neutral-600">{delay}ms</p>
            </article>
          ))}
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border/60 bg-[var(--glass-2-surface)] p-4 text-xs">
          <code>{`import { createStaggerSequence } from "@glinui/motion"

const stagger = createStaggerSequence({
  count: items.length,
  direction: "center-out",
  stepMs: 48,
  initialDelayMs: 40
})

const style = stagger.getStyle(index) // { transitionDelay: "..." }`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Reduced Motion</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Every motion primitive supports reduced-motion fallbacks through explicit options.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="glass-2 rounded-2xl p-5">
            <p className="text-sm font-semibold">Presets</p>
            <p className="mt-2 text-xs text-neutral-600">
              <code>resolveMotionPreset(name, {"{ reducedMotion: true }"})</code> forces 1ms linear transitions.
            </p>
          </article>
          <article className="glass-2 rounded-2xl p-5">
            <p className="text-sm font-semibold">Utilities</p>
            <p className="mt-2 text-xs text-neutral-600">
              `resolveViewTransition`, `createScrollLinkedEffect.style`, and `createStaggerSequence` each accept
              reduced-motion behavior.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Motion Playground</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Tune spring parameters and inspect derived damping, frequency, settle duration, and easing output.
        </p>
        <MotionPlayground />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Framer Motion Adapter</h2>
        <p className="max-w-2xl text-sm text-neutral-600">
          Optional adapters let you reuse Glin motion tokens with Framer Motion variants and spring transitions.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-border/60 bg-[var(--glass-2-surface)] p-4 text-xs">
          <code>{`// Optional peer
pnpm add framer-motion

import { motion } from "framer-motion"
import { toFramerSpring, toFramerVariants } from "@glinui/motion"

const variants = toFramerVariants("glassLift")
const spring = toFramerSpring("snappy")

export function Card() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={spring}
    />
  )
}`}</code>
        </pre>
      </section>
    </main>
  )
}
