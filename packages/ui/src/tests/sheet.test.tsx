import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../index"

describe("Sheet", () => {
  it("opens sheet content", async () => {
    const user = userEvent.setup()

    render(
      <Sheet>
        <SheetTrigger>Open sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
          <p>Sheet body</p>
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByRole("button", { name: "Open sheet" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Sheet body")).toBeVisible()
  })

  it("applies glass variant classes", async () => {
    const user = userEvent.setup()

    render(
      <Sheet>
        <SheetTrigger variant="glass">Open sheet</SheetTrigger>
        <SheetContent variant="glass" data-testid="content">
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
          <p>Sheet body</p>
        </SheetContent>
      </Sheet>
    )

    await user.click(screen.getByRole("button", { name: "Open sheet" }))
    expect(screen.getByTestId("content").className).toContain("backdrop-blur-md")
  })
})
