import type { MouseEvent } from 'react'

export interface TableSelectionApi {
  selectCell: (row: number, col: number, event?: MouseEvent) => void
}
