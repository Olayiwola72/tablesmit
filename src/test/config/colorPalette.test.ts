import { describe, expect, it } from 'vitest'
import { contentColorSwatches, headerColorSwatches } from '../../config/colorPalette'

describe('headerColorSwatches', () => {
  it('has exactly 6 swatches', () => {
    expect(headerColorSwatches).toHaveLength(6)
  })

  it('contains Primary Blue', () => {
    expect(headerColorSwatches.find(s => s.label === 'Primary Blue')?.value).toBe('#1E40AF')
  })

  it('every swatch has label and value', () => {
    headerColorSwatches.forEach(s => {
      expect(s.label).toBeTruthy()
      expect(s.value).toMatch(/^#[0-9a-fA-F]{6}$/)
    })
  })
})

describe('contentColorSwatches', () => {
  it('has exactly 6 swatches', () => {
    expect(contentColorSwatches).toHaveLength(6)
  })

  it('every swatch has label and value', () => {
    contentColorSwatches.forEach(s => {
      expect(s.label).toBeTruthy()
      expect(s.value).toMatch(/^#[0-9a-fA-F]{6}$/)
    })
  })
})
