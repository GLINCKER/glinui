import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const sliderVariants = cva("relative flex w-full touch-none select-none items-center", {
  variants: {
    variant: {
      default: "",
      glass: "",
      outline: "",
      ghost: "",
      liquid: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

const trackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full transition-colors duration-fast ease-standard motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-border)]/45 dark:bg-white/[0.12]",
        glass: "bg-[var(--glass-1-surface)] backdrop-blur-md backdrop-saturate-[180%] border border-white/15 [border-top-color:var(--glass-refraction-top)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset] dark:border-white/[0.1]",
        outline: "border border-[var(--color-border)] bg-transparent dark:border-white/20",
        ghost: "bg-[var(--color-foreground)]/[0.12] dark:bg-white/[0.14]",
        liquid:
          "border border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(180deg,rgb(255_255_255_/_0.52),rgb(242_242_242_/_0.32))] shadow-[0_0_0_1px_rgb(255_255_255_/_0.22)_inset] dark:border-white/[0.16] dark:[border-top-color:rgb(255_255_255_/_0.34)] dark:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.06))]"
      },
      size: {
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const rangeVariants = cva("absolute h-full rounded-full", {
  variants: {
    variant: {
      default: "bg-[var(--color-accent)]",
      glass:
        "bg-[var(--color-accent)]/85 shadow-[0_0_0_1px_rgb(255_255_255_/_0.16)_inset,0_0_16px_var(--color-accent)/30]",
      outline: "bg-[var(--color-accent)]/90",
      ghost: "bg-[var(--color-foreground)]/80 dark:bg-white/85",
      liquid: "bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)/35]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

const thumbVariants = cva(
  "block rounded-full border-2 shadow transition-[transform,background-color,border-color,box-shadow] duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-accent)] bg-[var(--color-surface)] hover:scale-105 active:scale-100 dark:bg-[var(--color-background)]",
        glass:
          "bg-[var(--glass-3-surface)] backdrop-blur-md backdrop-saturate-[180%] border-white/30 [border-top-color:var(--glass-refraction-top)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,var(--shadow-glass-sm)] dark:border-white/[0.15] hover:scale-105 active:scale-100",
        outline:
          "border-[var(--color-border)] bg-[var(--color-surface)] hover:scale-105 hover:border-[var(--color-accent)]/70 dark:border-white/20 dark:bg-[var(--color-background)]",
        ghost:
          "border-transparent bg-[var(--color-foreground)] text-[var(--color-background)] hover:scale-105 active:scale-100 dark:bg-white dark:text-[var(--color-background)]",
        liquid:
          "border-[var(--color-accent)] bg-[var(--color-surface)] shadow-[0_0_0_2px_var(--color-accent)/20,0_6px_18px_var(--color-accent)/25] hover:scale-110 active:scale-100 dark:bg-[var(--color-background)]"
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderVariants>

export const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant, size, ...props }, ref) => {
  const values = Array.isArray(props.value)
    ? props.value
    : Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [0]
  const thumbCount = Math.max(values.length, 1)

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(sliderVariants({ variant, size }), className)}
      {...props}
    >
      <SliderPrimitive.Track className={cn(trackVariants({ variant, size }))}>
        <SliderPrimitive.Range className={cn(rangeVariants({ variant }))} />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb key={index} className={cn(thumbVariants({ variant, size }))} />
      ))}
    </SliderPrimitive.Root>
  )
})

Slider.displayName = "Slider"
