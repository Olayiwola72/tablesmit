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

  it('does not fetch English locale (bundled in JS)', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    await import('../../i18n/i18n')
    const englishFetches = fetchSpy.mock.calls.filter(
      call => typeof call[0] === 'string' && call[0].includes('/locales/en/')
    )
    expect(englishFetches).toHaveLength(0)
  })
})

describe('lazy locale loading', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>
  let i18n: Awaited<ReturnType<typeof import('../../i18n/i18n')>>['default']

  beforeEach(async () => {
    vi.resetModules()
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => Promise.resolve(
        new Response(JSON.stringify({ hero: { headline: 'Test-' + Date.now() } }), {
          headers: { 'Content-Type': 'application/json' },
        })
      )
    )
    const mod = await import('../../i18n/i18n')
    i18n = mod.default
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function countFetches(localeCode: string): number {
    return fetchSpy.mock.calls.filter(
      call => typeof call[0] === 'string' && call[0].includes(`/locales/${localeCode}/`)
    ).length
  }

  it('only fetches the detected language on init (not all 7)', () => {
    const totalNonEn = fetchSpy.mock.calls.filter(
      call => typeof call[0] === 'string' && call[0].includes('/locales/')
    ).length
    expect(totalNonEn).toBeLessThanOrEqual(1)
    expect(countFetches('fr')).toBe(0)
    expect(countFetches('ar')).toBe(0)
    expect(countFetches('de')).toBe(0)
  })

  it('fetches a non-English locale when switching to it', async () => {
    i18n.emit('languageChanged', 'fr')
    await vi.waitFor(() => {
      expect(countFetches('fr')).toBeGreaterThanOrEqual(1)
    })
  })

  it('does not fetch when switching to English', async () => {
    fetchSpy.mockClear()
    i18n.emit('languageChanged', 'en')
    await vi.waitFor(() => {
      expect(countFetches('en')).toBe(0)
    })
  })

  it('does not call addResourceBundle when fetch fails with network error', async () => {
    fetchSpy.mockRestore()
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))
    const addBundleSpy = vi.spyOn(i18n, 'addResourceBundle')

    i18n.emit('languageChanged', 'ja')
    await vi.waitFor(() => {
      const calls = addBundleSpy.mock.calls.filter(c => c[0] === 'ja')
      expect(calls).toHaveLength(0)
    }, { timeout: 2000 })
  })

  it('does not call addResourceBundle when fetch returns 404', async () => {
    fetchSpy.mockRestore()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 404 }))
    const addBundleSpy = vi.spyOn(i18n, 'addResourceBundle')

    i18n.emit('languageChanged', 'pt')
    await vi.waitFor(() => {
      const calls = addBundleSpy.mock.calls.filter(c => c[0] === 'pt')
      expect(calls).toHaveLength(0)
    }, { timeout: 2000 })
  })
})
