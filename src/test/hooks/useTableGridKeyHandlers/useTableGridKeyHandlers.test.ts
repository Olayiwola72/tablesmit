import { renderHook, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useTableGridKeyHandlers } from '../../../hooks/useTableGridKeyHandlers/useTableGridKeyHandlers'

describe('useTableGridKeyHandlers', () => {
  const defaultHiddenSet = new Set<string>()
  const defaultSelectCell = vi.fn()

  it('triggers undo on Ctrl+Z when canUndo is true', async () => {
    const user = userEvent.setup()
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()

    renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, defaultSelectCell),
    )

    await user.keyboard('{Control>}z{/Control}')
    expect(undo).toHaveBeenCalledOnce()
  })

  it('does not trigger undo when target is contenteditable', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()
    const selectCell = vi.fn()

    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, selectCell),
    )

    act(() => {
      editable.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }),
      )
    })
    expect(undo).not.toHaveBeenCalled()

    document.body.removeChild(editable)
  })

  it('skips undo when canUndo is false', async () => {
    const user = userEvent.setup()
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()

    renderHook(() =>
      useTableGridKeyHandlers(false, undo, null, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, defaultSelectCell),
    )

    await user.keyboard('{Control>}z{/Control}')
    expect(undo).not.toHaveBeenCalled()
  })

  it('closes context menu on Escape when ctxMenu is open', async () => {
    const user = userEvent.setup()
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()

    renderHook(() =>
      useTableGridKeyHandlers(true, undo, {}, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, defaultSelectCell),
    )

    await user.keyboard('{Escape}')
    expect(setCtxMenu).toHaveBeenCalledWith(null)
    expect(setActiveSub).toHaveBeenCalledWith(null)
  })

  it('does not close context menu on Escape when ctxMenu is null', async () => {
    const user = userEvent.setup()
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()

    renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, defaultSelectCell),
    )

    await user.keyboard('{Escape}')
    expect(setCtxMenu).not.toHaveBeenCalled()
  })

  it('closes context menu on mousedown outside ctxMenu', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()
    const outside = document.createElement('div')
    document.body.appendChild(outside)

    renderHook(() =>
      useTableGridKeyHandlers(true, undo, {}, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, defaultSelectCell),
    )

    act(() => {
      outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })
    expect(setCtxMenu).toHaveBeenCalledWith(null)
    expect(setActiveSub).toHaveBeenCalledWith(null)

    document.body.removeChild(outside)
  })

  it('does not close ctxMenu when click is inside ctxMenu', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()

    const menu = document.createElement('div')
    menu.setAttribute('data-ctx-menu', 'true')
    document.body.appendChild(menu)

    renderHook(() =>
      useTableGridKeyHandlers(true, undo, {}, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, defaultSelectCell),
    )

    act(() => {
      menu.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })
    expect(setCtxMenu).not.toHaveBeenCalled()

    document.body.removeChild(menu)
  })

  it('navigateToCell moves focus to a valid cell and updates selection', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()
    const selectCell = vi.fn()

    const cell = document.createElement('div')
    cell.setAttribute('data-cell-id', 'R1C1')
    const inner = document.createElement('div')
    inner.setAttribute('contenteditable', 'true')
    inner.setAttribute('tabindex', '0')
    cell.appendChild(inner)
    document.body.appendChild(cell)

    const { result } = renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 5, 5, defaultHiddenSet, selectCell),
    )

    act(() => {
      result.current.navigateToCell(1, 1)
    })
    expect(document.activeElement).toBe(inner)
    expect(selectCell).toHaveBeenCalledWith(1, 1)

    document.body.removeChild(cell)
  })

  it('navigateToCell does nothing for out-of-bounds cell', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()
    const selectCell = vi.fn()

    const { result } = renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, selectCell),
    )

    act(() => {
      expect(() => result.current.navigateToCell(10, 10)).not.toThrow()
    })
    expect(selectCell).not.toHaveBeenCalled()
  })

  it('navigateToCell skips hidden cells', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()
    const selectCell = vi.fn()

    const hiddenSet = new Set(['R2C2'])
    const cell = document.createElement('div')
    cell.setAttribute('data-cell-id', 'R2C2')
    const inner = document.createElement('div')
    inner.contentEditable = 'true'
    inner.setAttribute('tabindex', '0')
    cell.appendChild(inner)
    document.body.appendChild(cell)

    const { result } = renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 5, 5, hiddenSet, selectCell),
    )

    act(() => {
      result.current.navigateToCell(2, 2)
    })
    expect(document.activeElement).not.toBe(inner)
    expect(selectCell).not.toHaveBeenCalled()

    document.body.removeChild(cell)
  })

  it('handleCellKeyDown prevents default on ArrowRight at end of text', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()

    const origSel = window.getSelection
    window.getSelection = vi.fn(() => ({ rangeCount: 0 })) as unknown as typeof window.getSelection

    const { result } = renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 5, 5, defaultHiddenSet, defaultSelectCell),
    )

    const target = document.createElement('div')
    target.textContent = 'hello'
    const event = {
      key: 'ArrowRight',
      currentTarget: target,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent

    act(() => {
      result.current.handleCellKeyDown(1, 4, event)
    })
    expect(event.preventDefault).toHaveBeenCalled()

    window.getSelection = origSel
  })

  it('handleCellKeyDown does not prevent default on ArrowLeft when cursor is not at start', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()

    const { result } = renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 5, 5, defaultHiddenSet, defaultSelectCell),
    )

    const sel = {
      rangeCount: 1,
      getRangeAt: () => ({ startOffset: 3 }),
    } as unknown as Selection
    const origSel = window.getSelection
    window.getSelection = vi.fn(() => sel)

    const event = {
      key: 'ArrowLeft',
      currentTarget: document.createElement('div'),
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent

    act(() => {
      result.current.handleCellKeyDown(1, 1, event)
    })
    expect(event.preventDefault).not.toHaveBeenCalled()

    window.getSelection = origSel
  })

  it('handleCellKeyDown prevents default and navigates on Tab', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()
    const selectCell = vi.fn()

    const cell = document.createElement('div')
    cell.setAttribute('data-cell-id', 'R1C0')
    const inner = document.createElement('div')
    inner.contentEditable = 'true'
    inner.setAttribute('tabindex', '0')
    cell.appendChild(inner)
    document.body.appendChild(cell)

    const { result } = renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, selectCell),
    )

    const event = {
      key: 'Tab',
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent

    act(() => {
      result.current.handleCellKeyDown(0, 2, event)
    })
    expect(event.preventDefault).toHaveBeenCalled()

    document.body.removeChild(cell)
  })

  it('handleCellKeyDown prevents default and navigates on Shift+Tab', () => {
    const undo = vi.fn()
    const setCtxMenu = vi.fn()
    const setActiveSub = vi.fn()
    const selectCell = vi.fn()

    const cell = document.createElement('div')
    cell.setAttribute('data-cell-id', 'R0C2')
    const inner = document.createElement('div')
    inner.contentEditable = 'true'
    inner.setAttribute('tabindex', '0')
    cell.appendChild(inner)
    document.body.appendChild(cell)

    const { result } = renderHook(() =>
      useTableGridKeyHandlers(true, undo, null, setCtxMenu, setActiveSub, 3, 3, defaultHiddenSet, selectCell),
    )

    const event = {
      key: 'Tab',
      shiftKey: true,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent

    act(() => {
      result.current.handleCellKeyDown(0, 0, event)
    })
    expect(event.preventDefault).toHaveBeenCalled()

    document.body.removeChild(cell)
  })

  it('cleans up event listeners on unmount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = renderHook(() =>
      useTableGridKeyHandlers(true, vi.fn(), null, vi.fn(), vi.fn(), 3, 3, defaultHiddenSet, defaultSelectCell),
    )
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})
