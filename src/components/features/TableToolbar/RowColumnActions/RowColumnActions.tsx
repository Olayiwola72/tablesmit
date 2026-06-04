import { ChevronDown, List, Minus, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { RowColumnActionsProps } from './RowColumnActions.types'
import { MAX_COLS, MAX_ROWS } from '@/config/table/tableDefaults/tableDefaults'
import { Button } from '@/components/ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu/DropdownMenu'

export function RowColumnActions({ rows, cols, onAddRow, onAddColumn, onRemoveRow, onRemoveColumn }: RowColumnActionsProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  return (
    <>
      <div className="hidden lg:flex shrink-0 items-center gap-1">
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

      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <List size={14} aria-hidden="true" /> {t('toolbar.addRemove', 'Add/Remove')} <ChevronDown size={14} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onAddRow} disabled={rows >= MAX_ROWS}>
              <Plus size={14} aria-hidden="true" /> {t('toolbar.addRow')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onAddColumn} disabled={cols >= MAX_COLS}>
              <Plus size={14} aria-hidden="true" /> {t('toolbar.addColumn')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemoveRow} disabled={rows <= 1}>
              <Minus size={14} aria-hidden="true" /> {t('toolbar.removeRow')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemoveColumn} disabled={cols <= 1}>
              <Minus size={14} aria-hidden="true" /> {t('toolbar.removeColumn')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
