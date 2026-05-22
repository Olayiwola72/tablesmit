import type { TableState } from '../../context/TableState/TableState.types'

export interface TableHistoryApi {
  undo: () => TableState | undefined
  canUndo: boolean
  historyDepth: number
  recordSnapshot: (state: TableState) => void
}
