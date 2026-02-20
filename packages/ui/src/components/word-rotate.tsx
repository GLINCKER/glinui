"use client"

import * as React from "react"
import { cn } from "../lib/cn"

export interface WordRotateProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Array of words to cycle through */
  words: string[]
  /** Duration each word is shown (ms) */
  duration?: number
  /** Animation speed for enter/exit (ms) */
  animationDuration?: number
}

export const WordRotate = React.forwardRef<HTMLSpanElement, WordRotateProps>(
  (
    {
      className,
      words,
      duration = 2500,
      animationDuration = 300,
      style,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [animating, setAnimating] = React.useState<"in" | "out" | "idle">("idle")

    React.useEffect(() => {
      if (words.length <= 1) return

      const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduced) return

      const timer = setInterval(() => {
        setAnimating("out")
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % words.length)
          setAnimating("in")
          setTimeout(() => setAnimating("idle"), animationDuration)
        }, animationDuration)
      }, duration)

      return () => clearInterval(timer)
    }, [words, duration, animationDuration])

    return (
      <span
        ref={ref}
        className={cn("inline-block overflow-hidden", className)}
        style={{
          "--word-rotate-duration": `${animationDuration}ms`,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <span
          key={currentIndex}
          className={cn(
            "inline-block",
            animating === "in" && "animate-word-rotate-in",
            animating === "out" && "animate-word-rotate-out",
            "motion-reduce:[animation:none]"
          )}
          aria-live="polite"
        >
          {words[currentIndex]}
        </span>
      </span>
    )
  }
)

WordRotate.displayName = "WordRotate"
