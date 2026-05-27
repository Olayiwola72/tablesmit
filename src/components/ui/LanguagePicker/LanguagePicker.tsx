import { Check, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { LanguagePickerProps } from './LanguagePicker.types'
import { LOCALES } from '../../../config/locale/localesConfig'
import { loadLocale } from '../../../i18n/i18n'
import { Button } from '../Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu/DropdownMenu'

export function LanguagePicker({ align = 'end', onSelect }: LanguagePickerProps) {
  const { t, i18n } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={t('aria.languageSelect')}>
          <Globe size={16} />
          {LOCALES.find((l) => l.code === i18n.language)?.name ?? i18n.language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={async () => {
              if (locale.code !== i18n.language) {
                await loadLocale(locale.code)
                i18n.changeLanguage(locale.code)
              }
              onSelect?.()
            }}
          >
            {locale.name}
            {i18n.language === locale.code && <Check size={14} className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
