"use client"

import Link from "next/link"
import * as React from "react"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUp, List, X } from "lucide-react"

import { cn } from "@glinui/ui"
import { primitiveComponentIds, primitiveTitles, type PrimitiveComponentId } from "@/lib/primitives"
import { type DocsImplementation } from "@/lib/docs-route"

type TocItem = {
  href: string
  label: string
  depth: 2 | 3
}

type TocPath = {
  path: string
  width: number
  height: number
}

export function DocsToc({
  title = "On this page",
  items,
  componentId,
  implementation = "radix",
  selector = "article h2[id], article h3[id]"
}: {
  title?: string
  items?: TocItem[]
  componentId?: PrimitiveComponentId
  implementation?: DocsImplementation
  selector?: string
}) {
  const [dynamicItems, setDynamicItems] = React.useState<TocItem[]>([])
  const [activeHref, setActiveHref] = React.useState<string>("")
  const [progressHeight, setProgressHeight] = React.useState(0)
  const [tocPath, setTocPath] = React.useState<TocPath | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement | null>(null)
  const listRef = React.useRef<HTMLUListElement | null>(null)
  const itemRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({})
  const activeHrefRef = React.useRef<string>("")
  const pathname = usePathname()

  React.useEffect(() => {
    if (items && items.length > 0) {
      setDynamicItems(items)
      return
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector))
    const extracted = nodes
      .map<TocItem | null>((node) => {
        const id = node.id
        if (!id) return null

        const label = node.textContent?.replace(/[#$]$/g, "").trim()
        if (!label) return null

        const depth = node.tagName === "H3" ? 3 : 2
        return { href: `#${id}`, label, depth }
      })
      .filter((item): item is TocItem => item !== null)

    setDynamicItems(extracted)
  }, [items, pathname, selector])

  React.useEffect(() => {
    const scrollRoot = document.querySelector<HTMLElement>("[data-docs-scroll-root]")
    const headingRefs = dynamicItems
      .map((item) => {
        const node = document.getElementById(item.href.slice(1))
        return node ? { href: item.href, node } : null
      })
      .filter((value): value is { href: string; node: HTMLElement } => value !== null)

    if (headingRefs.length === 0) {
      setActiveHref("")
      setProgressHeight(0)
      return
    }

    const getAbsoluteTop = (node: HTMLElement) => {
      if (scrollRoot) {
        const rootTop = scrollRoot.getBoundingClientRect().top
        return scrollRoot.scrollTop + node.getBoundingClientRect().top - rootTop
      }
      return window.scrollY + node.getBoundingClientRect().top
    }

    let headingPositions = headingRefs.map((heading) => ({
      href: heading.href,
      top: getAbsoluteTop(heading.node)
    }))
    const intersectionRatios = new Map<string, number>()

    const updateHeadingPositions = () => {
      headingPositions = headingRefs.map((heading) => ({
        href: heading.href,
        top: getAbsoluteTop(heading.node)
      }))
    }

    const getCurrentPos = () => {
      const offset = 140
      if (scrollRoot) {
        return scrollRoot.scrollTop + offset
      }
      return window.scrollY + offset
    }

    const getAnchorCenterForHref = (href: string) => {
      const nav = navRef.current
      const item = itemRefs.current[href]
      if (!nav || !item) return null

      const navRect = nav.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()
      return itemRect.top - navRect.top + itemRect.height / 2
    }

    const isAtBottom = () => {
      const threshold = 40
      if (scrollRoot) {
        return scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - threshold
      }
      return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - threshold
    }

    const computeActive = () => {
      let current = headingPositions[0]?.href ?? ""

      const currentPos = getCurrentPos()
      const atBottom = isAtBottom()

      // When at the bottom of the page, force the last heading active
      if (atBottom && headingPositions.length > 0) {
        current = headingPositions[headingPositions.length - 1]?.href ?? current
      } else {
        let observedIndex = -1
        let observedRatio = 0
        for (let index = 0; index < headingPositions.length; index += 1) {
          const ratio = intersectionRatios.get(headingPositions[index]?.href ?? "") ?? 0
          if (ratio > observedRatio + 0.01) {
            observedIndex = index
            observedRatio = ratio
          }
        }

        for (let index = 0; index < headingPositions.length; index += 1) {
          const heading = headingPositions[index]
          if (currentPos >= heading.top) {
            current = heading.href
          } else {
            break
          }
        }

        if (observedIndex >= 0) {
          current = headingPositions[observedIndex]?.href ?? current
        }
      }

      if (current !== activeHrefRef.current) {
        activeHrefRef.current = current
        setActiveHref(current)
        const activeItem = itemRefs.current[current]
        activeItem?.scrollIntoView({ block: "nearest", behavior: "auto" })
      }

      if (headingPositions.length === 0) {
        setProgressHeight(0)
        return
      }

      const nav = navRef.current
      const maxHeight = tocPath?.height ?? (nav ? nav.getBoundingClientRect().height : 0)

      // At bottom → full progress
      if (atBottom) {
        setProgressHeight(maxHeight)
        return
      }

      let activeIndex = 0
      for (let index = 0; index < headingPositions.length; index += 1) {
        if (currentPos >= headingPositions[index].top) {
          activeIndex = index
        } else {
          break
        }
      }

      const currentHeading = headingPositions[activeIndex]
      const nextHeading = headingPositions[activeIndex + 1]
      const currentCenter = getAnchorCenterForHref(currentHeading.href)

      if (currentCenter === null) {
        setProgressHeight(0)
        return
      }

      let target = currentCenter
      if (nextHeading) {
        const nextCenter = getAnchorCenterForHref(nextHeading.href)
        const range = nextHeading.top - currentHeading.top
        if (nextCenter !== null && range > 0) {
          const ratio = Math.max(0, Math.min(1, (currentPos - currentHeading.top) / range))
          target = currentCenter + (nextCenter - currentCenter) * ratio
        }
      }

      setProgressHeight(Math.max(0, Math.min(maxHeight, target)))
    }

    computeActive()

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(computeActive)
    }

    const onResize = () => {
      updateHeadingPositions()
      onScroll()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (!id) return
          intersectionRatios.set(`#${id}`, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        onScroll()
      },
      {
        root: scrollRoot ?? null,
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1]
      }
    )
    headingRefs.forEach((heading) => observer.observe(heading.node))

    const scrollTarget: Window | HTMLElement = scrollRoot ?? window
    scrollTarget.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      scrollTarget.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [dynamicItems, pathname, tocPath?.height])

  React.useEffect(() => {
    const container = listRef.current
    if (!container || dynamicItems.length === 0) {
      setTocPath(null)
      return
    }

    const computePath = () => {
      if (container.clientHeight === 0) return

      let width = 0
      let height = 0
      const commands: string[] = []

      for (let index = 0; index < dynamicItems.length; index += 1) {
        const item = dynamicItems[index]
        const anchor = itemRefs.current[item.href]
        if (!anchor) continue

        const styles = window.getComputedStyle(anchor)
        const offset = getLineOffset(item.depth) + 1
        const top = anchor.offsetTop + Number.parseFloat(styles.paddingTop)
        const bottom = anchor.offsetTop + anchor.clientHeight - Number.parseFloat(styles.paddingBottom)

        width = Math.max(offset, width)
        height = Math.max(height, bottom)

        commands.push(`${index === 0 ? "M" : "L"}${offset} ${top}`)
        commands.push(`L${offset} ${bottom}`)
      }

      if (commands.length === 0) {
        setTocPath(null)
        return
      }

      setTocPath({
        path: commands.join(" "),
        width: width + 1,
        height
      })
    }

    const raf = window.requestAnimationFrame(computePath)
    const observer = new ResizeObserver(computePath)
    observer.observe(container)
    window.addEventListener("resize", computePath)

    return () => {
      window.cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("resize", computePath)
    }
  }, [dynamicItems])

  const scrollToTop = React.useCallback(() => {
    const scrollRoot = document.querySelector<HTMLElement>("[data-docs-scroll-root]")

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
    }

    const doScroll = (behavior: ScrollBehavior) => {
      if (scrollRoot) scrollRoot.scrollTo({ top: 0, behavior })
      window.scrollTo({ top: 0, behavior })
    }

    doScroll("smooth")
    window.setTimeout(() => doScroll("auto"), 360)
  }, [])

  if (dynamicItems.length === 0) {
    return null
  }

  const index = componentId ? primitiveComponentIds.indexOf(componentId) : -1
  const previous = componentId && index > 0 ? primitiveComponentIds[index - 1] : null
  const next =
    componentId && index >= 0 && index < primitiveComponentIds.length - 1 ? primitiveComponentIds[index + 1] : null

  const tocNav = (
    <nav ref={navRef} aria-label="Table of contents" className="relative">
      {!tocPath ? (
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-neutral-300/45 dark:bg-white/14" />
      ) : null}
      {tocPath ? (
        <div
          className="pointer-events-none absolute left-0 top-0 rtl:-scale-x-100"
          style={{
            width: tocPath.width,
            height: tocPath.height,
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${tocPath.width} ${tocPath.height}'><path d='${tocPath.path}' stroke='black' stroke-width='1' fill='none'/></svg>`
            )}")`,
            WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${tocPath.width} ${tocPath.height}'><path d='${tocPath.path}' stroke='black' stroke-width='1' fill='none'/></svg>`
            )}")`
          }}
        >
          <div className="absolute inset-0 bg-neutral-300/45 dark:bg-white/14" />
          <div
            className="absolute left-0 top-0 w-full bg-neutral-500 transition-[height] duration-200 ease-linear dark:bg-white/70"
            style={{
              height: `${progressHeight}px`,
              maskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 8px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black calc(100% - 8px), transparent 100%)"
            }}
          />
        </div>
      ) : null}

      <ul ref={listRef} className="max-h-[calc(100vh-16rem)] list-none overflow-y-auto xl:max-h-[calc(100vh-20rem)]">
        {dynamicItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={() => setMobileOpen(false)}
              ref={(node) => {
                itemRefs.current[item.href] = node
              }}
              className={cn(
                "relative block py-1.5 leading-snug transition-colors duration-fast ease-standard",
                item.depth === 3 ? "pl-[1.625rem] text-[12px]" : "pl-4 text-[13px]",
                activeHref === item.href
                  ? "font-medium text-foreground"
                  : "text-neutral-500 hover:text-foreground dark:text-neutral-400 dark:hover:text-neutral-200"
              )}
            >
              <span className="truncate">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  const bottomActions = (
    <div className="mt-4 flex items-center justify-between border-t border-neutral-200/50 pt-3 dark:border-white/[0.06]">
      {previous ? (
        <Link
          href={`/docs/components/${implementation}/${previous}`}
          className="group inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-neutral-400 transition-colors hover:bg-white/20 hover:text-foreground dark:text-neutral-500 dark:hover:bg-white/[0.04] dark:hover:text-neutral-300"
        >
          <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
          {primitiveTitles[previous]}
        </Link>
      ) : <span />}

      <button
        type="button"
        onClick={scrollToTop}
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-neutral-400 transition-colors hover:bg-white/20 hover:text-foreground dark:text-neutral-500 dark:hover:bg-white/[0.04] dark:hover:text-neutral-300"
      >
        <ArrowUp className="size-3" />
        Top
      </button>

      {next ? (
        <Link
          href={`/docs/components/${implementation}/${next}`}
          className="group inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-neutral-400 transition-colors hover:bg-white/20 hover:text-foreground dark:text-neutral-500 dark:hover:bg-white/[0.04] dark:hover:text-neutral-300"
        >
          {primitiveTitles[next]}
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : <span />}
    </div>
  )

  return (
    <>
      {/* ── Desktop TOC ────────────────────────────────────────────── */}
      <aside className="hidden xl:block">
        <div className="sticky top-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
            {title}
          </p>
          {tocNav}
          {componentId && (previous || next) ? bottomActions : (
            <div className="mt-4 border-t border-neutral-200/50 pt-3 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-[11px] text-neutral-400 transition-colors hover:text-foreground dark:text-neutral-500 dark:hover:text-neutral-300"
              >
                <ArrowUp className="size-3" />
                Back to top
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile TOC fab + drawer ────────────────────────────────── */}
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Table of contents"
          className={cn(
            "fixed bottom-5 right-5 z-50 inline-flex size-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-all duration-normal ease-standard",
            mobileOpen
              ? "border-white/20 bg-neutral-900/80 text-white dark:border-white/15 dark:bg-neutral-800/90"
              : "border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] text-foreground shadow-[var(--shadow-glass-md)]"
          )}
        >
          {mobileOpen ? <X className="size-4" /> : <List className="size-4" />}
        </button>

        {mobileOpen ? (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed bottom-20 right-5 z-50 w-64 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/15 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-4-surface)] p-4 shadow-[var(--shadow-glass-lg)] backdrop-blur-2xl backdrop-saturate-[180%]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
                {title}
              </p>
              {tocNav}
              {componentId && (previous || next) ? bottomActions : null}
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export type { TocItem }

function getLineOffset(depth: TocItem["depth"]) {
  return depth >= 3 ? 10 : 0
}
