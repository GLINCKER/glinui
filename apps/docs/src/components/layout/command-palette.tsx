"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { ArrowDown, ArrowUp, Boxes, Command, CornerDownLeft, Search, Sparkles } from "lucide-react"

import { cn, useLiquidGlass } from "@glinui/ui"
import {
  primitiveComponentIds,
  primitiveTitles,
  signatureComponentIds,
  signatureTitles
} from "@/lib/primitives"
import { buildComponentHref, getImplementationFromPath } from "@/lib/docs-route"

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
}

type PaletteCommand = {
  id: string
  label: string
  href: string
  keywords: string[]
  group: "pages" | "components"
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState(0)
  const listRef = React.useRef<HTMLDivElement>(null)
  const implementation = getImplementationFromPath(pathname)

  // SVG liquid-glass refraction (Chromium only — fallback to CSS blur)
  const { ref, svgFilter, style, isSupported } = useLiquidGlass({
    displacement: 40,
    blur: 12,
    saturate: 1.8,
    profile: "squircle",
  })

  const commands = React.useMemo<PaletteCommand[]>(() => {
    const pageCommands: PaletteCommand[] = [
      { id: "docs-home", label: "Documentation Overview", href: "/docs", keywords: ["docs", "home", "overview"], group: "pages" },
      { id: "getting-started", label: "Getting Started", href: "/docs/getting-started", keywords: ["start", "install", "setup"], group: "pages" },
      { id: "accessibility", label: "Accessibility Hub", href: "/docs/accessibility", keywords: ["accessibility", "a11y", "wcag", "screen reader", "focus"], group: "pages" },
      { id: "forms-accessibility", label: "Forms Accessibility", href: "/docs/forms-accessibility", keywords: ["forms", "accessibility", "a11y", "labels"], group: "pages" },
      { id: "forms-recipes", label: "Form Recipes", href: "/docs/forms-recipes", keywords: ["forms", "recipes", "auth", "checkout", "settings"], group: "pages" },
      { id: "screen-reader-testing", label: "Screen Reader Testing", href: "/docs/screen-reader-testing", keywords: ["screen", "reader", "voiceover", "nvda", "a11y", "testing"], group: "pages" },
      { id: "focus-management", label: "Focus Management", href: "/docs/focus-management", keywords: ["focus", "keyboard", "dialog", "trap"], group: "pages" },
      { id: "color-contrast", label: "Color Contrast", href: "/docs/color-contrast", keywords: ["contrast", "wcag", "colors", "readability"], group: "pages" },
      { id: "components", label: "Components", href: "/docs/components", keywords: ["components", "catalog"], group: "pages" },
      { id: "directory", label: "Directory", href: "/docs/directory", keywords: ["directory", "browse", "install", "registry", "search"], group: "pages" },
      { id: "api-metadata", label: "API Metadata", href: "/docs/api-metadata", keywords: ["api", "props", "metadata", "automation"], group: "pages" },
      { id: "tokens", label: "Design Tokens", href: "/docs/tokens", keywords: ["tokens", "theme", "colors"], group: "pages" },
      { id: "glass-physics", label: "Glass Physics", href: "/docs/glass-physics", keywords: ["glass", "physics", "elevation"], group: "pages" },
      { id: "motion", label: "Motion", href: "/docs/motion", keywords: ["motion", "animation"], group: "pages" }
    ]

    const componentCommands: PaletteCommand[] = primitiveComponentIds.map((id) => ({
      id: `component-${id}`,
      label: primitiveTitles[id],
      href: buildComponentHref(id, implementation),
      keywords: [id, primitiveTitles[id].toLowerCase(), "component", "primitive"],
      group: "components"
    }))

    const signatureCommands: PaletteCommand[] = signatureComponentIds.map((id) => ({
      id: `signature-${id}`,
      label: signatureTitles[id],
      href: buildComponentHref(id, implementation),
      keywords: [id, signatureTitles[id].toLowerCase(), "component", "signature", "glass"],
      group: "components"
    }))

    return [...pageCommands, ...componentCommands, ...signatureCommands]
  }, [implementation])

  const filtered = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return commands
    }

    return commands.filter((item) => {
      return item.label.toLowerCase().includes(normalized) || item.keywords.some((word) => word.includes(normalized))
    })
  }, [commands, query])

  // Group filtered items for section headers
  const groups = React.useMemo(() => {
    const pages = filtered.filter((c) => c.group === "pages")
    const components = filtered.filter((c) => c.group === "components")
    return { pages, components }
  }, [filtered])

  // Flat list for keyboard navigation index
  const flatList = React.useMemo(() => [...groups.pages, ...groups.components], [groups])

  React.useEffect(() => {
    if (!open) return
    setQuery("")
    setSelected(0)
  }, [open, pathname])

  React.useEffect(() => {
    if (!open) return
    if (selected > flatList.length - 1) setSelected(0)
  }, [flatList.length, open, selected])

  // Scroll selected item into view
  React.useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.querySelector("[data-selected='true']")
    if (el) el.scrollIntoView({ block: "nearest" })
  }, [open, selected])

  React.useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === "ArrowDown") {
        event.preventDefault()
        setSelected((prev) => (flatList.length === 0 ? 0 : (prev + 1) % flatList.length))
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        setSelected((prev) => (flatList.length === 0 ? 0 : (prev - 1 + flatList.length) % flatList.length))
      }

      if (event.key === "Enter") {
        event.preventDefault()
        const command = flatList[selected]
        if (!command) return
        router.push(command.href)
        onClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [flatList, onClose, open, router, selected])

  if (!open) {
    return null
  }

  const renderItem = (item: PaletteCommand, globalIndex: number) => (
    <button
      key={item.id}
      type="button"
      data-selected={selected === globalIndex}
      onClick={() => {
        router.push(item.href)
        onClose()
      }}
      onMouseEnter={() => setSelected(globalIndex)}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-150",
        selected === globalIndex
          ? "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-white/15 shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset] dark:border-white/[0.1] dark:bg-white/[0.08]"
          : "border-transparent hover:bg-white/[0.06] dark:hover:bg-white/[0.05]"
      )}
    >
      {item.id.startsWith("component-") ? (
        <Boxes className={cn("size-4 shrink-0", selected === globalIndex ? "text-foreground/70" : "text-neutral-400 dark:text-neutral-500")} />
      ) : item.id === "glass-physics" ? (
        <Sparkles className={cn("size-4 shrink-0", selected === globalIndex ? "text-foreground/70" : "text-neutral-400 dark:text-neutral-500")} />
      ) : (
        <Command className={cn("size-4 shrink-0", selected === globalIndex ? "text-foreground/70" : "text-neutral-400 dark:text-neutral-500")} />
      )}
      <span className={cn("flex-1 text-sm", selected === globalIndex ? "text-foreground" : "text-foreground/80")}>{item.label}</span>
      {selected === globalIndex && (
        <kbd className="hidden rounded-md border border-white/15 bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-neutral-400 sm:inline-block dark:border-white/[0.08]">
          <CornerDownLeft className="inline size-2.5" />
        </kbd>
      )}
    </button>
  )

  return (
    <>
      {/* Overlay — click outside to close */}
      <div
        className={cn(
          "fixed inset-0 z-[90]",
          // Chrome: barely dim — page detail stays visible for SVG refraction
          // Fallback: heavier dim + blur
          isSupported ? "bg-black/10" : "bg-black/25 backdrop-blur-lg"
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Modal — centered */}
      <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none">
        {svgFilter}

        <div
          ref={ref}
          className={cn(
            "pointer-events-auto w-full max-w-2xl overflow-hidden rounded-2xl",
            // Glass surface — low opacity so backdrop-filter refraction shows through
            "relative border border-white/25 [border-top-color:rgb(255_255_255_/_0.45)]",
            "bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.22),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.06))]",
            "shadow-[0_0_0_1px_rgb(255_255_255_/_0.15)_inset,var(--shadow-glass-lg)]",
            // Refraction line
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent",
            // Dark mode — very transparent so refraction is visible
            "dark:border-white/[0.12] dark:[border-top-color:rgb(255_255_255_/_0.18)]",
            "dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.06),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.03),rgb(255_255_255_/_0.01))]",
            "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,0_16px_48px_rgb(0_0_0_/_0.5)]",
            "dark:before:via-white/10",
            // Fallback glass (Safari/Firefox — no SVG refraction, needs higher opacity)
            !isSupported && "backdrop-blur-2xl backdrop-saturate-[180%] bg-[radial-gradient(ellipse_at_50%_-8%,rgb(255_255_255_/_0.68),transparent_56%),linear-gradient(to_bottom,rgb(255_255_255_/_0.48),rgb(248_249_252_/_0.36))] dark:bg-[linear-gradient(to_bottom,rgb(255_255_255_/_0.07),rgb(255_255_255_/_0.03))]"
          )}
          style={style}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-white/15 px-4 py-3 dark:border-white/[0.08]">
            <Search className="size-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components and docs..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            />
            <kbd className="hidden rounded-md border border-white/15 bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-neutral-400 sm:inline-block dark:border-white/[0.08]">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2">
            {flatList.length === 0 ? (
              <div className="px-3 py-8 text-center">
                <p className="text-sm text-neutral-500">No results for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-600">Try a different search term</p>
              </div>
            ) : (
              <>
                {groups.pages.length > 0 && (
                  <div>
                    <p className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Pages</p>
                    {groups.pages.map((item) => {
                      const idx = flatList.indexOf(item)
                      return renderItem(item, idx)
                    })}
                  </div>
                )}
                {groups.components.length > 0 && (
                  <div className={groups.pages.length > 0 ? "mt-2" : undefined}>
                    <p className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Components</p>
                    {groups.components.map((item) => {
                      const idx = flatList.indexOf(item)
                      return renderItem(item, idx)
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 dark:border-white/[0.06]">
            <div className="flex items-center gap-3 text-[11px] text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/15 bg-white/[0.06] px-1 py-px text-[10px] dark:border-white/[0.08]"><ArrowUp className="inline size-2.5" /></kbd>
                <kbd className="rounded border border-white/15 bg-white/[0.06] px-1 py-px text-[10px] dark:border-white/[0.08]"><ArrowDown className="inline size-2.5" /></kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/15 bg-white/[0.06] px-1 py-px text-[10px] dark:border-white/[0.08]"><CornerDownLeft className="inline size-2.5" /></kbd>
                open
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500">{flatList.length} results</span>
          </div>
        </div>
      </div>
    </>
  )
}
