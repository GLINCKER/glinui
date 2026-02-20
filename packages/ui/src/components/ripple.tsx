import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const rippleVariants = cva("absolute rounded-full", {
  variants: {
    variant: {
      default: "border border-neutral-300/50 dark:border-neutral-600/50",
      glass:
        "border border-white/20 [border-top-color:var(--glass-refraction-top)] dark:border-white/10",
      accent: "border border-[var(--color-accent)]/30 dark:border-[var(--color-accent)]/20"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export interface RippleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rippleVariants> {
  count?: number
  duration?: number
  delay?: number
}

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  (
    { className, variant, count = 3, duration = 2, delay = 0.4, style, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            rippleVariants({ variant }),
            "motion-safe:animate-[ripple-expand_var(--ripple-duration,2s)_ease-out_infinite]",
            "motion-reduce:hidden"
          )}
          style={
            {
              "--ripple-duration": `${duration}s`,
              width: `${60 + i * 40}%`,
              height: `${60 + i * 40}%`,
              animationDelay: `${i * delay}s`,
              ...style,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
)

Ripple.displayName = "Ripple"
