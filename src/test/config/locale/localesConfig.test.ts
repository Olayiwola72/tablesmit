import { describe, expect, it } from 'vitest'
import { i18nConfig, locale, LOCALES } from '../../../config/locale/localesConfig'

describe('i18nConfig', () => {
  it('uses en as fallback language', () => {
    expect(i18nConfig.fallbackLng).toBe('en')
  })

  it('has a storage key for locale preference', () => {
    expect(i18nConfig.storageKey).toBe('tablesmit-locale')
  })

  it('has a base path for locale files', () => {
    expect(i18nConfig.localeBasePath).toBe('/locales')
  })

  it('uses .json file extension', () => {
    expect(i18nConfig.fileExtension).toBe('.json')
  })
})

describe('locale', () => {
  it('uses en-US for date formatting', () => {
    expect(locale.date).toBe('en-US')
  })

  it('uses en-US for currency formatting', () => {
    expect(locale.currency).toBe('en-US')
  })

  it('uses en-US for number formatting', () => {
    expect(locale.number).toBe('en-US')
  })

  it('uses en-US for percent formatting', () => {
    expect(locale.percent).toBe('en-US')
  })

  it('uses USD as currency code', () => {
    expect(locale.currencyCode).toBe('USD')
  })

  it('has date format options', () => {
    expect(locale.dateMonth).toBe('short')
    expect(locale.dateDay).toBe('2-digit')
    expect(locale.dateYear).toBe('numeric')
  })
})

describe('LOCALES', () => {
  it('has 8 supported languages', () => {
    expect(LOCALES).toHaveLength(8)
  })

  it('includes English as the first entry', () => {
    expect(LOCALES[0]).toMatchObject({ code: 'en', name: 'English', dir: 'ltr' })
  })

  it('includes Arabic with rtl direction', () => {
    const ar = LOCALES.find(l => l.code === 'ar')
    expect(ar).toMatchObject({ code: 'ar', name: 'العربية', dir: 'rtl' })
  })

  it('includes all expected language codes', () => {
    const codes = LOCALES.map(l => l.code).sort()
    expect(codes).toEqual(['ar', 'de', 'en', 'es', 'fr', 'ja', 'no', 'pt'])
  })

  it('marks only Arabic as rtl', () => {
    LOCALES.forEach(l => {
      if (l.code === 'ar') {
        expect(l.dir).toBe('rtl')
      } else {
        expect(l.dir).toBe('ltr')
      }
    })
  })

  it('every entry has a non-empty name', () => {
    LOCALES.forEach(l => {
      expect(l.name).toBeTruthy()
    })
  })

  it('every entry has a valid dir', () => {
    LOCALES.forEach(l => {
      expect(['ltr', 'rtl']).toContain(l.dir)
    })
  })
})
