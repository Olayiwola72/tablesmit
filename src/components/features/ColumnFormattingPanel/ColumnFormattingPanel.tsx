import { useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useTableContext, useTableData } from '../../../context/TableContext'
import type { ColumnFormat } from '../../../context/table.types'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'

export function ColumnFormattingPanel(): ReactNode {
  const { t } = useTranslation()
  const { cells } = useTableData()
  const { cols, setColumnFormat } = useTableContext()

  const columnFormatOptions = useMemo<{ value: string; label: string }[]>(() => [
    { value: 'text', label: t('table.text') },
    { value: 'number', label: t('table.number') },
    { value: 'currency', label: t('table.currency') },
    { value: 'percentage', label: t('table.percentage') },
    { value: 'date', label: t('table.date') },
    { value: 'sum', label: t('table.sum') },
    { value: 'auto-number', label: t('table.autoNumber') },
  ], [t])

  return (
    <section>
      <SectionLabel>{t('panels.columnFormatting')}</SectionLabel>
      <div className="space-y-2">
        {Array.from({ length: cols }, (_, index) => (
          <label key={index} className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
            C{index + 1}
            <select
              name={`sidebar-col-type-${index}`}
              aria-label={t('table.columnType') + ' ' + (index + 1)}
              className="h-9 rounded-md border border-border bg-white px-2 text-sm"
              value={cells[0]?.[index]?.format ?? 'text'}
              onChange={(event) => setColumnFormat(index, event.target.value as ColumnFormat)}
            >
              {columnFormatOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </section>
  )
}
