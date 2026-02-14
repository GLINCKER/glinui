import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const inputVariants = cva(
  "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-foreground)] shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-11"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type = "text", ...props }, ref) => {
    return <input ref={ref} type={type} className={cn(inputVariants({ size }), className)} {...props} />
  }
)

Input.displayName = "Input"
