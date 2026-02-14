type PropRow = {
  prop: string
  type: string
  defaultValue?: string
  description: string
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-black/5 dark:bg-white/5">
          <tr>
            <th className="px-3 py-2 font-semibold">Prop</th>
            <th className="px-3 py-2 font-semibold">Type</th>
            <th className="px-3 py-2 font-semibold">Default</th>
            <th className="px-3 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop} className="border-t border-border/60">
              <td className="px-3 py-2">
                <code>{row.prop}</code>
              </td>
              <td className="px-3 py-2">
                <code>{row.type}</code>
              </td>
              <td className="px-3 py-2">
                <code>{row.defaultValue ?? "-"}</code>
              </td>
              <td className="px-3 py-2">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export type { PropRow }
