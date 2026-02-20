import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const gradientVariants = cva(
  "motion-safe:animate-[gradient-shift_var(--gradient-duration,6s)_ease_infinite] [background-size:200%_200%]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,var(--color-background),var(--color-surface),var(--color-accent),var(--color-background))]",
        glass:
          "border border-white/20 [border-top-color:var(--glass-refraction-top)] backdrop-blur-sm bg-[linear-gradient(135deg,rgb(255_255_255/0.06),rgb(255_255_255/0.15),rgb(255_255_255/0.06))] dark:bg-[linear-gradient(135deg,rgb(255_255_255/0.03),rgb(255_255_255/0.08),rgb(255_255_255/0.03))]",
        warm:
          "bg-[linear-gradient(135deg,#fef3c7,#fde68a,#fbbf24,#f59e0b,#fef3c7)] dark:bg-[linear-gradient(135deg,#78350f,#92400e,#b45309,#d97706,#78350f)]",
        cool:
          "bg-[linear-gradient(135deg,#dbeafe,#bfdbfe,#93c5fd,#60a5fa,#dbeafe)] dark:bg-[linear-gradient(135deg,#1e3a5f,#1e40af,#2563eb,#3b82f6,#1e3a5f)]",
        aurora:
          "bg-[linear-gradient(135deg,#c084fc,#818cf8,#6366f1,#a78bfa,#c084fc)] dark:bg-[linear-gradient(135deg,#581c87,#3730a3,#4338ca,#6d28d9,#581c87)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface AnimatedGradientProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientVariants> {
  duration?: number
}

export const AnimatedGradient = React.forwardRef<HTMLDivElement, AnimatedGradientProps>(
  ({ className, variant, duration = 6, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        gradientVariants({ variant }),
        "motion-reduce:animate-none",
        className
      )}
      style={
        {
          "--gradient-duration": `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
)

AnimatedGradient.displayName = "AnimatedGradient"
