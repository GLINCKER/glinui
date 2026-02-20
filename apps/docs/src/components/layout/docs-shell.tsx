"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ExternalLink, Github, Menu, Search, Twitter, X } from "lucide-react"

import { Button } from "@glinui/ui"
import { CommandPalette } from "@/components/layout/command-palette"
import { DocsSidebar } from "@/components/layout/docs-sidebar"
import { DirectionSegmentedControl, DocsTopbar, ThemeSegmentedControl } from "@/components/layout/docs-topbar"
import { useDocsDirection } from "@/lib/docs-direction"

const navLinkClass =
  "rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-white/10 hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"

function GlinLogo({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 ${className ?? ""}`} style={{ width: size, height: size }}>
      <Image
        src="/glincker-logo.png"
        alt="Glin UI"
        width={size}
        height={size}
        unoptimized
        className="rounded-lg dark:hidden"
      />
      <Image
        src="/glincker-logo.png"
        alt="Glin UI"
        width={size}
        height={size}
        unoptimized
        className="hidden rounded-lg invert dark:block"
      />
    </span>
  )
}

function NavDropdown({
  label,
  items,
}: {
  label: string
  items: { href: string; label: string }[]
}) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close dropdown on route change
  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 150)
  }

  const isActive = items.some((item) => pathname.startsWith(item.href))

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`${navLinkClass} inline-flex items-center gap-1 ${isActive ? "text-foreground dark:text-white" : ""}`}
      >
        {label}
        <ChevronDown
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 z-50 mt-1.5 min-w-[200px] rounded-xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] p-1.5 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_16px_48px_-8px_rgb(2_6_23_/_0.4)] dark:border-white/[0.1]"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10 ${
                pathname === item.href
                  ? "text-foreground dark:text-white"
                  : "text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { direction } = useDocsDirection()
  const isLandingRoute = pathname === "/"
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

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
    setMobileMenuOpen(false)
  }, [pathname])

  if (isLandingRoute) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_12%_4%,rgb(255_255_255_/_0.18),transparent_34%),radial-gradient(circle_at_90%_96%,rgb(125_211_252_/_0.2),transparent_36%),radial-gradient(circle_at_52%_44%,rgb(167_243_208_/_0.14),transparent_42%),var(--color-background)] p-2 md:p-3">
        <div className="flex min-h-[calc(100vh-1rem)] w-full flex-col gap-3">
          <header className="sticky top-2 z-40 rounded-2xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] px-2.5 py-2 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] sm:px-4 sm:py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-3">
                <Link href="/" className="group inline-flex items-center gap-2.5">
                  <GlinLogo size={32} className="transition-transform duration-300 group-hover:scale-105" />
                  <div className="flex flex-col">
                    <p className="text-sm font-bold tracking-wide">Glin UI</p>
                    <span className="hidden text-[10px] leading-none text-neutral-500 dark:text-neutral-400 sm:block">
                      Liquid Glass
                    </span>
                  </div>
                </Link>
                <span className="hidden h-5 w-px bg-neutral-300/50 dark:bg-neutral-600/50 md:block" />
                <Link
                  href="https://glincker.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-neutral-500 transition-colors hover:text-foreground dark:text-neutral-400 md:inline-flex"
                >
                  by GLINR
                  <ExternalLink className="size-2.5" />
                </Link>
              </div>

              <nav className="hidden items-center gap-1 lg:flex">
                <Link href="/docs/getting-started" className={navLinkClass}>
                  Docs
                </Link>
                <Link href="/docs/components" className={navLinkClass}>
                  Components
                </Link>
                <NavDropdown
                  label="Design"
                  items={[
                    { href: "/docs/tokens", label: "Tokens" },
                    { href: "/docs/glass-physics", label: "Glass Physics" },
                    { href: "/docs/motion", label: "Motion" },
                    { href: "/docs/api-metadata", label: "API Metadata" },
                  ]}
                />
                <NavDropdown
                  label="Guides"
                  items={[
                    { href: "/docs/accessibility", label: "Accessibility" },
                    { href: "/docs/forms-accessibility", label: "Forms Accessibility" },
                    { href: "/docs/forms-recipes", label: "Form Recipes" },
                    { href: "/docs/focus-management", label: "Focus Management" },
                    { href: "/docs/color-contrast", label: "Color Contrast" },
                    { href: "/docs/glassmorphism-react-components", label: "Glassmorphism" },
                    { href: "/docs/screen-reader-testing", label: "Screen Reader Testing" },
                  ]}
                />
                <NavDropdown
                  label="Compare"
                  items={[
                    { href: "/docs/shadcn-alternative", label: "vs shadcn/ui" },
                    { href: "/docs/magicui-alternative", label: "vs Magic UI" },
                    { href: "/docs/radix-ui-components", label: "Radix UI Components" },
                  ]}
                />
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

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300 dark:hover:text-white lg:hidden"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <nav className="mt-2 border-t border-white/10 pt-3 lg:hidden dark:border-white/[0.06]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Link href="/docs/getting-started" className={`block ${navLinkClass}`}>Docs</Link>
                    <Link href="/docs/components" className={`block ${navLinkClass}`}>Components</Link>
                  </div>

                  <div className="space-y-1">
                    <p className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">Design</p>
                    <Link href="/docs/tokens" className={`block ${navLinkClass}`}>Tokens</Link>
                    <Link href="/docs/glass-physics" className={`block ${navLinkClass}`}>Glass Physics</Link>
                    <Link href="/docs/motion" className={`block ${navLinkClass}`}>Motion</Link>
                    <Link href="/docs/api-metadata" className={`block ${navLinkClass}`}>API Metadata</Link>
                  </div>

                  <div className="space-y-1">
                    <p className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">Guides</p>
                    <Link href="/docs/accessibility" className={`block ${navLinkClass}`}>Accessibility</Link>
                    <Link href="/docs/forms-accessibility" className={`block ${navLinkClass}`}>Forms Accessibility</Link>
                    <Link href="/docs/forms-recipes" className={`block ${navLinkClass}`}>Form Recipes</Link>
                    <Link href="/docs/focus-management" className={`block ${navLinkClass}`}>Focus Management</Link>
                    <Link href="/docs/color-contrast" className={`block ${navLinkClass}`}>Color Contrast</Link>
                    <Link href="/docs/glassmorphism-react-components" className={`block ${navLinkClass}`}>Glassmorphism</Link>
                    <Link href="/docs/screen-reader-testing" className={`block ${navLinkClass}`}>Screen Reader Testing</Link>
                  </div>

                  <div className="space-y-1">
                    <p className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">Compare</p>
                    <Link href="/docs/shadcn-alternative" className={`block ${navLinkClass}`}>vs shadcn/ui</Link>
                    <Link href="/docs/magicui-alternative" className={`block ${navLinkClass}`}>vs Magic UI</Link>
                    <Link href="/docs/radix-ui-components" className={`block ${navLinkClass}`}>Radix UI Components</Link>
                  </div>
                </div>
              </nav>
            )}
          </header>

          <main
            dir={direction}
            className="flex-1 overflow-hidden rounded-[30px] border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-background/55 px-4 py-6 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_28px_72px_-16px_rgb(2_6_23_/_0.46)] sm:px-8 sm:py-10 lg:px-12 xl:px-16 2xl:px-20"
          >
            {children}
          </main>

          <footer className="rounded-2xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] px-5 py-10 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] sm:px-8 sm:py-12">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
              <div className="space-y-4">
                <Link href="/" className="inline-flex items-center gap-2.5">
                  <GlinLogo size={32} />
                  <div>
                    <p className="text-sm font-bold tracking-wide">Glin UI</p>
                    <span className="text-[10px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">by GLINR</span>
                  </div>
                </Link>
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

              <FooterColumn title="Product">
                <FooterLink href="/docs/getting-started">Getting Started</FooterLink>
                <FooterLink href="/docs/components">Components</FooterLink>
                <FooterLink href="/docs/tokens">Design Tokens</FooterLink>
                <FooterLink href="/docs/motion">Motion</FooterLink>
                <FooterLink href="/docs/glass-physics">Glass Physics</FooterLink>
              </FooterColumn>

              <FooterColumn title="Guides">
                <FooterLink href="/docs/accessibility">Accessibility</FooterLink>
                <FooterLink href="/docs/forms-accessibility">Forms A11y</FooterLink>
                <FooterLink href="/docs/forms-recipes">Form Recipes</FooterLink>
                <FooterLink href="/docs/focus-management">Focus Management</FooterLink>
                <FooterLink href="/docs/color-contrast">Color Contrast</FooterLink>
              </FooterColumn>

              <FooterColumn title="Compare">
                <FooterLink href="/docs/shadcn-alternative">vs shadcn/ui</FooterLink>
                <FooterLink href="/docs/magicui-alternative">vs Magic UI</FooterLink>
                <FooterLink href="/docs/radix-ui-components">Radix UI</FooterLink>
                <FooterLink href="/docs/glassmorphism-react-components">Glassmorphism</FooterLink>
              </FooterColumn>

              <FooterColumn title="Resources">
                <FooterLink href="https://github.com/GLINCKER/glinui" external>GitHub</FooterLink>
                <FooterLink href="https://github.com/GLINCKER/glinui/releases" external>Changelog</FooterLink>
                <FooterLink href="https://github.com/GLINCKER/glinui/blob/main/LICENSE" external>MIT License</FooterLink>
                <FooterLink href="https://glincker.com" external>Glincker</FooterLink>
              </FooterColumn>
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

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">{title}</p>
      {children}
    </div>
  )
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="block text-[13px] text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-300"
    >
      {children}
    </Link>
  )
}
