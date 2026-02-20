"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface GlassDockItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

export interface GlassDockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Dock items */
  items: GlassDockItem[]
  /** Base icon size in px */
  iconSize?: number
  /** Maximum magnification scale */
  magnification?: number
  /** Distance in px at which magnification starts */
  distance?: number
  /** Position */
  position?: "bottom" | "top" | "left" | "right"
}

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  (
    {
      className,
      items,
      iconSize = 48,
      magnification = 1.6,
      distance = 120,
      position = "bottom",
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const dockRef = React.useRef<HTMLDivElement | null>(null)
    const [mouseX, setMouseX] = React.useState<number | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        dockRef.current = node
        if (typeof ref === "function") { ref(node); return }
        if (ref) ref.current = node
      },
      [ref]
    )

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return
        const rect = dockRef.current?.getBoundingClientRect()
        if (!rect) return
        const isHorizontal = position === "bottom" || position === "top"
        setMouseX(isHorizontal ? event.clientX - rect.left : event.clientY - rect.top)
      },
      [prefersReducedMotion, position]
    )

    const handleMouseLeave = React.useCallback(() => {
      setMouseX(null)
    }, [])

    const isHorizontal = position === "bottom" || position === "top"

    const positionClasses = {
      bottom: "flex-row",
      top: "flex-row",
      left: "flex-col",
      right: "flex-col",
    }

    return (
      <div
        ref={setRefs}
        role="toolbar"
        aria-label="Dock"
        className={cn(
          "inline-flex items-end gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur-xl",
          positionClasses[position],
          position === "left" || position === "right" ? "items-center" : "items-end",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {items.map((item, index) => {
          let scale = 1
          if (mouseX !== null && !prefersReducedMotion) {
            const itemCenter = index * (iconSize + 6) + iconSize / 2 + 8
            const dist = Math.abs(mouseX - itemCenter)
            if (dist < distance) {
              scale = 1 + (magnification - 1) * (1 - dist / distance)
            }
          }

          const currentSize = iconSize * scale

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              title={item.label}
              className="group relative flex flex-col items-center transition-transform duration-200 ease-out motion-reduce:transition-none"
              style={{
                width: currentSize,
                height: currentSize,
              }}
              onClick={item.onClick}
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-shadow duration-200 hover:shadow-md"
                style={{ fontSize: currentSize * 0.5 }}
              >
                {item.icon}
              </div>
              <span className="absolute -bottom-5 scale-0 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-0.5 text-[10px] text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-neutral-100 dark:text-neutral-900">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    )
  }
)

GlassDock.displayName = "GlassDock"
