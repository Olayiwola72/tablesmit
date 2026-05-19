import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useRowResize } from '../../hooks/useRowResize'

describe('useRowResize', () => {
  afterEach(() => {
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    vi.useRealTimers()
  })

  it('returns ghostLineRef and onMouseDown', () => {
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useRowResize(onResizeEnd))
    expect(result.current.ghostLineRef).toBeDefined()
    expect(typeof result.current.onMouseDown).toBe('function')
  })

  it('sets cursor and userSelect on mousedown', () => {
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useRowResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 44)

    expect(document.body.style.cursor).toBe('row-resize')
    expect(document.body.style.userSelect).toBe('none')
  })

  it('calls onResizeEnd on mouseup with clamped height', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useRowResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 44)

    const moveEvent = new MouseEvent('mousemove', { clientY: 200, bubbles: true })
    document.dispatchEvent(moveEvent)
    vi.advanceTimersByTime(20)

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(onResizeEnd).toHaveBeenCalledOnce()
    expect(onResizeEnd).toHaveBeenCalledWith(0, expect.any(Number))
  })

  it('clamps height to MIN_ROW_HEIGHT (32)', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useRowResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 44)

    const moveEvent = new MouseEvent('mousemove', { clientY: -1000, bubbles: true })
    document.dispatchEvent(moveEvent)
    vi.advanceTimersByTime(20)

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(onResizeEnd).toHaveBeenCalledWith(0, expect.any(Number))
    const height = onResizeEnd.mock.calls[0][1]
    expect(height).toBeGreaterThanOrEqual(32)
  })

  it('clamps height to MAX_ROW_HEIGHT (300)', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useRowResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 44)

    const moveEvent = new MouseEvent('mousemove', { clientY: 10000, bubbles: true })
    document.dispatchEvent(moveEvent)
    vi.advanceTimersByTime(20)

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(onResizeEnd).toHaveBeenCalledWith(0, expect.any(Number))
    const height = onResizeEnd.mock.calls[0][1]
    expect(height).toBeLessThanOrEqual(300)
  })

  it('shows and hides ghost line ref during drag', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useRowResize(onResizeEnd))

    const ghostEl = document.createElement('div')
    ghostEl.style.display = 'none'
    ;(result.current.ghostLineRef as { current: HTMLDivElement }).current = ghostEl

    const event = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 44)

    const moveEvent = new MouseEvent('mousemove', { clientY: 200, bubbles: true })
    document.dispatchEvent(moveEvent)
    vi.advanceTimersByTime(20)

    expect(ghostEl.style.display).toBe('block')

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(ghostEl.style.display).toBe('none')
  })

  it('cleans up cursor and userSelect on mouseup', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useRowResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientY: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 44)

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(document.body.style.cursor).toBe('')
    expect(document.body.style.userSelect).toBe('')
  })
})
