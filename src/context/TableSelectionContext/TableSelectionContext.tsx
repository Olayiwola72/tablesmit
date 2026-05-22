import { createContext, useContext } from 'react'
import type { SelectionRange } from '../../types/table'

export const TableSelectionCtx = createContext<SelectionRange | null>(null)

export function useSelectedRange(): SelectionRange | null {
  return useContext(TableSelectionCtx)
}
