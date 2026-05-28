import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { KEY_ESCAPE } from '../../constants/keys'
import { toast } from '../../utils/toast/toast'

export function useTableGridKeyHandlers(
  canUndo: boolean,
  undo: () => void,
  ctxMenu: unknown,
  setCtxMenu: (val: null) => void,
  setActiveSub: (val: null) => void,
  cols: number,
  rows: number,
  hiddenSet: Set<string>,
  selectCell: (row: number, col: number) => void,
) {
  const { t } = useTranslation(['common', 'table'])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault()
        if (!canUndo) {
          toast.info(t('toast.undoEmpty'))
          return
        }
        undo()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [undo, canUndo, t])

  useEffect(() => {
    if (!ctxMenu) return
    const onKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === KEY_ESCAPE) { setCtxMenu(null); setActiveSub(null) }
    }
    const onClickOutside = (event: globalThis.MouseEvent): void => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-ctx-menu]')) { setCtxMenu(null); setActiveSub(null) }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [ctxMenu, setCtxMenu, setActiveSub])

  const navigateToCell = useCallback(
    (nextRow: number, nextCol: number): void => {
      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) return
      if (hiddenSet.has(`R${nextRow}C${nextCol}`)) return
      selectCell(nextRow, nextCol)
      const el = document.querySelector<HTMLElement>(`[data-cell-id="R${nextRow}C${nextCol}"] [contenteditable]`)
      el?.focus()
    },
    [cols, rows, hiddenSet, selectCell],
  )

  const handleCellKeyDown = useCallback(
    (row: number, col: number, event: React.KeyboardEvent): void => {
      if (event.key === 'Tab') {
        event.preventDefault()
        const shift = event.shiftKey
        let nextRow = row
        let nextCol = shift ? col - 1 : col + 1
        if (nextCol < 0 && nextRow > 0) { nextRow--; nextCol = cols - 1 }
        else if (nextCol < 0) { nextRow = row; nextCol = cols - 1 }
        if (nextCol >= cols && nextRow < rows - 1) { nextRow++; nextCol = 0 }
        else if (nextCol >= cols) { nextRow = row; nextCol = 0 }
        navigateToCell(nextRow, nextCol)
        return
      }

      if (event.key.startsWith('Arrow')) {
        const sel = window.getSelection()
        const text = (event.currentTarget as HTMLElement).textContent ?? ''

        if (event.key === 'ArrowLeft' && sel && sel.rangeCount > 0 && sel.getRangeAt(0).startOffset > 0) return
        if (event.key === 'ArrowRight' && sel && sel.rangeCount > 0 && sel.getRangeAt(0).startOffset < text.length) return

        event.preventDefault()
        const delta: Record<string, [number, number]> = {
          ArrowUp: [-1, 0],
          ArrowDown: [1, 0],
          ArrowLeft: [0, -1],
          ArrowRight: [0, 1],
        }
        const [dr, dc] = delta[event.key] ?? [0, 0]
        navigateToCell(row + dr, col + dc)
      }
    },
    [cols, rows, navigateToCell],
  )

  return { navigateToCell, handleCellKeyDown }
}
