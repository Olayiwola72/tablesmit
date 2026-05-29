import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { CellData } from '../../../types/table/cell.types'
import { useFindReplace } from '../../../hooks/useFindReplace/useFindReplace'

function cell(value: string, id: string): CellData {
  return { id, value, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false }
}

const mockCells: CellData[][] = [
  [cell('apple', 'R0C0'), cell('banana', 'R0C1'), cell('cherry', 'R0C2')],
  [cell('orange', 'R1C0'), cell('apple', 'R1C1'), cell('grape', 'R1C2')],
  [cell('kiwi', 'R2C0'), cell('APPLE', 'R2C1'), cell('melon', 'R2C2')],
]

describe('useFindReplace', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with closed panel', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    expect(result.current.isOpen).toBe(false)
  })

  it('returns empty matches when query is empty', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    expect(result.current.matches).toHaveLength(0)
  })

  it('finds all cells matching the query (case-insensitive)', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    expect(result.current.matches).toHaveLength(3)
    expect(result.current.matches).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ])
  })

  it('currentMatch is null when no matches', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('xyz'))
    expect(result.current.currentMatch).toBeNull()
  })

  it('currentMatch matches the first result by default', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('banana'))
    expect(result.current.currentMatch).toEqual({ row: 0, col: 1 })
  })

  it('next() advances to the next match', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    expect(result.current.matchIndex).toBe(0)

    act(() => result.current.next())
    expect(result.current.matchIndex).toBe(1)

    act(() => result.current.next())
    expect(result.current.matchIndex).toBe(2)
  })

  it('next() wraps at end', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    act(() => result.current.next())
    act(() => result.current.next())
    act(() => result.current.next())
    expect(result.current.matchIndex).toBe(0)
  })

  it('prev() goes to previous match', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    expect(result.current.matchIndex).toBe(0)

    act(() => result.current.prev())
    expect(result.current.matchIndex).toBe(2)

    act(() => result.current.prev())
    expect(result.current.matchIndex).toBe(1)
  })

  it('prev() wraps at start', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    act(() => result.current.prev())
    expect(result.current.matchIndex).toBe(2)
  })

  it('match count updates when query changes', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    expect(result.current.matches).toHaveLength(3)

    act(() => result.current.setQuery('grape'))
    expect(result.current.matches).toHaveLength(1)
  })

  it('replace() replaces current match value', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    act(() => result.current.setReplaceText('orange'))

    const updateCell = vi.fn()
    act(() => result.current.replace(updateCell))

    expect(updateCell).toHaveBeenCalledOnce()
    expect(updateCell).toHaveBeenCalledWith('R0C0', 'orange')
  })

  it('replace() does nothing when no current match', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setReplaceText('orange'))

    const updateCell = vi.fn()
    act(() => result.current.replace(updateCell))

    expect(updateCell).not.toHaveBeenCalled()
  })

  it('replaceAll() updates all matching cells', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))
    act(() => result.current.setQuery('apple'))
    act(() => result.current.setReplaceText('orange'))

    const updateCell = vi.fn()
    act(() => result.current.replaceAll(updateCell))

    expect(updateCell).toHaveBeenCalledTimes(3)
    expect(updateCell).toHaveBeenCalledWith('R0C0', 'orange')
    expect(updateCell).toHaveBeenCalledWith('R1C1', 'orange')
    expect(updateCell).toHaveBeenCalledWith('R2C1', 'orange')
  })

  it('replaceAll() handles partial word replacement', () => {
    const cells = [
      [cell('pineapple', 'R0C0'), cell('AppleSauce', 'R0C1')],
    ]
    const { result } = renderHook(() => useFindReplace(cells))
    act(() => result.current.setQuery('apple'))
    act(() => result.current.setReplaceText('Orange'))

    const updateCell = vi.fn()
    act(() => result.current.replaceAll(updateCell))

    expect(updateCell).toHaveBeenCalledTimes(2)
    expect(updateCell).toHaveBeenCalledWith('R0C0', 'pineOrange')
    expect(updateCell).toHaveBeenCalledWith('R0C1', 'OrangeSauce')
  })

  it('replaceAll() does nothing with empty query', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))

    const updateCell = vi.fn()
    act(() => result.current.replaceAll(updateCell))

    expect(updateCell).not.toHaveBeenCalled()
  })

  it('Ctrl+F opens the panel in find mode', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', ctrlKey: true }))
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.replaceMode).toBe(false)
  })

  it('Ctrl+H opens the panel in replace mode', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', ctrlKey: true }))
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.replaceMode).toBe(true)
  })

  it('Escape closes the panel', () => {
    const { result } = renderHook(() => useFindReplace(mockCells))

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', ctrlKey: true }))
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.isOpen).toBe(false)
  })
})
