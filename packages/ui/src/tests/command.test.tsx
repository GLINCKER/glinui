import { render, screen } from "@testing-library/react"

import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../index"

describe("Command", () => {
  it("renders command palette with input and items", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>Copy</CommandItem>
            <CommandItem>Paste</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
    expect(screen.getByPlaceholderText("Search...")).toBeVisible()
    expect(screen.getByText("Copy")).toBeVisible()
    expect(screen.getByText("Paste")).toBeVisible()
  })

  it("forwards custom className", () => {
    render(
      <Command data-testid="cmd" className="max-w-md">
        <CommandList>
          <CommandItem>Test</CommandItem>
        </CommandList>
      </Command>
    )
    expect(screen.getByTestId("cmd")).toHaveClass("max-w-md")
  })

  it("supports glass variant and size", () => {
    render(
      <Command data-testid="cmd" variant="glass" size="lg">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>Action</CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByTestId("cmd").className).toContain("glass-2")
    expect(screen.getByPlaceholderText("Search...").className).toContain("text-base")
    expect(screen.getByText("Action").className).toContain("text-base")
    expect(screen.getByText("Action").className).toContain("dark:data-[selected=true]:bg-white/[0.14]")
  })

  it("supports liquid variant surface", () => {
    render(
      <Command data-testid="cmd" variant="liquid">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>Action</CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByTestId("cmd").className).toContain("radial-gradient")
  })
})
