import { fireEvent, render, screen } from "@testing-library/react"

import { SpotlightCard } from "../index"

describe("SpotlightCard", () => {
  it("renders content and overlay", () => {
    const { container } = render(<SpotlightCard>Spotlight body</SpotlightCard>)

    expect(screen.getByText("Spotlight body")).toBeVisible()
    expect(container.querySelector('[data-slot="spotlight-overlay"]')).toBeInTheDocument()
  })

  it("updates spotlight cursor coordinates on mouse move", () => {
    const { container } = render(
      <SpotlightCard data-testid="spotlight-card">Spotlight body</SpotlightCard>
    )

    const card = screen.getByTestId("spotlight-card")
    Object.defineProperty(card, "getBoundingClientRect", {
      value: () => ({
        width: 200,
        height: 120,
        top: 20,
        left: 10,
        right: 210,
        bottom: 140,
        x: 10,
        y: 20,
        toJSON: () => ({})
      })
    })

    fireEvent.mouseMove(card, { clientX: 70, clientY: 80 })

    expect(card.getAttribute("data-spotlight-active")).toBe("true")
    expect(card.style.getPropertyValue("--spot-x")).toBe("60.00px")
    expect(card.style.getPropertyValue("--spot-y")).toBe("60.00px")

    fireEvent.mouseLeave(card)
    expect(card.getAttribute("data-spotlight-active")).toBe("false")
    expect(container.querySelector('[data-slot="spotlight-overlay"]')).toBeInTheDocument()
  })
})
