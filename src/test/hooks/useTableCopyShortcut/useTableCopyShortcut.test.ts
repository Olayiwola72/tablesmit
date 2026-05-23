import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useTableCopyShortcut } from '../../../hooks/useTableCopyShortcut/useTableCopyShortcut'
import type { CellData } from '../../../types/table'

function createCells(values: string[][]): CellData[][] {
  return values.map((row, r) =>
    row.map((val, c) => ({
      id: `R${r}C${c}`,
      value: val,
      colSpan: 1,
      rowSpan: 1,
      isMerged: false,
      isHidden: false,
      format: 'text' as const,
    })),
  )
}

describe('useTableCopyShortcut', () => {
  const baseCells = createCells([['a', 'b'], ['c', 'd']])

  it('does nothing when clipboard event occurs on editable element', async () => {
    const user = userEvent.setup()
    const setCaptionAlignment = vi.fn()
    const editable = document.createElement('div')
    editable.contentEditable = 'true'
    document.body.appendChild(editable)
    editable.focus()

    renderHook(() => useTableCopyShortcut(baseCells, { current: null }, setCaptionAlignment))

    await user.keyboard('{Control>}c{/Control}')
    expect(setCaptionAlignment).not.toHaveBeenCalled()

    document.body.removeChild(editable)
  })

  it('does not call setCaptionAlignment for non-caption keys', async () => {
    const user = userEvent.setup()
    const setCaptionAlignment = vi.fn()

    renderHook(() => useTableCopyShortcut(baseCells, { current: null }, setCaptionAlignment))

    await user.keyboard('{Control>}x{/Control}')
    expect(setCaptionAlignment).not.toHaveBeenCalled()
  })

  it('calls setCaptionAlignment("center") on Ctrl+E', async () => {
    const user = userEvent.setup()
    const setCaptionAlignment = vi.fn()

    renderHook(() => useTableCopyShortcut(baseCells, { current: null }, setCaptionAlignment))

    await user.keyboard('{Control>}e{/Control}')
    expect(setCaptionAlignment).toHaveBeenCalledWith('center')
  })

  it('calls setCaptionAlignment("left") on Ctrl+L', async () => {
    const user = userEvent.setup()
    const setCaptionAlignment = vi.fn()

    renderHook(() => useTableCopyShortcut(baseCells, { current: null }, setCaptionAlignment))

    await user.keyboard('{Control>}l{/Control}')
    expect(setCaptionAlignment).toHaveBeenCalledWith('left')
  })

  it('calls setCaptionAlignment("right") on Ctrl+R', async () => {
    const user = userEvent.setup()
    const setCaptionAlignment = vi.fn()

    renderHook(() => useTableCopyShortcut(baseCells, { current: null }, setCaptionAlignment))

    await user.keyboard('{Control>}r{/Control}')
    expect(setCaptionAlignment).toHaveBeenCalledWith('right')
  })

  it('cleans up event listener on unmount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = renderHook(() =>
      useTableCopyShortcut(baseCells, { current: null }, vi.fn()),
    )
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})
