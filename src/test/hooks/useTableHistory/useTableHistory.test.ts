import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { TableState } from '../../../context/table.types'
import { useTableHistory } from '../../../hooks/useTableHistory/useTableHistory'

function fakeState(overrides: Partial<TableState> = {}): TableState {
  return {
    cells: [],
    columnWidths: [],
    rowHeights: [],
    mergedRanges: [],
    headerStyle: 'none',
    headerColor: '#1E40AF',
    contentColor: '#111827',
    borderStyle: 'solid',
    borderColor: '#000000',
    contentBgColor: '',
    rowColors: [],
    columnColors: [],
    columnTextAlign: [],
    cellColors: {},
    cellTextAlign: {},
    selectedRange: null,
    rows: 1,
    cols: 1,
    freezeRow: false,
    freezeCol: false,
    theme: 'default',
    ...overrides,
  }
}

describe('useTableHistory', () => {
  it('starts with canUndo false', () => {
    const { result } = renderHook(() => useTableHistory())
    expect(result.current.canUndo).toBe(false)
  })

  it('records a snapshot and allows undo', () => {
    const { result } = renderHook(() => useTableHistory())
    const s1 = fakeState({ rows: 3 })

    act(() => result.current.recordSnapshot(s1))
    expect(result.current.canUndo).toBe(true)

    act(() => {
      const restored = result.current.undo()
      expect(restored).toEqual(s1)
    })

    expect(result.current.canUndo).toBe(false)
  })

  it('returns undefined when nothing to undo', () => {
    const { result } = renderHook(() => useTableHistory())
    act(() => {
      expect(result.current.undo()).toBeUndefined()
    })
  })

  it('caps history at MAX_HISTORY (50)', () => {
    const { result } = renderHook(() => useTableHistory())

    act(() => {
      for (let i = 0; i < 60; i++) {
        result.current.recordSnapshot(fakeState({ rows: i }))
      }
    })

    act(() => {
      const restored = result.current.undo()
      expect(restored?.rows).toBe(59)
    })
  })
})
