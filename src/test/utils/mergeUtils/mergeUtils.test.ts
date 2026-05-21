import { describe, expect, it } from 'vitest'
import {
  buildMergeKey,
  isCellInMergeRange,
  isRangeAnchor,
  isSingleCellRange,
  normalizeSelection,
  rangeFromSelection,
} from '../../../utils/mergeUtils/mergeUtils'

describe('normalizeSelection', () => {
  it('orders start before end when start is larger', () => {
    const result = normalizeSelection({ startRow: 5, startCol: 3, endRow: 1, endCol: 7 })
    expect(result.startRow).toBe(1)
    expect(result.endRow).toBe(5)
    expect(result.startCol).toBe(3)
    expect(result.endCol).toBe(7)
  })

  it('leaves already-normalized selections unchanged', () => {
    const result = normalizeSelection({ startRow: 0, startCol: 0, endRow: 2, endCol: 2 })
    expect(result).toEqual({ startRow: 0, startCol: 0, endRow: 2, endCol: 2 })
  })
})

describe('buildMergeKey', () => {
  it('produces canonical R{row}C{col}:R{row}C{col} key', () => {
    expect(buildMergeKey(0, 0, 1, 2)).toBe('R0C0:R1C2')
    expect(buildMergeKey(3, 1, 5, 4)).toBe('R3C1:R5C4')
  })
})

describe('rangeFromSelection', () => {
  it('normalises and produces a full MergeRange with key', () => {
    const result = rangeFromSelection({ startRow: 3, startCol: 1, endRow: 0, endCol: 2 })
    expect(result.startRow).toBe(0)
    expect(result.startCol).toBe(1)
    expect(result.endRow).toBe(3)
    expect(result.endCol).toBe(2)
    expect(result.key).toBe('R0C1:R3C2')
  })
})

describe('isSingleCellRange', () => {
  it('returns true when start equals end', () => {
    expect(isSingleCellRange({ startRow: 2, startCol: 3, endRow: 2, endCol: 3 })).toBe(true)
  })

  it('normalises before checking', () => {
    expect(isSingleCellRange({ startRow: 5, startCol: 3, endRow: 5, endCol: 3 })).toBe(true)
  })

  it('returns false for multi-cell range', () => {
    expect(isSingleCellRange({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 })).toBe(false)
  })
})

describe('isCellInMergeRange', () => {
  const range = { startRow: 0, startCol: 0, endRow: 2, endCol: 2 }

  it('returns true for cells inside the range', () => {
    expect(isCellInMergeRange('R0C0', range)).toBe(true)
    expect(isCellInMergeRange('R1C1', range)).toBe(true)
    expect(isCellInMergeRange('R2C2', range)).toBe(true)
  })

  it('returns false for cells outside the range', () => {
    expect(isCellInMergeRange('R3C0', range)).toBe(false)
    expect(isCellInMergeRange('R0C3', range)).toBe(false)
    expect(isCellInMergeRange('R3C3', range)).toBe(false)
  })
})

describe('isRangeAnchor', () => {
  const range = { key: 'R0C0:R2C2', startRow: 0, startCol: 0, endRow: 2, endCol: 2 }

  it('returns true for the anchor cell', () => {
    expect(isRangeAnchor('R0C0', range)).toBe(true)
  })

  it('returns false for non-anchor cells', () => {
    expect(isRangeAnchor('R1C1', range)).toBe(false)
    expect(isRangeAnchor('R2C2', range)).toBe(false)
  })
})
