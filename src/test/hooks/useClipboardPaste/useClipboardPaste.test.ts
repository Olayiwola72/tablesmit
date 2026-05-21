import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useClipboardPaste } from '../../../hooks/useClipboardPaste/useClipboardPaste'

describe('useClipboardPaste', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns pasting false initially', () => {
    const setCells = vi.fn()
    const { result } = renderHook(() => useClipboardPaste(setCells))
    expect(result.current.pasting).toBe(false)
  })

  it('adds and removes paste event listener', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const setCells = vi.fn()

    const { unmount } = renderHook(() => useClipboardPaste(setCells))
    expect(addSpy).toHaveBeenCalledWith('paste', expect.any(Function))

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('paste', expect.any(Function))
  })

  it('ignores paste inside contenteditable', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true,
    })
    editable.dispatchEvent(event)
    expect(setCells).not.toHaveBeenCalled()
    document.body.removeChild(editable)
  })
})
