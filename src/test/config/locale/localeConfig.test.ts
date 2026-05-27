import { describe, expect, it } from 'vitest'
import { locale } from '../../../config/locale/localeConfig'

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
