import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useTableContext } from '../../../context/TableContext'
import type { BorderStyle } from '../../../types/table'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'

export function BorderPanel(): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const table = useTableContext()

  const borderStyleOptions = [
    { value: 'none' as const, label: t('borderPanel.noBorder') },
    { value: 'solid' as const, label: t('borderPanel.solid') },
    { value: 'dotted' as const, label: t('borderPanel.dotted') },
    { value: 'dashed' as const, label: t('borderPanel.dashed') },
    { value: 'double' as const, label: t('borderPanel.double') },
  ]

  return (
    <section>
      <SectionLabel>{t('panels.borderStyle')}</SectionLabel>
      <div className="space-y-3">
        <select
          value={table.borderStyle}
          name="border-style"
          aria-label={t('panels.borderStyle')}
          className="h-8 w-full rounded-sm border border-border bg-white px-2 text-xs text-text-primary"
          onChange={(event) => table.setBorderStyle(event.target.value as BorderStyle)}
        >
          {borderStyleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {table.borderStyle !== 'none' && (
          <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
            <span>{t('borderPanel.borderColor')}</span>
            <input type="color" name="border-color" value={table.borderColor} onChange={(event) => table.setBorderColor(event.target.value)} />
          </label>
        )}
      </div>
    </section>
  )
}

export default BorderPanel
