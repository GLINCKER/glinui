import { render, screen } from "@testing-library/react"

import { Textarea } from "../index"

describe("Textarea", () => {
  it("renders textbox semantics", () => {
    render(<Textarea aria-label="Notes" placeholder="Write notes..." />)
    expect(screen.getByRole("textbox", { name: "Notes" })).toBeVisible()
  })

  it("applies liquid and matte variants", () => {
    render(
      <div>
        <Textarea data-testid="liquid" variant="liquid" placeholder="Liquid textarea" />
        <Textarea data-testid="matte" variant="matte" placeholder="Matte textarea" />
      </div>
    )

    expect(screen.getByTestId("liquid").className).toContain("radial-gradient")
    expect(screen.getByTestId("matte").className).toContain("linear-gradient")
  })

  it("applies size classes and rows", () => {
    render(
      <div>
        <Textarea data-testid="sm" size="sm" rows={2} />
        <Textarea data-testid="lg" size="lg" rows={8} />
      </div>
    )

    expect(screen.getByTestId("sm").className).toContain("text-xs")
    expect(screen.getByTestId("sm")).toHaveAttribute("rows", "2")
    expect(screen.getByTestId("lg").className).toContain("text-base")
    expect(screen.getByTestId("lg")).toHaveAttribute("rows", "8")
  })
})
