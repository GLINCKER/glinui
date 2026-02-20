import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const iconFrameVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-xl border transition-[background-color,color,border-color,box-shadow] duration-fast ease-standard motion-reduce:transition-none",
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
        sm: "h-7 w-7",
        md: "h-9 w-9",
        lg: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type IconFrameProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof iconFrameVariants>

export const IconFrame = React.forwardRef<HTMLSpanElement, IconFrameProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(iconFrameVariants({ variant, size }), className)} {...props} />
    )
  }
)

IconFrame.displayName = "IconFrame"
