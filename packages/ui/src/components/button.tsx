import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-transparent font-medium transition-[transform,background-color,box-shadow,color,border-color,opacity] duration-normal ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 motion-reduce:transition-none dark:focus-visible:ring-white/45",
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-neutral-900 text-white shadow-[0_12px_26px_-16px_rgb(2_6_23_/_0.65)] hover:-translate-y-px hover:bg-neutral-800 active:translate-y-0 dark:border-white/15 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_10px_24px_-14px_rgb(255_255_255_/_0.28)] dark:hover:bg-white",
        glass:
          "relative isolate overflow-hidden border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.62),rgb(245_245_245_/_0.36))] text-[var(--color-foreground)] backdrop-blur-md backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_10px_20px_-16px_rgb(2_6_23_/_0.35)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent hover:-translate-y-px hover:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.72),rgb(235_235_235_/_0.44))] hover:shadow-[0_0_0_1px_rgb(255_255_255_/_0.24)_inset,var(--shadow-glass-md)] active:translate-y-0 dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,0_8px_20px_-12px_rgb(0_0_0_/_0.5)] dark:before:via-white/20 dark:hover:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.06))] dark:hover:shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_12px_28px_-12px_rgb(0_0_0_/_0.55)]",
        liquid:
          "relative isolate overflow-hidden border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_16%,rgb(255_255_255_/_0.88),transparent_40%),linear-gradient(148deg,rgb(255_255_255_/_0.74),rgb(232_232_232_/_0.5))] text-[var(--color-foreground)] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_14px_26px_-16px_rgb(2_6_23_/_0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_80%_72%,rgb(255_255_255_/_0.34),transparent_48%),radial-gradient(circle_at_36%_82%,rgb(229_229_229_/_0.3),transparent_54%)] before:opacity-80 after:pointer-events-none after:absolute after:-inset-y-16 after:-left-20 after:w-24 after:rotate-12 after:bg-[linear-gradient(100deg,transparent_20%,rgb(255_255_255_/_0.82)_50%,transparent_80%)] after:opacity-60 after:blur-sm after:transition-transform after:duration-slow after:ease-standard hover:-translate-y-px hover:border-white/35 hover:[border-top-color:rgb(255_255_255_/_0.78)] hover:bg-[radial-gradient(circle_at_18%_16%,rgb(255_255_255_/_0.95),transparent_42%),linear-gradient(148deg,rgb(255_255_255_/_0.8),rgb(224_224_224_/_0.56))] hover:shadow-[0_0_0_1px_rgb(255_255_255_/_0.34),0_0_0_1px_rgb(255_255_255_/_0.24)_inset,var(--shadow-glass-lg)] hover:after:translate-x-28 motion-reduce:after:transition-none dark:border-white/[0.12] dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_10px_24px_-12px_rgb(0_0_0_/_0.5)] dark:hover:border-white/[0.24] dark:hover:[border-top-color:rgb(255_255_255_/_0.38)] dark:hover:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.18),rgb(255_255_255_/_0.07))] dark:hover:shadow-[0_0_0_1px_rgb(255_255_255_/_0.2),0_0_0_1px_rgb(255_255_255_/_0.14)_inset,0_14px_30px_-12px_rgb(0_0_0_/_0.55)] dark:before:opacity-55 dark:after:opacity-40",
        matte:
          "relative isolate overflow-hidden border-black/10 bg-[linear-gradient(180deg,rgb(250_250_250),rgb(234_234_236))] text-neutral-900 shadow-[0_1px_0_rgb(255_255_255_/_0.92)_inset,0_8px_18px_-14px_rgb(15_23_42_/_0.3)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.62),transparent)] backdrop-saturate-150 hover:-translate-y-px hover:bg-[linear-gradient(180deg,rgb(255_255_255),rgb(238_238_240))] hover:shadow-[0_1px_0_rgb(255_255_255_/_0.96)_inset,0_12px_22px_-14px_rgb(15_23_42_/_0.36)] active:translate-y-0 dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(53_58_67_/_0.92),rgb(34_38_46_/_0.92))] dark:text-neutral-100 dark:shadow-[0_1px_0_rgb(255_255_255_/_0.12)_inset,0_10px_24px_-14px_rgb(0_0_0_/_0.62)] dark:before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.12),transparent)] dark:hover:bg-[linear-gradient(180deg,rgb(60_66_76_/_0.92),rgb(38_43_52_/_0.92))] dark:hover:shadow-[0_1px_0_rgb(255_255_255_/_0.18)_inset,0_14px_28px_-14px_rgb(0_0_0_/_0.66)]",
        glow:
          "border-white/20 bg-neutral-900 text-white shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_10px_18px_-12px_rgb(2_6_23_/_0.55),0_0_24px_rgb(255_255_255_/_0.2)] hover:-translate-y-px hover:shadow-[0_0_0_1px_rgb(255_255_255_/_0.14)_inset,0_14px_24px_-12px_rgb(2_6_23_/_0.6),0_0_36px_rgb(255_255_255_/_0.34)] active:translate-y-0 dark:border-white/40 dark:bg-neutral-100 dark:text-neutral-950 dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.55),0_0_20px_rgb(255_255_255_/_0.3)] dark:hover:shadow-[0_0_0_1px_rgb(255_255_255_/_0.62),0_0_34px_rgb(255_255_255_/_0.42)]",
        outline:
          "border-[var(--color-border)] bg-[var(--color-surface)]/75 text-[var(--color-foreground)] shadow-sm hover:-translate-y-px hover:bg-[var(--color-surface)] active:translate-y-0",
        ghost:
          "border-transparent bg-transparent text-[var(--color-foreground)] hover:bg-[var(--glass-1-surface)] hover:[border-top-color:var(--glass-refraction-top)] hover:border-white/10 dark:hover:bg-white/[0.06]"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ size, variant }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
