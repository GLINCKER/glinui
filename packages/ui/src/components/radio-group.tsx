import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "../lib/cn"

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
})

RadioGroup.displayName = "RadioGroup"

export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "h-5 w-5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-2.5 after:w-2.5 after:rounded-full after:bg-[var(--color-accent)]" />
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = "RadioGroupItem"
