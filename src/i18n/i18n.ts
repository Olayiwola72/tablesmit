import i18n from 'i18next'
import { initReactI18next, setDefaults } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { brand } from '../config/brand/brandConfig'
import { LOCALES, i18nConfig } from '../config/locale/localesConfig'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enAbout from './locales/en/about.json'
import enOpenSource from './locales/en/openSource.json'
import enBlog from './locales/en/blog.json'
import enContact from './locales/en/contact.json'
import enLegal from './locales/en/legal.json'
import enTable from './locales/en/table.json'
import enFeatures from './locales/en/features.json'
import enTestimonials from './locales/en/testimonials.json'
import enChanglog from './locales/en/changelog.json'
import enNotFound from './locales/en/notFound.json'

setDefaults({ useSuspense: false })

export const NS = [
  'common', 'home', 'about', 'openSource', 'blog', 'contact',
  'legal', 'table', 'features', 'testimonials', 'changelog', 'notFound',
] as const

export type Namespace = (typeof NS)[number]

const loadedNamespaces = new Set<string>()

async function fetchLocale(lng: string, ns: string): Promise<Record<string, unknown> | null> {
  const url = `${i18nConfig.localeBasePath}/${lng}/${ns}${i18nConfig.fileExtension}`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      if (import.meta.env.DEV) {
        console.error(`[${brand.name}] load error ${lng}/${ns}: ${res.status}`)
      }
      return null
    }
    return (await res.json()) as Record<string, unknown>
  } catch (err) {
    if (import.meta.env.DEV) {
        console.error(`[${brand.name}] load error ${lng}/${ns}:`, err)
    }
    return null
  }
}

export async function loadNamespace(lng: string, ns: string): Promise<void> {
  if (lng === 'en') return
  const key = `${lng}:${ns}`
  if (loadedNamespaces.has(key)) return
  if (i18n.hasResourceBundle(lng, ns)) {
    loadedNamespaces.add(key)
    return
  }
  const data = await fetchLocale(lng, ns)
  if (data) {
    i18n.addResourceBundle(lng, ns, data, true, true)
    loadedNamespaces.add(key)
  }
}

export async function loadLocale(lng: string): Promise<void> {
  if (lng === 'en') return
  const toFetch = NS.filter((ns) => !i18n.hasResourceBundle(lng, ns))
  if (toFetch.length === 0) return
  const results = await Promise.all(
    toFetch.map((ns) => fetchLocale(lng, ns).then((data) => ({ ns, data }))),
  )
  for (const { ns, data } of results) {
    if (data) {
      i18n.addResourceBundle(lng, ns, data, true, true)
      loadedNamespaces.add(`${lng}:${ns}`)
    }
  }
}

const enResources: Record<string, Record<string, unknown>> = {
  common: enCommon as Record<string, unknown>,
  home: enHome as Record<string, unknown>,
  about: enAbout as Record<string, unknown>,
  openSource: enOpenSource as Record<string, unknown>,
  blog: enBlog as Record<string, unknown>,
  contact: enContact as Record<string, unknown>,
  legal: enLegal as Record<string, unknown>,
  table: enTable as Record<string, unknown>,
  features: enFeatures as Record<string, unknown>,
  testimonials: enTestimonials as Record<string, unknown>,
  changelog: enChanglog as Record<string, unknown>,
  notFound: enNotFound as Record<string, unknown>,
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: i18nConfig.fallbackLng,
      supportedLngs: LOCALES.map((l) => l.code),
      ns: ['common'],
      defaultNS: 'common',
      react: { nsMode: 'fallback' },
      resources: { en: enResources },
      interpolation: {
        defaultVariables: { name: brand.name },
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: i18nConfig.storageKey,
      },
    })
    .then(() => {
      const currentLang = i18n.language?.split('-')[0] ?? i18nConfig.fallbackLng
      loadLocale(currentLang)
    })
}

i18n.on('languageChanged', (lng) => {
  const locale = LOCALES.find((l) => l.code === lng)
  if (locale) {
    document.documentElement.dir = locale.dir
    document.documentElement.lang = lng
  }
  loadLocale(lng)
})

export default i18n
