import { Grid2X2, Sparkles } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_COLS, DEFAULT_ROWS, MAX_COLS, MAX_ROWS } from '../../../config/table/tableDefaults/tableDefaults'
import { useTableContext } from '../../../context/TableContext'
import { Button } from '../../ui/Button/Button'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'

export function DimensionsPanel(): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const table = useTableContext()
  const [rows, setRows] = useState(table.rows || DEFAULT_ROWS)
  const [cols, setCols] = useState(table.cols || DEFAULT_COLS)

  return (
    <section>
      <SectionLabel>{t('panels.dimensions')}</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1 text-sm font-medium text-text-primary">
          {t('table.rows')}
          <input name="dim-rows" className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm" type="number" min={1} max={MAX_ROWS} value={rows} onChange={(event) => setRows(Number(event.target.value))} />
        </label>
        <label className="space-y-1 text-sm font-medium text-text-primary">
          {t('table.columns')}
          <input name="dim-cols" className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm" type="number" min={1} max={MAX_COLS} value={cols} onChange={(event) => setCols(Number(event.target.value))} />
        </label>
      </div>
      <Button className="mt-4 w-full" variant="primary" onClick={() => table.generateTable(rows, cols)}>
        <Sparkles size={16} aria-hidden="true" /> {t('table.cta')}
      </Button>
      <p className="mt-3 flex items-center gap-2 text-xs text-text-muted">
        <Grid2X2 size={14} aria-hidden="true" /> {t('table.limitInfo', { rows: MAX_ROWS, cols: MAX_COLS })}
      </p>
    </section>
  )
}

export default DimensionsPanel
