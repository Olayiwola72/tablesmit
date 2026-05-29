import { useEffect, useState, type RefObject } from 'react'

export function useTableFocus(containerRef: RefObject<HTMLDivElement | null>) {
  const [isTableFocused, setIsTableFocused] = useState(true)

  useEffect(() => {
    const onDocumentMouseDown = (event: globalThis.MouseEvent): void => {
      const target = event.target as HTMLElement
      if (containerRef.current?.contains(target)) {
        if (target.closest('[data-table-caption]')) {
          setIsTableFocused(false)
        } else {
          setIsTableFocused(true)
        }
      } else if (!target.closest('[data-ctx-menu]')) {
        setIsTableFocused(false)
      }
    }
    document.addEventListener('mousedown', onDocumentMouseDown)
    return () => document.removeEventListener('mousedown', onDocumentMouseDown)
  }, [containerRef])

  return { isTableFocused, setIsTableFocused }
}