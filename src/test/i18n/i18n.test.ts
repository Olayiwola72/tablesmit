import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

describe('i18n init', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exports default i18n instance', async () => {
    const i18nModule = await import('../../i18n/i18n')
    expect(i18nModule.default).toBeDefined()
    expect(i18nModule.default.isInitialized).toBe(true)
  })

  it('sets English as the default language', async () => {
    const i18nModule = await import('../../i18n/i18n')
    expect(['en', 'dev']).toContain(i18nModule.default.language)
  })

  it('has English resources loaded', async () => {
    const i18nModule = await import('../../i18n/i18n')
    const hasEn = i18nModule.default.hasResourceBundle('en', 'common')
    expect(hasEn).toBe(true)
  })

  it('changes document direction when language changes', async () => {
    const i18nModule = await import('../../i18n/i18n')

    i18nModule.default.emit('languageChanged', 'ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.documentElement.lang).toBe('ar')

    i18nModule.default.emit('languageChanged', 'en')
    expect(document.documentElement.dir).toBe('ltr')
    expect(document.documentElement.lang).toBe('en')
  })
})
