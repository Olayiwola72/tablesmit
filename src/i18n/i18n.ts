import i18n from 'i18next'
import { initReactI18next, setDefaults } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import { LOCALES } from './config'

setDefaults({ useSuspense: false })

const LOCALE_URL = '/locales/{{lng}}/common.json'

async function fetchLocale(lng: string): Promise<Record<string, unknown> | null> {
  const url = LOCALE_URL.replace('{{lng}}', lng)
  try {
    const res = await fetch(url)
    if (!res.ok) {
      if (import.meta.env.DEV) {
        console.error(`[tablesmit] Failed to load locale ${lng}: ${res.status}`)
      }
      return null
    }
    return await res.json() as Record<string, unknown>
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error(`[tablesmit] Failed to load locale: ${lng}`, err)
    }
    return null
  }
}

export async function loadLocale(lng: string): Promise<void> {
  if (lng === 'en') return
  if (i18n.hasResourceBundle(lng, 'common')) return
  const data = await fetchLocale(lng)
  if (data) i18n.addResourceBundle(lng, 'common', data, true, true)
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: LOCALES.map(l => l.code),
      ns: ['common'],
      defaultNS: 'common',
      resources: {
        en: { common: en as Record<string, unknown> },
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'tablesmit-locale',
      },
    })
    .then(() => {
      const currentLang = i18n.language?.split('-')[0] ?? 'en'
      loadLocale(currentLang)
    })
}

i18n.on('languageChanged', (lng) => {
  const locale = LOCALES.find(l => l.code === lng)
  if (locale) {
    document.documentElement.dir = locale.dir
    document.documentElement.lang = lng
  }
  loadLocale(lng)
})

export default i18n
