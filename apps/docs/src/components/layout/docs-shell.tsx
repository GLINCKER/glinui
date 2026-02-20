"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ExternalLink, Github, Search, Sparkles, Twitter } from "lucide-react"

import { Button } from "@glinui/ui"
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
      <div className="min-h-screen bg-[radial-gradient(circle_at_12%_4%,rgb(255_255_255_/_0.18),transparent_34%),radial-gradient(circle_at_90%_96%,rgb(125_211_252_/_0.2),transparent_36%),radial-gradient(circle_at_52%_44%,rgb(167_243_208_/_0.14),transparent_42%),var(--color-background)] p-2 md:p-3">
        <div className="flex min-h-[calc(100vh-1rem)] w-full flex-col gap-3">
          <header className="sticky top-2 z-40 rounded-2xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] px-2.5 py-2 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] sm:px-4 sm:py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <Link href="/" className="inline-flex items-center gap-2.5">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] shadow-[var(--glass-4-shadow)]">
                    <Sparkles className="size-4 text-foreground" />
                  </span>
                  <p className="text-sm font-semibold tracking-wide">Glin UI</p>
                </Link>
                <span className="hidden h-4 w-px bg-neutral-300 dark:bg-neutral-600 sm:block" />
                <Link
                  href="https://glincker.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-1 text-[11px] text-neutral-500 transition-colors hover:text-foreground dark:text-neutral-400 sm:inline-flex"
                >
                  A GLINR Product
                  <ExternalLink className="size-2.5" />
                </Link>
              </div>

              <nav className="hidden items-center gap-1.5 lg:flex">
                <Link href="/docs" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Docs
                </Link>
                <Link href="/docs/getting-started" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Getting Started
                </Link>
                <Link href="/docs/components" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Components
                </Link>
                <Link href="/docs/forms-accessibility" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Forms A11y
                </Link>
                <Link href="/docs/forms-recipes" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Form Recipes
                </Link>
                <Link href="/docs/accessibility" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Accessibility
                </Link>
                <Link href="/docs/screen-reader-testing" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  A11y QA
                </Link>
                <Link href="/docs/focus-management" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Focus
                </Link>
                <Link href="/docs/color-contrast" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Contrast
                </Link>
                <Link href="/docs/tokens" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Tokens
                </Link>
                <Link href="/docs/api-metadata" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  API Metadata
                </Link>
                <Link href="/docs/motion" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Motion
                </Link>
                <Link href="/docs/glass-physics" className="rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Glass Physics
                </Link>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCommandOpen(true)}
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-xs text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white sm:h-9 sm:w-auto sm:gap-1.5 sm:px-2"
                  aria-label="Open command palette"
                >
                  <Search className="size-3.5" />
                  <span className="hidden 2xl:inline">Search</span>
                  <kbd className="hidden rounded border border-border/60 px-1.5 py-0.5 text-[10px] 2xl:inline">⌘K</kbd>
                </button>

                <ThemeSegmentedControl />
                <div className="hidden sm:block">
                  <DirectionSegmentedControl />
                </div>

                <Link
                  href="https://github.com/GLINCKER/glinui"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden size-9 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white sm:inline-flex"
                  aria-label="Open GitHub"
                >
                  <Github className="size-4" />
                </Link>

                <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
                  <Link href="/docs/components">Open Docs</Link>
                </Button>
              </div>
            </div>
          </header>

          <main
            dir={direction}
            className="flex-1 overflow-hidden rounded-[30px] border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-background/55 px-4 py-6 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_28px_72px_-16px_rgb(2_6_23_/_0.46)] sm:px-8 sm:py-10 lg:px-12 xl:px-16 2xl:px-20"
          >
            {children}
          </main>

          <footer className="rounded-2xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] px-5 py-10 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] sm:px-8 sm:py-12">
            <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
              <div className="space-y-5">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] shadow-[var(--glass-4-shadow)]">
                    <Sparkles className="size-4 text-foreground" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-wide">Glin UI</p>
                    <Link
                      href="https://glincker.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] uppercase tracking-[0.1em] text-neutral-500 transition-colors hover:text-foreground dark:text-neutral-400"
                    >
                      A GLINR Product
                    </Link>
                  </div>
                </div>
                <p className="max-w-xs text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                  Liquid-glass component library for React. Glass surfaces, motion systems, and accessible primitives — production-ready.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="https://github.com/GLINCKER/glinui"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-neutral-500 transition-colors hover:bg-white/[0.12] hover:text-foreground dark:border-white/[0.08]"
                    aria-label="GitHub"
                  >
                    <Github className="size-3.5" />
                  </Link>
                  <Link
                    href="https://x.com/glincker"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-neutral-500 transition-colors hover:bg-white/[0.12] hover:text-foreground dark:border-white/[0.08]"
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="size-3.5" />
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">Product</p>
                <Link href="/docs/getting-started" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Getting Started</Link>
                <Link href="/docs/components" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Components</Link>
                <Link href="/docs/tokens" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Design Tokens</Link>
                <Link href="/docs/motion" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Motion</Link>
                <Link href="/docs/glass-physics" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Glass Physics</Link>
                <Link href="/docs/api-metadata" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">API Metadata</Link>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">Accessibility</p>
                <Link href="/docs/accessibility" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Accessibility Hub</Link>
                <Link href="/docs/forms-accessibility" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Forms A11y</Link>
                <Link href="/docs/forms-recipes" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Form Recipes</Link>
                <Link href="/docs/screen-reader-testing" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Screen Readers</Link>
                <Link href="/docs/focus-management" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Focus Management</Link>
                <Link href="/docs/color-contrast" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Color Contrast</Link>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">Resources</p>
                <Link href="https://github.com/GLINCKER/glinui" target="_blank" rel="noreferrer" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">GitHub</Link>
                <Link href="https://github.com/GLINCKER/glinui/releases" target="_blank" rel="noreferrer" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Changelog</Link>
                <Link href="https://github.com/GLINCKER/glinui/blob/main/LICENSE" target="_blank" rel="noreferrer" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">MIT License</Link>
                <Link href="https://github.com/GLINCKER/glinui/issues" target="_blank" rel="noreferrer" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Report an Issue</Link>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">Company</p>
                <Link href="https://glincker.com" target="_blank" rel="noreferrer" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Glincker</Link>
                <Link href="https://glincker.com" target="_blank" rel="noreferrer" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">GLINR Studios</Link>
                <Link href="https://glincker.com/careers" target="_blank" rel="noreferrer" className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300">Careers</Link>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 dark:border-white/[0.06] sm:flex-row sm:justify-between">
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                © {new Date().getFullYear()} Glincker LLC. All rights reserved.
              </p>
              <Link
                href="https://glincker.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 transition-colors hover:text-foreground dark:text-neutral-400"
              >
                A GLINR Product
                <ExternalLink className="size-2.5" />
              </Link>
            </div>
          </footer>
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
