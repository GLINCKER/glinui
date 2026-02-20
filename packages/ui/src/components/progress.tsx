import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const progressVariants = cva("relative w-full overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: "bg-neutral-200 dark:bg-neutral-800",
      glass:
        "border border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-2-surface)] backdrop-blur-md backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset] dark:border-white/[0.14]",
      liquid:
        "border border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_16%_12%,rgb(255_255_255_/_0.8),transparent_44%),linear-gradient(168deg,rgb(255_255_255_/_0.6),rgb(236_236_236_/_0.34))] dark:border-white/[0.14] dark:[border-top-color:rgb(255_255_255_/_0.3)] dark:bg-[linear-gradient(168deg,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.05))]",
      matte:
        "border border-black/10 bg-[linear-gradient(180deg,rgb(250_250_251),rgb(236_236_238))] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(50_55_64_/_0.9),rgb(35_39_47_/_0.9))]"
    },
    size: {
      sm: "h-2",
      md: "h-3",
      lg: "h-4"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

const indicatorVariants = cva(
  "h-full rounded-full transition-[width] duration-normal ease-standard motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 dark:bg-neutral-100",
        glass:
          "bg-neutral-900/85 shadow-[0_0_10px_rgb(15_23_42_/_0.2)] dark:bg-white/85 dark:shadow-[0_0_10px_rgb(255_255_255_/_0.15)]",
        liquid:
          "bg-[linear-gradient(90deg,rgb(15_23_42_/_0.92),rgb(30_41_59_/_0.9))] shadow-[0_0_14px_rgb(15_23_42_/_0.26)] dark:bg-[linear-gradient(90deg,rgb(248_250_252_/_0.92),rgb(226_232_240_/_0.82))] dark:shadow-[0_0_16px_rgb(226_232_240_/_0.24)]",
        matte: "bg-neutral-900 dark:bg-neutral-100"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const indeterminateIndicatorVariants = cva(
  "w-1/2 motion-safe:animate-pulse motion-reduce:animate-none",
  {
    variants: {
      variant: {
        default: "opacity-85",
        glass: "opacity-90",
        liquid: "opacity-90",
        matte: "opacity-90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const progressCircleVariants = cva("relative inline-flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      sm: "h-12 w-12 text-[11px]",
      md: "h-16 w-16 text-xs",
      lg: "h-24 w-24 text-sm"
    }
  },
  defaultVariants: {
    size: "md"
  }
})

const progressCircleTrackVariants = cva("fill-none", {
  variants: {
    variant: {
      default: "stroke-neutral-300 dark:stroke-neutral-700",
      glass: "stroke-neutral-300/70 dark:stroke-white/[0.22]",
      liquid: "stroke-neutral-300/85 dark:stroke-white/[0.2]",
      matte: "stroke-neutral-300 dark:stroke-white/[0.16]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

const progressCircleIndicatorVariants = cva(
  "fill-none transition-[stroke-dashoffset,stroke] duration-normal ease-standard motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "stroke-neutral-900 dark:stroke-neutral-100",
        glass:
          "stroke-neutral-900/85 drop-shadow-[0_0_6px_rgb(15_23_42_/_0.2)] dark:stroke-white/85 dark:drop-shadow-[0_0_6px_rgb(255_255_255_/_0.15)]",
        liquid:
          "stroke-neutral-900 drop-shadow-[0_0_6px_rgb(15_23_42_/_0.25)] dark:stroke-neutral-100 dark:drop-shadow-[0_0_6px_rgb(255_255_255_/_0.18)]",
        matte: "stroke-neutral-900 dark:stroke-neutral-100"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants> & {
    /** Current progress value from 0 to 100. */
    value?: number
    /** Render loading state without aria-valuenow and fixed width indicator. */
    indeterminate?: boolean
  }

export const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, size, indeterminate = false, ...props }, ref) => {
  const clampedValue = Math.max(0, Math.min(100, value ?? 0))

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ variant, size }), className)}
      value={indeterminate ? undefined : clampedValue}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          indicatorVariants({ variant }),
          indeterminate && indeterminateIndicatorVariants({ variant })
        )}
        style={indeterminate ? undefined : { width: `${clampedValue}%` }}
      />
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = "Progress"

export type ProgressCircleProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> &
  VariantProps<typeof progressCircleVariants> & {
    value?: number
    variant?: NonNullable<VariantProps<typeof progressVariants>["variant"]>
    strokeWidth?: number
    cap?: "round" | "square" | "butt"
    indeterminate?: boolean
    showValue?: boolean
    formatValue?: (value: number) => React.ReactNode
  }

export const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      className,
      value,
      variant = "default",
      size,
      strokeWidth = 4,
      cap = "round",
      indeterminate = false,
      showValue = true,
      formatValue,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.max(0, Math.min(100, value ?? 0))
    const normalizedStrokeWidth = Math.max(2, Math.min(10, strokeWidth))
    const viewBoxSize = 44
    const center = viewBoxSize / 2
    const radius = center - normalizedStrokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const dashOffset = indeterminate
      ? circumference * 0.25
      : circumference - (clampedValue / 100) * circumference
    const dashArray = indeterminate ? circumference * 0.7 : circumference

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        className={cn(progressCircleVariants({ size }), className)}
        {...props}
      >
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className={cn("size-full -rotate-90", indeterminate && "motion-safe:animate-spin")}
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={normalizedStrokeWidth}
            className={cn(progressCircleTrackVariants({ variant }))}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={normalizedStrokeWidth}
            strokeLinecap={cap}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className={cn(progressCircleIndicatorVariants({ variant }))}
          />
        </svg>
        {showValue && !indeterminate ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-medium text-[var(--color-foreground)]">
            {formatValue ? formatValue(clampedValue) : `${Math.round(clampedValue)}%`}
          </span>
        ) : null}
      </div>
    )
  }
)

ProgressCircle.displayName = "ProgressCircle"

export const CircularProgress = ProgressCircle
