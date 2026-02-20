"use client"

import * as React from "react"

import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"
import { GlassCard, type GlassCardProps } from "./glass-card"

export type SpotlightCardProps = GlassCardProps & {
  spotlightClassName?: string
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, children, onMouseMove, onMouseLeave, spotlightClassName, ...props }, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const localRef = React.useRef<HTMLDivElement | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node

        if (typeof ref === "function") {
          ref(node)
          return
        }

        if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!prefersReducedMotion && localRef.current) {
          const rect = localRef.current.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top

          localRef.current.style.setProperty("--spot-x", `${x.toFixed(2)}px`)
          localRef.current.style.setProperty("--spot-y", `${y.toFixed(2)}px`)
          localRef.current.dataset.spotlightActive = "true"
        }

        onMouseMove?.(event)
      },
      [onMouseMove, prefersReducedMotion]
    )

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (localRef.current) {
          localRef.current.dataset.spotlightActive = "false"
        }

        onMouseLeave?.(event)
      },
      [onMouseLeave]
    )

    return (
      <GlassCard
        ref={setRefs}
        className={cn("group overflow-hidden", className)}
        data-spotlight-active="false"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span
          aria-hidden="true"
          data-slot="spotlight-overlay"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-fast ease-standard [background:radial-gradient(220px_circle_at_var(--spot-x,_50%)_var(--spot-y,_50%),rgb(255_255_255_/_0.3),transparent_70%)] group-hover:opacity-100 motion-reduce:hidden motion-reduce:transition-none",
            spotlightClassName
          )}
        />
        <div className="relative z-[1]">{children}</div>
      </GlassCard>
    )
  }
)

SpotlightCard.displayName = "SpotlightCard"
