import { describe, expect, it } from 'vitest'
import { dateOptions } from '../../../config/date/dateConfig'

describe('dateOptions', () => {
  it('day is numeric', () => {
    expect(dateOptions.day).toBe('numeric')
  })

  it('month is long', () => {
    expect(dateOptions.month).toBe('long')
  })

  it('year is numeric', () => {
    expect(dateOptions.year).toBe('numeric')
  })
})
