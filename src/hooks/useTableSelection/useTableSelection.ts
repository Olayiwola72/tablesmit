import { useCallback, type MouseEvent } from 'react'
import { useSelectedRange, useTableContext } from '../../context/TableContext'
import type { TableSelectionApi } from './useTableSelection.types'

export function useTableSelection(): TableSelectionApi {
  const selectedRange = useSelectedRange()
  const { selectRange } = useTableContext()

  const selectCell = useCallback(
    (row: number, col: number, event?: MouseEvent): void => {
      selectRange(
        event?.shiftKey && selectedRange
          ? { ...selectedRange, endRow: row, endCol: col }
          : { startRow: row, startCol: col, endRow: row, endCol: col },
      )
    },
    [selectRange, selectedRange],
  )

  return { selectCell }
}
