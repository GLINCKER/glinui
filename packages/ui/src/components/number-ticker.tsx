"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface NumberTickerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
  from?: number
  duration?: number
  delay?: number
  decimals?: number
  formatOptions?: Intl.NumberFormatOptions
}

export const NumberTicker = React.forwardRef<HTMLSpanElement, NumberTickerProps>(
  (
    {
      className,
      value,
      from = 0,
      duration = 1.5,
      delay = 0,
      decimals = 0,
      formatOptions,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLSpanElement>(null)
    const combinedRef = useCombinedRef(ref, innerRef)
    const [display, setDisplay] = React.useState(from)
    const [hasAnimated, setHasAnimated] = React.useState(false)
    const prefersReducedMotion = usePrefersReducedMotion()

    React.useEffect(() => {
      if (prefersReducedMotion) {
        setDisplay(value)
        return
      }

      const el = innerRef.current
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)

            const timeout = window.setTimeout(() => {
              const startTime = performance.now()
              const durationMs = duration * 1000

              const tick = (now: number) => {
                const elapsed = now - startTime
                const progress = Math.min(elapsed / durationMs, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                const current = from + (value - from) * eased
                setDisplay(current)

                if (progress < 1) {
                  requestAnimationFrame(tick)
                }
              }

              requestAnimationFrame(tick)
            }, delay * 1000)

            return () => window.clearTimeout(timeout)
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(el)
      return () => observer.disconnect()
    }, [value, from, duration, delay, prefersReducedMotion, hasAnimated])

    const formatted = React.useMemo(() => {
      if (formatOptions) {
        return new Intl.NumberFormat(undefined, formatOptions).format(display)
      }
      return display.toFixed(decimals)
    }, [display, decimals, formatOptions])

    return (
      <span
        ref={combinedRef}
        className={cn("tabular-nums", className)}
        {...props}
      >
        {formatted}
      </span>
    )
  }
)

NumberTicker.displayName = "NumberTicker"

function useCombinedRef<T>(
  ...refs: (React.Ref<T> | React.MutableRefObject<T | null>)[]
) {
  return React.useCallback(
    (node: T | null) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(node)
        } else if (ref && typeof ref === "object") {
          (ref as React.MutableRefObject<T | null>).current = node
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  )
}
