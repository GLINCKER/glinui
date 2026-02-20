"use client"

import { Toaster, toast, Button } from "@glinui/ui"

const demoToasterProps = {
  position: "bottom-right" as const,
  variant: "glass" as const,
  closeButton: true,
  visibleToasts: 4
}

export function ToastBasicDemo() {
  return (
    <>
      <Toaster {...demoToasterProps} />
      <div className="rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(245_245_247))] p-4 shadow-[0_12px_28px_-18px_rgb(15_23_42_/_0.25)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_61_71_/_0.95),rgb(36_40_48_/_0.95))]">
        <Button
          variant="glass"
          onClick={() =>
            toast("Settings saved", {
              description: "Your workspace has been updated."
            })
          }
        >
          Show toast
        </Button>
      </div>
    </>
  )
}

export function ToastTypesDemo() {
  return (
    <div className="rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(245_245_247))] p-4 shadow-[0_12px_28px_-18px_rgb(15_23_42_/_0.25)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_61_71_/_0.95),rgb(36_40_48_/_0.95))]">
      <Toaster {...demoToasterProps} />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="glass" onClick={() => toast.success("Saved", { description: "Changes applied." })}>Success</Button>
        <Button size="sm" variant="glass" onClick={() => toast.error("Failed", { description: "Something went wrong." })}>Error</Button>
        <Button size="sm" variant="glass" onClick={() => toast.warning("Careful", { description: "This cannot be undone." })}>Warning</Button>
        <Button size="sm" variant="glass" onClick={() => toast.info("Heads up", { description: "A new version is available." })}>Info</Button>
        <Button size="sm" variant="glass" onClick={() => toast.loading("Processing...")}>Loading</Button>
      </div>
    </div>
  )
}

export function ToastActionDemo() {
  return (
    <>
      <Toaster {...demoToasterProps} />
      <div className="rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(245_245_247))] p-4 shadow-[0_12px_28px_-18px_rgb(15_23_42_/_0.25)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_61_71_/_0.95),rgb(36_40_48_/_0.95))]">
        <Button
          variant="liquid"
          onClick={() =>
            toast("File deleted", {
              description: "The file has been moved to trash.",
              action: { label: "Undo", onClick: () => toast.success("Restored") }
            })
          }
        >
          Delete file
        </Button>
      </div>
    </>
  )
}

export function ToastPromiseDemo() {
  return (
    <>
      <Toaster {...demoToasterProps} />
      <div className="rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(245_245_247))] p-4 shadow-[0_12px_28px_-18px_rgb(15_23_42_/_0.25)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_61_71_/_0.95),rgb(36_40_48_/_0.95))]">
        <Button
          onClick={() => {
            toast.promise(
              new Promise((resolve) => setTimeout(resolve, 2000)),
              {
                loading: "Generating report...",
                success: "Report is ready and shared with your team.",
                error: "Failed to generate report"
              }
            )
          }}
          variant="glass"
        >
          Generate report
        </Button>
      </div>
    </>
  )
}
