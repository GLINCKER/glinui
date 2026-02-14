"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { ArrowLeftRight, Github, Laptop, Moon, Search, Sun } from "lucide-react"

import { cn } from "@glinr/ui"
import { useDocsDirection } from "@/lib/docs-direction"
import { primitiveTitles } from "@/lib/primitives"
import { useTheme } from "next-themes"

type DocsTopbarProps = {
  onOpenCommandPalette: () => void
}

export function DocsTopbar({ onOpenCommandPalette }: DocsTopbarProps) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="flex h-14 items-center justify-between gap-3 rounded-2xl border border-border/50 bg-[var(--glass-3-surface)] px-4 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)]">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <p className="truncate text-xs text-neutral-500">ui.glinr.com</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:text-foreground"
          aria-label="Open command palette"
        >
          <Search className="size-3.5" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="rounded border border-border/60 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>

        <ThemeSegmentedControl />
        <DirectionSegmentedControl />

        <Link
          href="https://github.com/glinr/open-ui"
          target="_blank"
          rel="noreferrer"
          className="inline-flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-neutral-600 transition-colors hover:text-foreground"
          aria-label="Open GitHub"
        >
          <Github className="size-4" />
        </Link>
      </div>
    </header>
  )
}

export function DirectionSegmentedControl() {
  const { direction, setDirection } = useDocsDirection()

  return (
    <div className="inline-flex rounded-xl border border-border/60 bg-background/40 p-1">
      <button
        type="button"
        onClick={() => setDirection("ltr")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs transition-colors",
          direction === "ltr"
            ? "bg-[var(--glass-4-surface)] text-foreground shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset]"
            : "text-neutral-600 hover:text-foreground"
        )}
        aria-pressed={direction === "ltr"}
      >
        <ArrowLeftRight className="size-3.5" />
        <span className="hidden md:inline">LTR</span>
      </button>
      <button
        type="button"
        onClick={() => setDirection("rtl")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs transition-colors",
          direction === "rtl"
            ? "bg-[var(--glass-4-surface)] text-foreground shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset]"
            : "text-neutral-600 hover:text-foreground"
        )}
        aria-pressed={direction === "rtl"}
      >
        <ArrowLeftRight className="size-3.5" />
        <span className="hidden md:inline">RTL</span>
      </button>
    </div>
  )
}

export function ThemeSegmentedControl() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = mounted ? theme : "system"

  return (
    <div className="inline-flex rounded-xl border border-border/60 bg-background/40 p-1">
      <ThemePill
        active={activeTheme === "light"}
        label="Light"
        icon={Sun}
        onClick={() => setTheme("light")}
      />
      <ThemePill
        active={activeTheme === "system"}
        label="System"
        icon={Laptop}
        onClick={() => setTheme("system")}
      />
      <ThemePill
        active={activeTheme === "dark"}
        label="Dark"
        icon={Moon}
        onClick={() => setTheme("dark")}
      />
    </div>
  )
}

function ThemePill({
  active,
  label,
  icon: Icon,
  onClick
}: {
  active: boolean
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs transition-colors",
        active
          ? "bg-[var(--glass-4-surface)] text-foreground shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset]"
          : "text-neutral-600 hover:text-foreground"
      )}
      aria-pressed={active}
    >
      <Icon className="size-3.5" />
      <span className="hidden md:inline">{label}</span>
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

  if (pathname === "/docs/components") {
    return "Components"
  }

  if (pathname.startsWith("/docs/components/")) {
    const segments = pathname.split("/").filter(Boolean)
    const maybeId = segments[3] ?? segments[2]
    const id = maybeId as keyof typeof primitiveTitles
    return primitiveTitles[id] ?? "Component"
  }

  if (pathname === "/docs/tokens") {
    return "Design Tokens"
  }

  if (pathname === "/docs/glass-physics") {
    return "Glass Physics"
  }

  if (pathname === "/docs/motion") {
    return "Motion"
  }

  return "Glinr UI"
}
