import { render } from "@testing-library/react"
import * as axe from "axe-core"

import {
  Button,
  Checkbox,
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuTrigger,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea
} from "../index"

async function expectNoAxeViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false }
    }
  })

  expect(results.violations.map((violation) => violation.id)).toEqual([])
}

describe("A11y smoke", () => {
  it("passes axe for form controls", async () => {
    const { container } = render(
      <div>
        <label htmlFor="name-input">Name</label>
        <Input id="name-input" />

        <label htmlFor="about-textarea">About</label>
        <Textarea id="about-textarea" />

        <label htmlFor="plan-select">Plan</label>
        <Select
          id="plan-select"
          options={[
            { label: "Starter", value: "starter" },
            { label: "Pro", value: "pro" }
          ]}
        />
      </div>
    )

    await expectNoAxeViolations(container)
  })

  it("passes axe for checkbox, switch, and radio group", async () => {
    const { container } = render(
      <div>
        <label htmlFor="terms-checkbox">Accept terms</label>
        <Checkbox id="terms-checkbox" />

        <label htmlFor="mode-switch">Enable mode</label>
        <Switch id="mode-switch" />

        <RadioGroup aria-label="Billing frequency" defaultValue="monthly">
          <RadioGroupItem value="monthly" aria-label="Monthly" />
          <RadioGroupItem value="yearly" aria-label="Yearly" />
        </RadioGroup>
      </div>
    )

    await expectNoAxeViolations(container)
  })

  it("passes axe for tabs and command palette", async () => {
    const { container } = render(
      <div>
        <Tabs defaultValue="preview">
          <TabsList aria-label="View options">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">Preview panel</TabsContent>
          <TabsContent value="code">Code panel</TabsContent>
        </Tabs>

        <Command aria-label="Command menu">
          <CommandInput aria-label="Search commands" />
          <CommandList>
            <CommandItem>Open settings</CommandItem>
          </CommandList>
        </Command>
      </div>
    )

    await expectNoAxeViolations(container)
  })

  it("passes axe for action controls", async () => {
    const { container } = render(
      <div>
        <Button>Save changes</Button>
        <DropdownMenu>
          <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    )

    await expectNoAxeViolations(container)
  })
})
