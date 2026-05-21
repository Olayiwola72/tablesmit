import { describe, expect, it } from 'vitest'
import { buildCellId, parseCellId } from '../../../utils/cell/cellUtils'

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
