import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const glassCardVariants = cva(
  "relative rounded-2xl border [border-color:var(--glass-border)] [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] [backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-3-blur))] [-webkit-backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-3-blur))] shadow-[var(--glass-3-shadow)] transition-[transform,box-shadow,backdrop-filter,background-color] duration-normal ease-standard hover:-translate-y-0.5 hover:bg-[var(--glass-4-surface)] hover:[backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-4-blur))] hover:[-webkit-backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-4-blur))] hover:shadow-[var(--glass-4-shadow)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:translate-y-0",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const glassCardSectionVariants = cva("", {
  variants: {
    size: {
      sm: "space-y-1",
      md: "space-y-1.5",
      lg: "space-y-2"
    }
  },
  defaultVariants: {
    size: "md"
  }
})

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glassCardVariants>

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(glassCardVariants({ size }), className)} {...props} />
))

GlassCard.displayName = "GlassCard"

type GlassCardSectionProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glassCardSectionVariants>

export const GlassCardHeader = React.forwardRef<HTMLDivElement, GlassCardSectionProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(glassCardSectionVariants({ size }), className)} {...props} />
  )
)

GlassCardHeader.displayName = "GlassCardHeader"

export const GlassCardContent = React.forwardRef<HTMLDivElement, GlassCardSectionProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(glassCardSectionVariants({ size }), className)} {...props} />
  )
)

GlassCardContent.displayName = "GlassCardContent"

export const GlassCardFooter = React.forwardRef<HTMLDivElement, GlassCardSectionProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(glassCardSectionVariants({ size }), className)} {...props} />
  )
)

GlassCardFooter.displayName = "GlassCardFooter"
