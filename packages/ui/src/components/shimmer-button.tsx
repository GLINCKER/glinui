import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const shimmerButtonVariants = cva(
  [
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl",
    "px-6 py-2.5 text-sm font-medium transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
        glass:
          "border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-white/10 text-[var(--color-foreground)] backdrop-blur-md hover:bg-white/20 dark:border-white/10 dark:bg-white/[0.06]",
        accent:
          "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:opacity-90"
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

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof shimmerButtonVariants> {
  shimmerColor?: string
  shimmerDuration?: number
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      shimmerColor = "rgba(255,255,255,0.3)",
      shimmerDuration = 2,
      style,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(shimmerButtonVariants({ variant, size }), className)}
      style={style}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none absolute inset-0",
          "motion-safe:animate-[skeleton-shimmer_var(--shimmer-duration,2s)_ease-in-out_infinite]",
          "motion-reduce:hidden"
        )}
        style={
          {
            "--shimmer-duration": `${shimmerDuration}s`,
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          } as React.CSSProperties
        }
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
)

ShimmerButton.displayName = "ShimmerButton"
