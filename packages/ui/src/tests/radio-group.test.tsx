import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { RadioGroup, RadioGroupItem } from "../index"

describe("RadioGroup", () => {
  it("renders radio semantics", () => {
    render(
      <RadioGroup defaultValue="starter" aria-label="Plan">
        <RadioGroupItem value="starter" aria-label="Starter" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>
    )

    expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeVisible()
    expect(screen.getByRole("radio", { name: "Starter" })).toBeVisible()
    expect(screen.getByRole("radio", { name: "Pro" })).toBeVisible()
  })

  it("selects default and changes value", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup defaultValue="starter" aria-label="Plan">
        <RadioGroupItem value="starter" aria-label="Starter" />
        <RadioGroupItem value="pro" aria-label="Pro" />
      </RadioGroup>
    )

    const starter = screen.getByRole("radio", { name: "Starter" })
    const pro = screen.getByRole("radio", { name: "Pro" })

    expect(starter).toHaveAttribute("data-state", "checked")
    expect(pro).toHaveAttribute("data-state", "unchecked")

    await user.click(pro)
    expect(pro).toHaveAttribute("data-state", "checked")
  })

  it("applies item variant and size classes", () => {
    render(
      <RadioGroup defaultValue="a" aria-label="Theme">
        <RadioGroupItem data-testid="radio-item" value="a" variant="liquid" size="lg" />
      </RadioGroup>
    )

    const item = screen.getByTestId("radio-item")
    expect(item.className).toContain("radial-gradient")
    expect(item.className).toContain("h-6")
  })
})
