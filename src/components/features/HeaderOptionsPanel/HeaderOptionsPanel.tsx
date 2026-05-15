import type { ReactNode } from 'react'
import type { HeaderStyle } from '../../../types/table.types'
import { useTableContext } from '../../../context/TableContext'
import { SectionLabel } from '../../ui/SectionLabel'

const options: Array<{ value: HeaderStyle; label: string }> = [
  { value: 'none', label: 'No Header' },
  { value: 'first-row', label: 'First Row' },
  { value: 'first-column', label: 'First Column' },
  { value: 'both', label: 'Both' },
]

export function HeaderOptionsPanel(): ReactNode {
  const { headerStyle, setHeaderStyle } = useTableContext()
  return (
    <section>
      <SectionLabel>Header Options</SectionLabel>
      <label className="space-y-1 text-sm font-medium text-text-primary">
        Header Style
        <select className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm" value={headerStyle} onChange={(event) => setHeaderStyle(event.target.value as HeaderStyle)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <p className="mt-2 text-xs text-text-muted">Current: {options.find((option) => option.value === headerStyle)?.label}</p>
    </section>
  )
}
