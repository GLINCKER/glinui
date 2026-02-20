import * as React from "react"
import { cn } from "../lib/cn"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orbit radius in px */
  radius?: number
  /** Full orbit duration in seconds */
  duration?: number
  /** Animation delay in seconds */
  delay?: number
  /** Reverse orbit direction */
  reverse?: boolean
  /** Show orbit path ring */
  path?: boolean
  /** Starting angle in degrees */
  startAngle?: number
  /** Visual variant */
  variant?: "default" | "glass" | "3d"
  /** Size of the orbiting container in px */
  iconSize?: number
}

const variantClasses = {
  default: "",
  glass: cn(
    "rounded-full",
    "border border-white/20 [border-top-color:var(--glass-refraction-top)]",
    "bg-white/60 backdrop-blur-xl backdrop-saturate-[180%]",
    "shadow-[0_0_0_1px_rgb(255_255_255_/_0.3)_inset,0_4px_12px_-4px_rgb(15_23_42_/_0.12)]",
    "dark:border-white/[0.12] dark:bg-white/[0.08]",
    "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,0_4px_12px_-4px_rgb(0_0_0_/_0.4)]"
  ),
  "3d": cn(
    "rounded-full",
    "border border-white/30 [border-top-color:var(--glass-refraction-top)]",
    "bg-white/70 backdrop-blur-xl backdrop-saturate-[200%]",
    "shadow-[0_0_0_1px_rgb(255_255_255_/_0.5)_inset,0_0_12px_rgb(255_255_255_/_0.12)_inset,0_8px_24px_-6px_rgb(15_23_42_/_0.25),0_2px_6px_-2px_rgb(15_23_42_/_0.15)]",
    "dark:border-white/[0.16] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.06))]",
    "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_0_12px_rgb(255_255_255_/_0.04)_inset,0_8px_24px_-6px_rgb(0_0_0_/_0.5),0_2px_6px_-2px_rgb(0_0_0_/_0.3)]"
  ),
}

export const OrbitingCircles = React.forwardRef<HTMLDivElement, OrbitingCirclesProps>(
  (
    {
      className,
      children,
      radius = 100,
      duration = 20,
      delay = 0,
      reverse = false,
      path = false,
      startAngle = 0,
      variant = "default",
      iconSize = 32,
      style,
      ...props
    },
    ref
  ) => {
    const half = iconSize / 2

    return (
      <>
        {path && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full"
          >
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          </svg>
        )}
        <div
          ref={ref}
          className={cn(
            "absolute left-1/2 top-1/2 flex items-center justify-center animate-orbit motion-reduce:[animation:none]",
            variantClasses[variant],
            className
          )}
          style={{
            width: iconSize,
            height: iconSize,
            marginLeft: -half,
            marginTop: -half,
            "--orbit-radius": radius,
            "--orbit-start": startAngle,
            "--orbit-duration": `${duration}s`,
            animationDelay: `${-delay}s`,
            animationDirection: reverse ? "reverse" : "normal",
            ...style,
          } as React.CSSProperties}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)

OrbitingCircles.displayName = "OrbitingCircles"
