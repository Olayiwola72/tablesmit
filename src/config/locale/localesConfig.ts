import type { LocaleConfig } from './localesConfig.types'

export const i18nConfig = {
  fallbackLng: 'en' as const,
  storageKey: 'tablesmit-locale' as const,
  localeBasePath: '/locales',
  fileExtension: '.json' as const,
} as const

export const locale = {
  date: 'en-US',
  currency: 'en-US',
  number: 'en-US',
  percent: 'en-US',
  currencyCode: 'USD',
  dateMonth: 'short' as const,
  dateDay: '2-digit' as const,
  dateYear: 'numeric' as const,
} as const

export const LOCALES: LocaleConfig[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'no', name: 'Norsk', dir: 'ltr' },
  { code: 'yo', name: 'Yorùbá', dir: 'ltr' },
]
