import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../index"

describe("DropdownMenu", () => {
  it("opens and renders menu item", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Account</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    expect(screen.getByText("Account")).toBeVisible()
  })

  it("applies glass variant classes", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger variant="glass">Open menu</DropdownMenuTrigger>
        <DropdownMenuContent variant="glass" data-testid="content">
          <DropdownMenuItem>Account</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    expect(screen.getByTestId("content").className).toMatch(/backdrop-blur-(md|lg|xl)/)
  })

  it("uses neutral highlighted item styling in dark mode", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Account</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    expect(screen.getByRole("menuitem", { name: "Account" }).className).toContain("dark:data-[highlighted]:bg-black/50")
  })
})
