import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useTableContext } from '@/context/TableContext'
import type { BorderStyle } from '@/types/table'
import { FormLabel } from '../../ui/FormLabel/FormLabel'
import { FormSelect } from '../../ui/FormSelect/FormSelect'
import { SidebarPanelShell } from '../../ui/SidebarPanelShell/SidebarPanelShell'

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
    <SidebarPanelShell label={t('panels.borderStyle')}>
      <FormSelect
        value={table.borderStyle}
        name="border-style"
        aria-label={t('panels.borderStyle')}
        onChange={(event) => table.setBorderStyle(event.target.value as BorderStyle)}
        options={borderStyleOptions}
      />
      {table.borderStyle !== 'none' && (
        <FormLabel>
          <span>{t('borderPanel.borderColor')}</span>
          <input type="color" name="border-color" value={table.borderColor} onChange={(event) => table.setBorderColor(event.target.value)} />
        </FormLabel>
      )}
    </SidebarPanelShell>
  )
}

export default BorderPanel
