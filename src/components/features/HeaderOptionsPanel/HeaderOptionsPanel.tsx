import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { HeaderStyle } from '@/context/TableState/TableState.types'
import { useTableContext } from '@/context/TableContext'
import { FormSelect } from '../../ui/FormSelect/FormSelect'
import { CheckboxField } from '../../ui/CheckboxField/CheckboxField'
import { SidebarPanelShell } from '../../ui/SidebarPanelShell/SidebarPanelShell'

const headerStyleOptions: { value: HeaderStyle; labelKey: string }[] = [
  { value: 'none', labelKey: 'table.none' },
  { value: 'first-row', labelKey: 'table.firstRow' },
  { value: 'first-column', labelKey: 'table.firstColumn' },
  { value: 'both', labelKey: 'table.both' },
]

function HeaderOptionsPanel(): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const {
    headerStyle,
    setHeaderStyle,
    freezeRow,
    freezeCol,
    setFreezeRow,
    setFreezeCol,
  } = useTableContext()

  return (
    <SidebarPanelShell label={t('panels.headerOptions')}>
      <FormSelect
        name="header-style"
        aria-label={t('panels.headerOptions')}
        className="w-full"
        value={headerStyle}
        onChange={(event) => setHeaderStyle(event.target.value as HeaderStyle)}
        options={headerStyleOptions.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
      />

      <p className="text-xs text-text-muted">
        Current: {t(headerStyleOptions.find((o) => o.value === headerStyle)?.labelKey ?? '')}
      </p>

      <div className="space-y-2 border-t border-border pt-4">
        <CheckboxField
          name="freeze-row"
          checked={freezeRow}
          onChange={(e) => setFreezeRow(e.target.checked)}
          label={t('table.freezeHeaderRow')}
        />
        <CheckboxField
          name="freeze-col"
          checked={freezeCol}
          onChange={(e) => setFreezeCol(e.target.checked)}
          label={t('table.freezeFirstColumn')}
        />
      </div>
    </SidebarPanelShell>
  )
}

export { HeaderOptionsPanel }
export default HeaderOptionsPanel