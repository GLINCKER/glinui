export type TransitionFrame = {
  opacity?: number
  translateY?: number
  scale?: number
  rotate?: number
  blur?: number
}

export type TransitionStep = {
  from: TransitionFrame
  to: TransitionFrame
  durationMs: number
  easing: string
}

export type ViewTransitionPreset = {
  enter: TransitionStep
  exit: TransitionStep
}

export type ViewTransitionPresetName =
  | "pageFade"
  | "pageSlide"
  | "glassLift"
  | "modalPop"

export type ViewTransitionStyle = {
  opacity?: number
  transform?: string
  filter?: string
  transition?: string
  transitionDelay?: string
}

export type ResolvedViewTransition = {
  initial: ViewTransitionStyle
  enter: ViewTransitionStyle
  exit: ViewTransitionStyle
  enterDurationMs: number
  exitDurationMs: number
}

function frameToStyle(frame: TransitionFrame): ViewTransitionStyle {
  const transforms: string[] = []
  if (typeof frame.translateY === "number") {
    transforms.push(`translate3d(0, ${frame.translateY}px, 0)`)
  }
  if (typeof frame.scale === "number") {
    transforms.push(`scale(${frame.scale})`)
  }
  if (typeof frame.rotate === "number") {
    transforms.push(`rotate(${frame.rotate}deg)`)
  }

  return {
    opacity: frame.opacity,
    transform: transforms.length > 0 ? transforms.join(" ") : undefined,
    filter: typeof frame.blur === "number" ? `blur(${frame.blur}px)` : undefined
  }
}

function transitionString(step: TransitionStep): string {
  return [
    `opacity ${step.durationMs}ms ${step.easing}`,
    `transform ${step.durationMs}ms ${step.easing}`,
    `filter ${step.durationMs}ms ${step.easing}`
  ].join(", ")
}

export const viewTransitionPresets: Record<ViewTransitionPresetName, ViewTransitionPreset> = {
  pageFade: {
    enter: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      durationMs: 240,
      easing: "var(--easing-standard)"
    },
    exit: {
      from: { opacity: 1 },
      to: { opacity: 0 },
      durationMs: 180,
      easing: "var(--easing-standard)"
    }
  },
  pageSlide: {
    enter: {
      from: { opacity: 0, translateY: 16, blur: 6 },
      to: { opacity: 1, translateY: 0, blur: 0 },
      durationMs: 320,
      easing: "var(--easing-glass)"
    },
    exit: {
      from: { opacity: 1, translateY: 0, blur: 0 },
      to: { opacity: 0, translateY: -8, blur: 4 },
      durationMs: 220,
      easing: "var(--easing-standard)"
    }
  },
  glassLift: {
    enter: {
      from: { opacity: 0, translateY: 10, scale: 0.985, blur: 4 },
      to: { opacity: 1, translateY: 0, scale: 1, blur: 0 },
      durationMs: 280,
      easing: "var(--easing-glass)"
    },
    exit: {
      from: { opacity: 1, translateY: 0, scale: 1, blur: 0 },
      to: { opacity: 0, translateY: 6, scale: 0.992, blur: 3 },
      durationMs: 200,
      easing: "var(--easing-standard)"
    }
  },
  modalPop: {
    enter: {
      from: { opacity: 0, scale: 0.96, translateY: 8, blur: 3 },
      to: { opacity: 1, scale: 1, translateY: 0, blur: 0 },
      durationMs: 260,
      easing: "var(--easing-spring)"
    },
    exit: {
      from: { opacity: 1, scale: 1, translateY: 0, blur: 0 },
      to: { opacity: 0, scale: 0.98, translateY: 4, blur: 2 },
      durationMs: 180,
      easing: "var(--easing-standard)"
    }
  }
}

export function resolveViewTransition(
  name: ViewTransitionPresetName,
  opts?: { reducedMotion?: boolean; durationScale?: number }
): ResolvedViewTransition {
  const preset = viewTransitionPresets[name]
  const durationScale = opts?.durationScale ?? 1

  if (opts?.reducedMotion) {
    return {
      initial: { opacity: preset.enter.from.opacity ?? 0, transition: "none" },
      enter: { opacity: preset.enter.to.opacity ?? 1, transition: "none" },
      exit: { opacity: preset.exit.to.opacity ?? 0, transition: "none" },
      enterDurationMs: 1,
      exitDurationMs: 1
    }
  }

  const enter: TransitionStep = {
    ...preset.enter,
    durationMs: Math.max(1, Math.round(preset.enter.durationMs * durationScale))
  }
  const exit: TransitionStep = {
    ...preset.exit,
    durationMs: Math.max(1, Math.round(preset.exit.durationMs * durationScale))
  }

  return {
    initial: {
      ...frameToStyle(enter.from),
      transition: transitionString(enter)
    },
    enter: {
      ...frameToStyle(enter.to),
      transition: transitionString(enter)
    },
    exit: {
      ...frameToStyle(exit.to),
      transition: transitionString(exit)
    },
    enterDurationMs: enter.durationMs,
    exitDurationMs: exit.durationMs
  }
}

export function resolveChildTransition(
  name: ViewTransitionPresetName,
  index: number,
  opts?: { reducedMotion?: boolean; staggerMs?: number; durationScale?: number }
): ResolvedViewTransition {
  const base = resolveViewTransition(name, {
    reducedMotion: opts?.reducedMotion,
    durationScale: opts?.durationScale
  })
  if (opts?.reducedMotion) {
    return base
  }

  const staggerMs = opts?.staggerMs ?? 40
  const delay = `${Math.max(index, 0) * staggerMs}ms`

  return {
    ...base,
    initial: { ...base.initial, transitionDelay: delay },
    enter: { ...base.enter, transitionDelay: delay },
    exit: { ...base.exit, transitionDelay: delay }
  }
}
