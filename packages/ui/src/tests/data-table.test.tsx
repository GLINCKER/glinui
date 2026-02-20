import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { DataTable } from "../index"

type Row = {
  id: string
  project: string
  status: string
  mrr: number
}

const rows: Row[] = [
  { id: "1", project: "Gamma", status: "Active", mrr: 9200 },
  { id: "2", project: "Alpha", status: "Paused", mrr: 2100 },
  { id: "3", project: "Beta", status: "Active", mrr: 5100 }
]

const columns = [
  { id: "project", header: "Project", accessor: "project" as const },
  { id: "status", header: "Status", accessor: "status" as const },
  { id: "mrr", header: "MRR", accessor: "mrr" as const, align: "right" as const }
]

describe("DataTable", () => {
  it("renders table rows", () => {
    render(<DataTable columns={columns} data={rows} />)

    expect(screen.getByRole("table")).toBeVisible()
    expect(screen.getByText("Gamma")).toBeVisible()
    expect(screen.getByText("Alpha")).toBeVisible()
  })

  it("filters rows via search", async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={rows} searchable searchPlaceholder="Search projects" />)

    await user.type(screen.getByPlaceholderText("Search projects"), "alp")

    expect(screen.getByText("Alpha")).toBeVisible()
    expect(screen.queryByText("Gamma")).not.toBeInTheDocument()
  })

  it("sorts rows when clicking sortable header", async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={rows} />)

    await user.click(screen.getByRole("button", { name: /sort by mrr/i }))

    const tableRows = screen.getAllByRole("row")
    expect(tableRows[1]).toHaveTextContent("Alpha")
  })

  it("paginates rows", async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={rows} pageSize={2} pageSizeOptions={[2, 3]} />)

    expect(screen.queryByText("Beta")).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /next/i }))
    expect(screen.getByText("Beta")).toBeVisible()
  })

  it("handles row selection", async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={rows} selectable getRowId={(row) => row.id} />)

    await user.click(screen.getByRole("checkbox", { name: "Select row 1" }))

    expect(screen.getByText("1 selected")).toBeVisible()
  })
})
