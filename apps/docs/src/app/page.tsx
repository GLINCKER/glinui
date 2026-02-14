"use client"

import Link from "next/link"

import {
  Badge,
  Button,
  GlassCard,
  GlassCardContent,
  GlassCardFooter,
  GlassCardHeader,
  LiquidButton,
  MagneticCTA,
  SpotlightCard
} from "@glinr/ui"

export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-[var(--glass-3-surface)] px-6 py-10 shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-elevated)] sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-28 top-8 h-56 w-56 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative max-w-3xl space-y-5">
          <Badge variant="glass" className="w-fit">Glinr UI</Badge>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Liquid Glass Components for React</h1>
          <p className="max-w-2xl text-sm text-neutral-600 sm:text-base">
            Production-ready primitives and signature glass components built for modern interfaces, motion, and
            accessibility.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <LiquidButton asChild variant="liquid" intensity="strong">
              <Link href="/docs/getting-started">Get Started</Link>
            </LiquidButton>
            <Button asChild variant="glass">
              <Link href="/docs/components">Browse Components</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold">Featured Components</h2>
          <p className="text-sm text-neutral-600">Signature building blocks with layered glass styling and motion.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <GlassCard>
            <GlassCardHeader>
              <h3 className="text-sm font-semibold">LiquidButton</h3>
            </GlassCardHeader>
            <GlassCardContent>
              <LiquidButton
                variant="liquid"
                intensity="strong"
              >
                Primary action
              </LiquidButton>
            </GlassCardContent>
            <GlassCardFooter>
              <p className="text-xs text-neutral-600">Fluid hover lift + press squish.</p>
            </GlassCardFooter>
          </GlassCard>

          <SpotlightCard>
            <GlassCardHeader>
              <h3 className="text-sm font-semibold">SpotlightCard</h3>
            </GlassCardHeader>
            <GlassCardContent>
              <p className="text-sm text-neutral-600">Move your cursor across this card.</p>
            </GlassCardContent>
            <GlassCardFooter>
              <p className="text-xs text-neutral-600">Cursor-tracked radial spotlight effect.</p>
            </GlassCardFooter>
          </SpotlightCard>

          <GlassCard>
            <GlassCardHeader>
              <h3 className="text-sm font-semibold">MagneticCTA</h3>
            </GlassCardHeader>
            <GlassCardContent>
              <MagneticCTA
                variant="outline"
                className="border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] backdrop-blur-xl"
              >
                Launch now
              </MagneticCTA>
            </GlassCardContent>
            <GlassCardFooter>
              <p className="text-xs text-neutral-600">Cursor-attraction capped to subtle offset.</p>
            </GlassCardFooter>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader>
              <h3 className="text-sm font-semibold">GlassCard</h3>
            </GlassCardHeader>
            <GlassCardContent>
              <p className="text-sm text-neutral-600">Base surface with refraction border and elevation transitions.</p>
            </GlassCardContent>
            <GlassCardFooter>
              <p className="text-xs text-neutral-600">Composed as header, content, and footer.</p>
            </GlassCardFooter>
          </GlassCard>
        </div>
      </section>
    </main>
  )
}
