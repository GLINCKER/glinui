import { render, screen } from "@testing-library/react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../index"

describe("Card", () => {
  it("renders card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    )

    expect(screen.getByText("Card title")).toBeVisible()
    expect(screen.getByText("Card description")).toBeVisible()
    expect(screen.getByText("Card content")).toBeVisible()
    expect(screen.getByText("Card footer")).toBeVisible()
  })

  it("applies glass variant classes", () => {
    render(
      <Card variant="glass" data-testid="card">
        <CardContent>Glass card</CardContent>
      </Card>
    )

    expect(screen.getByTestId("card").className).toContain("backdrop-blur-xl")
  })
})
