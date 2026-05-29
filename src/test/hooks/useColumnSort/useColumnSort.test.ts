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
    const { result } = renderHook(() => useColumnSort(cells, 2, []))
    expect(result.current.activeSortCol).toBeNull()
    expect(result.current.activeSortDir).toBeNull()
  })

  it('toggleSort sets ascending on first toggle', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, []))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortCol).toBe(0)
    expect(result.current.sortDir).toBe('asc')
  })

  it('toggleSort changes to descending on second toggle', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, []))
    act(() => result.current.toggleSort(0))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortDir).toBe('desc')
  })

  it('toggleSort clears sort on third toggle', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, []))
    act(() => result.current.toggleSort(0))
    act(() => result.current.toggleSort(0))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortCol).toBeNull()
    expect(result.current.sortDir).toBeNull()
  })

  it('sortAsc sets ascending', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, []))
    act(() => result.current.sortAsc(1))
    expect(result.current.sortCol).toBe(1)
    expect(result.current.sortDir).toBe('asc')
  })

  it('sortDesc sets descending', () => {
    const cells = makeCells([['b', 'a'], ['a', 'b']])
    const { result } = renderHook(() => useColumnSort(cells, 2, []))
    act(() => result.current.sortDesc(1))
    expect(result.current.sortCol).toBe(1)
    expect(result.current.sortDir).toBe('desc')
  })

  it('returns unsorted rows when no sort is active', () => {
    const cells = makeCells([['b'], ['a']])
    const { result } = renderHook(() => useColumnSort(cells, 1, []))
    expect(result.current.sortedRows).toBe(cells)
  })

  it('sorts rows ascending', () => {
    const cells = makeCells([['b'], ['a'], ['c']])
    const { result } = renderHook(() => useColumnSort(cells, 1, []))
    act(() => result.current.sortAsc(0))
    expect(result.current.sortedRows[0][0].value).toBe('a')
    expect(result.current.sortedRows[1][0].value).toBe('b')
    expect(result.current.sortedRows[2][0].value).toBe('c')
  })

  it('sets sortDisabled when merged ranges exist', () => {
    const cells = makeCells([['a'], ['b']])
    const merged: MergeRange[] = [{ key: 'R0C0:R1C0', startRow: 0, startCol: 0, endRow: 1, endCol: 0 }]
    const { result } = renderHook(() => useColumnSort(cells, 1, merged))
    expect(result.current.sortDisabled).toBe(true)
  })

  it('does not toggle sort when sortDisabled', () => {
    const cells = makeCells([['a'], ['b']])
    const merged: MergeRange[] = [{ key: 'R0C0:R1C0', startRow: 0, startCol: 0, endRow: 1, endCol: 0 }]
    const { result } = renderHook(() => useColumnSort(cells, 1, merged))
    act(() => result.current.toggleSort(0))
    expect(result.current.sortCol).toBeNull()
  })
})
