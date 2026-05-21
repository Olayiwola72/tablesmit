import { describe, expect, it } from 'vitest'
import { LOCALES } from '../../../i18n/config'

describe('LOCALES', () => {
  it('has exactly 8 locales', () => {
    expect(LOCALES).toHaveLength(8)
  })

  it('includes English', () => {
    const en = LOCALES.find(l => l.code === 'en')
    expect(en?.name).toBe('English')
    expect(en?.dir).toBe('ltr')
  })

  it('includes Arabic as RTL', () => {
    const ar = LOCALES.find(l => l.code === 'ar')
    expect(ar?.name).toBe('العربية')
    expect(ar?.dir).toBe('rtl')
  })

  it.each(LOCALES)('$code has a name and valid dir', (locale) => {
    expect(locale.name).toBeTruthy()
    expect(['ltr', 'rtl']).toContain(locale.dir)
  })
})
