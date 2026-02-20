import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const linkVariants = cva(
  "inline-flex items-center gap-1 rounded-md font-medium transition-[color,background-color,border-color,box-shadow] duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/35 focus-visible:ring-offset-2 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "text-[var(--color-foreground)] hover:text-[var(--color-accent)]",
        glass:
          "border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-1-surface)] px-2 py-1 text-[var(--color-foreground)] hover:bg-[var(--glass-2-surface)] dark:border-white/[0.14] dark:bg-white/[0.05]",
        outline:
          "border border-[var(--color-border)] px-2 py-1 text-[var(--color-foreground)] hover:border-[var(--color-accent)]/50 dark:border-white/20",
        ghost: "px-2 py-1 text-[var(--color-foreground)]/80 hover:bg-[var(--glass-1-surface)]"
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      },
      underline: {
        true: "underline underline-offset-4 decoration-[var(--color-accent)]/35",
        false: "no-underline"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      underline: true
    }
  }
)

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants>

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, underline, ...props }, ref) => {
    return (
      <a ref={ref} className={cn(linkVariants({ variant, size, underline }), className)} {...props} />
    )
  }
)

Link.displayName = "Link"
