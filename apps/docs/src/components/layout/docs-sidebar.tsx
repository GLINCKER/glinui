"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  Braces,
  Boxes,
  Check,
  ChevronDown,
  CircleDot,
  Compass,
  FileCode2,
  FileText,
  PanelLeft,
  PanelLeftClose,
  Palette,
  Search,
  Sparkles,
  Terminal
} from "lucide-react"

import { cn } from "@glinr/ui"
import { primitiveComponentIds, primitiveTitles, type PrimitiveComponentId } from "@/lib/primitives"
import { buildComponentHref, getImplementationFromPath } from "@/lib/docs-route"

type DocsSidebarProps = {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const gettingStartedItems: NavItem[] = [{ href: "/docs/getting-started", label: "Overview", icon: Compass }]

const designSystemItems: NavItem[] = [
  { href: "/docs/tokens", label: "Tokens", icon: Palette },
  { href: "/docs/glass-physics", label: "Glass Physics", icon: Sparkles },
  { href: "/docs/motion", label: "Motion", icon: CircleDot }
]

const componentIcons: Record<PrimitiveComponentId, React.ComponentType<{ className?: string }>> = {
  button: Sparkles,
  accordion: ChevronDown,
  tabs: Braces,
  "dropdown-menu": Terminal,
  popover: Search,
  sheet: PanelLeftClose,
  card: FileCode2,
  badge: CircleDot,
  input: FileText,
  textarea: FileText,
  select: ChevronDown,
  checkbox: Check,
  "radio-group": CircleDot,
  switch: PanelLeft,
  modal: Boxes,
  tooltip: Search,
  toast: Terminal
}

export function DocsSidebar({ collapsed, onCollapsedChange }: DocsSidebarProps) {
  const pathname = usePathname()
  const normalizedPathname = normalizePath(pathname)
  const implementation = getImplementationFromPath(pathname)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)")

    const sync = () => {
      onCollapsedChange(mediaQuery.matches)
    }

    sync()
    mediaQuery.addEventListener("change", sync)

    return () => {
      mediaQuery.removeEventListener("change", sync)
    }
  }, [onCollapsedChange])

  return (
    <aside
      className={cn(
        "relative flex h-full shrink-0 flex-col overflow-hidden rounded-2xl",
        // Glass surface with Apple-style top refraction border
        "border border-white/20 [border-top-color:var(--glass-refraction-top)]",
        "bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.18),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))]",
        "backdrop-blur-2xl backdrop-saturate-[180%]",
        "shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,var(--shadow-glass-md)]",
        // Specular refraction line
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        // Dark mode
        "dark:border-white/[0.1] dark:[border-top-color:rgb(255_255_255_/_0.15)]",
        "dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.05),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.03),rgb(255_255_255_/_0.01))]",
        "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.05)_inset,0_12px_36px_rgb(0_0_0_/_0.4)]",
        "dark:before:via-white/8",
        "transition-[width] duration-normal ease-standard",
        collapsed ? "w-[4.5rem]" : "w-72"
      )}
    >
      <header className="flex h-14 items-center justify-between border-b border-white/10 px-3 dark:border-white/[0.06]">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] backdrop-blur-xl shadow-[var(--glass-4-shadow)] dark:border-white/[0.1]">
            <Sparkles className="size-4 text-foreground" />
          </span>
          {!collapsed ? <span className="truncate text-sm font-semibold tracking-wide">Glinr UI</span> : null}
        </Link>
        <button
          type="button"
          onClick={() => onCollapsedChange(!collapsed)}
          className="inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-neutral-500 transition-colors hover:border-white/10 hover:bg-white/[0.06] hover:text-foreground dark:text-neutral-400 dark:hover:border-white/[0.06]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </header>

      <nav className={cn("flex-1 overflow-y-auto py-3", collapsed ? "space-y-3 px-1.5" : "space-y-5 px-2")}>
        <SidebarSection title="Getting Started" icon={Compass} compact={collapsed}>
          {gettingStartedItems.map((item) => (
            <DocsNavPillLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isPathActive(normalizedPathname, item.href)}
              compact={collapsed}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Components" icon={Boxes} compact={collapsed}>
          {primitiveComponentIds.map((id) => (
            <DocsNavPillLink
              key={id}
              href={buildComponentHref(id, implementation)}
              label={primitiveTitles[id]}
              icon={componentIcons[id]}
              active={isPathActive(normalizedPathname, buildComponentHref(id, implementation))}
              compact={collapsed}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Design System" icon={Palette} compact={collapsed}>
          {designSystemItems.map((item) => (
            <DocsNavPillLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isPathActive(normalizedPathname, item.href)}
              compact={collapsed}
            />
          ))}
        </SidebarSection>
      </nav>
    </aside>
  )
}

function SidebarSection({
  title,
  icon: Icon,
  compact,
  children
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  compact: boolean
  children: React.ReactNode
}) {
  return (
    <section className="space-y-2">
      {compact ? (
        <div className="flex items-center justify-center border-y border-white/[0.08] py-1 text-neutral-500 dark:border-white/[0.06]">
          <Icon className="size-3.5" />
        </div>
      ) : (
        <p className="flex items-center gap-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          <Icon className="size-3" />
          {title}
        </p>
      )}
      <div className="space-y-1">{children}</div>
    </section>
  )
}

function DocsNavPillLink({
  href,
  label,
  icon: Icon,
  active,
  compact
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
  compact: boolean
}) {
  return (
    <Link
      href={href}
      title={compact ? label : undefined}
      className={cn(
        "group relative flex w-full items-center rounded-xl border text-sm transition-all duration-fast ease-standard",
        compact ? "mx-auto h-10 w-10 justify-center px-0 py-0" : "gap-2 px-2.5 py-2",
        active
          ? compact
            ? "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] text-foreground shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,var(--shadow-soft)] dark:border-white/[0.14] dark:bg-white/[0.1]"
            : "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] text-foreground shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,var(--shadow-soft)] before:absolute before:bottom-1.5 before:left-1.5 before:top-1.5 before:w-0.5 before:rounded-full before:bg-foreground/70 dark:border-white/[0.12] dark:bg-white/[0.08] dark:before:bg-white/85"
          : "border-transparent text-neutral-600 hover:border-white/10 hover:bg-white/[0.06] hover:text-foreground dark:text-neutral-400 dark:hover:border-white/[0.06] dark:hover:bg-white/[0.04]"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-4 shrink-0" />
      {!compact ? <span className="truncate">{label}</span> : null}
    </Link>
  )
}

function normalizePath(path: string) {
  const normalized = path.replace(/\/+$/g, "")
  return normalized.length > 0 ? normalized : "/"
}

function isPathActive(pathname: string, href: string) {
  const target = normalizePath(href)
  if (pathname === target) return true
  return pathname.startsWith(`${target}/`)
}
