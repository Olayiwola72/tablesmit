import { Minus, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { RowColumnActionsProps } from './RowColumnActions.types'
import { MAX_COLS, MAX_ROWS } from '../../../../config/table/tableDefaults'
import { Button } from '../../../ui/Button/Button'

export function RowColumnActions({ rows, cols, onAddRow, onAddColumn, onRemoveRow, onRemoveColumn }: RowColumnActionsProps): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button variant="ghost" size="sm" onClick={onAddRow} disabled={rows >= MAX_ROWS}>
        <Plus size={14} aria-hidden="true" /> {t('toolbar.addRow')}
      </Button>
      <Button variant="ghost" size="sm" onClick={onAddColumn} disabled={cols >= MAX_COLS}>
        <Plus size={14} aria-hidden="true" /> {t('toolbar.addColumn')}
      </Button>
      <Button variant="ghost" size="sm" onClick={onRemoveRow} disabled={rows <= 1}>
        <Minus size={14} aria-hidden="true" /> {t('toolbar.removeRow')}
      </Button>
      <Button variant="ghost" size="sm" onClick={onRemoveColumn} disabled={cols <= 1}>
        <Minus size={14} aria-hidden="true" /> {t('toolbar.removeColumn')}
      </Button>
    </div>
  )
}
