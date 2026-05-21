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
      console.error(`[tablesmit] Failed to load locale ${lng}: ${res.status}`)
      return null
    }
    return await res.json() as Record<string, unknown>
  } catch (err) {
    console.error(`[tablesmit] Failed to load locale: ${lng}`, err)
    return null
  }
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
      LOCALES
        .filter(l => l.code !== 'en')
        .forEach(({ code }) => {
          fetchLocale(code).then(data => {
            if (data) i18n.addResourceBundle(code, 'common', data, true, true)
          })
        })
    })
}

i18n.on('languageChanged', (lng) => {
  const locale = LOCALES.find(l => l.code === lng)
  if (locale) {
    document.documentElement.dir = locale.dir
    document.documentElement.lang = lng
  }
})

export default i18n
