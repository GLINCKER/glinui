import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-medium transition-[background-color,color,border-color,box-shadow] duration-fast ease-standard motion-reduce:transition-none",
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
      tone: {
        neutral: "",
        info: "text-sky-700 dark:text-sky-300",
        success: "text-emerald-700 dark:text-emerald-300",
        warning: "text-amber-700 dark:text-amber-300",
        danger: "text-rose-700 dark:text-rose-300"
      },
      size: {
        sm: "h-5 px-2 text-[10px]",
        md: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      tone: "neutral",
      size: "md"
    }
  }
)

export type ChipProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof chipVariants>

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, tone, size, ...props }, ref) => {
    return <span ref={ref} className={cn(chipVariants({ variant, tone, size }), className)} {...props} />
  }
)

Chip.displayName = "Chip"
