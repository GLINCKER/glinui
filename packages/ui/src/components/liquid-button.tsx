import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"
import { Button, type ButtonProps } from "./button"

const liquidButtonVariants = cva(
  "relative transform-gpu transition-[transform,box-shadow,filter] duration-normal ease-standard hover:scale-[1.03] hover:shadow-[0_0_0_1px_var(--glass-refraction-top),0_0_28px_rgb(255_255_255_/_0.25)] active:scale-y-[0.97] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-y-100",
  {
    variants: {
      intensity: {
        soft: "hover:brightness-105",
        strong: "hover:brightness-110 hover:shadow-[0_0_0_1px_var(--glass-refraction-top),0_0_36px_rgb(255_255_255_/_0.32)]"
      }
    },
    defaultVariants: {
      intensity: "soft"
    }
  }
)

export type LiquidButtonProps = ButtonProps & VariantProps<typeof liquidButtonVariants>

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, intensity, ...props }, ref) => (
    <Button ref={ref} className={cn(liquidButtonVariants({ intensity }), className)} {...props} />
  )
)

LiquidButton.displayName = "LiquidButton"
