import { render, screen } from "@testing-library/react"

import { GlassCard, GlassCardContent, GlassCardFooter, GlassCardHeader } from "../index"

describe("GlassCard", () => {
  it("renders composable sections", () => {
    render(
      <GlassCard>
        <GlassCardHeader>Header</GlassCardHeader>
        <GlassCardContent>Content</GlassCardContent>
        <GlassCardFooter>Footer</GlassCardFooter>
      </GlassCard>
    )

    expect(screen.getByText("Header")).toBeVisible()
    expect(screen.getByText("Content")).toBeVisible()
    expect(screen.getByText("Footer")).toBeVisible()
  })

  it("uses glass-3 base and glass-4 hover classes", () => {
    render(
      <GlassCard data-testid="glass-card">
        <GlassCardContent>Body</GlassCardContent>
      </GlassCard>
    )

    const card = screen.getByTestId("glass-card")
    expect(card.className).toContain("var(--glass-3-surface)")
    expect(card.className).toContain("hover:bg-[var(--glass-4-surface)]")
    expect(card.className).toContain("[border-top-color:var(--glass-refraction-top)]")
  })
})
