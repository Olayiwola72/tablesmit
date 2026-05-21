import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { useMergeCells } from '../../../hooks/useMergeCells/useMergeCells'

vi.mock('../../../context/TableContext', () => ({
  useSelectedRange: () => ({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 }),
  useTableContext: () => ({
    mergedRanges: [],
    selectRange: vi.fn(),
    mergeSelection: vi.fn(),
    unmergeSelection: vi.fn(),
  }),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <>{children}</>
}

describe('useMergeCells', () => {
  it('returns selectedRange from context', () => {
    const { result } = renderHook(() => useMergeCells(), { wrapper: Wrapper })
    expect(result.current.selectedRange).toEqual({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 })
  })

  it('returns mergedRanges from context', () => {
    const { result } = renderHook(() => useMergeCells(), { wrapper: Wrapper })
    expect(result.current.mergedRanges).toEqual([])
  })

  it('returns mergeSelection function', () => {
    const { result } = renderHook(() => useMergeCells(), { wrapper: Wrapper })
    expect(typeof result.current.mergeSelection).toBe('function')
  })

  it('returns unmergeSelection function', () => {
    const { result } = renderHook(() => useMergeCells(), { wrapper: Wrapper })
    expect(typeof result.current.unmergeSelection).toBe('function')
  })

  it('calls mergeSelection when invoked', () => {
    const mergeSelection = vi.fn()
    vi.mocked(mergeSelection)
    const { result } = renderHook(() => useMergeCells(), { wrapper: Wrapper })
    result.current.mergeSelection()
    expect(mergeSelection).not.toHaveBeenCalled()
  })
})
