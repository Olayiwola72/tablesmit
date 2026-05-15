import { useRef, type RefObject } from 'react'
import { MAX_ROW_HEIGHT, MIN_ROW_HEIGHT } from '../config/tableDefaults'

export interface RowResizeApi {
  ghostLineRef: RefObject<HTMLDivElement>
  onMouseDown: (event: React.MouseEvent, rowIndex: number, currentHeight: number) => void
}

export function useRowResize(onResizeEnd: (rowIndex: number, height: number) => void): RowResizeApi {
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startHeight = useRef(0)
  const rowIndex = useRef(0)
  const pendingHeight = useRef(0)
  const rafId = useRef<number | null>(null)
  const ghostLineRef = useRef<HTMLDivElement>(null)

  const onMouseDown = (event: React.MouseEvent, index: number, currentHeight: number): void => {
    event.preventDefault()
    isDragging.current = true
    startY.current = event.clientY
    startHeight.current = currentHeight
    pendingHeight.current = currentHeight
    rowIndex.current = index
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'

    const onMouseMove = (moveEvent: MouseEvent): void => {
      if (!isDragging.current) return
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        const delta = moveEvent.clientY - startY.current
        pendingHeight.current = Math.min(
          Math.max(startHeight.current + delta, MIN_ROW_HEIGHT),
          MAX_ROW_HEIGHT,
        )
        if (ghostLineRef.current) {
          ghostLineRef.current.style.top = `${moveEvent.clientY}px`
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
      onResizeEnd(rowIndex.current, pendingHeight.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return { ghostLineRef, onMouseDown }
}
