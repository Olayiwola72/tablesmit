import type { ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { useTableContext } from '../../../context/TableContext'
import type { ColumnFormat } from '../../../types/table.types'
import { SectionLabel } from '../../ui/SectionLabel'

export function ColumnFormattingPanel(): ReactNode {
  const { cols, cells, setColumnFormat } = useTableContext()
  return (
    <section>
      <SectionLabel>Column Formatting</SectionLabel>
      <div className="space-y-2">
        {Array.from({ length: cols }, (_, index) => (
          <label key={index} className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
            C{index + 1}
            <select
              aria-label={`Column type ${index + 1}`}
              className="h-9 rounded-md border border-border bg-white px-2 text-sm"
              value={cells[0]?.[index]?.format ?? 'text'}
              onChange={(event) => setColumnFormat(index, event.target.value as ColumnFormat)}
            >
              {siteConfig.columnFormats.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </section>
  )
}
