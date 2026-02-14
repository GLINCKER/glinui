import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-foreground)] border-[var(--color-border)]",
        glass: "backdrop-blur-md bg-surface/80 border border-white/10 text-[var(--color-foreground)]",
        outline: "bg-transparent text-[var(--color-foreground)] border-[var(--color-border)]",
        ghost: "bg-transparent text-[var(--color-foreground)] border-transparent"
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, size, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
))

Badge.displayName = "Badge"
