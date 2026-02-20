"use client"

import * as React from "react"
import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The text to type out (single string mode). */
  text?: string
  /** Array of words/phrases to cycle through (multi-word mode). */
  words?: string[]
  /** Milliseconds per character when typing. Default: 50 */
  speed?: number
  /** Milliseconds per character when deleting. Default: 30 */
  deleteSpeed?: number
  /** Initial delay before typing starts, in ms. Default: 0 */
  delay?: number
  /** Show a blinking cursor. Default: true */
  cursor?: boolean
  /** The cursor character. Default: "|" */
  cursorChar?: string
  /** Loop the typing animation. Default: false */
  loop?: boolean
  /** Pause at end before deleting/retyping, in ms. Default: 1500 */
  pauseDuration?: number
  /** Callback fired when a word finishes typing (fires per cycle). */
  onComplete?: () => void
}

type Phase = "idle" | "typing" | "pausing" | "deleting"

export const Typewriter = React.forwardRef<HTMLSpanElement, TypewriterProps>(
  (
    {
      className,
      text,
      words,
      speed = 50,
      deleteSpeed = 30,
      delay = 0,
      cursor = true,
      cursorChar = "|",
      loop = false,
      pauseDuration = 1500,
      onComplete,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [displayedText, setDisplayedText] = React.useState<string>("")
    const [phase, setPhase] = React.useState<Phase>("idle")

    // Resolve the word list: words array takes priority, fallback to single text
    const wordList = React.useMemo(() => {
      if (words && words.length > 0) return words
      if (text) return [text]
      return [""]
    }, [words, text])

    const isMultiWord = wordList.length > 1

    // Stable ref so effect deps stay minimal
    const onCompleteRef = React.useRef(onComplete)
    React.useEffect(() => {
      onCompleteRef.current = onComplete
    }, [onComplete])

    React.useEffect(() => {
      // Reduced-motion: show first word immediately with no animation
      if (prefersReducedMotion) {
        setDisplayedText(wordList[0])
        setPhase("pausing")
        onCompleteRef.current?.()
        return
      }

      let wordIndex = 0
      let charIndex = 0
      let timeoutId: ReturnType<typeof setTimeout>
      let cancelled = false

      const typeWord = () => {
        if (cancelled) return
        const currentWord = wordList[wordIndex]
        setPhase("typing")

        const typeStep = () => {
          if (cancelled) return

          if (charIndex <= currentWord.length) {
            setDisplayedText(currentWord.slice(0, charIndex))
            charIndex += 1
            timeoutId = setTimeout(typeStep, speed)
          } else {
            // Finished typing current word
            setPhase("pausing")
            onCompleteRef.current?.()

            if (isMultiWord || loop) {
              timeoutId = setTimeout(() => {
                if (cancelled) return
                deleteWord(currentWord)
              }, pauseDuration)
            }
          }
        }

        typeStep()
      }

      const deleteWord = (currentWord: string) => {
        if (cancelled) return
        setPhase("deleting")
        let delIndex = currentWord.length

        const deleteStep = () => {
          if (cancelled) return

          if (delIndex >= 0) {
            setDisplayedText(currentWord.slice(0, delIndex))
            delIndex -= 1
            timeoutId = setTimeout(deleteStep, deleteSpeed)
          } else {
            // Finished deleting — move to next word
            wordIndex = (wordIndex + 1) % wordList.length

            // If not looping and we've cycled through all words, stop
            if (!loop && wordIndex === 0 && !isMultiWord) {
              setPhase("pausing")
              return
            }

            charIndex = 0
            timeoutId = setTimeout(typeWord, speed * 2)
          }
        }

        deleteStep()
      }

      setDisplayedText("")
      setPhase("idle")
      charIndex = 0
      wordIndex = 0

      timeoutId = setTimeout(typeWord, delay)

      return () => {
        cancelled = true
        clearTimeout(timeoutId)
      }
    }, [wordList, speed, deleteSpeed, delay, loop, pauseDuration, isMultiWord, prefersReducedMotion])

    // Cursor blinks when pausing; solid while actively typing/deleting
    const cursorBlinking = phase === "pausing"

    // For aria-label: join all words or use single text
    const fullLabel = ariaLabel ?? wordList.join(", ")

    return (
      <span
        ref={ref}
        aria-label={fullLabel}
        aria-live="off"
        className={cn("inline-flex items-baseline", className)}
        {...props}
      >
        {/* Screen readers get the full text via aria-label; hide typed chars */}
        <span aria-hidden="true">{displayedText}</span>

        {cursor && (
          <span
            aria-hidden="true"
            className={cn(
              "ml-[0.05em] inline-block select-none",
              cursorBlinking
                ? "animate-blink motion-reduce:[animation:none]"
                : "opacity-100"
            )}
          >
            {cursorChar}
          </span>
        )}
      </span>
    )
  }
)

Typewriter.displayName = "Typewriter"
