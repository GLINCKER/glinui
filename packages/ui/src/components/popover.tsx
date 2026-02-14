import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const popoverTriggerVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-foreground)] border border-[var(--color-border)]",
        glass: "backdrop-blur-md bg-surface/80 border border-white/10 text-[var(--color-foreground)]",
        outline: "bg-transparent border border-[var(--color-border)] text-[var(--color-foreground)]",
        ghost: "bg-transparent border border-transparent text-[var(--color-foreground)]"
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const popoverContentVariants = cva("z-50 rounded-md border p-4 shadow-md outline-none", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-foreground)]",
      glass: "backdrop-blur-md bg-surface/80 border border-white/10 text-[var(--color-foreground)]",
      outline: "bg-transparent border-[var(--color-border)] text-[var(--color-foreground)]",
      ghost: "bg-transparent border-transparent text-[var(--color-foreground)]"
    },
    size: {
      sm: "w-56 text-xs",
      md: "w-72 text-sm",
      lg: "w-80 text-base"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

export const Popover = PopoverPrimitive.Root

export const PopoverTrigger = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> &
    VariantProps<typeof popoverTriggerVariants>
>(({ className, variant, size, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={cn(popoverTriggerVariants({ variant, size }), className)}
    {...props}
  />
))

PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    VariantProps<typeof popoverContentVariants>
>(({ className, align = "center", sideOffset = 8, variant, size, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverContentVariants({ variant, size }), className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export const PopoverClose = PopoverPrimitive.Close
export const PopoverAnchor = PopoverPrimitive.Anchor
