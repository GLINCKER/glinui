import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  Switch,
  Textarea,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../src"

describe("primitive components", () => {
  it("renders button and supports disabled state", () => {
    render(<Button disabled>Action</Button>)
    expect(screen.getByRole("button", { name: "Action" })).toBeDisabled()
  })

  it("renders input and textarea", async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Input aria-label="Name" />
        <Textarea aria-label="Bio" />
      </div>
    )

    await user.type(screen.getByLabelText("Name"), "Glinr")
    await user.type(screen.getByLabelText("Bio"), "UI library")

    expect(screen.getByLabelText("Name")).toHaveValue("Glinr")
    expect(screen.getByLabelText("Bio")).toHaveValue("UI library")
  })

  it("renders select with options", () => {
    render(
      <Select
        aria-label="Role"
        defaultValue="dev"
        options={[
          { value: "dev", label: "Developer" },
          { value: "design", label: "Designer" }
        ]}
      />
    )

    expect(screen.getByRole("combobox", { name: "Role" })).toHaveValue("dev")
  })

  it("toggles checkbox with keyboard", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Enable" />)

    const checkbox = screen.getByRole("checkbox", { name: "Enable" })
    checkbox.focus()
    await user.keyboard("[Space]")

    expect(checkbox).toHaveAttribute("data-state", "checked")
  })

  it("selects radio item", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup defaultValue="a" aria-label="Plans">
        <RadioGroupItem value="a" aria-label="Plan A" />
        <RadioGroupItem value="b" aria-label="Plan B" />
      </RadioGroup>
    )

    const optionB = screen.getByRole("radio", { name: "Plan B" })
    await user.click(optionB)
    expect(optionB).toHaveAttribute("data-state", "checked")
  })

  it("toggles switch", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Notifications" />)

    const switchEl = screen.getByRole("switch", { name: "Notifications" })
    await user.click(switchEl)

    expect(switchEl).toHaveAttribute("data-state", "checked")
  })

  it("opens modal from trigger", async () => {
    const user = userEvent.setup()
    render(
      <Modal>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalTitle>Confirm Action</ModalTitle>
          <ModalDescription>Continue with this change?</ModalDescription>
        </ModalContent>
      </Modal>
    )

    await user.click(screen.getByRole("button", { name: "Open Modal" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Confirm Action")).toBeInTheDocument()
  })

  it("shows tooltip content", async () => {
    const user = userEvent.setup()

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful info</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByRole("button", { name: "Hover" }))

    expect(await screen.findByRole("tooltip")).toBeInTheDocument()
  })

  it("renders toast with content", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Your changes were saved.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    expect(screen.getByText("Saved")).toBeInTheDocument()
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument()
  })
})
