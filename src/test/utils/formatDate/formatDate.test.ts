import { describe, expect, it, vi } from 'vitest'
import { formatDate } from '../../../utils/formatDate/formatDate'

vi.mock('i18next', () => ({
  default: { language: 'en' },
}))

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const result = formatDate('2025-09-15')
    expect(result).toBe('September 15, 2025')
  })

  it('handles first day of month', () => {
    const result = formatDate('2025-01-01')
    expect(result).toBe('January 1, 2025')
  })

  it('handles last day of year', () => {
    const result = formatDate('2025-12-31')
    expect(result).toBe('December 31, 2025')
  })
})
