import { describe, expect, it } from 'vitest'
import { formatUtils } from '../../../utils/formatUtils/formatUtils'

describe('formatUtils', () => {
  it('returns the value as-is for text format', () => {
    expect(formatUtils('hello', 'text')).toBe('hello')
  })

  it('returns the value as-is for empty or whitespace-only input', () => {
    expect(formatUtils('', 'number')).toBe('')
    expect(formatUtils('  ', 'currency')).toBe('  ')
  })

  describe('number format', () => {
    it('formats a plain number string', () => {
      expect(formatUtils('1234', 'number')).toBe('1,234')
    })

    it('returns original value for non-numeric input', () => {
      expect(formatUtils('abc', 'number')).toBe('abc')
    })
  })

  describe('currency format', () => {
    it('formats a number as USD currency', () => {
      expect(formatUtils('49.99', 'currency')).toBe('$49.99')
    })

    it('returns original value for non-numeric input', () => {
      expect(formatUtils('abc', 'currency')).toBe('abc')
    })
  })

  describe('percentage format', () => {
    it('formats a number as a percentage', () => {
      const result = formatUtils('0.15', 'percentage')
      expect(result).toContain('15')
    })

    it('treats values > 1 as already-integer percentages', () => {
      const result = formatUtils('25', 'percentage')
      expect(result).toContain('25')
    })

    it('returns original value for non-numeric input', () => {
      expect(formatUtils('abc', 'percentage')).toBe('abc')
    })
  })

  describe('date format', () => {
    it('formats a date string', () => {
      const result = formatUtils('2024-01-15', 'date')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('returns original value for invalid date', () => {
      expect(formatUtils('not-a-date', 'date')).toBe('not-a-date')
    })
  })
})

describe('formatUtils auto-number', () => {
  it('returns sequential numbers with rowIndex', () => {
    expect(formatUtils('', 'auto-number', 0)).toBe('1')
    expect(formatUtils('', 'auto-number', 4)).toBe('5')
  })

  it('returns 1 when rowIndex is undefined', () => {
    expect(formatUtils('', 'auto-number')).toBe('1')
  })
})


