import { describe, expect, it } from 'vitest'
import {
  makeColumnArrays,
  makeRowArrays,
  makeEmptyCellStyleState,
  padArray,
} from '../../../../context/TableReducer/helpers/reducerHelpers'

describe('makeColumnArrays', () => {
  it('creates arrays of the given length', () => {
    const result = makeColumnArrays(3)
    expect(result.columnWidths).toHaveLength(3)
    expect(result.columnColors).toHaveLength(3)
    expect(result.columnTextAlign).toHaveLength(3)
  })

  it('initialises columnWidths with 120', () => {
    const result = makeColumnArrays(2)
    expect(result.columnWidths).toEqual([120, 120])
  })

  it('initialises columnColors as empty strings', () => {
    const result = makeColumnArrays(2)
    expect(result.columnColors).toEqual(['', ''])
  })

  it('initialises columnTextAlign as "left"', () => {
    const result = makeColumnArrays(2)
    expect(result.columnTextAlign).toEqual(['left', 'left'])
  })

  it('returns empty arrays when cols is 0', () => {
    const result = makeColumnArrays(0)
    expect(result.columnWidths).toEqual([])
    expect(result.columnColors).toEqual([])
    expect(result.columnTextAlign).toEqual([])
  })
})

describe('makeRowArrays', () => {
  it('creates arrays of the given length', () => {
    const result = makeRowArrays(3)
    expect(result.rowHeights).toHaveLength(3)
    expect(result.rowColors).toHaveLength(3)
  })

  it('initialises rowHeights with 44', () => {
    const result = makeRowArrays(2)
    expect(result.rowHeights).toEqual([44, 44])
  })

  it('initialises rowColors as empty strings', () => {
    const result = makeRowArrays(2)
    expect(result.rowColors).toEqual(['', ''])
  })

  it('returns empty arrays when rows is 0', () => {
    const result = makeRowArrays(0)
    expect(result.rowHeights).toEqual([])
    expect(result.rowColors).toEqual([])
  })
})

describe('makeEmptyCellStyleState', () => {
  it('returns empty cellColors object', () => {
    expect(makeEmptyCellStyleState().cellColors).toEqual({})
  })

  it('returns empty cellTextColors object', () => {
    expect(makeEmptyCellStyleState().cellTextColors).toEqual({})
  })

  it('returns empty rowTextColors object', () => {
    expect(makeEmptyCellStyleState().rowTextColors).toEqual({})
  })

  it('returns empty cellTextAlign object', () => {
    expect(makeEmptyCellStyleState().cellTextAlign).toEqual({})
  })
})

describe('padArray', () => {
  it('returns the same array when lengths match', () => {
    expect(padArray([1, 2, 3], 3, 0)).toEqual([1, 2, 3])
  })

  it('truncates when array is longer than target', () => {
    expect(padArray([1, 2, 3, 4, 5], 3, 0)).toEqual([1, 2, 3])
  })

  it('pads with fillValue when array is shorter', () => {
    expect(padArray(['a', 'b'], 5, 'x')).toEqual(['a', 'b', 'x', 'x', 'x'])
  })

  it('returns empty array when target length is 0', () => {
    expect(padArray([1, 2, 3], 0, 0)).toEqual([])
  })

  it('does not mutate the original array', () => {
    const original = [1, 2, 3]
    const result = padArray(original, 5, 0)
    expect(original).toEqual([1, 2, 3])
    expect(result).not.toBe(original)
  })
})
