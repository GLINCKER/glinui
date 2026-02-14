import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const cardVariants = cva("rounded-xl border text-[var(--color-foreground)] shadow-sm", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface)] border-[var(--color-border)]",
      glass: "backdrop-blur-md bg-surface/80 border border-white/10",
      outline: "bg-transparent border-[var(--color-border)]",
      ghost: "bg-transparent border-transparent"
    },
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

const cardSectionVariants = cva("", {
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

export type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardVariants({ variant, size }), className)} {...props} />
))

Card.displayName = "Card"

type CardSectionProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardSectionVariants>

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardSectionVariants({ size }), className)} {...props} />
))

CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
)

CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-neutral-600", className)} {...props} />
)

CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardSectionVariants({ size }), className)} {...props} />
))

CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardSectionVariants({ size }), className)} {...props} />
))

CardFooter.displayName = "CardFooter"
