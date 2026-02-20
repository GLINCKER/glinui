import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Checkbox } from "../index"

describe("Checkbox", () => {
  it("renders checkbox semantics", () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeVisible()
  })

  it("toggles checked state on click", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Receive updates" />)
    const checkbox = screen.getByRole("checkbox", { name: "Receive updates" })

    expect(checkbox).toHaveAttribute("data-state", "unchecked")
    await user.click(checkbox)
    expect(checkbox).toHaveAttribute("data-state", "checked")
  })

  it("applies liquid variant and size classes", () => {
    render(<Checkbox data-testid="checkbox" variant="liquid" size="lg" />)
    const checkbox = screen.getByTestId("checkbox")
    expect(checkbox.className).toContain("radial-gradient")
    expect(checkbox.className).toContain("h-6")
  })

  it("supports disabled state", () => {
    render(<Checkbox data-testid="disabled-checkbox" disabled />)
    expect(screen.getByTestId("disabled-checkbox")).toBeDisabled()
  })
})
