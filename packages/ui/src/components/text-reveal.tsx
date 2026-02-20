"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface TextRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

export const TextReveal = React.forwardRef<HTMLDivElement, TextRevealProps>(
  ({ className, text, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [progress, setProgress] = React.useState(0)
    const prefersReducedMotion = usePrefersReducedMotion()
    const words = text.split(" ")

    React.useEffect(() => {
      if (prefersReducedMotion) {
        setProgress(1)
        return
      }

      const el = containerRef.current
      if (!el) return

      // Find nearest scrollable ancestor (handles custom scroll containers)
      const getScrollParent = (node: HTMLElement): HTMLElement | Window => {
        let parent = node.parentElement
        while (parent) {
          const style = getComputedStyle(parent)
          if (/(auto|scroll)/.test(style.overflow + style.overflowY)) {
            return parent
          }
          parent = parent.parentElement
        }
        return window
      }

      const scrollTarget = getScrollParent(el)

      const handleScroll = () => {
        const rect = el.getBoundingClientRect()
        const viewportHeight = scrollTarget instanceof Window
          ? window.innerHeight
          : scrollTarget.clientHeight
        const elementTop = scrollTarget instanceof Window
          ? rect.top
          : rect.top - scrollTarget.getBoundingClientRect().top
        const elementHeight = rect.height

        const start = viewportHeight * 0.8
        const end = viewportHeight * 0.2

        const scrollProgress = (start - elementTop) / (start - end + elementHeight * 0.5)
        setProgress(Math.max(0, Math.min(1, scrollProgress)))
      }

      scrollTarget.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll()
      return () => scrollTarget.removeEventListener("scroll", handleScroll)
    }, [prefersReducedMotion])

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div ref={containerRef} className="py-20">
          <p className="flex flex-wrap text-3xl font-bold leading-relaxed md:text-4xl lg:text-5xl">
            {words.map((word, i) => {
              const wordProgress = i / words.length
              const opacity = Math.max(
                0.15,
                Math.min(1, (progress - wordProgress) * words.length * 0.5 + 0.15)
              )

              return (
                <span
                  key={i}
                  className="mr-[0.25em] transition-opacity duration-200"
                  style={{ opacity }}
                >
                  {word}
                </span>
              )
            })}
          </p>
        </div>
      </div>
    )
  }
)

TextReveal.displayName = "TextReveal"
