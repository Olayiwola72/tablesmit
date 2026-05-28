import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePrintTable } from '../../../hooks/usePrintTable/usePrintTable'

describe('usePrintTable', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('adds and removes keydown listener', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const ref = { current: document.createElement('div') }

    const { unmount } = renderHook(() => usePrintTable(ref))
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('does not prevent default for non-Ctrl+P keys', () => {
    const ref = { current: document.createElement('div') }
    renderHook(() => usePrintTable(ref))

    const event = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true })
    const preventSpy = vi.spyOn(event, 'preventDefault')
    document.dispatchEvent(event)
    expect(preventSpy).not.toHaveBeenCalled()
  })

  it('does not print when target is contenteditable', () => {
    const ref = { current: document.createElement('div') }
    renderHook(() => usePrintTable(ref))

    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    const event = new KeyboardEvent('keydown', { key: 'p', ctrlKey: true, bubbles: true })
    const preventSpy = vi.spyOn(event, 'preventDefault')
    editable.dispatchEvent(event)
    expect(preventSpy).not.toHaveBeenCalled()
    document.body.removeChild(editable)
  })

  it('prevents default on Ctrl+P outside contenteditable', () => {
    const ref = { current: document.createElement('div') }
    renderHook(() => usePrintTable(ref))

    const event = new KeyboardEvent('keydown', { key: 'p', ctrlKey: true, bubbles: true })
    const preventSpy = vi.spyOn(event, 'preventDefault')
    document.body.dispatchEvent(event)
    expect(preventSpy).toHaveBeenCalled()
  })

  it('calls onBeforePrint when Ctrl+P fires', () => {
    const ref = { current: document.createElement('div') }
    const onBeforePrint = vi.fn()
    renderHook(() => usePrintTable(ref, onBeforePrint))

    const event = new KeyboardEvent('keydown', { key: 'p', ctrlKey: true, bubbles: true })
    document.body.dispatchEvent(event)
    expect(onBeforePrint).toHaveBeenCalledOnce()
  })
})
