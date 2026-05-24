import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider, useSelectedRange, useTableContext, useTableData, initialState } from '../../../context/TableContext'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

function useCombined() {
  return { ...useTableContext(), ...useTableData() }
}

function useWithSelection() {
  return { ...useTableContext(), selectedRange: useSelectedRange() }
}

describe('TableContext', () => {
  it('initialises with a 5x5 grid', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    expect(result.current.cells).toHaveLength(5)
    expect(result.current.cells[0]).toHaveLength(5)
    expect(result.current.rows).toBe(5)
    expect(result.current.cols).toBe(5)
  })

  it('updates a cell value', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.updateCell('R0C0', 'Hello'))
    expect(result.current.cells[0][0].value).toBe('Hello')
  })

  it('adds a row', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.addRow())
    expect(result.current.cells).toHaveLength(6)
    expect(result.current.rows).toBe(6)
  })

  it('does not exceed MAX_ROWS (50)', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => { for (let i = 0; i < 100; i++) result.current.addRow() })
    expect(result.current.rows).toBeLessThanOrEqual(50)
  })

  it('does not remove the last row', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => { for (let i = 0; i < 100; i++) result.current.removeRow() })
    expect(result.current.rows).toBeGreaterThanOrEqual(1)
  })

  it('adds a column', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.addColumn())
    expect(result.current.cols).toBe(6)
  })

  it('does not exceed MAX_COLS (20)', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => { for (let i = 0; i < 100; i++) result.current.addColumn() })
    expect(result.current.cols).toBeLessThanOrEqual(20)
  })

  it('removes a column', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.removeColumn())
    expect(result.current.cols).toBe(4)
  })

  it('clears all cell values', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.updateCell('R0C0', 'data'))
    act(() => result.current.clearAll())
    expect(result.current.cells[0][0].value).toBe('')
  })

  it('sets header style', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.setHeaderStyle('first-row'))
    expect(result.current.headerStyle).toBe('first-row')
  })

  it('sets header color', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.setHeaderColor('#ff0000'))
    expect(result.current.headerColor).toBe('#ff0000')
  })

  it('sets content color', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.setContentColor('#00ff00'))
    expect(result.current.contentColor).toBe('#00ff00')
  })

  it('selects a range', () => {
    const { result } = renderHook(() => useWithSelection(), { wrapper: Wrapper })
    act(() => result.current.selectRange({ startRow: 0, startCol: 0, endRow: 2, endCol: 2 }))
    expect(result.current.selectedRange).toEqual({ startRow: 0, startCol: 0, endRow: 2, endCol: 2 })
  })

  it('merges a valid multi-cell range', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.selectRange({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 }))
    act(() => result.current.mergeSelection())
    expect(result.current.mergedRanges).toHaveLength(1)
  })

  it('does not merge a single cell', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.selectRange({ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }))
    act(() => result.current.mergeSelection())
    expect(result.current.mergedRanges).toHaveLength(0)
  })

  it('unmerges a merged range', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.selectRange({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 }))
    act(() => result.current.mergeSelection())
    act(() => result.current.unmergeSelection())
    expect(result.current.mergedRanges).toHaveLength(0)
  })

  it('generates a new table with specified dimensions', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.generateTable(3, 7))
    expect(result.current.rows).toBe(3)
    expect(result.current.cols).toBe(7)
  })

  it('clamps generateTable dimensions to allowed ranges', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.generateTable(999, 999))
    expect(result.current.rows).toBeLessThanOrEqual(50)
    expect(result.current.cols).toBeLessThanOrEqual(20)
  })

  it('sets column format', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() => result.current.setColumnFormat(0, 'currency'))
    expect(result.current.cells[0][0].format).toBe('currency')
  })

  it('sets column width', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.setColumnWidth(0, 200))
    expect(result.current.columnWidths[0]).toBe(200)
  })

  it('sets row height', () => {
    const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
    act(() => result.current.setRowHeight(0, 100))
    expect(result.current.rowHeights[0]).toBe(100)
  })

  it('throws when used outside TableProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useTableContext())).toThrow('useTableContext must be used inside TableProvider')
    spy.mockRestore()
  })

  describe('caption persistence', () => {
    it('initialises with empty caption state', () => {
      const { result } = renderHook(() => useTableContext(), { wrapper: Wrapper })
      expect(result.current.caption).toBe('')
      expect(result.current.captionAlignment).toBe('center')

      expect(initialState.captionAlignment).toBe('center')
    })
  })

  it('applyPreset sets caption from the preset label', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() =>
      result.current.applyPreset({
        id: 'test',
        label: 'Research Notes',
        rows: 3,
        cols: 4,
        headerStyle: 'first-row',
        headers: ['A', 'B', 'C', 'D'],
      }),
    )
    expect(result.current.caption).toBe('Research Notes')
  })

  it('applyPreset uses preset.caption over label when provided', () => {
    const { result } = renderHook(() => useCombined(), { wrapper: Wrapper })
    act(() =>
      result.current.applyPreset({
        id: 'test',
        label: 'Research Notes',
        caption: 'Custom Caption',
        rows: 3,
        cols: 4,
        headerStyle: 'first-row',
        headers: ['A', 'B', 'C', 'D'],
      }),
    )
    expect(result.current.caption).toBe('Custom Caption')
  })
})
