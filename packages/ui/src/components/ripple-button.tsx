"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ripple color */
  rippleColor?: string
  /** Button variant */
  variant?: "default" | "glass" | "frosted" | "outline"
  /** Button size */
  size?: "sm" | "md" | "lg"
}

interface RippleItem {
  id: number
  x: number
  y: number
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      children,
      rippleColor: rippleColorProp,
      variant = "default",
      size = "md",
      onClick,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [ripples, setRipples] = React.useState<RippleItem[]>([])
    const idRef = React.useRef(0)

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!prefersReducedMotion) {
          const rect = event.currentTarget.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          const id = ++idRef.current
          setRipples((prev) => [...prev, { id, x, y }])
          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id))
          }, 600)
        }
        onClick?.(event)
      },
      [onClick, prefersReducedMotion]
    )

    const defaultRippleColors: Record<string, string> = {
      default: "rgba(255, 255, 255, 0.4)",
      glass: "rgba(0, 0, 0, 0.12)",
      frosted: "rgba(0, 0, 0, 0.1)",
      outline: "rgba(0, 0, 0, 0.1)",
    }

    const rippleColor = rippleColorProp ?? defaultRippleColors[variant] ?? "rgba(255, 255, 255, 0.4)"

    const variantClasses = {
      default: "border border-black/10 bg-neutral-900 text-white shadow-[0_12px_26px_-16px_rgb(2_6_23_/_0.65)] hover:bg-neutral-800 dark:border-white/15 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_10px_24px_-14px_rgb(255_255_255_/_0.28)] dark:hover:bg-white",
      glass: "border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-white/50 text-[var(--color-foreground)] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.4)_inset,0_10px_22px_-14px_rgb(15_23_42_/_0.18)] hover:bg-white/60 dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_8px_20px_-12px_rgb(0_0_0_/_0.5)] dark:hover:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.06))]",
      frosted: "border border-white/30 [border-top-color:var(--glass-refraction-top)] bg-white/70 text-[var(--color-foreground)] backdrop-blur-[40px] backdrop-saturate-[200%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.5)_inset,0_0_16px_rgb(255_255_255_/_0.15)_inset,0_10px_22px_-14px_rgb(15_23_42_/_0.22)] hover:bg-white/80 dark:border-white/[0.16] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.16),rgb(255_255_255_/_0.06))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_0_16px_rgb(255_255_255_/_0.04)_inset,0_8px_20px_-12px_rgb(0_0_0_/_0.5)] dark:hover:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.2),rgb(255_255_255_/_0.08))]",
      outline: "border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] shadow-sm hover:bg-[var(--glass-1-surface)] dark:border-white/15 dark:hover:bg-white/[0.06]",
    }

    const sizeClasses = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-colors duration-200",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-[1]">{children}</span>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full animate-ripple-press motion-reduce:hidden"
            style={{
              left: ripple.x,
              top: ripple.y,
              background: `radial-gradient(circle, ${rippleColor} 10%, transparent 70%)`,
            }}
          />
        ))}
      </button>
    )
  }
)

RippleButton.displayName = "RippleButton"
