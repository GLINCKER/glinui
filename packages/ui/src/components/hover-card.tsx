import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const hoverCardContentVariants = cva(
  "z-50 rounded-xl border p-4 text-[var(--color-foreground)] shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(244_244_246))] shadow-[0_1px_0_rgb(255_255_255_/_0.9)_inset,0_14px_28px_-18px_rgb(15_23_42_/_0.35)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(56_62_72_/_0.94),rgb(37_42_50_/_0.94))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.08)_inset,0_16px_32px_-18px_rgb(0_0_0_/_0.68)]",
        glass:
          "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.66),rgb(246_246_246_/_0.36))] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_14px_30px_-18px_rgb(15_23_42_/_0.32)] dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.15),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_16px_34px_-18px_rgb(0_0_0_/_0.66)]",
        outline: "border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]",
        ghost: "border-transparent bg-[var(--color-surface)]/90 shadow-none"
      },
      size: {
        sm: "w-56 text-xs",
        md: "w-72 text-sm",
        lg: "w-80 text-sm"
      }
    },
    defaultVariants: {
      variant: "glass",
      size: "md"
    }
  }
)

export type HoverCardProps = Omit<
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>,
  "openDelay" | "closeDelay"
> & {
  /** Delay in ms before opening on pointer/focus. */
  openDelay?: number
  /** Delay in ms before closing when pointer leaves. */
  closeDelay?: number
}

export const HoverCard = ({
  openDelay = 200,
  closeDelay = 100,
  ...props
}: HoverCardProps) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    {...props}
  />
)

export const HoverCardTrigger = HoverCardPrimitive.Trigger

export type HoverCardContentProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
> &
  VariantProps<typeof hoverCardContentVariants> & {
    /** Preferred side for the hover card. */
    side?: "top" | "right" | "bottom" | "left"
    /** Gap in px between trigger and content. */
    sideOffset?: number
  }

export const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(
  (
    {
      className,
      align = "center",
      sideOffset = 10,
      variant,
      size,
      ...props
    },
    ref
  ) => (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(hoverCardContentVariants({ variant, size }), className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
)

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName
