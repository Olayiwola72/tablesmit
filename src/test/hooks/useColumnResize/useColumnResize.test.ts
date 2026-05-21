import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useColumnResize } from '../../../hooks/useColumnResize/useColumnResize'

describe('useColumnResize', () => {
  afterEach(() => {
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    vi.useRealTimers()
  })

  it('returns ghostLineRef and onMouseDown', () => {
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useColumnResize(onResizeEnd))
    expect(result.current.ghostLineRef).toBeDefined()
    expect(typeof result.current.onMouseDown).toBe('function')
  })

  it('sets cursor and userSelect on mousedown', () => {
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useColumnResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientX: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 120)

    expect(document.body.style.cursor).toBe('col-resize')
    expect(document.body.style.userSelect).toBe('none')
  })

  it('calls onResizeEnd on mouseup with clamped width', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useColumnResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientX: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 120)

    const moveEvent = new MouseEvent('mousemove', { clientX: 200, bubbles: true })
    document.dispatchEvent(moveEvent)
    vi.advanceTimersByTime(20)

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(onResizeEnd).toHaveBeenCalledOnce()
    expect(onResizeEnd).toHaveBeenCalledWith(0, expect.any(Number))
  })

  it('clamps width to MIN_COLUMN_WIDTH (60)', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useColumnResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientX: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 120)

    const moveEvent = new MouseEvent('mousemove', { clientX: -1000, bubbles: true })
    document.dispatchEvent(moveEvent)
    vi.advanceTimersByTime(20)

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(onResizeEnd).toHaveBeenCalledWith(0, expect.any(Number))
    const width = onResizeEnd.mock.calls[0][1]
    expect(width).toBeGreaterThanOrEqual(60)
  })

  it('shows ghost line during drag and hides it on mouseup', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useColumnResize(onResizeEnd))

    const ghostEl = document.createElement('div')
    ghostEl.style.display = 'none'
    ;(result.current.ghostLineRef as { current: HTMLDivElement }).current = ghostEl

    const event = new MouseEvent('mousedown', { clientX: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 120)

    const moveEvent = new MouseEvent('mousemove', { clientX: 200, bubbles: true })
    document.dispatchEvent(moveEvent)
    vi.advanceTimersByTime(20)

    expect(ghostEl.style.display).toBe('block')
    expect(ghostEl.style.left).toBe('200px')

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(ghostEl.style.display).toBe('none')
  })

  it('cleans up cursor and userSelect on mouseup', () => {
    vi.useFakeTimers()
    const onResizeEnd = vi.fn()
    const { result } = renderHook(() => useColumnResize(onResizeEnd))

    const event = new MouseEvent('mousedown', { clientX: 100, bubbles: true })
    const mouseEvent = event as unknown as React.MouseEvent
    result.current.onMouseDown(mouseEvent, 0, 120)

    const upEvent = new MouseEvent('mouseup', { bubbles: true })
    document.dispatchEvent(upEvent)

    expect(document.body.style.cursor).toBe('')
    expect(document.body.style.userSelect).toBe('')
  })
})
