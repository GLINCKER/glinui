export type MotionPresetName = "fadeIn" | "slideUp" | "glassHover" | "spotlightPulse"

export type MotionPreset = {
  from: Record<string, number | string>
  to: Record<string, number | string>
  duration: string
  easing: string
}

export const motionPresets: Record<MotionPresetName, MotionPreset> = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: "var(--motion-normal)",
    easing: "var(--easing-standard)"
  },
  slideUp: {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    duration: "var(--motion-normal)",
    easing: "var(--easing-standard)"
  },
  glassHover: {
    from: { transform: "translateY(0)", filter: "saturate(1)" },
    to: { transform: "translateY(-2px)", filter: "saturate(1.08)" },
    duration: "var(--motion-fast)",
    easing: "var(--easing-standard)"
  },
  spotlightPulse: {
    from: { opacity: 0.7, transform: "scale(0.98)" },
    to: { opacity: 1, transform: "scale(1)" },
    duration: "var(--motion-slow)",
    easing: "var(--easing-spring)"
  }
}

export function resolveMotionPreset(
  name: MotionPresetName,
  opts?: { reducedMotion?: boolean }
): MotionPreset {
  if (opts?.reducedMotion) {
    return {
      ...motionPresets[name],
      duration: "1ms"
    }
  }

  return motionPresets[name]
}
