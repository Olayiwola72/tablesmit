import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useColumnSort } from '../../../hooks/useColumnSort/useColumnSort'
import type { CellData } from '../../../types/table/cell.types'
import type { MergeRange } from '../../../utils/mergeUtils/mergeUtils.types'

function makeCells(values: string[][]): CellData[][] {
  return values.map((row, r) =>
    row.map((value, c) => ({
      id: `R${r}C${c}`,
      value,
      colSpan: 1,
      rowSpan: 1,
      isMerged: false,
      isHidden: false,
    })),
  )
}

describe('useColumnSort', () => {
  it('returns no active sort by default', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, [], 'none'))
    expect(result.current.activeSortCol).toBeNull()
    expect(result.current.activeSortDir).toBeNull()
  })

  it('toggleSort sets ascending on first toggle', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, [], 'none'))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortCol).toBe(0)
    expect(result.current.sortDir).toBe('asc')
  })

  it('toggleSort changes to descending on second toggle', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, [], 'none'))
    act(() => result.current.toggleSort(0))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortDir).toBe('desc')
  })

  it('toggleSort clears sort on third toggle', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, [], 'none'))
    act(() => result.current.toggleSort(0))
    act(() => result.current.toggleSort(0))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortCol).toBeNull()
    expect(result.current.sortDir).toBeNull()
  })

  it('sortAsc sets ascending', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, [], 'none'))
    act(() => result.current.sortAsc(1))
    expect(result.current.sortCol).toBe(1)
    expect(result.current.sortDir).toBe('asc')
  })

  it('sortDesc sets descending', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, [], 'none'))
    act(() => result.current.sortDesc(1))
    expect(result.current.sortCol).toBe(1)
    expect(result.current.sortDir).toBe('desc')
  })

  it('returns unsorted rows when no sort is active', () => {
    const cells = makeCells([['b'], ['a']])
    const { result } = renderHook(() => useColumnSort(cells, 1, [], 'none'))
    expect(result.current.sortedRows).toBe(cells)
  })

  it('sorts rows ascending', () => {
    const cells = makeCells([['b'], ['a'], ['c']])
    const { result } = renderHook(() => useColumnSort(cells, 1, [], 'none'))
    act(() => result.current.sortAsc(0))
    expect(result.current.sortedRows[0][0].value).toBe('a')
    expect(result.current.sortedRows[1][0].value).toBe('b')
    expect(result.current.sortedRows[2][0].value).toBe('c')
  })

  it('disables sort on merged column but not on unmerged column', () => {
    const cells = makeCells([['a', 'b'], ['c', 'd']])
    const merged: MergeRange[] = [{ key: 'R0C0:R1C0', startRow: 0, startCol: 0, endRow: 1, endCol: 0 }]
    const { result } = renderHook(() => useColumnSort(cells, 2, merged, 'none'))
    expect(result.current.isSortDisabled(0)).toBe(true)
    expect(result.current.isSortDisabled(1)).toBe(false)
  })

  it('allows toggle sort on unmerged column when merged ranges exist', () => {
    const cells = makeCells([['a', 'b'], ['c', 'd']])
    const merged: MergeRange[] = [{ key: 'R0C0:R1C0', startRow: 0, startCol: 0, endRow: 1, endCol: 0 }]
    const { result } = renderHook(() => useColumnSort(cells, 2, merged, 'none'))
    act(() => result.current.toggleSort(1))
    expect(result.current.sortCol).toBe(1)
    expect(result.current.sortDir).toBe('asc')
  })

  it('does not toggle sort on merged column', () => {
    const cells = makeCells([['a', 'b'], ['c', 'd']])
    const merged: MergeRange[] = [{ key: 'R0C0:R1C0', startRow: 0, startCol: 0, endRow: 1, endCol: 0 }]
    const { result } = renderHook(() => useColumnSort(cells, 2, merged, 'none'))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortCol).toBeNull()
  })

  describe('headerStyle excludes first row from sort', () => {
    function makeCellsWithHeader(data: string[][]): CellData[][] {
      return data.map((row, r) =>
        row.map((value, c) => ({
          id: `R${r}C${c}`,
          value,
          colSpan: 1,
          rowSpan: 1,
          isMerged: false,
          isHidden: false,
        })),
      )
    }

    it('keeps first row at top when headerStyle is first-row', () => {
      const cells = makeCellsWithHeader([['header', 'h'], ['c', 'x'], ['a', 'y'], ['b', 'z']])
      const { result } = renderHook(() => useColumnSort(cells, 2, [], 'first-row'))
      act(() => result.current.sortAsc(0))
      expect(result.current.sortedRows[0][0].value).toBe('header')
      expect(result.current.sortedRows.map((r) => r[0].value)).toEqual(['header', 'a', 'b', 'c'])
    })

    it('keeps first row at top when headerStyle is both', () => {
      const cells = makeCellsWithHeader([['header', 'h'], ['c', 'x'], ['a', 'y']])
      const { result } = renderHook(() => useColumnSort(cells, 2, [], 'both'))
      act(() => result.current.sortAsc(0))
      expect(result.current.sortedRows[0][0].value).toBe('header')
      expect(result.current.sortedRows.map((r) => r[0].value)).toEqual(['header', 'a', 'c'])
    })

    it('sorts first row as data when headerStyle is none', () => {
      const cells = makeCellsWithHeader([['c', 'h'], ['a', 'y'], ['b', 'z']])
      const { result } = renderHook(() => useColumnSort(cells, 2, [], 'none'))
      act(() => result.current.sortAsc(0))
      expect(result.current.sortedRows.map((r) => r[0].value)).toEqual(['a', 'b', 'c'])
    })

    it('sorts first row as data when headerStyle is first-column', () => {
      const cells = makeCellsWithHeader([['c', 'h'], ['a', 'y'], ['b', 'z']])
      const { result } = renderHook(() => useColumnSort(cells, 2, [], 'first-column'))
      act(() => result.current.sortAsc(0))
      expect(result.current.sortedRows.map((r) => r[0].value)).toEqual(['a', 'b', 'c'])
    })

    it('defaults to first-row when headerStyle is not provided', () => {
      const cells = makeCellsWithHeader([['header', 'h'], ['c', 'x'], ['a', 'y']])
      const { result } = renderHook(() => useColumnSort(cells, 2, []))
      act(() => result.current.sortAsc(0))
      expect(result.current.sortedRows[0][0].value).toBe('header')
    })

    it('keeps first row in same position for descending sort with headerStyle first-row', () => {
      const cells = makeCellsWithHeader([['header', 'h'], ['a', 'x'], ['c', 'y'], ['b', 'z']])
      const { result } = renderHook(() => useColumnSort(cells, 2, [], 'first-row'))
      act(() => result.current.sortDesc(0))
      expect(result.current.sortedRows[0][0].value).toBe('header')
      expect(result.current.sortedRows.map((r) => r[0].value)).toEqual(['header', 'c', 'b', 'a'])
    })

    it('returns unsorted rows with first row preserved when no sort active', () => {
      const cells = makeCellsWithHeader([['header', 'h'], ['a', 'x'], ['b', 'y']])
      const { result } = renderHook(() => useColumnSort(cells, 2, [], 'first-row'))
      expect(result.current.sortedRows).toBe(cells)
    })
  })
})
