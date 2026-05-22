import { createContext, useContext } from 'react'
import type { TableCellsValue } from './TableDataContext.types'

export type { TableCellsValue }

export const TableCellsContext = createContext<TableCellsValue | null>(null)

export function useTableData(): TableCellsValue {
  const context = useContext(TableCellsContext)
  if (!context) {
    throw new Error('useTableData must be used inside TableProvider')
  }
  return context
}
