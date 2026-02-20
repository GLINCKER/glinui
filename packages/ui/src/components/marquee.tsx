import * as React from "react"
import { cn } from "../lib/cn"

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "right" | "up" | "down"
  speed?: number
  pauseOnHover?: boolean
  gap?: number
  reverse?: boolean
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      children,
      direction = "left",
      speed = 30,
      pauseOnHover = false,
      gap = 16,
      reverse = false,
      style,
      ...props
    },
    ref
  ) => {
    const isVertical = direction === "up" || direction === "down"
    const shouldReverse = reverse || direction === "right" || direction === "down"
    const animationClass = isVertical
      ? "motion-safe:animate-marquee-y"
      : "motion-safe:animate-marquee-x"

    return (
      <div
        ref={ref}
        className={cn(
          "group overflow-hidden",
          isVertical ? "flex flex-col" : "flex flex-row",
          className
        )}
        style={
          {
            "--marquee-gap": `${gap}px`,
            "--marquee-duration": `${speed}s`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i === 1 ? true : undefined}
            className={cn(
              "flex shrink-0",
              isVertical ? "flex-col" : "flex-row",
              animationClass,
              shouldReverse && "[animation-direction:reverse]",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              isVertical ? "pb-[var(--marquee-gap)]" : "pr-[var(--marquee-gap)]"
            )}
          >
            {children}
          </div>
        ))}
      </div>
    )
  }
)

Marquee.displayName = "Marquee"
