import { useMemo, type ReactNode } from 'react'
import type { HeaderStyle } from '../../../types/table.types'
import { siteConfig } from '../../../config/siteConfig'
import { useTableContext } from '../../../context/TableContext'
import { SectionLabel } from '../../ui/SectionLabel'

const options = siteConfig.labels.headerStyleOptions
const labelByValue = new Map(options.map((o) => [o.value, o.label]))

export function HeaderOptionsPanel(): ReactNode {
  const { headerStyle, setHeaderStyle, freezeRow, freezeCol, setFreezeRow, setFreezeCol } = useTableContext()
  const currentLabel = useMemo(() => labelByValue.get(headerStyle) ?? '', [headerStyle])
  return (
    <section>
      <SectionLabel>{siteConfig.labels.headerDefinitions}</SectionLabel>
      <label className="space-y-1 text-sm font-medium text-text-primary">
        {siteConfig.labels.headerStyle}
        <select name="header-style" className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm" value={headerStyle} onChange={(event) => setHeaderStyle(event.target.value as HeaderStyle)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <p className="mt-2 text-xs text-text-muted">Current: {currentLabel}</p>
      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input type="checkbox" name="freeze-row" checked={freezeRow} onChange={(e) => setFreezeRow(e.target.checked)} className="h-4 w-4 rounded border-border text-primary" />
          Freeze header row
        </label>
        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input type="checkbox" name="freeze-col" checked={freezeCol} onChange={(e) => setFreezeCol(e.target.checked)} className="h-4 w-4 rounded border-border text-primary" />
          Freeze first column
        </label>
      </div>
    </section>
  )
}
