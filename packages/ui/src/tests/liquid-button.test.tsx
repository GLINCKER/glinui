import { render, screen } from "@testing-library/react"

import { LiquidButton } from "../index"

describe("LiquidButton", () => {
  it("renders button label", () => {
    render(<LiquidButton>Start free trial</LiquidButton>)
    expect(screen.getByRole("button", { name: "Start free trial" })).toBeVisible()
  })

  it("applies fluid hover and press classes", () => {
    render(
      <LiquidButton data-testid="liquid-button" intensity="strong">
        CTA
      </LiquidButton>
    )

    const button = screen.getByTestId("liquid-button")
    expect(button.className).toContain("hover:scale-[1.03]")
    expect(button.className).toContain("active:scale-y-[0.97]")
    expect(button.className).toContain("motion-reduce:active:scale-y-100")
  })
})
