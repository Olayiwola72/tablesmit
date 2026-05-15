import type { ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { useTableContext } from '../../../context/TableContext'
import type { BorderStyle } from '../../../types/table.types'
import { SectionLabel } from '../../ui/SectionLabel'

export function BorderPanel(): ReactNode {
  const table = useTableContext()
  const { labels } = siteConfig

  return (
    <section>
      <SectionLabel>{labels.borderStyle}</SectionLabel>
      <div className="space-y-3">
        <select
          value={table.borderStyle}
          aria-label={labels.borderStyle}
          className="h-8 w-full rounded-sm border border-border bg-white px-2 text-xs text-text-primary"
          onChange={(event) => table.setBorderStyle(event.target.value as BorderStyle)}
        >
          {siteConfig.labels.borderStyles.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {table.borderStyle !== 'none' && (
          <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
            <span>{labels.borderColor}</span>
            <input type="color" value={table.borderColor} onChange={(event) => table.setBorderColor(event.target.value)} />
          </label>
        )}
      </div>
    </section>
  )
}

export default BorderPanel
