import { useRef } from 'react'
import {
  MAX_COLUMN_WIDTH,
  MIN_COLUMN_WIDTH,
} from '../../config/table/tableDefaults'
import type { ColumnResizeApi } from './useColumnResize.types'

export function useColumnResize(onResizeEnd: (colIndex: number, width: number) => void): ColumnResizeApi {
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)
  const colIndex = useRef(0)
  const pendingWidth = useRef(0)
  const rafId = useRef<number | null>(null)
  const ghostLineRef = useRef<HTMLDivElement>(null)

  const onMouseDown = (event: React.MouseEvent, index: number, currentWidth: number): void => {
    event.preventDefault()
    isDragging.current = true
    startX.current = event.clientX
    startWidth.current = currentWidth
    pendingWidth.current = currentWidth
    colIndex.current = index
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const onMouseMove = (moveEvent: MouseEvent): void => {
      if (!isDragging.current) return
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        const delta = moveEvent.clientX - startX.current
        pendingWidth.current = Math.min(
          Math.max(startWidth.current + delta, MIN_COLUMN_WIDTH),
          MAX_COLUMN_WIDTH,
        )
        if (ghostLineRef.current) {
          ghostLineRef.current.style.left = `${moveEvent.clientX}px`
          ghostLineRef.current.style.display = 'block'
        }
      })
    }

    const onMouseUp = (): void => {
      isDragging.current = false
      if (rafId.current) cancelAnimationFrame(rafId.current)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      if (ghostLineRef.current) ghostLineRef.current.style.display = 'none'
      onResizeEnd(colIndex.current, pendingWidth.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return { ghostLineRef, onMouseDown }
}
