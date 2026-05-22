import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { HeaderStyle } from '../../../types/table'
import { useTableContext } from '../../../context/TableContext'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'

function HeaderOptionsPanel(): ReactNode {
  const { t } = useTranslation()
  const {
    headerStyle,
    setHeaderStyle,
    freezeRow,
    freezeCol,
    setFreezeRow,
    setFreezeCol,
  } = useTableContext()

  const headerStyleOptions: { value: HeaderStyle; label: string }[] = [
    { value: 'none', label: t('table.none') },
    { value: 'first-row', label: t('table.firstRow') },
    { value: 'first-column', label: t('table.firstColumn') },
    { value: 'both', label: t('table.both') },
  ]

  const currentLabel =
    headerStyleOptions.find((o) => o.value === headerStyle)?.label ?? ''

  return (
    <section>
      <SectionLabel>{t('panels.headerOptions')}</SectionLabel>

      <label className="space-y-1 text-sm font-medium text-text-primary">
        <select
          name="header-style"
          aria-label={t('panels.headerOptions')}
          className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm"
          value={headerStyle}
          onChange={(event) =>
            setHeaderStyle(event.target.value as HeaderStyle)
          }
        >
          {headerStyleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <p className="mt-2 text-xs text-text-muted">
        Current: {currentLabel}
      </p>

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-text-primary">
          <input
            type="checkbox"
            name="freeze-row"
            checked={freezeRow}
            onChange={(e) => setFreezeRow(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary"
          />
          {t('table.freezeHeaderRow')}
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-text-primary">
          <input
            type="checkbox"
            name="freeze-col"
            checked={freezeCol}
            onChange={(e) => setFreezeCol(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary"
          />
          {t('table.freezeFirstColumn')}
        </label>
      </div>
    </section>
  )
}

export { HeaderOptionsPanel }
export default HeaderOptionsPanel