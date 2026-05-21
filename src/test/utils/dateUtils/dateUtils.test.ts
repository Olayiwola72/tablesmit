import { describe, expect, it } from 'vitest'
import { getCurrentYear } from '../../../utils/dateUtils/dateUtils'

describe('getCurrentYear', () => {
  it('returns the current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear())
  })
})
