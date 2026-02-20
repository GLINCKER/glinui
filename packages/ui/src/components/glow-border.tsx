import * as React from "react"
import { cn } from "../lib/cn"

export interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rotation duration in seconds */
  duration?: number
  /** Glow color */
  glowColor?: string
  /** Glow spread in px */
  glowSize?: number
  /** Border radius */
  borderRadius?: string
}

export const GlowBorder = React.forwardRef<HTMLDivElement, GlowBorderProps>(
  (
    {
      className,
      children,
      duration = 4,
      glowColor = "var(--color-accent)",
      glowSize = 2,
      borderRadius = "var(--radius-lg)",
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ borderRadius, ...style }}
        {...props}
      >
        {/* Rotating glow border */}
        <div
          aria-hidden
          className="absolute -inset-px overflow-hidden rounded-[inherit] motion-reduce:hidden"
        >
          <div
            className="absolute inset-[-100%] animate-glow-rotate"
            style={{
              "--glow-duration": `${duration}s`,
              background: `conic-gradient(from 0deg, transparent 0%, ${glowColor} 10%, transparent 20%)`,
            } as React.CSSProperties}
          />
        </div>
        {/* Content layer */}
        <div
          className="relative rounded-[inherit] bg-[var(--color-background)]"
          style={{ padding: glowSize }}
        >
          <div className="rounded-[inherit] bg-[var(--color-surface)]">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

GlowBorder.displayName = "GlowBorder"
