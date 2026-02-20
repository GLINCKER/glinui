import "@testing-library/jest-dom/vitest"

// Ensure React 19 test updates are treated as act-enabled in Vitest/jsdom.
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

// Polyfill ResizeObserver for jsdom (used by Radix Slider, cmdk)
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}

// Polyfill Element.prototype.scrollIntoView for jsdom (used by cmdk)
if (typeof Element.prototype.scrollIntoView === "undefined") {
  Element.prototype.scrollIntoView = function () {}
}

// Polyfill window.getComputedStyle to return animationName (cmdk uses it)
const origGetComputedStyle = window.getComputedStyle
window.getComputedStyle = function (elt: Element, pseudoElt?: string | null) {
  const style = origGetComputedStyle(elt, pseudoElt)
  if (!style.animationName) {
    Object.defineProperty(style, "animationName", { value: "none", configurable: true })
  }
  return style
}
