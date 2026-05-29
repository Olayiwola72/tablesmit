import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useTableFocus } from '../../../hooks/useTableFocus/useTableFocus'

describe('useTableFocus', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('returns isTableFocused true by default', () => {
    const containerRef = { current: document.createElement('div') }
    const { result } = renderHook(() => useTableFocus(containerRef))
    expect(result.current.isTableFocused).toBe(true)
  })

  it('sets isTableFocused to true on mousedown inside container', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const containerRef = { current: container }
    const { result } = renderHook(() => useTableFocus(containerRef))

    container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(result.current.isTableFocused).toBe(true)
  })

  it('sets isTableFocused to false on mousedown outside container', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const outside = document.createElement('div')
    document.body.appendChild(outside)
    const containerRef = { current: container }
    const { result } = renderHook(() => useTableFocus(containerRef))

    act(() => {
      outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })
    expect(result.current.isTableFocused).toBe(false)
  })

  it('sets isTableFocused to false on mousedown inside a caption element', () => {
    const container = document.createElement('div')
    const caption = document.createElement('div')
    caption.setAttribute('data-table-caption', 'true')
    container.appendChild(caption)
    document.body.appendChild(container)
    const containerRef = { current: container }
    const { result } = renderHook(() => useTableFocus(containerRef))

    act(() => {
      caption.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    })
    expect(result.current.isTableFocused).toBe(false)
  })

  it('removes event listener on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const containerRef = { current: document.createElement('div') }
    const { unmount } = renderHook(() => useTableFocus(containerRef))
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
  })
})
