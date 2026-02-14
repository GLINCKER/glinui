import { fireEvent, render, screen } from "@testing-library/react"

import { MagneticCTA } from "../index"

describe("MagneticCTA", () => {
  it("renders CTA button", () => {
    render(<MagneticCTA>Launch now</MagneticCTA>)
    expect(screen.getByRole("button", { name: "Launch now" })).toBeVisible()
  })

  it("moves toward cursor with max 8px offset", () => {
    const { container } = render(
      <MagneticCTA maxOffset={8} magnetRadius={160}>
        Launch now
      </MagneticCTA>
    )

    const wrapper = container.querySelector('[data-slot="magnetic-cta-wrapper"]') as HTMLDivElement
    const button = screen.getByRole("button", { name: "Launch now" })

    Object.defineProperty(wrapper, "getBoundingClientRect", {
      value: () => ({
        width: 200,
        height: 60,
        top: 100,
        left: 100,
        right: 300,
        bottom: 160,
        x: 100,
        y: 100,
        toJSON: () => ({})
      })
    })

    fireEvent.mouseMove(wrapper, { clientX: 250, clientY: 130 })

    const x = Math.abs(parseFloat(button.style.getPropertyValue("--magnetic-x")))
    const y = Math.abs(parseFloat(button.style.getPropertyValue("--magnetic-y")))

    expect(x).toBeLessThanOrEqual(8)
    expect(y).toBeLessThanOrEqual(8)

    fireEvent.mouseLeave(wrapper)
    expect(button.style.getPropertyValue("--magnetic-x")).toBe("0.00px")
    expect(button.style.getPropertyValue("--magnetic-y")).toBe("0.00px")
  })
})
