import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const counterVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-medium tabular-nums transition-[background-color,color,border-color] duration-fast ease-standard motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] dark:border-white/20",
        glass:
          "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-1-surface)] text-[var(--color-foreground)] dark:border-white/[0.14] dark:bg-white/[0.05]",
        outline: "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] dark:border-white/20",
        ghost: "border-transparent bg-[var(--color-foreground)]/[0.08] text-[var(--color-foreground)] dark:bg-white/[0.1]"
      },
      size: {
        sm: "h-5 min-w-5 px-1.5 text-[10px]",
        md: "h-6 min-w-6 px-2 text-xs",
        lg: "h-7 min-w-7 px-2.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type CounterProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> &
  VariantProps<typeof counterVariants> & {
    value: number
    max?: number
  }

export const Counter = React.forwardRef<HTMLSpanElement, CounterProps>(
  ({ className, variant, size, value, max = 99, ...props }, ref) => {
    const displayValue = value > max ? `${max}+` : `${value}`

    return (
      <span ref={ref} className={cn(counterVariants({ variant, size }), className)} {...props}>
        {displayValue}
      </span>
    )
  }
)

Counter.displayName = "Counter"
