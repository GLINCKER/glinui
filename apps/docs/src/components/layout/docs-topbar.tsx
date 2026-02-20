"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ArrowLeftRight, Github, Laptop, Moon, Search, Sun } from "lucide-react"

import { useDocsDirection } from "@/lib/docs-direction"
import { componentTitles } from "@/lib/primitives"
import { useTheme } from "next-themes"

type DocsTopbarProps = {
  onOpenCommandPalette: () => void
}

type ToggleControlProps = {
  compact?: boolean
}

export function DocsTopbar({ onOpenCommandPalette }: DocsTopbarProps) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="flex h-14 items-center justify-between gap-3 rounded-2xl border border-border/50 bg-[var(--glass-3-surface)] px-4 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)]">
      <div className="min-w-0 flex items-center gap-2.5">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <span className="hidden h-3.5 w-px bg-neutral-300 dark:bg-neutral-600 sm:block" />
        <Link
          href="https://glincker.com"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 text-[11px] text-neutral-500 transition-colors hover:text-foreground dark:text-neutral-400 sm:inline-flex"
        >
          A GLINR Product
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white"
          aria-label="Open command palette"
        >
          <Search className="size-3.5" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="rounded border border-border/60 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>

        <ThemeSegmentedControl />
        <DirectionSegmentedControl />

        <Link
          href="https://github.com/GLINCKER/glinui"
          target="_blank"
          rel="noreferrer"
          className="inline-flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white"
          aria-label="Open GitHub"
        >
          <Github className="size-4" />
        </Link>
      </div>
    </header>
  )
}

export function DirectionSegmentedControl() {
  return <DirectionToggle compact />
}

export function DirectionToggle({ compact = false }: ToggleControlProps) {
  const { direction, setDirection } = useDocsDirection()
  const isRtl = direction === "rtl"

  return (
    <button
      type="button"
      onClick={() => setDirection(isRtl ? "ltr" : "rtl")}
      className={
        compact
          ? "inline-flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white"
          : "inline-flex h-9 items-center gap-1.5 rounded-xl border border-border/60 bg-background/40 px-2.5 text-xs text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white"
      }
      aria-label={`Switch direction to ${isRtl ? "LTR" : "RTL"}`}
      title={`Direction: ${isRtl ? "RTL" : "LTR"}`}
    >
      <ArrowLeftRight className="size-3.5" />
      {!compact ? <span className="font-medium">{isRtl ? "RTL" : "LTR"}</span> : null}
    </button>
  )
}

export function ThemeSegmentedControl() {
  return <ThemeToggle compact />
}

export function ThemeToggle({ compact = false }: ToggleControlProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = (mounted ? theme : "system") as "light" | "system" | "dark"
  const order: Array<"light" | "system" | "dark"> = ["light", "system", "dark"]
  const nextTheme = order[(order.indexOf(activeTheme) + 1) % order.length]
  const iconByTheme = {
    light: Sun,
    system: Laptop,
    dark: Moon
  } as const
  const labelByTheme = {
    light: "Light",
    system: "System",
    dark: "Dark"
  } as const
  const Icon = iconByTheme[activeTheme]

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className={
        compact
          ? "inline-flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white"
          : "inline-flex h-9 items-center gap-1.5 rounded-xl border border-border/60 bg-background/40 px-2.5 text-xs text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white"
      }
      aria-label={`Current theme ${labelByTheme[activeTheme]}. Switch to ${labelByTheme[nextTheme]}`}
      title={`Theme: ${labelByTheme[activeTheme]}`}
    >
      <Icon className="size-3.5" />
      {!compact ? <span className="font-medium">{labelByTheme[activeTheme]}</span> : null}
    </button>
  )
}

function getPageTitle(pathname: string) {
  if (pathname === "/") {
    return "Overview"
  }

  if (pathname === "/docs/getting-started") {
    return "Getting Started"
  }

  if (pathname === "/docs") {
    return "Documentation Overview"
  }

  if (pathname === "/docs/accessibility") {
    return "Accessibility Hub"
  }

  if (pathname === "/docs/forms-accessibility") {
    return "Forms Accessibility"
  }

  if (pathname === "/docs/forms-recipes") {
    return "Form Recipes"
  }

  if (pathname === "/docs/screen-reader-testing") {
    return "Screen Reader Testing"
  }

  if (pathname === "/docs/focus-management") {
    return "Focus Management"
  }

  if (pathname === "/docs/color-contrast") {
    return "Color Contrast"
  }

  if (pathname === "/docs/components") {
    return "Components"
  }

  if (pathname === "/docs/shadcn-alternative") {
    return "Glin UI vs shadcn/ui"
  }

  if (pathname === "/docs/magicui-alternative") {
    return "Glin UI vs Magic UI"
  }

  if (pathname === "/docs/radix-ui-components") {
    return "Radix UI Components"
  }

  if (pathname === "/docs/glassmorphism-react-components") {
    return "Glassmorphism React"
  }

  if (pathname.startsWith("/docs/components/")) {
    const segments = pathname.split("/").filter(Boolean)
    const maybeId = segments[3] ?? segments[2]
    const id = maybeId as keyof typeof componentTitles
    return componentTitles[id] ?? "Component"
  }

  if (pathname === "/docs/tokens") {
    return "Design Tokens"
  }

  if (pathname === "/docs/api-metadata") {
    return "API Metadata"
  }

  if (pathname === "/docs/glass-physics") {
    return "Glass Physics"
  }

  if (pathname === "/docs/motion") {
    return "Motion"
  }

  return "Glin UI"
}
