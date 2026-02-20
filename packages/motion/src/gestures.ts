export type GestureAxis = "x" | "y" | "both"

export type GesturePoint = {
  x: number
  y: number
  time: number
}

export type GestureVector = {
  x: number
  y: number
}

export type PointerLikeEvent = {
  clientX: number
  clientY: number
  pointerId?: number
  timeStamp?: number
}

export type SwipeDirection = "left" | "right" | "up" | "down"

function eventTime(event: PointerLikeEvent): number {
  if (typeof event.timeStamp === "number" && Number.isFinite(event.timeStamp)) {
    return event.timeStamp
  }
  return Date.now()
}

function eventPointerId(event: PointerLikeEvent): number {
  if (typeof event.pointerId === "number" && Number.isFinite(event.pointerId)) {
    return event.pointerId
  }
  return 0
}

function toPoint(event: PointerLikeEvent): GesturePoint {
  return { x: event.clientX, y: event.clientY, time: eventTime(event) }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function distance(a: GesturePoint, b: GesturePoint): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.hypot(dx, dy)
}

function midpoint(a: GesturePoint, b: GesturePoint): GesturePoint {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    time: Math.max(a.time, b.time)
  }
}

function projectAxis(
  delta: GestureVector,
  axis: GestureAxis
): GestureVector {
  if (axis === "x") {
    return { x: delta.x, y: 0 }
  }
  if (axis === "y") {
    return { x: 0, y: delta.y }
  }
  return delta
}

// ---------------------------------------------------------------------------
// Drag gesture
// ---------------------------------------------------------------------------

export type DragGestureState = {
  active: boolean
  pointerId: number | null
  start: GesturePoint | null
  current: GesturePoint | null
  delta: GestureVector
  velocity: GestureVector
  thresholdCrossed: boolean
  axisLock: Exclude<GestureAxis, "both"> | null
}

export type DragGesturePayload = {
  state: DragGestureState
  event: PointerLikeEvent
}

export type DragGestureOptions = {
  axis?: GestureAxis
  lockAxis?: boolean
  threshold?: number
  onStart?: (payload: DragGesturePayload) => void
  onMove?: (payload: DragGesturePayload) => void
  onEnd?: (payload: DragGesturePayload) => void
  onCancel?: (payload: DragGesturePayload) => void
}

export type DragGesture = {
  onPointerDown: (event: PointerLikeEvent) => void
  onPointerMove: (event: PointerLikeEvent) => void
  onPointerUp: (event: PointerLikeEvent) => void
  onPointerCancel: (event: PointerLikeEvent) => void
  reset: () => void
  getState: () => DragGestureState
}

export function createDragGesture(options: DragGestureOptions = {}): DragGesture {
  const axis = options.axis ?? "both"
  const lockAxis = options.lockAxis ?? true
  const threshold = options.threshold ?? 2

  let state: DragGestureState = {
    active: false,
    pointerId: null,
    start: null,
    current: null,
    delta: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    thresholdCrossed: false,
    axisLock: null
  }

  function notify(kind: "onStart" | "onMove" | "onEnd" | "onCancel", event: PointerLikeEvent) {
    const cb = options[kind]
    if (!cb) return
    cb({ state: { ...state }, event })
  }

  function resetState() {
    state = {
      active: false,
      pointerId: null,
      start: null,
      current: null,
      delta: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      thresholdCrossed: false,
      axisLock: null
    }
  }

  return {
    onPointerDown(event) {
      const point = toPoint(event)
      state = {
        active: true,
        pointerId: eventPointerId(event),
        start: point,
        current: point,
        delta: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        thresholdCrossed: false,
        axisLock: null
      }
      notify("onStart", event)
    },

    onPointerMove(event) {
      if (!state.active || state.start == null || state.current == null) return
      if (eventPointerId(event) !== state.pointerId) return

      const next = toPoint(event)
      const dt = Math.max(next.time - state.current.time, 1)
      const rawDelta = { x: next.x - state.start.x, y: next.y - state.start.y }
      const rawVelocity = {
        x: (next.x - state.current.x) / dt,
        y: (next.y - state.current.y) / dt
      }

      let axisLock = state.axisLock
      if (axis === "both" && lockAxis && axisLock == null) {
        if (Math.abs(rawDelta.x) > Math.abs(rawDelta.y) + 1) axisLock = "x"
        if (Math.abs(rawDelta.y) > Math.abs(rawDelta.x) + 1) axisLock = "y"
      }

      const projectedAxis: GestureAxis = axisLock ?? axis
      const projectedDelta = projectAxis(rawDelta, projectedAxis)
      const projectedVelocity = projectAxis(rawVelocity, projectedAxis)

      const thresholdCrossed =
        state.thresholdCrossed || distance(state.start, next) >= threshold

      state = {
        ...state,
        current: next,
        delta: projectedDelta,
        velocity: projectedVelocity,
        axisLock,
        thresholdCrossed
      }

      if (thresholdCrossed) {
        notify("onMove", event)
      }
    },

    onPointerUp(event) {
      if (!state.active) return
      if (eventPointerId(event) !== state.pointerId) return
      notify("onEnd", event)
      resetState()
    },

    onPointerCancel(event) {
      if (!state.active) return
      if (eventPointerId(event) !== state.pointerId) return
      notify("onCancel", event)
      resetState()
    },

    reset() {
      resetState()
    },

    getState() {
      return { ...state }
    }
  }
}

export const useDragGesture = createDragGesture

// ---------------------------------------------------------------------------
// Swipe gesture
// ---------------------------------------------------------------------------

export type SwipeGestureState = {
  active: boolean
  pointerId: number | null
  start: GesturePoint | null
  current: GesturePoint | null
}

export type SwipeResult = {
  direction: SwipeDirection
  distance: number
  velocity: number
  durationMs: number
}

export type SwipeGesturePayload = {
  state: SwipeGestureState
  event: PointerLikeEvent
  swipe: SwipeResult | null
}

export type SwipeGestureOptions = {
  axis?: GestureAxis
  distanceThreshold?: number
  velocityThreshold?: number
  onSwipe?: (payload: SwipeGesturePayload) => void
  onEnd?: (payload: SwipeGesturePayload) => void
  onCancel?: (payload: SwipeGesturePayload) => void
}

export type SwipeGesture = {
  onPointerDown: (event: PointerLikeEvent) => void
  onPointerMove: (event: PointerLikeEvent) => void
  onPointerUp: (event: PointerLikeEvent) => void
  onPointerCancel: (event: PointerLikeEvent) => void
  reset: () => void
  getState: () => SwipeGestureState
}

function resolveSwipe(
  start: GesturePoint,
  end: GesturePoint,
  axis: GestureAxis,
  distanceThreshold: number,
  velocityThreshold: number
): SwipeResult | null {
  const dx = end.x - start.x
  const dy = end.y - start.y
  const durationMs = Math.max(end.time - start.time, 1)
  const vx = dx / durationMs
  const vy = dy / durationMs

  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)
  const horizontal = absDx >= absDy

  if (axis === "x" && !horizontal) return null
  if (axis === "y" && horizontal) return null

  const primaryDistance = horizontal ? absDx : absDy
  const primaryVelocity = horizontal ? Math.abs(vx) : Math.abs(vy)

  if (
    primaryDistance < distanceThreshold &&
    primaryVelocity < velocityThreshold
  ) {
    return null
  }

  const direction: SwipeDirection = horizontal
    ? dx < 0
      ? "left"
      : "right"
    : dy < 0
      ? "up"
      : "down"

  return {
    direction,
    distance: primaryDistance,
    velocity: primaryVelocity,
    durationMs
  }
}

export function createSwipeGesture(options: SwipeGestureOptions = {}): SwipeGesture {
  const axis = options.axis ?? "both"
  const distanceThreshold = options.distanceThreshold ?? 36
  const velocityThreshold = options.velocityThreshold ?? 0.3

  let state: SwipeGestureState = {
    active: false,
    pointerId: null,
    start: null,
    current: null
  }

  function resetState() {
    state = { active: false, pointerId: null, start: null, current: null }
  }

  return {
    onPointerDown(event) {
      const point = toPoint(event)
      state = {
        active: true,
        pointerId: eventPointerId(event),
        start: point,
        current: point
      }
    },

    onPointerMove(event) {
      if (!state.active || state.start == null) return
      if (eventPointerId(event) !== state.pointerId) return
      state = { ...state, current: toPoint(event) }
    },

    onPointerUp(event) {
      if (!state.active || state.start == null || state.current == null) return
      if (eventPointerId(event) !== state.pointerId) return

      const endPoint = toPoint(event)
      const swipe = resolveSwipe(
        state.start,
        endPoint,
        axis,
        distanceThreshold,
        velocityThreshold
      )

      const payload: SwipeGesturePayload = {
        state: { ...state, current: endPoint },
        event,
        swipe
      }

      if (swipe != null) {
        options.onSwipe?.(payload)
      }
      options.onEnd?.(payload)
      resetState()
    },

    onPointerCancel(event) {
      if (!state.active) return
      options.onCancel?.({ state: { ...state }, event, swipe: null })
      resetState()
    },

    reset() {
      resetState()
    },

    getState() {
      return { ...state }
    }
  }
}

export const useSwipeGesture = createSwipeGesture

// ---------------------------------------------------------------------------
// Pinch gesture
// ---------------------------------------------------------------------------

export type PinchGestureState = {
  active: boolean
  startDistance: number
  currentDistance: number
  scale: number
  center: GesturePoint | null
  pointers: number
}

export type PinchGesturePayload = {
  state: PinchGestureState
  event: PointerLikeEvent
}

export type PinchGestureOptions = {
  minScale?: number
  maxScale?: number
  onStart?: (payload: PinchGesturePayload) => void
  onChange?: (payload: PinchGesturePayload) => void
  onEnd?: (payload: PinchGesturePayload) => void
  onCancel?: (payload: PinchGesturePayload) => void
}

export type PinchGesture = {
  onPointerDown: (event: PointerLikeEvent) => void
  onPointerMove: (event: PointerLikeEvent) => void
  onPointerUp: (event: PointerLikeEvent) => void
  onPointerCancel: (event: PointerLikeEvent) => void
  reset: () => void
  getState: () => PinchGestureState
}

function getTwoPointers(
  pointers: Map<number, GesturePoint>
): [GesturePoint, GesturePoint] | null {
  if (pointers.size < 2) return null
  const values = Array.from(pointers.values())
  const first = values[0]
  const second = values[1]
  if (first == null || second == null) return null
  return [first, second]
}

export function createPinchGesture(options: PinchGestureOptions = {}): PinchGesture {
  const minScale = options.minScale ?? 0.5
  const maxScale = options.maxScale ?? 3
  const activePointers = new Map<number, GesturePoint>()

  let state: PinchGestureState = {
    active: false,
    startDistance: 0,
    currentDistance: 0,
    scale: 1,
    center: null,
    pointers: 0
  }

  function updatePointersCount() {
    state = { ...state, pointers: activePointers.size }
  }

  function maybeStart(event: PointerLikeEvent) {
    if (state.active) return
    const pair = getTwoPointers(activePointers)
    if (pair == null) return

    const [a, b] = pair
    const startDistance = Math.max(distance(a, b), 1)
    state = {
      active: true,
      startDistance,
      currentDistance: startDistance,
      scale: 1,
      center: midpoint(a, b),
      pointers: activePointers.size
    }
    options.onStart?.({ state: { ...state }, event })
  }

  function maybeEnd(event: PointerLikeEvent) {
    if (!state.active && activePointers.size !== 0) return
    if (!state.active) return
    if (activePointers.size >= 2) return

    options.onEnd?.({ state: { ...state }, event })
    state = {
      active: false,
      startDistance: 0,
      currentDistance: 0,
      scale: 1,
      center: null,
      pointers: activePointers.size
    }
  }

  return {
    onPointerDown(event) {
      activePointers.set(eventPointerId(event), toPoint(event))
      updatePointersCount()
      maybeStart(event)
    },

    onPointerMove(event) {
      const pointerId = eventPointerId(event)
      if (!activePointers.has(pointerId)) return
      activePointers.set(pointerId, toPoint(event))
      updatePointersCount()

      if (!state.active) {
        maybeStart(event)
        return
      }

      const pair = getTwoPointers(activePointers)
      if (pair == null) return
      const [a, b] = pair
      const nextDistance = Math.max(distance(a, b), 1)
      const rawScale = nextDistance / Math.max(state.startDistance, 1)
      const scale = clamp(rawScale, minScale, maxScale)

      state = {
        ...state,
        currentDistance: nextDistance,
        scale,
        center: midpoint(a, b),
        pointers: activePointers.size
      }

      options.onChange?.({ state: { ...state }, event })
    },

    onPointerUp(event) {
      activePointers.delete(eventPointerId(event))
      updatePointersCount()
      maybeEnd(event)
    },

    onPointerCancel(event) {
      const pointerId = eventPointerId(event)
      activePointers.delete(pointerId)
      updatePointersCount()

      if (state.active) {
        options.onCancel?.({ state: { ...state }, event })
      }
      maybeEnd(event)
    },

    reset() {
      activePointers.clear()
      state = {
        active: false,
        startDistance: 0,
        currentDistance: 0,
        scale: 1,
        center: null,
        pointers: 0
      }
    },

    getState() {
      return { ...state }
    }
  }
}

export const usePinchGesture = createPinchGesture
