import { describe, expect, it } from 'vitest'
import { buildCellId, isHeaderCell, parseCellId } from '../../../utils/cell/cellUtils'

describe('buildCellId', () => {
  it('encodes row and col into R{row}C{col} format', () => {
    expect(buildCellId(0, 0)).toBe('R0C0')
    expect(buildCellId(4, 7)).toBe('R4C7')
    expect(buildCellId(12, 3)).toBe('R12C3')
  })
})

describe('parseCellId', () => {
  it('parses a valid ID into row and col numbers', () => {
    expect(parseCellId('R0C0')).toEqual({ row: 0, col: 0 })
    expect(parseCellId('R4C7')).toEqual({ row: 4, col: 7 })
    expect(parseCellId('R12C3')).toEqual({ row: 12, col: 3 })
  })

  it('throws on invalid format', () => {
    expect(() => parseCellId('')).toThrow('Invalid cell id')
    expect(() => parseCellId('bad')).toThrow('Invalid cell id')
    expect(() => parseCellId('R0C')).toThrow('Invalid cell id')
    expect(() => parseCellId('RC0')).toThrow('Invalid cell id')
  })

  it('round-trips with buildCellId', () => {
    expect(parseCellId(buildCellId(7, 3))).toEqual({ row: 7, col: 3 })
  })
})

describe('isHeaderCell', () => {
  it('returns false when headerStyle is "none"', () => {
    expect(isHeaderCell('none', 0, 0)).toBe(false)
    expect(isHeaderCell('none', 0, 1)).toBe(false)
  })

  it('returns true for first row when headerStyle is "first-row"', () => {
    expect(isHeaderCell('first-row', 0, 0)).toBe(true)
    expect(isHeaderCell('first-row', 0, 3)).toBe(true)
    expect(isHeaderCell('first-row', 1, 0)).toBe(false)
  })

  it('returns true for first column cell with colSpan 1 when headerStyle is "first-column"', () => {
    expect(isHeaderCell('first-column', 1, 0)).toBe(true)
    expect(isHeaderCell('first-column', 0, 0)).toBe(true)
  })

  it('returns false for merged cell spanning multiple columns in first column', () => {
    expect(isHeaderCell('first-column', 0, 0, 4)).toBe(false)
    expect(isHeaderCell('first-column', 0, 0, 2)).toBe(false)
  })

  it('returns false for non-first-column cells in first-column mode', () => {
    expect(isHeaderCell('first-column', 0, 1)).toBe(false)
    expect(isHeaderCell('first-column', 2, 3)).toBe(false)
  })

  it('returns true for first row regardless of colSpan in "both" mode', () => {
    expect(isHeaderCell('both', 0, 0, 4)).toBe(true)
    expect(isHeaderCell('both', 0, 2, 1)).toBe(true)
  })

  it('returns true for first column cell with colSpan 1 in "both" mode', () => {
    expect(isHeaderCell('both', 3, 0)).toBe(true)
  })

  it('returns false for merged first-column cell in "both" mode', () => {
    expect(isHeaderCell('both', 3, 0, 3)).toBe(false)
  })

  it('defaults colSpan to 1 when not provided', () => {
    expect(isHeaderCell('first-column', 1, 0)).toBe(true)
  })
})
