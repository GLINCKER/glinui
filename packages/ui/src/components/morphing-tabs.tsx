"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface MorphingTabItem {
  id: string
  label: React.ReactNode
  disabled?: boolean
}

export interface MorphingTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Tab items */
  items: MorphingTabItem[]
  /** Active tab id */
  activeId?: string
  /** Default active tab id */
  defaultActiveId?: string
  /** Callback when active tab changes */
  onTabChange?: (id: string) => void
  /** Visual variant */
  variant?: "glass" | "solid" | "underline"
  /** Size */
  size?: "sm" | "md" | "lg"
}

export const MorphingTabs = React.forwardRef<HTMLDivElement, MorphingTabsProps>(
  (
    {
      className,
      items,
      activeId: controlledActiveId,
      defaultActiveId,
      onTabChange,
      variant = "glass",
      size = "md",
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [internalActive, setInternalActive] = React.useState(defaultActiveId ?? items[0]?.id ?? "")
    const activeId = controlledActiveId ?? internalActive
    const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({})

    const updateIndicator = React.useCallback(() => {
      const activeTab = tabRefs.current.get(activeId)
      const container = containerRef.current
      if (!activeTab || !container) return
      const containerRect = container.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()
      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        top: variant === "underline" ? undefined : tabRect.top - containerRect.top,
        bottom: variant === "underline" ? 0 : undefined,
        width: tabRect.width,
        height: variant === "underline" ? 2 : tabRect.height,
      })
    }, [activeId, variant])

    React.useEffect(() => {
      updateIndicator()
    }, [updateIndicator])

    React.useEffect(() => {
      const container = containerRef.current
      if (!container) return
      const observer = new ResizeObserver(() => updateIndicator())
      observer.observe(container)
      return () => observer.disconnect()
    }, [updateIndicator])

    const handleTabClick = (id: string) => {
      if (!controlledActiveId) setInternalActive(id)
      onTabChange?.(id)
    }

    const sizeClasses = {
      sm: "text-xs px-2.5 py-1",
      md: "text-sm px-3.5 py-1.5",
      lg: "text-base px-5 py-2",
    }

    const indicatorVariantClasses = {
      glass: cn(
        "rounded-lg",
        "border border-white/20 [border-top-color:var(--glass-refraction-top)]",
        "bg-[var(--glass-4-surface)]",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,var(--shadow-glass-sm)]",
        "dark:border-white/[0.12] dark:[border-top-color:rgb(255_255_255_/_0.18)]",
        "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,0_2px_8px_rgb(0_0_0_/_0.3)]"
      ),
      solid: "rounded-lg bg-neutral-900 dark:bg-neutral-100 shadow-sm",
      underline: "bg-neutral-900 dark:bg-neutral-100 rounded-full",
    }

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === "function") { ref(node); return }
        if (ref) ref.current = node
      },
      [ref]
    )

    return (
      <div
        ref={setRefs}
        role="tablist"
        className={cn(
          "relative inline-flex items-center gap-0.5 rounded-xl p-1",
          "border border-white/10 bg-[var(--glass-2-surface)] backdrop-blur-xl",
          "shadow-[0_0_0_1px_rgb(255_255_255_/_0.04)_inset,var(--shadow-soft)]",
          "dark:border-white/[0.06]",
          variant === "underline" && "rounded-none border-0 border-b border-white/10 bg-transparent p-0 backdrop-blur-none shadow-none dark:border-white/[0.08]",
          className
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute transition-all ease-out",
            prefersReducedMotion ? "duration-0" : "duration-300",
            indicatorVariantClasses[variant]
          )}
          style={indicatorStyle}
        />
        {items.map((item) => (
          <button
            key={item.id}
            ref={(el) => { if (el) tabRefs.current.set(item.id, el); else tabRefs.current.delete(item.id) }}
            role="tab"
            type="button"
            aria-selected={activeId === item.id}
            disabled={item.disabled}
            className={cn(
              "relative z-[1] whitespace-nowrap font-medium transition-colors duration-200",
              sizeClasses[size],
              activeId === item.id
                ? variant === "solid"
                  ? "text-white dark:text-neutral-950"
                  : "text-foreground"
                : "text-foreground/50 hover:text-foreground/80",
              item.disabled && "pointer-events-none opacity-40"
            )}
            onClick={() => handleTabClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  }
)

MorphingTabs.displayName = "MorphingTabs"
