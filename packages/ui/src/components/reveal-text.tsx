"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface RevealTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text to reveal */
  text: string
  /** Animation duration in seconds */
  duration?: number
  /** Delay before animation starts, in ms */
  delay?: number
  /** Reveal direction */
  direction?: "left" | "right" | "top" | "bottom"
  /** Trigger on intersection */
  triggerOnView?: boolean
  /** Intersection threshold */
  threshold?: number
}

export const RevealText = React.forwardRef<HTMLSpanElement, RevealTextProps>(
  (
    {
      className,
      text,
      duration = 0.8,
      delay = 0,
      direction = "left",
      triggerOnView = true,
      threshold = 0.5,
      style,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const localRef = React.useRef<HTMLSpanElement | null>(null)
    const [isRevealed, setIsRevealed] = React.useState(false)

    const setRefs = React.useCallback(
      (node: HTMLSpanElement | null) => {
        localRef.current = node
        if (typeof ref === "function") { ref(node); return }
        if (ref) ref.current = node
      },
      [ref]
    )

    React.useEffect(() => {
      if (prefersReducedMotion) {
        setIsRevealed(true)
        return
      }

      if (!triggerOnView) {
        setIsRevealed(false)
        const frame = window.requestAnimationFrame(() => setIsRevealed(true))
        return () => window.cancelAnimationFrame(frame)
      }

      const el = localRef.current
      if (!el) return
      if (typeof IntersectionObserver === "undefined") {
        setIsRevealed(true)
        return
      }

      setIsRevealed(false)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            observer.disconnect()
          }
        },
        { threshold }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, [triggerOnView, threshold, prefersReducedMotion])

    const clipPaths = {
      left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0 0 0)" },
      right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0)" },
      top: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0 0)" },
      bottom: { hidden: "inset(100% 0 0 0)", visible: "inset(0 0 0 0)" },
    }

    const clip = clipPaths[direction]

    return (
      <span
        ref={setRefs}
        className={cn("inline-block", className)}
        style={{
          clipPath: isRevealed ? clip.visible : clip.hidden,
          transition: prefersReducedMotion
            ? "none"
            : `clip-path ${duration}s ease-out ${delay}ms`,
          ...style,
        }}
        {...props}
      >
        {text}
      </span>
    )
  }
)

RevealText.displayName = "RevealText"
