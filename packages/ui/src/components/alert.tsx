import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

/* ── Alert Variants ───────────────────────────────────────────────────────── */

const alertVariants = cva(
  "relative w-full rounded-xl border text-sm transition-[background-color,border-color,box-shadow,color] duration-normal ease-standard [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "relative isolate overflow-hidden border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(244_244_246))] text-[var(--color-foreground)] shadow-[0_1px_0_rgb(255_255_255_/_0.9)_inset,0_10px_22px_-14px_rgb(15_23_42_/_0.3)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.58),transparent)] [&>svg]:text-neutral-600 dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(56_62_72_/_0.94),rgb(36_40_48_/_0.94))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.08)_inset,0_12px_24px_-14px_rgb(0_0_0_/_0.65)] dark:before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.1),transparent)] dark:[&>svg]:text-neutral-300",

        glass:
          "relative isolate overflow-hidden border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.62),rgb(245_245_245_/_0.36))] text-[var(--color-foreground)] backdrop-blur-md backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_8px_20px_-12px_rgb(2_6_23_/_0.25)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_8px_20px_-12px_rgb(0_0_0_/_0.4)] dark:before:via-white/20",

        liquid:
          "relative isolate overflow-hidden border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_16%,rgb(255_255_255_/_0.88),transparent_40%),linear-gradient(148deg,rgb(255_255_255_/_0.74),rgb(232_232_232_/_0.5))] text-[var(--color-foreground)] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_10px_24px_-14px_rgb(2_6_23_/_0.3)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_80%_72%,rgb(255_255_255_/_0.34),transparent_48%)] before:opacity-80 dark:border-white/[0.12] dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_10px_24px_-14px_rgb(0_0_0_/_0.45)] dark:before:opacity-55",

        matte:
          "relative isolate overflow-hidden border-black/10 bg-[linear-gradient(180deg,rgb(250_250_250),rgb(234_234_236))] text-neutral-900 shadow-[0_1px_0_rgb(255_255_255_/_0.92)_inset,0_6px_16px_-10px_rgb(15_23_42_/_0.25)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.62),transparent)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(53_58_67_/_0.92),rgb(34_38_46_/_0.92))] dark:text-neutral-100 dark:shadow-[0_1px_0_rgb(255_255_255_/_0.12)_inset,0_6px_16px_-10px_rgb(0_0_0_/_0.5)] dark:before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.12),transparent)]",

        glow:
          "border-white/20 bg-neutral-900 text-white shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_0_20px_rgb(255_255_255_/_0.15)] [&>svg]:text-white dark:border-white/40 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.55),0_0_20px_rgb(255_255_255_/_0.25)] dark:[&>svg]:text-neutral-950",

        outline:
          "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]",

        ghost:
          "border-transparent bg-transparent text-[var(--color-foreground)]",

        success:
          "border-emerald-200/60 bg-emerald-50 text-emerald-800 shadow-[0_4px_12px_-6px_rgb(16_185_129_/_0.2)] [&>svg]:text-emerald-600 dark:border-emerald-800/40 dark:bg-emerald-950/50 dark:text-emerald-200 dark:shadow-[0_4px_12px_-6px_rgb(16_185_129_/_0.15)] dark:[&>svg]:text-emerald-400",

        warning:
          "border-amber-200/60 bg-amber-50 text-amber-800 shadow-[0_4px_12px_-6px_rgb(245_158_11_/_0.2)] [&>svg]:text-amber-600 dark:border-amber-800/40 dark:bg-amber-950/50 dark:text-amber-200 dark:shadow-[0_4px_12px_-6px_rgb(245_158_11_/_0.15)] dark:[&>svg]:text-amber-400",

        destructive:
          "border-red-200/60 bg-red-50 text-red-800 shadow-[0_4px_12px_-6px_rgb(239_68_68_/_0.2)] [&>svg]:text-red-600 dark:border-red-800/40 dark:bg-red-950/50 dark:text-red-200 dark:shadow-[0_4px_12px_-6px_rgb(239_68_68_/_0.15)] dark:[&>svg]:text-red-400",

        info:
          "border-blue-200/60 bg-blue-50 text-blue-800 shadow-[0_4px_12px_-6px_rgb(59_130_246_/_0.2)] [&>svg]:text-blue-600 dark:border-blue-800/40 dark:bg-blue-950/50 dark:text-blue-200 dark:shadow-[0_4px_12px_-6px_rgb(59_130_246_/_0.15)] dark:[&>svg]:text-blue-400"
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/* ── Alert ────────────────────────────────────────────────────────────────── */

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant, size }), className)} {...props} />
  )
)

Alert.displayName = "Alert"

/* ── AlertTitle ───────────────────────────────────────────────────────────── */

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  )
)

AlertTitle.displayName = "AlertTitle"

/* ── AlertDescription ─────────────────────────────────────────────────────── */

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-current/85 [&_p]:leading-relaxed", className)} {...props} />
  )
)

AlertDescription.displayName = "AlertDescription"
