import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

import { cn } from "../lib/cn"

const checkboxVariants = cva(
  "peer shrink-0 outline-none transition-[background-color,border-color,box-shadow,transform] duration-fast ease-standard focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none data-[state=checked]:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm focus-visible:ring-[var(--color-accent)]/35 data-[state=checked]:border-[var(--color-accent)] data-[state=checked]:bg-[var(--color-accent)] dark:border-white/15 dark:bg-white/[0.04] dark:focus-visible:ring-[var(--color-accent)]/25",
        glass:
          "border border-white/24 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_20%_16%,rgb(255_255_255_/_0.88),transparent_44%),linear-gradient(160deg,rgb(255_255_255_/_0.72),rgb(242_246_250_/_0.48))] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_8px_16px_-12px_rgb(15_23_42_/_0.25)] focus-visible:ring-[var(--color-accent)]/24 data-[state=checked]:border-white/40 data-[state=checked]:bg-neutral-900 data-[state=checked]:[border-top-color:rgb(255_255_255_/_0.9)] dark:border-white/[0.14] dark:bg-white/[0.06] dark:focus-visible:ring-white/15 dark:data-[state=checked]:border-white/[0.3] dark:data-[state=checked]:bg-white",
        frosted:
          "border border-white/30 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_20%_16%,rgb(255_255_255_/_0.94),transparent_44%),linear-gradient(160deg,rgb(255_255_255_/_0.85),rgb(242_246_250_/_0.65))] shadow-[0_0_0_1px_rgb(255_255_255_/_0.25)_inset,0_0_12px_rgb(255_255_255_/_0.1)_inset,0_8px_16px_-12px_rgb(15_23_42_/_0.28)] focus-visible:ring-[var(--color-accent)]/24 data-[state=checked]:border-white/40 data-[state=checked]:bg-neutral-900 data-[state=checked]:[border-top-color:rgb(255_255_255_/_0.9)] dark:border-white/[0.16] dark:bg-white/[0.08] dark:focus-visible:ring-white/18 dark:data-[state=checked]:border-white/[0.3] dark:data-[state=checked]:bg-white",
        liquid:
          "border border-white/24 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_12%,rgb(255_255_255_/_0.94),transparent_42%),radial-gradient(circle_at_84%_88%,rgb(226_232_240_/_0.58),transparent_58%),linear-gradient(145deg,rgb(255_255_255_/_0.82),rgb(235_241_246_/_0.55))] shadow-[0_0_0_1px_rgb(255_255_255_/_0.24)_inset,0_10px_18px_-12px_rgb(15_23_42_/_0.26)] focus-visible:ring-[var(--color-accent)]/24 data-[state=checked]:border-white/44 data-[state=checked]:bg-neutral-900 data-[state=checked]:[border-top-color:rgb(255_255_255_/_0.92)] dark:border-white/[0.15] dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.13),rgb(255_255_255_/_0.05))] dark:focus-visible:ring-white/16 dark:data-[state=checked]:border-white/[0.34] dark:data-[state=checked]:bg-white",
        matte:
          "border border-black/12 bg-[linear-gradient(180deg,rgb(249_250_251),rgb(237_239_242))] shadow-[0_1px_0_rgb(255_255_255_/_0.88)_inset,0_6px_14px_-12px_rgb(15_23_42_/_0.24)] focus-visible:ring-black/14 data-[state=checked]:border-black/65 data-[state=checked]:bg-black dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(49_54_63_/_0.92),rgb(34_38_46_/_0.92))] dark:focus-visible:ring-white/14 dark:data-[state=checked]:border-white/70 dark:data-[state=checked]:bg-white",
        outline:
          "border border-[var(--color-border)] bg-transparent focus-visible:ring-[var(--color-accent)]/25 data-[state=checked]:border-[var(--color-accent)] data-[state=checked]:bg-[var(--color-accent)] dark:border-white/20"
      },
      size: {
        sm: "h-4 w-4 rounded-[0.3rem]",
        md: "h-5 w-5 rounded",
        lg: "h-6 w-6 rounded-md"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const checkboxIconVariants = cva("", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    }
  },
  defaultVariants: {
    size: "md"
  }
})

const checkboxIndicatorVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "text-[var(--color-accent-foreground)]",
      glass: "text-white dark:text-neutral-900",
      frosted: "text-white dark:text-neutral-900",
      liquid: "text-white dark:text-neutral-900",
      matte: "text-white dark:text-neutral-900",
      outline: "text-[var(--color-accent-foreground)]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant, size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn(checkboxIndicatorVariants({ variant }))}>
        <Check className={cn(checkboxIconVariants({ size }))} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = "Checkbox"
