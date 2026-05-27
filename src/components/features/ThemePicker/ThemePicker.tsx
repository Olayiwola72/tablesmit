import { memo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { ThemeDefinition } from '../../../config/table/tableThemes/tableThemes.types'
import { TABLE_THEMES } from '../../../config/table/tableThemes/tableThemes'
import { useTableContext } from '../../../context/TableContext'
import { cn } from '../../../lib/utils'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'
import { trackEvent } from '../../../utils/analytics/analytics'

const themeLabelKey: Record<string, string> = {
  'default': 'themePicker.default',
  'minimal': 'themePicker.minimal',
  'dark-header': 'themePicker.darkHeader',
  'striped': 'themePicker.striped',
  'academic': 'themePicker.academic',
  'monochrome': 'themePicker.monochrome',
}

const ThemeCard = memo(function ThemeCard({ theme, isSelected, onSelect }: { theme: ThemeDefinition; isSelected: boolean; onSelect: () => void }): ReactNode {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'cursor-pointer rounded-md border border-border p-2 transition-colors duration-150 hover:border-primary',
        isSelected && 'ring-2 ring-primary',
      )}
      aria-label={t('aria.themeSelect')}
      aria-pressed={isSelected}
    >
      <svg width="100%" height="28" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mb-1.5 rounded-sm" preserveAspectRatio="none">
        <rect x="0" y="0" width="60" height="10" rx="1" fill={theme.headerBg} />
        <rect x="0" y="11" width="60" height="7" rx="0" fill={theme.rowBg} />
        <rect x="0" y="19" width="60" height="7" rx="0" fill={theme.altRowBg} />
      </svg>
      <span className="block text-center text-xs text-text-secondary">{t(themeLabelKey[theme.id] ?? 'themePicker.default')}</span>
    </button>
  )
})

export function ThemePicker(): ReactNode {
  const { t } = useTranslation()
  const { theme, setTheme } = useTableContext()

  return (
    <section>
      <SectionLabel>{t('panels.theme')}</SectionLabel>
      <div className="grid grid-cols-3 gap-2">
        {TABLE_THEMES.map((th) => (
          <ThemeCard
            key={th.id}
            theme={th}
            isSelected={theme === th.id}
            onSelect={() => { setTheme(th.id); trackEvent('theme_applied', { theme: th.id }) }}
          />
        ))}
      </div>
    </section>
  )
}
