"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface DepthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt angle in degrees */
  maxTilt?: number
  /** Perspective distance in px */
  perspective?: number
  /** Scale on hover */
  hoverScale?: number
  /** Glare effect */
  glare?: boolean
  /** Glare max opacity */
  glareOpacity?: number
}

export const DepthCard = React.forwardRef<HTMLDivElement, DepthCardProps>(
  (
    {
      className,
      children,
      maxTilt = 15,
      perspective = 800,
      hoverScale = 1.02,
      glare = true,
      glareOpacity = 0.2,
      onMouseMove,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const localRef = React.useRef<HTMLDivElement | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        localRef.current = node
        if (typeof ref === "function") { ref(node); return }
        if (ref) ref.current = node
      },
      [ref]
    )

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion || !localRef.current) {
          onMouseMove?.(event)
          return
        }
        const rect = localRef.current.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        const tiltX = (0.5 - y) * maxTilt
        const tiltY = (x - 0.5) * maxTilt
        localRef.current.style.setProperty("--depth-tilt-x", `${tiltX.toFixed(2)}deg`)
        localRef.current.style.setProperty("--depth-tilt-y", `${tiltY.toFixed(2)}deg`)
        localRef.current.style.setProperty("--depth-scale", `${hoverScale}`)
        if (glare) {
          localRef.current.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`)
          localRef.current.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`)
          localRef.current.style.setProperty("--glare-opacity", `${glareOpacity}`)
        }
        onMouseMove?.(event)
      },
      [maxTilt, hoverScale, glare, glareOpacity, onMouseMove, prefersReducedMotion]
    )

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (localRef.current) {
          localRef.current.style.setProperty("--depth-tilt-x", "0deg")
          localRef.current.style.setProperty("--depth-tilt-y", "0deg")
          localRef.current.style.setProperty("--depth-scale", "1")
          localRef.current.style.setProperty("--glare-opacity", "0")
        }
        onMouseLeave?.(event)
      },
      [onMouseLeave]
    )

    return (
      <div
        ref={setRefs}
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-transform duration-300 ease-out [transform:perspective(var(--depth-perspective,800px))_rotateX(var(--depth-tilt-x,0deg))_rotateY(var(--depth-tilt-y,0deg))_scale(var(--depth-scale,1))] motion-reduce:transform-none",
          className
        )}
        style={{
          "--depth-perspective": `${perspective}px`,
          ...style,
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {glare && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[var(--glare-opacity,0)] transition-opacity duration-300 [background:radial-gradient(300px_circle_at_var(--glare-x,50%)_var(--glare-y,50%),rgb(255_255_255_/_0.4),transparent_70%)] motion-reduce:hidden"
          />
        )}
        <div className="relative z-[1]">{children}</div>
      </div>
    )
  }
)

DepthCard.displayName = "DepthCard"
