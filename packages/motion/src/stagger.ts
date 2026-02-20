export type StaggerDirection =
  | "forward"
  | "reverse"
  | "center-out"
  | "edges-in"

export type StaggerOptions = {
  count: number
  direction?: StaggerDirection
  stepMs?: number
  maxDelayMs?: number
  initialDelayMs?: number
  reducedMotion?: boolean
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function resolveOrder(count: number, direction: StaggerDirection): number[] {
  const safeCount = Math.max(0, Math.floor(count))
  const indices = Array.from({ length: safeCount }, (_, i) => i)

  if (direction === "forward") return indices
  if (direction === "reverse") return [...indices].reverse()

  if (direction === "center-out") {
    const center = (safeCount - 1) / 2
    return [...indices].sort(
      (a, b) =>
        Math.abs(a - center) - Math.abs(b - center) ||
        a - b
    )
  }

  const edgeDistance = (index: number) =>
    Math.min(index, safeCount - 1 - index)

  return [...indices].sort(
    (a, b) =>
      edgeDistance(a) - edgeDistance(b) ||
      a - b
  )
}

export function resolveStaggerDelay(index: number, options: StaggerOptions): number {
  if (options.reducedMotion) {
    return 0
  }

  const count = Math.max(0, Math.floor(options.count))
  if (count === 0) return 0

  const direction = options.direction ?? "forward"
  const stepMs = clamp(options.stepMs ?? 40, 1, 1000)
  const maxDelayMs = clamp(options.maxDelayMs ?? 1200, 0, 10000)
  const initialDelayMs = clamp(options.initialDelayMs ?? 0, 0, 10000)

  const normalizedIndex = clamp(Math.floor(index), 0, count - 1)
  const order = resolveOrder(count, direction)
  const rank = order.indexOf(normalizedIndex)
  const rawDelay = initialDelayMs + Math.max(rank, 0) * stepMs
  return clamp(rawDelay, 0, maxDelayMs)
}

export function createStaggerSequence(options: StaggerOptions) {
  const count = Math.max(0, Math.floor(options.count))
  const delays = Array.from({ length: count }, (_, index) =>
    resolveStaggerDelay(index, options)
  )

  return {
    delays,
    getDelay(index: number) {
      return resolveStaggerDelay(index, options)
    },
    getStyle(index: number) {
      return {
        transitionDelay: `${resolveStaggerDelay(index, options)}ms`
      }
    }
  }
}
