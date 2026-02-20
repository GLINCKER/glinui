import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const skeletonVariants = cva(
  "relative isolate overflow-hidden rounded-xl",
  {
    variants: {
      variant: {
        default: "bg-neutral-200/80 dark:bg-neutral-800/80",
        glass:
          "border border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-2-surface)] backdrop-blur-md backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset] dark:border-white/[0.1]",
        liquid:
          "border border-neutral-300/50 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_16%_12%,rgb(255_255_255_/_0.7),transparent_44%),linear-gradient(168deg,rgb(245_245_248),rgb(232_232_236))] dark:border-white/[0.12] dark:[border-top-color:rgb(255_255_255_/_0.2)] dark:bg-[linear-gradient(168deg,rgb(38_40_46),rgb(28_30_34))]",
        matte:
          "border border-black/[0.06] bg-[linear-gradient(180deg,rgb(244_244_246),rgb(232_232_236))] dark:border-white/[0.1] dark:bg-[linear-gradient(180deg,rgb(40_42_48),rgb(30_32_36))]",
        outline:
          "border border-neutral-300 bg-transparent dark:border-neutral-700",
        ghost: "bg-neutral-100 dark:bg-neutral-800/50"
      },
      size: {
        sm: "h-4",
        md: "h-6",
        lg: "h-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const shimmerVariants = cva(
  "pointer-events-none absolute inset-0 motion-safe:animate-skeleton-shimmer motion-reduce:hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/[0.08]",
        glass:
          "bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/[0.06]",
        liquid:
          "bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/[0.1]",
        matte:
          "bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/[0.06]",
        outline:
          "bg-gradient-to-r from-transparent via-neutral-200/60 to-transparent dark:via-white/[0.06]",
        ghost:
          "bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/[0.06]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants> & {
    decorative?: boolean
  }

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden={decorative ? true : undefined}
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    >
      <div className={shimmerVariants({ variant })} />
    </div>
  )
)

Skeleton.displayName = "Skeleton"
