import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const statusDotVariants = cva("inline-flex items-center gap-2", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: {
    size: "md"
  }
})

const dotVariants = cva("rounded-full", {
  variants: {
    status: {
      neutral: "bg-neutral-500",
      info: "bg-sky-500",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      danger: "bg-rose-500"
    },
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5"
    },
    pulse: {
      true: "motion-safe:animate-pulse",
      false: ""
    }
  },
  defaultVariants: {
    status: "neutral",
    size: "md",
    pulse: false
  }
})

export type StatusDotProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusDotVariants> &
  VariantProps<typeof dotVariants> & {
    label?: string
  }

export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, size, status, pulse, label, children, ...props }, ref) => {
    const content = label ?? children

    return (
      <span ref={ref} className={cn(statusDotVariants({ size }), className)} {...props}>
        <span aria-hidden className={cn(dotVariants({ status, size, pulse }))} />
        {content ? <span className="text-[var(--color-foreground)]">{content}</span> : null}
      </span>
    )
  }
)

StatusDot.displayName = "StatusDot"
