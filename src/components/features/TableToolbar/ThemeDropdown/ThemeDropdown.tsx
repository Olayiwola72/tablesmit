import { ChevronDown, Palette } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { ThemeDropdownProps } from './ThemeDropdown.types'
import { TABLE_THEMES } from '../../../../config/table/tableThemes/tableThemes'
import { Button } from '../../../ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../../ui/DropdownMenu/DropdownMenu'

export function ThemeDropdown({ theme, onSetTheme }: ThemeDropdownProps): ReactNode {
  const { t } = useTranslation()

  const themeLabelKey: Record<string, string> = {
    'default': 'themePicker.default',
    'minimal': 'themePicker.minimal',
    'dark-header': 'themePicker.darkHeader',
    'striped': 'themePicker.striped',
    'academic': 'themePicker.academic',
    'monochrome': 'themePicker.monochrome',
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <Palette size={14} aria-hidden="true" /> {t('toolbar.theme')} <ChevronDown size={14} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid grid-cols-3 gap-2 p-3" style={{ minWidth: '200px' }}>
        {TABLE_THEMES.map((th) => {
          const isSelected = theme === th.id
          return (
            <button
              key={th.id}
              type="button"
              onClick={() => onSetTheme(th.id)}
              className={'cursor-pointer rounded-md border p-1.5 transition-colors duration-150 hover:border-primary' + (isSelected ? ' ring-2 ring-primary' : ' border-border')}
              aria-label={t('aria.themeSelect')}
              aria-pressed={isSelected}
            >
              <svg width="100%" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true" className="mb-1 rounded-sm" preserveAspectRatio="none">
                <rect x="0" y="0" width="60" height="8" rx="1" fill={th.headerBg} />
                <rect x="0" y="10" width="60" height="6" rx="0" fill={th.rowBg} />
                <rect x="0" y="17" width="60" height="6" rx="0" fill={th.altRowBg} />
              </svg>
              <span className="block text-center text-[10px] text-text-secondary">{t(themeLabelKey[th.id] ?? 'themePicker.default', th.label)}</span>
            </button>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
