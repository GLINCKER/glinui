import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const badgeVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-full border font-semibold transition-[transform,background-color,box-shadow,color,border-color,opacity] duration-normal ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none dark:focus-visible:ring-white/45",
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-neutral-900 text-white shadow-[0_4px_12px_-6px_rgb(2_6_23_/_0.5)] dark:border-white/15 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_4px_12px_-6px_rgb(255_255_255_/_0.2)]",

        glass:
          "relative isolate overflow-hidden border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.62),rgb(245_245_245_/_0.36))] text-[var(--color-foreground)] backdrop-blur-md backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_4px_12px_-6px_rgb(2_6_23_/_0.25)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_4px_12px_-6px_rgb(0_0_0_/_0.4)] dark:before:via-white/20",

        liquid:
          "relative isolate overflow-hidden border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_16%,rgb(255_255_255_/_0.88),transparent_40%),linear-gradient(148deg,rgb(255_255_255_/_0.74),rgb(232_232_232_/_0.5))] text-[var(--color-foreground)] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_6px_16px_-8px_rgb(2_6_23_/_0.3)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_80%_72%,rgb(255_255_255_/_0.34),transparent_48%)] before:opacity-80 dark:border-white/[0.12] dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_6px_16px_-8px_rgb(0_0_0_/_0.45)] dark:before:opacity-55",

        matte:
          "relative isolate overflow-hidden border-black/10 bg-[linear-gradient(180deg,rgb(250_250_250),rgb(234_234_236))] text-neutral-900 shadow-[0_1px_0_rgb(255_255_255_/_0.92)_inset,0_4px_10px_-8px_rgb(15_23_42_/_0.25)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.62),transparent)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(53_58_67_/_0.92),rgb(34_38_46_/_0.92))] dark:text-neutral-100 dark:shadow-[0_1px_0_rgb(255_255_255_/_0.12)_inset,0_4px_10px_-8px_rgb(0_0_0_/_0.5)] dark:before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.12),transparent)]",

        glow:
          "border-white/20 bg-neutral-900 text-white shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_0_16px_rgb(255_255_255_/_0.15)] dark:border-white/40 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.55),0_0_16px_rgb(255_255_255_/_0.25)]",

        outline:
          "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]",

        ghost:
          "border-transparent bg-transparent text-[var(--color-foreground)]",

        success:
          "border-emerald-200/60 bg-emerald-50 text-emerald-700 shadow-[0_2px_8px_-4px_rgb(16_185_129_/_0.2)] dark:border-emerald-800/40 dark:bg-emerald-950/50 dark:text-emerald-300 dark:shadow-[0_2px_8px_-4px_rgb(16_185_129_/_0.15)]",

        warning:
          "border-amber-200/60 bg-amber-50 text-amber-700 shadow-[0_2px_8px_-4px_rgb(245_158_11_/_0.2)] dark:border-amber-800/40 dark:bg-amber-950/50 dark:text-amber-300 dark:shadow-[0_2px_8px_-4px_rgb(245_158_11_/_0.15)]",

        destructive:
          "border-red-200/60 bg-red-50 text-red-700 shadow-[0_2px_8px_-4px_rgb(239_68_68_/_0.2)] dark:border-red-800/40 dark:bg-red-950/50 dark:text-red-300 dark:shadow-[0_2px_8px_-4px_rgb(239_68_68_/_0.15)]",

        info:
          "border-blue-200/60 bg-blue-50 text-blue-700 shadow-[0_2px_8px_-4px_rgb(59_130_246_/_0.2)] dark:border-blue-800/40 dark:bg-blue-950/50 dark:text-blue-300 dark:shadow-[0_2px_8px_-4px_rgb(59_130_246_/_0.15)]"
      },
      size: {
        sm: "h-5 px-2 text-[10px] tracking-wide",
        md: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, size, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
))

Badge.displayName = "Badge"
