import type { MouseEvent } from 'react'
import { useTableContext } from '../context/TableContext'

export interface TableSelectionApi {
  selectCell: (row: number, col: number, event?: MouseEvent) => void
}

export function useTableSelection(): TableSelectionApi {
  const { selectedRange, selectRange } = useTableContext()

  return {
    selectCell: (row, col, event) => {
      selectRange(
        event?.shiftKey && selectedRange
          ? { ...selectedRange, endRow: row, endCol: col }
          : { startRow: row, startCol: col, endRow: row, endCol: col },
      )
    },
  }
}
