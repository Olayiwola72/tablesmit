import { describe, expect, it } from 'vitest'
import { getContrastText } from '../../../utils/colorUtils/colorUtils'

describe('getContrastText', () => {
  it('returns white for dark backgrounds', () => {
    expect(getContrastText('#000000')).toBe('#ffffff')
    expect(getContrastText('#1E40AF')).toBe('#ffffff')
  })

  it('returns dark for light backgrounds', () => {
    expect(getContrastText('#ffffff')).toBe('#111827')
    expect(getContrastText('#F9FAFB')).toBe('#111827')
  })
})
