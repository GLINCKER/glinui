import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva } from "class-variance-authority"

import { cn } from "../lib/cn"

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Controlled selected value. */
  value?: string
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string
  /** Called when the selected value changes. */
  onValueChange?: (value: string) => void
  /** Layout direction for radio items. */
  orientation?: "horizontal" | "vertical"
  /** Disables all radio items in the group. */
  disabled?: boolean
}

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
})

RadioGroup.displayName = "RadioGroup"

const radioItemVariants = cva(
  "outline-none transition-[background-color,border-color,box-shadow,transform] duration-fast ease-standard focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none data-[state=checked]:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm focus-visible:ring-[var(--color-accent)]/35 dark:border-white/15 dark:bg-white/[0.04] dark:focus-visible:ring-[var(--color-accent)]/25",
        glass:
          "border border-white/24 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_20%_16%,rgb(255_255_255_/_0.88),transparent_44%),linear-gradient(160deg,rgb(255_255_255_/_0.72),rgb(242_246_250_/_0.48))] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_8px_16px_-12px_rgb(15_23_42_/_0.25)] focus-visible:ring-[var(--color-accent)]/24 dark:border-white/[0.14] dark:bg-white/[0.06] dark:focus-visible:ring-white/15",
        liquid:
          "border border-white/24 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_12%,rgb(255_255_255_/_0.94),transparent_42%),radial-gradient(circle_at_84%_88%,rgb(226_232_240_/_0.58),transparent_58%),linear-gradient(145deg,rgb(255_255_255_/_0.82),rgb(235_241_246_/_0.55))] shadow-[0_0_0_1px_rgb(255_255_255_/_0.24)_inset,0_10px_18px_-12px_rgb(15_23_42_/_0.26)] focus-visible:ring-[var(--color-accent)]/24 dark:border-white/[0.15] dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.13),rgb(255_255_255_/_0.05))] dark:focus-visible:ring-white/16",
        matte:
          "border border-black/12 bg-[linear-gradient(180deg,rgb(249_250_251),rgb(237_239_242))] shadow-[0_1px_0_rgb(255_255_255_/_0.88)_inset,0_6px_14px_-12px_rgb(15_23_42_/_0.24)] focus-visible:ring-black/14 dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(49_54_63_/_0.92),rgb(34_38_46_/_0.92))] dark:focus-visible:ring-white/14",
        outline:
          "border border-[var(--color-border)] bg-transparent focus-visible:ring-[var(--color-accent)]/25 dark:border-white/20"
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    compoundVariants: [
      { size: "sm", class: "rounded-full" },
      { size: "md", class: "rounded-full" },
      { size: "lg", class: "rounded-full" }
    ],
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const radioIndicatorVariants = cva(
  "relative flex h-full w-full items-center justify-center after:block after:rounded-full",
  {
    variants: {
      variant: {
        default: "after:bg-[var(--color-accent)]",
        glass: "after:bg-neutral-900 dark:after:bg-white",
        liquid: "after:bg-neutral-900 dark:after:bg-white",
        matte: "after:bg-neutral-900 dark:after:bg-white",
        outline: "after:bg-[var(--color-accent)]"
      },
      size: {
        sm: "after:h-2 after:w-2",
        md: "after:h-2.5 after:w-2.5",
        lg: "after:h-3 after:w-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Surface treatment for the radio item shell. */
  variant?: "default" | "glass" | "liquid" | "matte" | "outline"
  /** Size of the radio control. */
  size?: "sm" | "md" | "lg"
  /** Value submitted by this radio item when selected. */
  value: string
  /** Disables this radio item. */
  disabled?: boolean
}

export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant = "default", size = "md", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ variant, size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={cn(radioIndicatorVariants({ variant, size }))} />
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = "RadioGroupItem"
