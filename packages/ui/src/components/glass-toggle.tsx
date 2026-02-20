"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface GlassToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled checked state */
  checked?: boolean
  /** Default checked state */
  defaultChecked?: boolean
  /** Callback when toggle state changes */
  onCheckedChange?: (checked: boolean) => void
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Color when checked */
  activeColor?: string
}

export const GlassToggle = React.forwardRef<HTMLButtonElement, GlassToggleProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      size = "md",
      activeColor,
      disabled,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const isChecked = controlledChecked ?? internalChecked

    const handleClick = React.useCallback(() => {
      if (disabled) return
      const next = !isChecked
      if (controlledChecked === undefined) setInternalChecked(next)
      onCheckedChange?.(next)
    }, [isChecked, controlledChecked, onCheckedChange, disabled])

    const sizeConfig = {
      sm: { track: "h-5 w-9", thumb: "size-3.5", translate: "translate-x-4" },
      md: { track: "h-6 w-11", thumb: "size-4.5", translate: "translate-x-5" },
      lg: { track: "h-7 w-[3.25rem]", thumb: "size-5.5", translate: "translate-x-6" },
    }

    const { track, thumb, translate } = sizeConfig[size]

    return (
      <button
        ref={ref}
        role="switch"
        type="button"
        aria-checked={isChecked}
        disabled={disabled}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border p-0.5 backdrop-blur-sm",
          prefersReducedMotion ? "" : "transition-[background-color,border-color,box-shadow] duration-300",
          isChecked
            ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/80 shadow-[0_0_0_1px_rgb(255_255_255_/_0.15)_inset]"
            : "border-black/15 bg-neutral-200/80 shadow-[inset_0_1px_3px_rgb(0_0_0_/_0.1)] dark:border-white/10 dark:bg-white/10",
          disabled && "pointer-events-none opacity-50",
          track,
          className
        )}
        style={isChecked && activeColor ? { backgroundColor: activeColor } : undefined}
        onClick={handleClick}
        {...props}
      >
        {/* Liquid fill background */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full",
            prefersReducedMotion ? "" : "transition-opacity duration-300",
            isChecked ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: activeColor
              ? `linear-gradient(135deg, ${activeColor}, ${activeColor}88)`
              : "linear-gradient(135deg, var(--color-accent), var(--color-accent) / 0.5)",
          }}
        />
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={cn(
            "relative z-[1] rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0_/_0.2),0_0_0_0.5px_rgb(0_0_0_/_0.08)]",
            prefersReducedMotion ? "" : "transition-transform duration-300 ease-out",
            isChecked ? translate : "translate-x-0",
            thumb
          )}
        />
      </button>
    )
  }
)

GlassToggle.displayName = "GlassToggle"
