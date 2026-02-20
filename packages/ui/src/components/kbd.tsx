import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const kbdVariants = cva(
  "inline-flex min-w-6 items-center justify-center rounded-md border px-1.5 font-mono font-medium uppercase tracking-wide shadow-sm transition-colors duration-fast ease-standard motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] dark:border-white/15",
        glass:
          "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-1-surface)] text-[var(--color-foreground)] dark:border-white/[0.14] dark:bg-white/[0.05]",
        outline: "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] dark:border-white/20",
        ghost: "border-transparent bg-[var(--color-foreground)]/[0.07] text-[var(--color-foreground)] dark:bg-white/[0.1]"
      },
      size: {
        sm: "h-5 text-[10px]",
        md: "h-6 text-[11px]",
        lg: "h-7 text-xs"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type KbdProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof kbdVariants>

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <kbd ref={ref} className={cn(kbdVariants({ variant, size }), className)} {...props} />
  }
)

Kbd.displayName = "Kbd"
