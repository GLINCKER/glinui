"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

/* ── Avatar Variants ──────────────────────────────────────────────────────── */

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden border transition-[box-shadow,transform,border-color,background-color,opacity] duration-normal ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none dark:focus-visible:ring-white/45",
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-neutral-900 text-white shadow-[0_4px_12px_-6px_rgb(2_6_23_/_0.45)] dark:border-white/15 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_4px_12px_-6px_rgb(255_255_255_/_0.18)]",

        glass:
          "relative isolate border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.62),rgb(245_245_245_/_0.36))] text-[var(--color-foreground)] backdrop-blur-md backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_4px_12px_-6px_rgb(2_6_23_/_0.2)] dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_4px_12px_-6px_rgb(0_0_0_/_0.35)]",

        liquid:
          "relative isolate border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_16%,rgb(255_255_255_/_0.88),transparent_40%),linear-gradient(148deg,rgb(255_255_255_/_0.74),rgb(232_232_232_/_0.5))] text-[var(--color-foreground)] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_6px_16px_-8px_rgb(2_6_23_/_0.25)] dark:border-white/[0.12] dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_6px_16px_-8px_rgb(0_0_0_/_0.4)]",

        matte:
          "relative isolate border-black/10 bg-[linear-gradient(180deg,rgb(250_250_250),rgb(234_234_236))] text-neutral-900 shadow-[0_1px_0_rgb(255_255_255_/_0.92)_inset,0_4px_10px_-6px_rgb(15_23_42_/_0.22)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(53_58_67_/_0.92),rgb(34_38_46_/_0.92))] dark:text-neutral-100 dark:shadow-[0_1px_0_rgb(255_255_255_/_0.12)_inset,0_4px_10px_-6px_rgb(0_0_0_/_0.45)]",

        glow:
          "border-white/20 bg-neutral-900 text-white shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_0_16px_rgb(255_255_255_/_0.15)] dark:border-white/40 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.55),0_0_16px_rgb(255_255_255_/_0.25)]",

        outline:
          "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]",

        ghost:
          "border-transparent bg-transparent text-[var(--color-foreground)]"
      },
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-14 w-14 text-lg",
        "2xl": "h-20 w-20 text-2xl"
      },
      radius: {
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
        square: "rounded-none"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "full"
    }
  }
)

/* ── Fallback Variants ────────────────────────────────────────────────────── */

const avatarFallbackVariants = cva("inline-flex h-full w-full items-center justify-center font-semibold uppercase select-none", {
  variants: {
    variant: {
      default: "text-white dark:text-neutral-950",
      glass: "text-[var(--color-foreground)]",
      liquid: "text-[var(--color-foreground)]",
      matte: "text-neutral-900 dark:text-neutral-100",
      glow: "text-white dark:text-neutral-950",
      outline: "text-[var(--color-foreground)]/85",
      ghost: "text-[var(--color-foreground)]/75"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

/* ── Status Ring ──────────────────────────────────────────────────────────── */

const statusColors = {
  online: "bg-emerald-500 shadow-[0_0_0_2px_var(--color-background)]",
  offline: "bg-neutral-400 shadow-[0_0_0_2px_var(--color-background)] dark:bg-neutral-500",
  busy: "bg-red-500 shadow-[0_0_0_2px_var(--color-background)]",
  away: "bg-amber-500 shadow-[0_0_0_2px_var(--color-background)]"
} as const

const statusSizes = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
  "2xl": "h-4 w-4"
} as const

export type AvatarStatus = keyof typeof statusColors

/* ── Avatar Component ─────────────────────────────────────────────────────── */

export type AvatarProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof avatarVariants> & {
    src?: string
    alt?: string
    fallback?: string
    imgClassName?: string
    fallbackClassName?: string
    /** Online/offline status indicator */
    status?: AvatarStatus
    /** Ring color for grouped avatars or emphasis */
    ring?: boolean
  }

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      src,
      alt = "",
      fallback,
      imgClassName,
      fallbackClassName,
      status,
      ring,
      children,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false)

    React.useEffect(() => {
      setImgError(false)
    }, [src])

    const showImage = src && !imgError
    const resolvedSize = size ?? "md"

    return (
      <span
        ref={ref}
        className={cn(
          avatarVariants({ variant, size, radius }),
          ring && "ring-2 ring-[var(--color-background)] ring-offset-2 ring-offset-[var(--color-background)]",
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={cn("h-full w-full object-cover", imgClassName)}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={cn(avatarFallbackVariants({ variant }), fallbackClassName)}>
            {fallback ?? children ?? alt?.charAt(0)?.toUpperCase() ?? "?"}
          </span>
        )}

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full",
              statusColors[status],
              statusSizes[resolvedSize]
            )}
            aria-label={status}
          />
        )}
      </span>
    )
  }
)

Avatar.displayName = "Avatar"

/* ── AvatarGroup ──────────────────────────────────────────────────────────── */

export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Max avatars to show before +N overflow */
  max?: number
  /** Overlap spacing */
  spacing?: "tight" | "normal" | "loose"
}

const spacingMap = {
  tight: "-space-x-3",
  normal: "-space-x-2",
  loose: "-space-x-1"
} as const

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, spacing = "normal", children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visible = max ? childArray.slice(0, max) : childArray
    const overflow = max ? childArray.length - max : 0

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingMap[spacing], className)}
        {...props}
      >
        {visible.map((child, i) => (
          <span key={i} className="relative ring-2 ring-[var(--color-background)] rounded-full">
            {child}
          </span>
        ))}
        {overflow > 0 && (
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold text-[var(--color-foreground)] ring-2 ring-[var(--color-background)]">
            +{overflow}
          </span>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"
