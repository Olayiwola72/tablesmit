import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { CtxColumnTypeSubmenuProps } from './CtxColumnTypeSubmenu.types'
import type { ColumnFormat } from '@/types/table'
import { siteConfig } from '../../../../../config/siteConfig'

export function CtxColumnTypeSubmenu({ currentFormat, onChange, onClose }: CtxColumnTypeSubmenuProps): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="border-t border-border px-3 py-2">
      {siteConfig.columnFormats.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`block w-full rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${currentFormat === opt.value ? 'font-semibold text-primary' : 'text-text-primary'}`}
          onClick={() => { onChange(opt.value as ColumnFormat); onClose() }}
        >
          {t(`table.${opt.value}`, opt.label)}
        </button>
      ))}
    </div>
  )
}
