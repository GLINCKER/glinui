import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const pulsatingButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center rounded-xl",
    "px-6 py-2.5 text-sm font-medium transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
        accent:
          "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:opacity-90",
        glass:
          "border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-white/10 text-[var(--color-foreground)] backdrop-blur-md hover:bg-white/20 dark:border-white/10 dark:bg-white/[0.06]"
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pulsatingButtonVariants> {
  pulseColor?: string
  pulseDuration?: number
}

export const PulsatingButton = React.forwardRef<HTMLButtonElement, PulsatingButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      pulseColor,
      pulseDuration = 2,
      style,
      ...props
    },
    ref
  ) => {
    const defaultPulseColor =
      variant === "accent"
        ? "var(--color-accent)"
        : variant === "glass"
          ? "rgba(255,255,255,0.3)"
          : "rgba(0,0,0,0.3)"

    return (
      <button
        ref={ref}
        className={cn(pulsatingButtonVariants({ variant, size }), className)}
        style={style}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit]",
            "motion-safe:animate-[pulsate-ring_var(--pulsate-duration,2s)_ease-out_infinite]",
            "motion-reduce:hidden"
          )}
          style={
            {
              "--pulsate-duration": `${pulseDuration}s`,
              boxShadow: `0 0 0 0 ${pulseColor ?? defaultPulseColor}`,
              border: `2px solid ${pulseColor ?? defaultPulseColor}`,
            } as React.CSSProperties
          }
        />
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

PulsatingButton.displayName = "PulsatingButton"
