import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const cardVariants = cva("rounded-xl border text-[var(--color-foreground)]", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface)] border-[var(--color-border)] shadow-sm",
      glass: [
        "border-white/20 [border-top-color:var(--glass-refraction-top)]",
        "bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.16),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))]",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,var(--shadow-glass-sm)]",
        "dark:border-white/[0.1] dark:[border-top-color:rgb(255_255_255_/_0.15)]",
        "dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.05),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.03),rgb(255_255_255_/_0.01))]",
        "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.05)_inset,0_8px_24px_rgb(0_0_0_/_0.35)]"
      ].join(" "),
      frosted: [
        "border-white/30 [border-top-color:var(--glass-refraction-top)]",
        "bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.32),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.22),rgb(255_255_255_/_0.1))]",
        "backdrop-blur-[40px] backdrop-saturate-[200%]",
        "shadow-[0_0_0_1px_rgb(255_255_255_/_0.15)_inset,0_0_20px_rgb(255_255_255_/_0.12)_inset,var(--shadow-glass-md)]",
        "dark:border-white/[0.15] dark:[border-top-color:rgb(255_255_255_/_0.2)]",
        "dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.1),transparent_50%),linear-gradient(to_bottom,rgb(255_255_255_/_0.06),rgb(255_255_255_/_0.02))]",
        "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_0_20px_rgb(255_255_255_/_0.04)_inset,0_8px_32px_rgb(0_0_0_/_0.4)]"
      ].join(" "),
      liquid: [
        "border-white/25 [border-top-color:var(--glass-refraction-top)]",
        "bg-[radial-gradient(circle_at_16%_14%,rgb(255_255_255_/_0.72),transparent_46%),linear-gradient(165deg,rgb(255_255_255_/_0.58),rgb(238_238_238_/_0.32))]",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,var(--shadow-glass-md)]",
        "dark:border-white/[0.14] dark:[border-top-color:rgb(255_255_255_/_0.32)]",
        "dark:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.05))]",
        "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,0_12px_36px_rgb(0_0_0_/_0.4)]"
      ].join(" "),
      matte: [
        "border-black/10",
        "bg-[linear-gradient(180deg,rgb(250_250_250),rgb(236_236_238))]",
        "shadow-[0_1px_3px_rgb(0_0_0_/_0.06),0_0_0_1px_rgb(0_0_0_/_0.04)_inset]",
        "dark:border-white/[0.14]",
        "dark:bg-[linear-gradient(180deg,rgb(55_60_70_/_0.9),rgb(37_42_50_/_0.9))]",
        "dark:shadow-[0_1px_3px_rgb(0_0_0_/_0.2),0_0_0_1px_rgb(255_255_255_/_0.04)_inset]"
      ].join(" "),
      outline: "bg-transparent border-[var(--color-border)] shadow-sm",
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

export type CardSectionProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardSectionVariants>

export type CardHeaderProps = CardSectionProps

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardSectionVariants({ size }), className)} {...props} />
))

CardHeader.displayName = "CardHeader"

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Additional class names for title text. */
  className?: string
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
)

CardTitle.displayName = "CardTitle"

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Additional class names for description text. */
  className?: string
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-neutral-600", className)} {...props} />
)

CardDescription.displayName = "CardDescription"

export type CardContentProps = CardSectionProps

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardSectionVariants({ size }), className)} {...props} />
))

CardContent.displayName = "CardContent"

export type CardFooterProps = CardSectionProps

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(cardSectionVariants({ size }), className)} {...props} />
))

CardFooter.displayName = "CardFooter"
