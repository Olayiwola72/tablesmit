import { describe, expect, it } from 'vitest'
import { dateFormatOptions } from '../../../config/dateFormat/dateFormatConfig'

describe('dateFormatOptions', () => {
  it('day is numeric', () => {
    expect(dateFormatOptions.day).toBe('numeric')
  })

  it('month is long', () => {
    expect(dateFormatOptions.month).toBe('long')
  })

  it('year is numeric', () => {
    expect(dateFormatOptions.year).toBe('numeric')
  })
})
