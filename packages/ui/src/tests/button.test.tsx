import { render, screen } from "@testing-library/react"

import { Button } from "../index"

describe("Button", () => {
  it("renders the button text", () => {
    render(<Button>Launch</Button>)
    expect(screen.getByRole("button", { name: "Launch" })).toBeVisible()
  })

  it("uses graphite default styling", () => {
    render(
      <Button data-testid="button">
        Primary
      </Button>
    )

    const button = screen.getByTestId("button")
    expect(button.className).toContain("bg-neutral-900")
    expect(button.className).toContain("text-white")
  })

  it("keeps styling when default variant is passed explicitly", () => {
    render(
      <Button variant="default" data-testid="button-explicit-default">
        Primary
      </Button>
    )

    const button = screen.getByTestId("button-explicit-default")
    expect(button.className).toContain("bg-neutral-900")
  })

  it("applies glass variant classes", () => {
    render(
      <Button variant="glass" data-testid="button">
        Glass
      </Button>
    )

    const button = screen.getByTestId("button")
    expect(button.className).toContain("backdrop-blur-md")
    expect(button.className).toContain("border-white/20")
  })

  it("applies liquid, matte, and glow variant classes", () => {
    render(
      <div>
        <Button variant="liquid" data-testid="liquid">
          Liquid
        </Button>
        <Button variant="matte" data-testid="matte">
          Matte
        </Button>
        <Button variant="glow" data-testid="glow">
          Glow
        </Button>
      </div>
    )

    expect(screen.getByTestId("liquid").className).toContain("backdrop-blur-xl")
    expect(screen.getByTestId("matte").className).toContain("backdrop-saturate-150")
    expect(screen.getByTestId("glow").className).toContain("0_0_20px")
  })

  it("applies size classes", () => {
    render(
      <div>
        <Button size="sm" data-testid="sm">
          Small
        </Button>
        <Button size="lg" data-testid="lg">
          Large
        </Button>
      </div>
    )

    expect(screen.getByTestId("sm").className).toContain("h-8")
    expect(screen.getByTestId("lg").className).toContain("h-12")
  })

  it("supports asChild for link rendering", () => {
    render(
      <Button asChild>
        <a href="/docs/getting-started">Read docs</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: "Read docs" })
    expect(link).toBeVisible()
    expect(link.className).toContain("inline-flex")
  })
})
