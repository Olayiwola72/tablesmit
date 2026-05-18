import { createContext, useContext } from 'react'
import type { CellData } from '../types/table.types'

export interface TableCellsValue {
  cells: CellData[][]
}

export const TableCellsContext = createContext<TableCellsValue | null>(null)

export function useTableData(): TableCellsValue {
  const context = useContext(TableCellsContext)
  if (!context) {
    throw new Error('useTableData must be used inside TableProvider')
  }
  return context
}
