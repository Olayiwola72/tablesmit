import { Grid2X2, Sparkles } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { DEFAULT_COLS, DEFAULT_ROWS, MAX_COLS, MAX_ROWS } from '../../../config/tableDefaults'
import { useTableContext } from '../../../context/TableContext'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function DimensionsPanel(): ReactNode {
  const table = useTableContext()
  const [rows, setRows] = useState(table.rows || DEFAULT_ROWS)
  const [cols, setCols] = useState(table.cols || DEFAULT_COLS)

  return (
    <section>
      <SectionLabel>Table Dimensions</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1 text-sm font-medium text-text-primary">
          Rows
          <input className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm" type="number" min={1} max={MAX_ROWS} value={rows} onChange={(event) => setRows(Number(event.target.value))} />
        </label>
        <label className="space-y-1 text-sm font-medium text-text-primary">
          Columns
          <input className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm" type="number" min={1} max={MAX_COLS} value={cols} onChange={(event) => setCols(Number(event.target.value))} />
        </label>
      </div>
      <Button className="mt-4 w-full" variant="accent" onClick={() => table.generateTable(rows, cols)}>
        <Sparkles size={16} aria-hidden="true" /> Generate Table
      </Button>
      <p className="mt-3 flex items-center gap-2 text-xs text-text-muted">
        <Grid2X2 size={14} aria-hidden="true" /> Limit: {MAX_ROWS} rows x {MAX_COLS} columns
      </p>
    </section>
  )
}
