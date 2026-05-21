import { Keyboard } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { StatusBarProps } from './StatusBar.types'

export function StatusBar({ rows, cols }: StatusBarProps): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-between border-b border-border bg-white px-4 py-2 text-xs text-text-muted dark:border-slate-700 dark:bg-slate-900" data-print-hide>
      <span>{t('grid.totalCells', { rows, cols })}</span>
      <span>{t('grid.autoFitTip')}</span>
      <span className="flex items-center gap-1.5">
        <Keyboard size={12} />
        {t('grid.keyboardHint')}
      </span>
    </div>
  )
}
