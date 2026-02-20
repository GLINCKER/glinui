"use client"

import Link from "next/link"
import { useState } from "react"
import { Manrope, Space_Grotesk } from "next/font/google"
import {
  ArrowRight,
  BadgeCheck,
  Braces,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Command,
  Copy,
  Eye,
  Layers3,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Waves,
  Zap,
  type LucideIcon
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Checkbox,
  Chip,
  GlassCard,
  Input,
  Progress,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@glinui/ui"
import { DEFAULT_DOCS_IMPLEMENTATION } from "@/lib/docs-config"
import { buildComponentHref } from "@/lib/docs-route"
import {
  allComponentIds,
  primitiveComponentIds,
  primitiveTitles,
  signatureComponentIds,
  signatureTitles
} from "@/lib/primitives"

/* ── Fonts ─────────────────────────────────────────────────────────────────── */

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] })
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"] })

/* ── Static data ───────────────────────────────────────────────────────────── */

const stackShowcase = ["React 19", "Next.js 15", "Radix UI", "Tailwind CSS v4", "TypeScript", "pnpm", "Turborepo", "MDX"]

const stats = [
  { label: "Components", value: `${allComponentIds.length}+` },
  { label: "Surface Variants", value: "7" },
  { label: "Elevation Levels", value: "5" },
  { label: "Tests Passing", value: "80+" }
]

const capabilityCards: Array<{
  icon: LucideIcon
  title: string
  summary: string
  tone: string
}> = [
  {
    icon: Waves,
    title: "Liquid Glass Surfaces",
    summary: "Refraction-aware elevation, adaptive luminance, and production-ready frosted layers with SVG displacement mapping.",
    tone: "from-cyan-200/55 via-white/35 to-emerald-200/45 dark:from-cyan-500/20 dark:via-white/5 dark:to-emerald-500/20"
  },
  {
    icon: ChartNoAxesCombined,
    title: "Motion With Guardrails",
    summary: "Preset springs, stagger choreography, and reduced-motion fallbacks baked into every component.",
    tone: "from-amber-200/55 via-white/35 to-orange-200/45 dark:from-amber-500/20 dark:via-white/5 dark:to-orange-500/20"
  },
  {
    icon: ShieldCheck,
    title: "A11y + DX Baseline",
    summary: "Keyboard-first patterns, WCAG AA contrast, focus treatment, and 80+ test gates from day one.",
    tone: "from-emerald-200/55 via-white/35 to-sky-200/45 dark:from-emerald-500/20 dark:via-white/5 dark:to-sky-500/20"
  },
  {
    icon: Command,
    title: "Docs + Component Sync",
    summary: "Your docs, snippets, and primitives stay aligned across every release with registry-driven metadata.",
    tone: "from-fuchsia-200/55 via-white/35 to-violet-200/45 dark:from-fuchsia-500/20 dark:via-white/5 dark:to-violet-500/20"
  }
]

const pipeline = [
  {
    step: "01",
    title: "Install + Theme",
    detail: "Boot with tokens and glass physics in minutes, not days. One package for the full design system.",
    icon: Braces
  },
  {
    step: "02",
    title: "Compose Interfaces",
    detail: "Assemble hero, feature grids, and CTAs using the same design language as your product UI.",
    icon: Layers3
  },
  {
    step: "03",
    title: "Ship With Confidence",
    detail: "Publish with responsive behavior, reduced-motion support, and type-safe props throughout.",
    icon: Rocket
  }
]

const workspacePackages = [
  {
    name: "@glinui/ui",
    summary: `${allComponentIds.length} shipped components across primitive and signature layers.`,
    status: `${allComponentIds.length} components`
  },
  {
    name: "@glinui/tokens",
    summary: "Liquid glass color, shadow, blur, and refraction design tokens as CSS custom properties.",
    status: "Token system v2"
  },
  {
    name: "@glinui/motion",
    summary: "Reusable springs, stagger presets, and reduced-motion fallbacks for every component.",
    status: "Motion system v2"
  },
  {
    name: "@glinui/registry",
    summary: "Registry metadata layer powering the CLI install and docs integration pipeline.",
    status: "Workspace package"
  }
]

const differentiators = [
  {
    icon: Palette,
    title: "Not another Tailwind wrapper",
    description:
      "Purpose-built glass design system with 5 elevation levels, SVG refraction physics, and tokenized surfaces — not just utility class aliases."
  },
  {
    icon: ShieldCheck,
    title: "Production-first",
    description:
      "Built on Radix primitives with WCAG AA contrast, full keyboard navigation, reduced-motion fallbacks, and 80+ test gates."
  },
  {
    icon: Layers3,
    title: "One visual language",
    description:
      "Same component API and design tokens from marketing pages to product dashboards. No visual drift between teams."
  }
]

const faqData = [
  {
    q: "What is Glin UI?",
    a: "Glin UI is a glassmorphic React component library built on the Apple Liquid Glass design language. It ships 40+ components with multiple surface variants — glass, liquid, matte, glow — alongside semantic color variants and full dark mode support."
  },
  {
    q: "How does it compare to shadcn/ui?",
    a: "shadcn/ui provides unstyled Radix primitives you style yourself. Glin UI builds on the same Radix foundation but ships a complete glass design system with 7 surface variants per component, 5 elevation levels, SVG refraction physics, and production-ready token infrastructure."
  },
  {
    q: "Is it accessible?",
    a: "Yes. Every component is built on Radix UI primitives with WCAG AA contrast ratios, full keyboard navigation, screen reader support, and prefers-reduced-motion fallbacks. The test suite validates accessibility gates on every build."
  },
  {
    q: "Can I use it with my existing Tailwind project?",
    a: "Absolutely. Glin UI uses Tailwind CSS v4 with CSS custom properties. Install the packages, import the token stylesheet, and start using components alongside your existing Tailwind classes."
  },
  {
    q: "What about dark mode?",
    a: "Every component, token, and surface variant ships with full dark mode support out of the box. The glass system adapts luminance, blur intensity, and shadow depth between light and dark themes automatically."
  }
]

/* ── Page ───────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <main className={`${body.className} mx-auto max-w-[1400px] space-y-10 pb-4 sm:space-y-14 lg:space-y-20`}>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="landing-aurora relative isolate overflow-hidden rounded-[1.75rem] border border-white/25 [border-top-color:var(--glass-refraction-top)] px-4 py-8 shadow-[0_0_0_1px_rgb(255_255_255_/_0.09)_inset,var(--shadow-glass-lg)] sm:rounded-[2.25rem] sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="landing-grid-overlay pointer-events-none absolute inset-0" />
        <div className="landing-orb-a landing-float-slow absolute -left-20 top-0 hidden h-64 w-64 rounded-full blur-3xl sm:block" />
        <div className="landing-orb-b landing-float-reverse absolute -right-20 bottom-2 hidden h-72 w-72 rounded-full blur-3xl sm:block" />
        <div className="landing-orb-c landing-glow absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl sm:top-12 sm:h-48 sm:w-48" />

        <div className="relative grid gap-8 sm:gap-10 xl:grid-cols-[1.04fr_0.96fr] xl:items-center">
          <div className="space-y-6 sm:space-y-7">
            <Badge variant="glass" className="w-fit tracking-[0.1em] sm:tracking-[0.14em]">
              GLIN UI · LIQUID GLASS DESIGN SYSTEM
            </Badge>

            <div className="space-y-4">
              <h1
                className={`${display.className} max-w-4xl text-[2.2rem] leading-[0.94] sm:text-5xl lg:text-7xl`}
              >
                Build interfaces with
                <span className="block bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent dark:from-white dark:via-neutral-300 dark:to-white">
                  premium glass surfaces.
                </span>
              </h1>
              <p className="max-w-2xl text-sm text-neutral-700 sm:text-base dark:text-neutral-200">
                Glin UI ships {allComponentIds.length}+ production components with 7 surface variants, 5 glass elevation
                levels, and full dark mode — all built on Radix primitives and Tailwind CSS.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Button asChild variant="default" size="lg" className="w-full justify-center sm:w-auto">
                <Link href="/docs/getting-started">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="w-full justify-center sm:w-auto">
                <Link href="/docs/components">Explore Components</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-center sm:w-auto">
                <Link href="/docs/shadcn-alternative">Glin UI vs shadcn/ui</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-center sm:w-auto">
                <Link href="/docs/magicui-alternative">Glin UI vs Magic UI</Link>
              </Button>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3">
              {stats.slice(0, 3).map((s) => (
                <KpiChip key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </div>

          {/* ── Hero Showcase — live components ─────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-[560px] xl:mx-0">
            <GlassCard className="landing-float-slow relative overflow-hidden border-white/25 bg-white/50 p-3 shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_30px_56px_-24px_rgb(2_6_23_/_0.55)] dark:border-white/10 dark:bg-white/5 sm:p-4">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <Badge variant="glass" className="text-[10px] tracking-[0.12em]">
                  LIVE PREVIEW
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1.08fr_0.92fr]">
                {/* Left: Buttons + Badges */}
                <div className="space-y-3 rounded-2xl border border-white/20 bg-white/55 p-2.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">Surface Variants</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Button size="sm" variant="default">Default</Button>
                    <Button size="sm" variant="glass">Glass</Button>
                    <Button size="sm" variant="liquid">Liquid</Button>
                    <Button size="sm" variant="glow">Glow</Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="glass" size="sm">Glass</Badge>
                    <Badge variant="success" size="sm">Success</Badge>
                    <Badge variant="warning" size="sm">Warning</Badge>
                    <Badge variant="info" size="sm">Info</Badge>
                  </div>
                </div>

                {/* Right: Avatars + Status */}
                <div className="space-y-3 rounded-2xl border border-white/20 bg-white/55 p-2.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">Composable</p>
                  <AvatarGroup max={4} spacing="tight">
                    <Avatar fallback="AK" variant="glass" size="sm" status="online" />
                    <Avatar fallback="BL" variant="glass" size="sm" status="online" />
                    <Avatar fallback="CM" variant="glass" size="sm" status="away" />
                    <Avatar fallback="DN" variant="glass" size="sm" status="busy" />
                    <Avatar fallback="EO" variant="glass" size="sm" />
                  </AvatarGroup>
                  <Progress variant="glass" value={72} aria-label="Progress" />
                  <div className="flex items-center gap-2">
                    <Switch aria-label="Toggle" defaultChecked />
                    <span className="text-xs text-neutral-600 dark:text-neutral-300">Dark mode</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="landing-float-reverse absolute -left-3 top-8 hidden rounded-xl border border-white/20 bg-white/65 px-3 py-2 text-xs shadow-[0_16px_24px_-16px_rgb(2_6_23_/_0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:block">
              <p className="font-semibold">{allComponentIds.length}+ components</p>
              <p className="text-neutral-600 dark:text-neutral-300">Shipped in monorepo</p>
            </div>

            <div className="landing-float-slow absolute -bottom-4 right-4 hidden rounded-xl border border-white/20 bg-white/65 px-3 py-2 text-xs shadow-[0_16px_24px_-16px_rgb(2_6_23_/_0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:block">
              <p className="font-semibold">7 surface variants</p>
              <p className="text-neutral-600 dark:text-neutral-300">Per component</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/20 bg-white/45 px-4 py-3 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <p className={`${display.className} text-2xl font-bold sm:text-3xl`}>{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── Tech Stack Marquee ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">Built With</p>
          <p className="hidden text-xs text-neutral-500 dark:text-neutral-400 sm:block">
            Modern stack, zero compromise
          </p>
        </div>

        <div className="landing-marquee rounded-2xl border border-white/20 bg-white/45 py-2.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:py-3">
          <div className="landing-marquee-track">
            {[...stackShowcase, ...stackShowcase].map((logo, idx) => (
              <span
                key={`${logo}-${idx}`}
                className={`${display.className} mx-6 text-sm font-semibold tracking-[0.1em] text-neutral-700 dark:text-neutral-200`}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Component Showcase ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            What Ships
          </p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            {allComponentIds.length}+ components, every variant production-ready.
          </h2>
          <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-200">
            Every component ships with glass, liquid, matte, and glow surface variants alongside semantic color
            variants — all with full dark mode, keyboard navigation, and reduced-motion support.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {/* Buttons */}
          <ShowcaseCard title="Button" description="7 surface variants with hover lift and press squish.">
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Default</Button>
              <Button size="sm" variant="glass">Glass</Button>
              <Button size="sm" variant="liquid">Liquid</Button>
              <Button size="sm" variant="matte">Matte</Button>
              <Button size="sm" variant="glow">Glow</Button>
              <Button size="sm" variant="outline">Outline</Button>
              <Button size="sm" variant="ghost">Ghost</Button>
            </div>
          </ShowcaseCard>

          {/* Badges */}
          <ShowcaseCard title="Badge" description="Surface + semantic variants with auto-colored icons.">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="glass">Glass</Badge>
              <Badge variant="liquid">Liquid</Badge>
              <Badge variant="matte">Matte</Badge>
              <Badge variant="glow">Glow</Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </ShowcaseCard>

          {/* Avatars */}
          <ShowcaseCard title="Avatar" description="6 sizes, status indicators, and AvatarGroup with overflow.">
            <AvatarGroup max={5} spacing="normal">
              <Avatar fallback="AK" variant="glass" status="online" />
              <Avatar fallback="BL" variant="liquid" status="online" />
              <Avatar fallback="CM" variant="matte" status="away" />
              <Avatar fallback="DN" variant="glow" status="busy" />
              <Avatar fallback="EO" variant="glass" status="offline" />
              <Avatar fallback="FP" variant="glass" />
            </AvatarGroup>
            <div className="flex items-center gap-2">
              <Avatar fallback="XS" variant="glass" size="xs" />
              <Avatar fallback="SM" variant="glass" size="sm" />
              <Avatar fallback="MD" variant="glass" />
              <Avatar fallback="LG" variant="glass" size="lg" />
              <Avatar fallback="XL" variant="glass" size="xl" />
            </div>
          </ShowcaseCard>

          {/* Alerts */}
          <ShowcaseCard title="Alert" description="Glass surfaces + semantic feedback with auto-icons.">
            <Alert variant="glass" className="py-2">
              <AlertTitle className="text-xs">Glass Surface</AlertTitle>
              <AlertDescription className="text-[11px]">Frosted alert with refraction edge.</AlertDescription>
            </Alert>
            <Alert variant="success" className="py-2">
              <CheckCircle2 className="size-4" />
              <AlertTitle className="text-xs">Deployment ready</AlertTitle>
              <AlertDescription className="text-[11px]">All checks passed.</AlertDescription>
            </Alert>
          </ShowcaseCard>

          {/* Form Controls */}
          <ShowcaseCard title="Form Controls" description="Glass inputs, switches, and checkboxes.">
            <Input variant="glass" placeholder="Search components..." aria-label="Search" />
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-xs">
                <Switch aria-label="Notifications" defaultChecked />
                Notifications
              </label>
              <label className="flex items-center gap-2 text-xs">
                <Checkbox aria-label="Agree" />
                I agree
              </label>
            </div>
          </ShowcaseCard>

          {/* Data Display */}
          <ShowcaseCard title="Data Display" description="Progress, chips, tabs, and separators.">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-neutral-500 dark:text-neutral-400">Upload progress</span>
                <span className="font-medium">72%</span>
              </div>
              <Progress variant="glass" value={72} aria-label="Upload" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Chip variant="glass" size="sm">React</Chip>
              <Chip variant="glass" tone="success" size="sm">Stable</Chip>
              <Chip variant="glass" tone="warning" size="sm">Beta</Chip>
              <Chip variant="glass" tone="info" size="sm">v2.0</Chip>
              <Chip variant="outline" tone="danger" size="sm">Breaking</Chip>
            </div>
            <Tabs defaultValue="code">
              <TabsList variant="glass" className="w-full">
                <TabsTrigger value="code" variant="glass" className="flex-1 text-xs">Code</TabsTrigger>
                <TabsTrigger value="preview" variant="glass" className="flex-1 text-xs">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
          </ShowcaseCard>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/docs/components">
              View All {allComponentIds.length} Components
              <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Code Preview ───────────────────────────────────────────────────── */}
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Developer Experience
          </p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            Install. Import. Ship.
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">
            Same ergonomics as shadcn/ui but with a complete glass design system included. Every component is
            type-safe, tree-shakeable, and works with your existing Tailwind setup.
          </p>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-emerald-500" />
              Copy-paste Tailwind classes for every variant
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-emerald-500" />
              Type-safe props with full IntelliSense
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-emerald-500" />
              Tree-shakeable — only ship what you use
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-emerald-500" />
              Zero runtime CSS-in-JS — Tailwind only
            </li>
          </ul>
        </div>

        <CodePreview />
      </section>

      {/* ── Why Glin UI ────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Why Glin UI
          </p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            Not just components. A design system.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {differentiators.map((d) => (
            <GlassCard key={d.title} className="border-white/20 p-5 dark:border-white/10 sm:p-6">
              <div className="space-y-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/55 shadow-[0_10px_24px_-18px_rgb(2_6_23_/_0.55)] dark:border-white/10 dark:bg-white/10">
                  <d.icon className="size-4" />
                </span>
                <h3 className={`${display.className} text-xl`}>{d.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">{d.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── Built To Convert + Capabilities ────────────────────────────────── */}
      <section className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
        <GlassCard className="relative overflow-hidden border-white/20 p-5 dark:border-white/10 sm:p-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/15" />
          <div className="relative space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
              Built To Convert
            </p>
            <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
              A complete marketing surface, not a stack of random blocks.
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              Every section carries the same visual DNA: controlled depth, polished transitions, and copy hierarchy
              that guides people to action.
            </p>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
              <li className="flex items-start gap-2">
                <BadgeCheck className="size-4 text-emerald-500" />
                Intentional visual rhythm from hero to CTA
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="size-4 text-emerald-500" />
                Neutral dark mode states without neon hover noise
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="size-4 text-emerald-500" />
                Motion that adds clarity, not distraction
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full justify-center sm:w-auto">
              <Link href="/docs/components">See The Component Catalog</Link>
            </Button>
          </div>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2">
          {capabilityCards.map((card) => (
            <GlassCard
              key={card.title}
              className="group relative overflow-hidden border-white/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgb(2_6_23_/_0.55)] dark:border-white/10 sm:p-5"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.tone} opacity-75 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative space-y-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/55 shadow-[0_10px_24px_-18px_rgb(2_6_23_/_0.55)] dark:border-white/10 dark:bg-white/10">
                  <card.icon className="size-4" />
                </span>
                <h3 className={`${display.className} text-xl`}>{card.title}</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-200">{card.summary}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── Glass Elevation Demo ───────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Design Tokens
          </p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            5 elevation levels. Tokenized everything.
          </h2>
          <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-200">
            Every glass surface is tokenized — blur radius, surface opacity, shadow depth, and refraction intensity
            scale together across 5 elevation levels via CSS custom properties.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-5">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/20 p-4 backdrop-blur-xl dark:border-white/10"
              style={{
                backgroundColor: `var(--glass-${level}-surface)`,
                boxShadow: `var(--glass-${level}-shadow)`
              }}
            >
              <p className={`${display.className} text-2xl font-bold`}>{level}</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                Level {level}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <TokenCard label="Glass Surface" token="--glass-{1-5}-surface" description="5 opacity levels from subtle to opaque" />
          <TokenCard label="Glass Shadow" token="--glass-{1-5}-shadow" description="Depth-matched shadow at each elevation" />
          <TokenCard label="Refraction" token="--glass-refraction-top" description="Top-edge light refraction highlight" />
        </div>
      </section>

      {/* ── Pipeline ───────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">Pipeline</p>
          <h2 className={`${display.className} text-[1.9rem] leading-tight sm:text-4xl`}>
            From setup to ship, with one visual language.
          </h2>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {pipeline.map((item) => (
            <PipelineCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* ── Workspace Packages ─────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">Packages</p>
          <h2 className={`${display.className} text-[1.9rem] leading-tight sm:text-4xl`}>
            Four packages, one design system.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {workspacePackages.map((pkg) => (
            <WorkspacePackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
      </section>

      {/* ── Variant Showcase ──────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Surface System
          </p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            7 variants. One API. Every component.
          </h2>
          <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-200">
            Switch between surface styles with a single prop. Every variant is designed to work in both light and dark
            mode with consistent visual quality.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {(["default", "glass", "liquid", "matte", "glow", "outline", "ghost"] as const).map((v) => (
            <div key={v} className="space-y-2 rounded-2xl border border-white/15 bg-white/30 p-3 backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
              <p className="text-center text-[10px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">{v}</p>
              <Button variant={v} size="sm" className="w-full justify-center">
                Button
              </Button>
              <Badge variant={v === "ghost" || v === "outline" ? v : v === "default" ? "default" : v} className="mx-auto flex w-fit justify-center">
                Badge
              </Badge>
            </div>
          ))}
        </div>

        <GlassCard className="border-white/20 p-5 dark:border-white/10 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold">Semantic Variants</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">Success, warning, destructive, info — auto-colored with matching icons.</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="success" size="sm">Success</Badge>
                <Badge variant="warning" size="sm">Warning</Badge>
                <Badge variant="destructive" size="sm">Error</Badge>
                <Badge variant="info" size="sm">Info</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold">Dark Mode</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">Every variant ships with carefully tuned dark mode surfaces and shadows.</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold">Reduced Motion</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">All animations respect prefers-reduced-motion. No exceptions.</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold">Keyboard Accessible</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">Built on Radix primitives with full keyboard navigation and focus management.</p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ── Full Component Catalog ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            Component Catalog
          </p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            {primitiveComponentIds.length} primitives. {signatureComponentIds.length} signature components.
          </h2>
          <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-200">
            From low-level atoms like buttons and inputs to high-level signature components like glass navbars and
            spotlight cards — every piece of the interface is covered.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">Primitives</p>
            <div className="flex flex-wrap gap-2">
              {primitiveComponentIds.map((id) => (
                <Link
                  key={id}
                  href={buildComponentHref(id, DEFAULT_DOCS_IMPLEMENTATION)}
                  className="rounded-xl border border-white/20 bg-white/45 px-3 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_8px_20px_-12px_rgb(2_6_23_/_0.4)] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  {primitiveTitles[id]}
                </Link>
              ))}
            </div>
          </div>

          <Separator variant="glass" />

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">Signature Glass Components</p>
            <div className="flex flex-wrap gap-2">
              {signatureComponentIds.map((id) => (
                <Link
                  key={id}
                  href={buildComponentHref(id, DEFAULT_DOCS_IMPLEMENTATION)}
                  className="rounded-xl border border-white/20 bg-gradient-to-b from-white/55 to-white/35 px-3 py-1.5 text-xs font-medium shadow-[0_4px_12px_-6px_rgb(2_6_23_/_0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-12px_rgb(2_6_23_/_0.4)] dark:border-white/10 dark:from-white/10 dark:to-white/5"
                >
                  {signatureTitles[id]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="glass">
            <Link href="/docs/components">
              Browse Full Catalog
              <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Comparison ─────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            How We Compare
          </p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            Built different. On purpose.
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/20 dark:border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/30 dark:bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">Feature</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em]">Glin UI</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">shadcn/ui</th>
                <th className="hidden px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400 sm:table-cell">Others</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <ComparisonRow feature="Glass Design System" glin={true} shadcn={false} others={false} />
              <ComparisonRow feature="Surface Variants (7)" glin={true} shadcn={false} others="Partial" />
              <ComparisonRow feature="Radix Primitives" glin={true} shadcn={true} others="Varies" />
              <ComparisonRow feature="Tailwind CSS" glin={true} shadcn={true} others="Varies" />
              <ComparisonRow feature="SVG Refraction Physics" glin={true} shadcn={false} others={false} />
              <ComparisonRow feature="5 Elevation Levels" glin={true} shadcn={false} others={false} />
              <ComparisonRow feature="Semantic Color Variants" glin={true} shadcn={false} others="Partial" />
              <ComparisonRow feature="Dark Mode" glin={true} shadcn={true} others={true} />
              <ComparisonRow feature="Reduced Motion" glin={true} shadcn="Partial" others="Partial" />
              <ComparisonRow feature="Tokenized Design System" glin={true} shadcn="Partial" others="Partial" />
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Open Source ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-white/40 p-6 shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-glass-md)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-10">
        <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-400/10" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 size-56 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-400/10" />

        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <Badge variant="glass" className="w-fit tracking-[0.1em]">OPEN SOURCE</Badge>
            <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
              Free forever. MIT licensed.
            </h2>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
              Glin UI is fully open source under the MIT license. Use it in personal projects, startups, and
              enterprise products — no strings attached. Contributions welcome.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button asChild variant="default" size="lg">
                <Link href="https://github.com/GLINCKER/glinui" target="_blank" rel="noreferrer">
                  Star on GitHub
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/GLINCKER/glinui/issues" target="_blank" rel="noreferrer">
                  Report an Issue
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/50 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <p className={`${display.className} text-2xl font-bold`}>MIT</p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">License</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/50 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <p className={`${display.className} text-2xl font-bold`}>{allComponentIds.length}+</p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Components</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/50 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <p className={`${display.className} text-2xl font-bold`}>80+</p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Tests</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/50 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <p className={`${display.className} text-2xl font-bold`}>v2</p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Token System</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">FAQ</p>
          <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
            Common questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqData.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} variant="glass">
              <AccordionTrigger variant="glass" className="text-sm font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent variant="glass">
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(135deg,rgb(250_250_250_/_0.85),rgb(245_245_245_/_0.78),rgb(240_240_240_/_0.7))] p-6 shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,var(--shadow-glass-lg)] dark:bg-[linear-gradient(135deg,rgb(16_16_18_/_0.94),rgb(20_20_24_/_0.92),rgb(14_14_16_/_0.9))] sm:rounded-[2rem] sm:p-10">
        <div className="landing-orb-b landing-glow absolute -right-16 -top-10 hidden h-52 w-52 rounded-full blur-3xl sm:block" />
        <div className="landing-orb-a landing-float-reverse absolute -left-14 -bottom-16 hidden h-56 w-56 rounded-full blur-3xl sm:block" />

        <div className="relative grid gap-6 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-300">
              Ready To Ship
            </p>
            <h2 className={`${display.className} text-3xl leading-tight sm:text-4xl`}>
              Give your product the visual standard it deserves.
            </h2>
            <p className="max-w-2xl text-sm text-neutral-700 dark:text-neutral-200">
              Start with setup, pick your components, and ship production-grade interfaces with built-in
              glass surfaces, motion, and accessibility defaults.
            </p>
          </div>

          <div className="space-y-2.5">
            <Button asChild size="lg" className="w-full justify-center">
              <Link href="/docs/getting-started">
                Start Building
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="w-full justify-center">
              <Link href="/docs/components">Browse Components</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full justify-center">
              <Link href="https://github.com/GLINCKER/glinui" target="_blank" rel="noreferrer">
                View on GitHub
              </Link>
            </Button>
            <p className="inline-flex items-center gap-1.5 pt-1 text-xs text-neutral-600 dark:text-neutral-300">
              <Sparkles className="size-3.5" />
              Open source · MIT License · Made by GLINR Studios
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ── Helper Components ─────────────────────────────────────────────────────── */

function KpiChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/50 px-3 py-2 shadow-[0_10px_24px_-20px_rgb(2_6_23_/_0.55)] backdrop-blur-xl dark:border-white/[0.12] dark:bg-black/35 sm:py-2.5">
      <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">{value}</p>
    </div>
  )
}

function ShowcaseCard({
  title,
  description,
  children
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <GlassCard className="group border-white/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgb(2_6_23_/_0.5)] dark:border-white/10 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`${display.className} text-base font-semibold`}>{title}</h3>
        <Link
          href="/docs/components"
          className="text-[10px] uppercase tracking-[0.1em] text-neutral-400 transition-colors hover:text-foreground dark:text-neutral-500 dark:hover:text-white"
        >
          Docs →
        </Link>
      </div>
      <p className="mb-4 text-xs text-neutral-600 dark:text-neutral-400">{description}</p>
      <div className="space-y-3">{children}</div>
    </GlassCard>
  )
}

function CodePreview() {
  const [copied, setCopied] = useState(false)

  const installCode = "pnpm add @glinui/ui @glinui/tokens"
  const usageCode = `import { Button, Badge, Avatar } from "@glinui/ui"

export function Hero() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="glass">Get Started</Button>
      <Badge variant="success">Active</Badge>
      <Avatar status="online" fallback="GU" />
    </div>
  )
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(usageCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,0_20px_48px_-16px_rgb(2_6_23_/_0.5)] dark:border-white/10">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/95 px-4 py-2.5 dark:bg-neutral-950/95">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="size-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-400">Terminal</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code content */}
      <div className="bg-neutral-900/95 p-4 dark:bg-neutral-950/95">
        <div className="mb-4">
          <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-neutral-500">Install</p>
          <code className="text-xs text-emerald-400">
            <span className="text-neutral-500">$</span> {installCode}
          </code>
        </div>

        <Separator className="mb-4 opacity-20" />

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500">Usage</p>
          <pre className="overflow-x-auto text-xs leading-relaxed">
            <code>
              <span className="text-violet-400">import</span>
              <span className="text-neutral-300">{" { "}</span>
              <span className="text-amber-300">Button</span>
              <span className="text-neutral-300">, </span>
              <span className="text-amber-300">Badge</span>
              <span className="text-neutral-300">, </span>
              <span className="text-amber-300">Avatar</span>
              <span className="text-neutral-300">{" } "}</span>
              <span className="text-violet-400">from</span>
              <span className="text-emerald-400"> &quot;@glinui/ui&quot;</span>
              {"\n\n"}
              <span className="text-violet-400">export function</span>
              <span className="text-sky-300"> Hero</span>
              <span className="text-neutral-300">() {"{"}</span>
              {"\n"}
              <span className="text-neutral-300">{"  "}return (</span>
              {"\n"}
              <span className="text-neutral-300">{"    "}&lt;</span>
              <span className="text-sky-300">Button</span>
              <span className="text-neutral-300"> </span>
              <span className="text-amber-300">variant</span>
              <span className="text-neutral-300">=</span>
              <span className="text-emerald-400">&quot;glass&quot;</span>
              <span className="text-neutral-300">&gt;</span>
              <span className="text-neutral-100">Get Started</span>
              <span className="text-neutral-300">&lt;/</span>
              <span className="text-sky-300">Button</span>
              <span className="text-neutral-300">&gt;</span>
              {"\n"}
              <span className="text-neutral-300">{"  "})</span>
              {"\n"}
              <span className="text-neutral-300">{"}"}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

function TokenCard({
  label,
  token,
  description
}: {
  label: string
  token: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/45 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold">{label}</p>
      <code className="mt-1 block text-[11px] text-neutral-500 dark:text-neutral-400">{token}</code>
      <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300">{description}</p>
    </div>
  )
}

function PipelineCard({
  step,
  title,
  detail,
  icon: Icon
}: {
  step: string
  title: string
  detail: string
  icon: LucideIcon
}) {
  return (
    <GlassCard className="relative border-white/20 p-4 dark:border-white/10 sm:p-5">
      <div className="absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
        {step}
      </div>
      <div className="space-y-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/60 dark:border-white/10 dark:bg-white/10">
          <Icon className="size-4" />
        </span>
        <h3 className={`${display.className} text-xl`}>{title}</h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">{detail}</p>
      </div>
    </GlassCard>
  )
}

function WorkspacePackageCard({
  name,
  summary,
  status
}: {
  name: string
  summary: string
  status: string
}) {
  return (
    <GlassCard className="h-full border-white/20 p-4 dark:border-white/10 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className={`${display.className} text-lg`}>{name}</p>
        <Avatar fallback={name.split("/").at(-1)?.slice(0, 2).toUpperCase() ?? "PK"} size="sm" variant="glass" />
      </div>
      <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-200">{summary}</p>
      <div className="mt-3">
        <Badge variant="glass" className="text-[11px] tracking-[0.08em]">
          {status}
        </Badge>
      </div>
    </GlassCard>
  )
}

function ComparisonRow({
  feature,
  glin,
  shadcn,
  others
}: {
  feature: string
  glin: boolean | string
  shadcn: boolean | string
  others: boolean | string
}) {
  const renderCell = (value: boolean | string) => {
    if (value === true) return <Check className="mx-auto size-4 text-emerald-500" />
    if (value === false) return <span className="block text-center text-neutral-400 dark:text-neutral-500">—</span>
    return <span className="block text-center text-xs text-neutral-500 dark:text-neutral-400">{value}</span>
  }

  return (
    <tr className="bg-white/20 dark:bg-white/[0.02]">
      <td className="px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-200">{feature}</td>
      <td className="px-4 py-2.5">{renderCell(glin)}</td>
      <td className="px-4 py-2.5">{renderCell(shadcn)}</td>
      <td className="hidden px-4 py-2.5 sm:table-cell">{renderCell(others)}</td>
    </tr>
  )
}
