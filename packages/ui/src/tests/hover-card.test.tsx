import { render, screen } from "@testing-library/react"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../index"

describe("HoverCard", () => {
  it("renders content when controlled open", () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent>Profile summary</HoverCardContent>
      </HoverCard>
    )

    expect(screen.getByText("Profile summary")).toBeVisible()
  })

  it("supports glass variant and size", () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent variant="glass" size="lg" data-testid="content">
          Profile summary
        </HoverCardContent>
      </HoverCard>
    )

    const content = screen.getByTestId("content")
    expect(content.className).toContain("backdrop-blur-xl")
    expect(content.className).toContain("w-80")
  })
})
