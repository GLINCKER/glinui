import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Popover, PopoverContent, PopoverTrigger } from "../index"

describe("Popover", () => {
  it("opens popover content", async () => {
    const user = userEvent.setup()

    render(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    )

    await user.click(screen.getByRole("button", { name: "Open popover" }))
    expect(screen.getByText("Popover body")).toBeVisible()
  })

  it("applies glass variant classes", async () => {
    const user = userEvent.setup()

    render(
      <Popover>
        <PopoverTrigger variant="glass">Open popover</PopoverTrigger>
        <PopoverContent variant="glass" data-testid="content">
          Popover body
        </PopoverContent>
      </Popover>
    )

    await user.click(screen.getByRole("button", { name: "Open popover" }))
    expect(screen.getByTestId("content").className).toMatch(/backdrop-blur-(md|lg|xl)/)
  })
})
