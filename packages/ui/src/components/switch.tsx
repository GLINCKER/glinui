import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-fast ease-standard outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neutral-300 shadow-sm data-[state=checked]:bg-[var(--color-accent)] dark:bg-neutral-700",
        glass: [
          "border-white/20 [border-top-color:var(--glass-refraction-top)]",
          "bg-[var(--glass-2-surface)] backdrop-blur-md backdrop-saturate-[180%]",
          "shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-soft)]",
          "data-[state=checked]:bg-[var(--color-accent)]/85 data-[state=checked]:border-[var(--color-accent)]/30",
          "dark:border-white/[0.1] dark:data-[state=checked]:bg-[var(--color-accent)]/80"
        ].join(" "),
        frosted: [
          "border-white/30 [border-top-color:var(--glass-refraction-top)]",
          "bg-[var(--glass-3-surface)] backdrop-blur-[40px] backdrop-saturate-[200%]",
          "shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_0_12px_rgb(255_255_255_/_0.1)_inset,var(--shadow-soft)]",
          "data-[state=checked]:bg-[var(--color-accent)]/85 data-[state=checked]:border-[var(--color-accent)]/30",
          "dark:border-white/[0.14] dark:data-[state=checked]:bg-[var(--color-accent)]/80"
        ].join(" "),
        liquid: [
          "border-white/25 [border-top-color:var(--glass-refraction-top)]",
          "bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255_/_0.6),transparent_50%),linear-gradient(165deg,rgb(255_255_255_/_0.5),rgb(238_238_238_/_0.3))]",
          "backdrop-blur-xl backdrop-saturate-[180%]",
          "shadow-[0_0_0_1px_rgb(255_255_255_/_0.18)_inset,0_2px_6px_rgb(0_0_0_/_0.06)]",
          "data-[state=checked]:bg-[var(--color-accent)] data-[state=checked]:border-[var(--color-accent)]/30",
          "data-[state=checked]:shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_0_14px_var(--color-accent)/25]",
          "dark:border-white/[0.14] dark:[border-top-color:rgb(255_255_255_/_0.32)]",
          "dark:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.1),rgb(255_255_255_/_0.04))]",
          "dark:data-[state=checked]:bg-[var(--color-accent)]/85"
        ].join(" "),
        matte: [
          "border-black/10",
          "bg-[linear-gradient(180deg,rgb(220_220_224),rgb(200_200_206))]",
          "shadow-[0_1px_2px_rgb(0_0_0_/_0.06),0_0_0_1px_rgb(0_0_0_/_0.03)_inset]",
          "data-[state=checked]:bg-[var(--color-accent)]",
          "dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_60_70_/_0.8),rgb(40_44_52_/_0.8))]"
        ].join(" ")
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const thumbVariants = cva(
  "pointer-events-none block h-5 w-5 translate-x-0.5 rounded-full shadow transition-transform duration-fast ease-standard data-[state=checked]:translate-x-5 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-white",
        glass: [
          "bg-white border border-white/30 [border-top-color:var(--glass-refraction-top)]",
          "shadow-[0_1px_3px_rgb(0_0_0_/_0.12),0_0_0_1px_rgb(255_255_255_/_0.3)_inset]",
          "dark:bg-white/95 dark:border-white/20"
        ].join(" "),
        frosted: [
          "bg-white border border-white/40 [border-top-color:var(--glass-refraction-top)]",
          "shadow-[0_1px_3px_rgb(0_0_0_/_0.14),0_0_0_1px_rgb(255_255_255_/_0.35)_inset,0_0_8px_rgb(255_255_255_/_0.1)_inset]",
          "dark:bg-white/95 dark:border-white/25"
        ].join(" "),
        liquid: [
          "bg-white border border-white/40 [border-top-color:var(--glass-refraction-top)]",
          "shadow-[0_2px_6px_rgb(0_0_0_/_0.14),0_0_0_1px_rgb(255_255_255_/_0.4)_inset]",
          "dark:bg-white/95 dark:border-white/25"
        ].join(" "),
        matte: "bg-white dark:bg-neutral-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  "onCheckedChange"
> &
  VariantProps<typeof switchVariants> & {
    /** Controlled checked state. */
    checked?: boolean
    /** Initial checked state for uncontrolled usage. */
    defaultChecked?: boolean
    /** Callback fired when the checked state changes. */
    onCheckedChange?: (checked: boolean) => void
    /** Prevents interaction and applies muted styling. */
    disabled?: boolean
    /** Marks the switch as required within a form. */
    required?: boolean
    /** Form field name submitted with form data. */
    name?: string
    /** Value submitted with the form when checked. */
    value?: string
  }

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, variant, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(switchVariants({ variant }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className={cn(thumbVariants({ variant }))} />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = "Switch"
