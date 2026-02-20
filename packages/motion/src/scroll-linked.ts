export type ScrollRange = [number, number]

export type ScrollLinkedStyle = {
  opacity?: number
  filter?: string
  transform?: string
}

export type ScrollLinkedValues = {
  progress: number
  opacity?: number
  blur?: number
  translateY?: number
  scale?: number
  rotate?: number
}

export type ScrollLinkedOptions = {
  start: number
  end: number
  clamp?: boolean
  opacity?: ScrollRange
  blur?: ScrollRange
  translateY?: ScrollRange
  scale?: ScrollRange
  rotate?: ScrollRange
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t
}

function clampValue(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function resolveScrollProgress(
  scrollY: number,
  start: number,
  end: number,
  clamp = true
): number {
  const length = end - start
  if (length === 0) {
    return 1
  }
  const raw = (scrollY - start) / length
  return clamp ? clampValue(raw, 0, 1) : raw
}

export function mapScrollRange(
  progress: number,
  output: ScrollRange,
  clamp = true
): number {
  const p = clamp ? clampValue(progress, 0, 1) : progress
  return lerp(output[0], output[1], p)
}

function round(value: number, decimals = 3): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export function createScrollLinkedEffect(config: ScrollLinkedOptions) {
  const clamp = config.clamp ?? true

  function resolve(scrollY: number): ScrollLinkedValues {
    const progress = resolveScrollProgress(scrollY, config.start, config.end, clamp)

    return {
      progress,
      opacity: config.opacity ? round(mapScrollRange(progress, config.opacity, clamp)) : undefined,
      blur: config.blur ? round(mapScrollRange(progress, config.blur, clamp)) : undefined,
      translateY: config.translateY
        ? round(mapScrollRange(progress, config.translateY, clamp))
        : undefined,
      scale: config.scale ? round(mapScrollRange(progress, config.scale, clamp)) : undefined,
      rotate: config.rotate ? round(mapScrollRange(progress, config.rotate, clamp)) : undefined
    }
  }

  function style(scrollY: number, opts?: { reducedMotion?: boolean }): ScrollLinkedStyle {
    const values = resolve(scrollY)
    if (opts?.reducedMotion) {
      return {
        opacity: values.opacity,
        filter: undefined,
        transform: undefined
      }
    }

    const filters: string[] = []
    if (typeof values.blur === "number") {
      filters.push(`blur(${values.blur}px)`)
    }

    const transforms: string[] = []
    if (typeof values.translateY === "number") {
      transforms.push(`translate3d(0, ${values.translateY}px, 0)`)
    }
    if (typeof values.scale === "number") {
      transforms.push(`scale(${values.scale})`)
    }
    if (typeof values.rotate === "number") {
      transforms.push(`rotate(${values.rotate}deg)`)
    }

    return {
      opacity: values.opacity,
      filter: filters.length > 0 ? filters.join(" ") : undefined,
      transform: transforms.length > 0 ? transforms.join(" ") : undefined
    }
  }

  return {
    resolve,
    style
  }
}

export const useScrollLinkedEffect = createScrollLinkedEffect
