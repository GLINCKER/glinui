"use client"

import Link from "next/link"
import { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
} from "@glinr/ui"
import { ExampleBlock } from "@/components/docs/example-block"
import { type DocsImplementation, buildComponentHref } from "@/lib/docs-route"

import {
  primitiveComponentIds,
  primitiveDescriptions,
  primitiveTitles,
  type PrimitiveComponentId
} from "@/lib/primitives"

const EXAMPLE_CODE: Record<PrimitiveComponentId, string> = {
  button: `import { Button } from "@glinr/ui"

export function Demo() {
  return (
    <div className="flex gap-3">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`,
  input: `import { Input } from "@glinr/ui"

export function Demo() {
  return <Input aria-label="Email" placeholder="name@example.com" />
}`,
  tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@glinr/ui"

export function Demo() {
  return (
    <Tabs defaultValue="first">
      <TabsList variant="glass">
        <TabsTrigger value="first" variant="glass">First</TabsTrigger>
        <TabsTrigger value="second" variant="glass">Second</TabsTrigger>
      </TabsList>
      <TabsContent value="first" variant="glass">First tab content</TabsContent>
      <TabsContent value="second" variant="glass">Second tab content</TabsContent>
    </Tabs>
  )
}`,
  accordion: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glinr/ui"

export function Demo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" variant="glass">
        <AccordionTrigger variant="glass">What is Glinr UI?</AccordionTrigger>
        <AccordionContent variant="glass">Glinr UI is a liquid-glass focused component library for React.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  "dropdown-menu": `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@glinr/ui"

export function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger variant="glass">Open menu</DropdownMenuTrigger>
      <DropdownMenuContent variant="glass">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  popover: `import { Popover, PopoverTrigger, PopoverContent } from "@glinr/ui"

export function Demo() {
  return (
    <Popover>
      <PopoverTrigger variant="glass">Open popover</PopoverTrigger>
      <PopoverContent variant="glass">Popover content</PopoverContent>
    </Popover>
  )
}`,
  sheet: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@glinr/ui"

export function Demo() {
  return (
    <Sheet>
      <SheetTrigger variant="glass">Open sheet</SheetTrigger>
      <SheetContent variant="glass">
        <SheetHeader>
          <SheetTitle>Project settings</SheetTitle>
          <SheetDescription>Adjust your workspace preferences.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`,
  card: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@glinr/ui"

export function Demo() {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Project overview</CardTitle>
        <CardDescription>Weekly performance summary.</CardDescription>
      </CardHeader>
      <CardContent>Revenue grew by 18% and churn decreased by 1.2%.</CardContent>
      <CardFooter>Updated 2 minutes ago.</CardFooter>
    </Card>
  )
}`,
  badge: `import { Badge } from "@glinr/ui"

export function Demo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="glass">Glass</Badge>
    </div>
  )
}`,
  textarea: `import { Textarea } from "@glinr/ui"

export function Demo() {
  return <Textarea aria-label="Feedback" placeholder="Share your feedback" rows={5} />
}`,
  select: `import { Select } from "@glinr/ui"

export function Demo() {
  return (
    <Select
      aria-label="Team"
      defaultValue="engineering"
      options={[
        { value: "engineering", label: "Engineering" },
        { value: "design", label: "Design" },
        { value: "product", label: "Product" }
      ]}
    />
  )
}`,
  checkbox: `import { Checkbox } from "@glinr/ui"

export function Demo() {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox aria-label="Enable" />
      Enable experimental mode
    </label>
  )
}`,
  "radio-group": `import { RadioGroup, RadioGroupItem } from "@glinr/ui"

export function Demo() {
  return (
    <RadioGroup defaultValue="starter" aria-label="Plan" className="gap-3">
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="starter" aria-label="Starter" /> Starter
      </label>
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="pro" aria-label="Pro" /> Pro
      </label>
    </RadioGroup>
  )
}`,
  switch: `import { Switch } from "@glinr/ui"

export function Demo() {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Switch aria-label="Notifications" />
      Notifications
    </label>
  )
}`,
  modal: `import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Button } from "@glinr/ui"

export function Demo() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Save changes</ModalTitle>
          <ModalDescription>Confirm before applying this update.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}`,
  tooltip: `import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from "@glinr/ui"

export function Demo() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for hint</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip with contextual guidance.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  toast: `import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport, Button } from "@glinr/ui"
import { useState } from "react"

export function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your settings were updated.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}`
}

export function PrimitiveCatalog({ implementation = "radix" }: { implementation?: DocsImplementation }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Primitive Components</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {primitiveComponentIds.map((id) => (
          <Link
            key={id}
            href={buildComponentHref(id, implementation)}
            className="rounded-2xl border border-border/60 bg-[var(--glass-2-surface)] p-4 backdrop-blur-xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,var(--shadow-soft)] transition duration-fast ease-standard hover:-translate-y-0.5 hover:bg-[var(--glass-3-surface)]"
          >
            <p className="text-sm font-semibold">{primitiveTitles[id]}</p>
            <p className="mt-2 text-sm text-neutral-600">{primitiveDescriptions[id]}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function PrimitiveDocsDemo({
  component,
  implementation = "radix"
}: {
  component: PrimitiveComponentId
  implementation?: DocsImplementation
}) {
  const [checked, setChecked] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(true)
  const [toastOpen, setToastOpen] = useState(false)

  return (
    <section className="space-y-4 rounded-2xl border border-border/60 bg-[var(--glass-3-surface)] p-6 backdrop-blur-2xl shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,var(--shadow-elevated)]">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">{primitiveTitles[component]}</h2>
        <p className="text-sm text-neutral-600">{primitiveDescriptions[component]}</p>
      </header>

      <ExampleBlock code={EXAMPLE_CODE[component]} codeDefaultOpen={false}>
        <div className="w-full">
        {component === "button" ? (
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        ) : null}

        {component === "input" ? <Input aria-label="Email" placeholder="name@example.com" /> : null}

        {component === "tabs" ? (
          <Tabs defaultValue="first">
            <TabsList variant="glass">
              <TabsTrigger value="first" variant="glass">
                First
              </TabsTrigger>
              <TabsTrigger value="second" variant="glass">
                Second
              </TabsTrigger>
            </TabsList>
            <TabsContent value="first" variant="glass">
              First tab content
            </TabsContent>
            <TabsContent value="second" variant="glass">
              Second tab content
            </TabsContent>
          </Tabs>
        ) : null}

        {component === "accordion" ? (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" variant="glass">
              <AccordionTrigger variant="glass">What is Glinr UI?</AccordionTrigger>
              <AccordionContent variant="glass">
                Glinr UI is a liquid-glass focused component library for React.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : null}

        {component === "dropdown-menu" ? (
          <DropdownMenu>
            <DropdownMenuTrigger variant="glass">Open menu</DropdownMenuTrigger>
            <DropdownMenuContent variant="glass">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        {component === "popover" ? (
          <Popover>
            <PopoverTrigger variant="glass">Open popover</PopoverTrigger>
            <PopoverContent variant="glass">Popover content</PopoverContent>
          </Popover>
        ) : null}

        {component === "sheet" ? (
          <Sheet>
            <SheetTrigger variant="glass">Open sheet</SheetTrigger>
            <SheetContent variant="glass">
              <SheetHeader>
                <SheetTitle>Project settings</SheetTitle>
                <SheetDescription>Adjust your workspace preferences.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ) : null}

        {component === "card" ? (
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Project overview</CardTitle>
              <CardDescription>Weekly performance summary.</CardDescription>
            </CardHeader>
            <CardContent>Revenue grew by 18% and churn decreased by 1.2%.</CardContent>
            <CardFooter>Updated 2 minutes ago.</CardFooter>
          </Card>
        ) : null}

        {component === "badge" ? (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="glass">Glass</Badge>
          </div>
        ) : null}

        {component === "textarea" ? (
          <Textarea aria-label="Feedback" placeholder="Share your feedback" rows={5} />
        ) : null}

        {component === "select" ? (
          <Select
            aria-label="Team"
            defaultValue="engineering"
            options={[
              { value: "engineering", label: "Engineering" },
              { value: "design", label: "Design" },
              { value: "product", label: "Product" }
            ]}
          />
        ) : null}

        {component === "checkbox" ? (
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={checked} onCheckedChange={(value) => setChecked(Boolean(value))} aria-label="Enable" />
            Enable experimental mode
          </label>
        ) : null}

        {component === "radio-group" ? (
          <RadioGroup defaultValue="starter" aria-label="Plan" className="gap-3">
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="starter" aria-label="Starter" /> Starter
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="pro" aria-label="Pro" /> Pro
            </label>
          </RadioGroup>
        ) : null}

        {component === "switch" ? (
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} aria-label="Notifications" />
            Notifications
          </label>
        ) : null}

        {component === "modal" ? (
          <Modal>
            <ModalTrigger asChild>
              <Button>Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Save changes</ModalTitle>
                <ModalDescription>Confirm before applying this update.</ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <Button variant="ghost">Cancel</Button>
                <Button>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : null}

        {component === "tooltip" ? (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover for hint</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip with contextual guidance.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}

        {component === "toast" ? (
          <ToastProvider>
            <Button onClick={() => setToastOpen(true)}>Show toast</Button>
            <Toast open={toastOpen} onOpenChange={setToastOpen}>
              <ToastTitle>Saved</ToastTitle>
              <ToastDescription>Your settings were updated.</ToastDescription>
              <ToastClose />
            </Toast>
            <ToastViewport />
          </ToastProvider>
        ) : null}
        </div>
      </ExampleBlock>

      <p className="text-xs text-neutral-500">
        Implementation: <code>{implementation}</code>. Import path: <code>@glinr/ui</code>
      </p>
    </section>
  )
}
