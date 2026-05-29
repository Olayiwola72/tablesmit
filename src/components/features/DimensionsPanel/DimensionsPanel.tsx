import { Grid2X2, Sparkles } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_COLS, DEFAULT_ROWS, MAX_COLS, MAX_ROWS } from '@/config/table/tableDefaults/tableDefaults'
import { useTableContext } from '@/context/TableContext'
import { Button } from '../../ui/Button/Button'
import { FormInput } from '../../ui/FormInput/FormInput'
import { SidebarPanelShell } from '../../ui/SidebarPanelShell/SidebarPanelShell'

export function DimensionsPanel(): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const table = useTableContext()
  const [rows, setRows] = useState(table.rows || DEFAULT_ROWS)
  const [cols, setCols] = useState(table.cols || DEFAULT_COLS)

  return (
    <SidebarPanelShell label={t('panels.dimensions')}>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1 text-sm font-medium text-text-primary">
          {t('table.rows')}
          <FormInput name="dim-rows" type="number" min={1} max={MAX_ROWS} className="w-full h-10" value={rows} onChange={(event) => setRows(Number(event.target.value))} />
        </label>
        <label className="space-y-1 text-sm font-medium text-text-primary">
          {t('table.columns')}
          <FormInput name="dim-cols" type="number" min={1} max={MAX_COLS} className="w-full h-10" value={cols} onChange={(event) => setCols(Number(event.target.value))} />
        </label>
      </div>
      <Button className="w-full" variant="primary" onClick={() => table.generateTable(rows, cols)}>
        <Sparkles size={16} aria-hidden="true" /> {t('table.cta')}
      </Button>
      <p className="flex items-center gap-2 text-xs text-text-muted">
        <Grid2X2 size={14} aria-hidden="true" /> {t('table.limitInfo', { rows: MAX_ROWS, cols: MAX_COLS })}
      </p>
    </SidebarPanelShell>
  )
}

export default DimensionsPanel
