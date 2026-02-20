import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../index"

describe("Keyboard navigation", () => {
  it("focuses checkbox via keyboard and preserves semantics", async () => {
    const user = userEvent.setup()

    render(<Checkbox aria-label="Accept terms" />)

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" })
    await user.tab()
    expect(checkbox).toHaveFocus()
    expect(checkbox).toHaveAttribute("aria-checked", "false")
  })

  it("toggles switch with space key", async () => {
    const user = userEvent.setup()

    render(<Switch aria-label="Airplane mode" />)

    const toggle = screen.getByRole("switch", { name: "Airplane mode" })
    await user.tab()
    expect(toggle).toHaveFocus()
    await user.keyboard("{Enter}")

    await waitFor(() => {
      expect(toggle).toHaveAttribute("data-state", "checked")
    })
  })

  it("moves radio roving focus with arrow keys", async () => {
    const user = userEvent.setup()

    render(
      <RadioGroup defaultValue="one" aria-label="Plan">
        <RadioGroupItem value="one" aria-label="One" />
        <RadioGroupItem value="two" aria-label="Two" />
      </RadioGroup>
    )

    const first = screen.getByRole("radio", { name: "One" })
    const second = screen.getByRole("radio", { name: "Two" })

    await user.tab()
    expect(first).toHaveFocus()
    await user.keyboard("{ArrowRight}")

    expect(first).toHaveAttribute("tabindex", "-1")
    expect(second).toHaveAttribute("tabindex", "0")
  })

  it("moves tab focus and active panel with arrow keys", async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="one">
        <TabsList aria-label="Tabs list">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel One</TabsContent>
        <TabsContent value="two">Panel Two</TabsContent>
      </Tabs>
    )

    const firstTab = screen.getByRole("tab", { name: "One" })
    const secondTab = screen.getByRole("tab", { name: "Two" })

    await user.tab()
    expect(firstTab).toHaveFocus()
    await user.keyboard("{ArrowRight}")

    expect(secondTab).toHaveFocus()
    expect(secondTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByText("Panel Two")).toBeVisible()
  })

  it("opens and closes dropdown menu using keyboard", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Account</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    const trigger = screen.getByRole("button", { name: "Open menu" })
    await user.tab()
    expect(trigger).toHaveFocus()
    await user.keyboard("{Enter}")

    expect(await screen.findByRole("menuitem", { name: "Account" })).toBeVisible()

    await user.keyboard("{Escape}")
    await waitFor(() => {
      expect(screen.queryByRole("menuitem", { name: "Account" })).not.toBeInTheDocument()
    })
  })

  it("closes modal with escape and restores trigger focus", async () => {
    const user = userEvent.setup()

    render(
      <Modal>
        <ModalTrigger>Open dialog</ModalTrigger>
        <ModalContent>
          <ModalTitle>Preferences</ModalTitle>
          <ModalDescription>Configure your settings.</ModalDescription>
        </ModalContent>
      </Modal>
    )

    const trigger = screen.getByRole("button", { name: "Open dialog" })
    await user.tab()
    expect(trigger).toHaveFocus()
    await user.keyboard("{Enter}")

    expect(await screen.findByRole("dialog", { name: "Preferences" })).toBeVisible()

    await user.keyboard("{Escape}")
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Preferences" })).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
  })
})
