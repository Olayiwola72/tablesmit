import type { TableState } from '../../context/table.types'

export interface TableHistoryApi {
  undo: () => TableState | undefined
  canUndo: boolean
  historyDepth: number
  recordSnapshot: (state: TableState) => void
}
