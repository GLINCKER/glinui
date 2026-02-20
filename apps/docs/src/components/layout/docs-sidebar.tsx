"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import Image from "next/image"
import {
  ArrowLeftRight,
  BookOpen,
  Boxes,
  Gem,
  Palette,
  PanelLeft,
  PanelLeftClose,
  Shield
} from "lucide-react"

import { cn } from "@glinui/ui"
import {
  primitiveComponentIds,
  primitiveMaturity,
  primitiveTitles,
  signatureComponentIds,
  signatureTitles,
  type PrimitiveComponentId,
  type SignatureComponentId
} from "@/lib/primitives"
import { buildComponentHref, getImplementationFromPath } from "@/lib/docs-route"

type DocsSidebarProps = {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

type NavItem = { href: string; label: string }

const gettingStartedItems: NavItem[] = [
  { href: "/docs", label: "Docs Overview" },
  { href: "/docs/getting-started", label: "Introduction" },
  { href: "/docs/directory", label: "Directory" }
]

const accessibilityItems: NavItem[] = [
  { href: "/docs/accessibility", label: "Accessibility Hub" },
  { href: "/docs/forms-accessibility", label: "Forms Accessibility" },
  { href: "/docs/forms-recipes", label: "Form Recipes" },
  { href: "/docs/screen-reader-testing", label: "Screen Reader Testing" },
  { href: "/docs/focus-management", label: "Focus Management" },
  { href: "/docs/color-contrast", label: "Color Contrast" }
]

const designSystemItems: NavItem[] = [
  { href: "/docs/tokens", label: "Tokens" },
  { href: "/docs/glass-physics", label: "Glass Physics" },
  { href: "/docs/motion", label: "Motion" },
  { href: "/docs/api-metadata", label: "API Metadata" }
]

const compareItems: NavItem[] = [
  { href: "/docs/shadcn-alternative", label: "vs shadcn/ui" },
  { href: "/docs/magicui-alternative", label: "vs Magic UI" },
  { href: "/docs/radix-ui-components", label: "Radix UI Components" },
  { href: "/docs/glassmorphism-react-components", label: "Glassmorphism React" }
]

const SIDEBAR_SCROLL_KEY = "glinui-sidebar-scroll"

export function DocsSidebar({ collapsed, onCollapsedChange }: DocsSidebarProps) {
  const pathname = usePathname()
  const normalizedPathname = normalizePath(pathname)
  const implementation = getImplementationFromPath(pathname)

  const navRef = React.useRef<HTMLElement>(null)
  const scrollPosRef = React.useRef(0)
  const hasMountedRef = React.useRef(false)
  const isRestoringRef = React.useRef(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)")
    const sync = () => onCollapsedChange(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [onCollapsedChange])

  // First mount (including full page reload): restore scroll position.
  // Uses sessionStorage so the position survives reloads, with a
  // requestAnimationFrame to ensure the flex layout is fully computed.
  React.useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    isRestoringRef.current = true

    const raf = requestAnimationFrame(() => {
      let restored = false
      try {
        const saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY)
        if (saved != null) {
          const pos = Number(saved)
          if (Number.isFinite(pos) && pos > 0) {
            nav.scrollTop = pos
            scrollPosRef.current = pos
            restored = true
          }
        }
      } catch {
        // sessionStorage unavailable (private browsing, etc.)
      }

      if (!restored) {
        const activeLink = nav.querySelector<HTMLElement>('[data-active="true"]')
        if (activeLink) {
          activeLink.scrollIntoView({ block: "nearest", behavior: "instant" })
          scrollPosRef.current = nav.scrollTop
        }
      }

      hasMountedRef.current = true
      isRestoringRef.current = false
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  // Client-side navigations: restore scroll position from in-memory ref.
  React.useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav || !hasMountedRef.current) return
    nav.scrollTop = scrollPosRef.current
  })

  // Track scroll — skip events during programmatic restoration.
  const handleScroll = React.useCallback((e: React.UIEvent<HTMLElement>) => {
    if (isRestoringRef.current) return
    const pos = e.currentTarget.scrollTop
    scrollPosRef.current = pos
    try {
      sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(pos))
    } catch {
      // sessionStorage unavailable
    }
  }, [])

  if (collapsed) {
    return (
      <aside className={cn(sidebarSurface, "w-[3.5rem]")}>
        <header className="flex h-12 items-center justify-center border-b border-white/10 dark:border-white/[0.06]">
          <button
            type="button"
            onClick={() => onCollapsedChange(false)}
            className="inline-flex size-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-white/[0.06] hover:text-foreground"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="size-4" />
          </button>
        </header>
      </aside>
    )
  }

  return (
    <aside className={cn(sidebarSurface, "w-64")}>
      <header className="flex h-12 items-center justify-between border-b border-white/10 px-3 dark:border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative inline-flex shrink-0" style={{ width: 28, height: 28 }}>
            <Image src="/glincker-logo.png" alt="Glin UI" width={28} height={28} unoptimized className="rounded-md dark:hidden" />
            <Image src="/glincker-logo.png" alt="Glin UI" width={28} height={28} unoptimized className="hidden rounded-md invert dark:block" />
          </span>
          <span className="text-sm font-semibold tracking-wide">Glin UI</span>
        </Link>
        <button
          type="button"
          onClick={() => onCollapsedChange(true)}
          className="inline-flex size-7 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-white/[0.06] hover:text-foreground dark:text-neutral-400"
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="size-3.5" />
        </button>
      </header>

      <nav
        ref={navRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto py-2 px-2 space-y-3"
      >
        <SidebarSection title="Getting Started" icon={BookOpen}>
          {gettingStartedItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={isPathActive(normalizedPathname, item.href)} />
          ))}
        </SidebarSection>

        <SidebarSection title="Accessibility" icon={Shield}>
          {accessibilityItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={isPathActive(normalizedPathname, item.href)} />
          ))}
        </SidebarSection>

        <SidebarSection title="Components" icon={Boxes} count={primitiveComponentIds.length}>
          {primitiveComponentIds.map((id: PrimitiveComponentId) => (
            <NavLink
              key={id}
              href={buildComponentHref(id, implementation)}
              label={primitiveTitles[id]}
              maturity={primitiveMaturity[id]}
              active={isPathActive(normalizedPathname, buildComponentHref(id, implementation))}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Signature" icon={Gem} count={signatureComponentIds.length}>
          {signatureComponentIds.map((id: SignatureComponentId) => (
            <NavLink
              key={id}
              href={buildComponentHref(id, implementation)}
              label={signatureTitles[id]}
              active={isPathActive(normalizedPathname, buildComponentHref(id, implementation))}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Design System" icon={Palette}>
          {designSystemItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={isPathActive(normalizedPathname, item.href)} />
          ))}
        </SidebarSection>

        <SidebarSection title="Compare" icon={ArrowLeftRight}>
          {compareItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={isPathActive(normalizedPathname, item.href)} />
          ))}
        </SidebarSection>
      </nav>
    </aside>
  )
}

// ── Glass surface ───────────────────────────────────────────────────────────

const sidebarSurface = cn(
  "relative flex h-full shrink-0 flex-col overflow-hidden rounded-2xl",
  "border border-white/20 [border-top-color:var(--glass-refraction-top)]",
  "bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.18),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))]",
  "backdrop-blur-2xl backdrop-saturate-[180%]",
  "shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,var(--shadow-glass-md)]",
  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
  "dark:border-white/[0.1] dark:[border-top-color:rgb(255_255_255_/_0.15)]",
  "dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.05),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.03),rgb(255_255_255_/_0.01))]",
  "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.05)_inset,0_12px_36px_rgb(0_0_0_/_0.4)]",
  "dark:before:via-white/8",
  "transition-[width] duration-normal ease-standard"
)

// ── Section ─────────────────────────────────────────────────────────────────

function SidebarSection({
  title,
  icon: Icon,
  count,
  children
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-center gap-1.5 px-2 pb-1">
        <Icon className="size-3 text-neutral-400 dark:text-neutral-500" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
          {title}
        </span>
        {count != null && (
          <span className="ml-auto rounded-full bg-neutral-200/50 px-1.5 text-[9px] font-medium tabular-nums text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400">
            {count}
          </span>
        )}
      </div>
      <div className="space-y-px">{children}</div>
    </section>
  )
}

// ── NavLink (no icons, compact text) ────────────────────────────────────────

function NavLink({
  href,
  label,
  active,
  maturity
}: {
  href: string
  label: string
  active: boolean
  maturity?: "stable" | "beta"
}) {
  return (
    <Link
      href={href}
      data-active={active ? "true" : undefined}
      className={cn(
        "group relative flex w-full items-center rounded-lg px-2.5 py-[5px] text-[13px] transition-all duration-fast ease-standard",
        active
          ? "bg-[var(--glass-4-surface)] font-medium text-foreground border border-white/15 [border-top-color:var(--glass-refraction-top)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)] dark:border-white/[0.1] dark:bg-white/[0.08]"
          : "border border-transparent text-neutral-600 hover:text-foreground hover:bg-white/[0.06] dark:text-neutral-400 dark:hover:bg-white/[0.04]"
      )}
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <span className="absolute left-1 top-1.5 bottom-1.5 w-[2px] rounded-full bg-foreground/60 dark:bg-white/70" />
      )}
      <span className="truncate">{label}</span>
      {maturity ? (
        <span
          className={cn(
            "ml-auto inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em]",
            maturity === "beta"
              ? "border border-amber-300/50 bg-amber-100/60 text-amber-700 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300"
              : "border border-emerald-300/50 bg-emerald-100/60 text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-400/15 dark:text-emerald-300"
          )}
        >
          {maturity}
        </span>
      ) : null}
    </Link>
  )
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function normalizePath(path: string) {
  const normalized = path.replace(/\/+$/g, "")
  return normalized.length > 0 ? normalized : "/"
}

function isPathActive(pathname: string, href: string) {
  const target = normalizePath(href)
  if (pathname === target) return true
  return pathname.startsWith(`${target}/`)
}
