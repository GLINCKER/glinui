"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Search, Sparkles } from "lucide-react"

import { CommandPalette } from "@/components/layout/command-palette"
import { DocsSidebar } from "@/components/layout/docs-sidebar"
import { DirectionSegmentedControl, DocsTopbar, ThemeSegmentedControl } from "@/components/layout/docs-topbar"
import { useDocsDirection } from "@/lib/docs-direction"

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { direction } = useDocsDirection()
  const isLandingRoute = pathname === "/"
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [commandOpen, setCommandOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen(true)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    setCommandOpen(false)
  }, [pathname])

  if (isLandingRoute) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_12%_2%,rgb(255_255_255_/_0.16),transparent_35%),radial-gradient(circle_at_88%_98%,rgb(125_211_252_/_0.18),transparent_35%),radial-gradient(circle_at_52%_40%,rgb(196_181_253_/_0.12),transparent_45%),var(--color-background)] p-2 md:p-3">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3">
          <header className="flex h-16 items-center justify-between gap-3 rounded-2xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] px-4 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1]">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] shadow-[var(--glass-4-shadow)]">
                <Sparkles className="size-4 text-foreground" />
              </span>
              <span className="text-sm font-semibold tracking-wide">Glinr UI</span>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <Link href="/docs/getting-started" className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:text-foreground">
                Getting Started
              </Link>
              <Link href="/docs/components" className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:text-foreground">
                Components
              </Link>
              <Link href="/docs/tokens" className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:text-foreground">
                Design System
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
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

          <main
            dir={direction}
            className="overflow-hidden rounded-[28px] border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-background/55 px-4 py-6 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_24px_68px_-12px_rgb(2_6_23_/_0.45)] sm:px-8 sm:py-10"
          >
            {children}
          </main>
        </div>

        <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_2%,rgb(255_255_255_/_0.16),transparent_35%),radial-gradient(circle_at_88%_98%,rgb(125_211_252_/_0.18),transparent_35%),radial-gradient(circle_at_52%_40%,rgb(196_181_253_/_0.12),transparent_45%),var(--color-background)] p-2 md:p-3">
      <DocsSidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />

      <div className="flex min-w-0 flex-1 flex-col gap-2 pl-2 md:gap-3 md:pl-3">
        <DocsTopbar onOpenCommandPalette={() => setCommandOpen(true)} />

        <main
          data-docs-scroll-root
          dir={direction}
          className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-border/50 bg-background/60 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.07)_inset,0_24px_68px_-12px_rgb(2_6_23_/_0.45),0_8px_20px_-8px_rgb(2_6_23_/_0.3)]"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</div>
        </main>
      </div>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  )
}
