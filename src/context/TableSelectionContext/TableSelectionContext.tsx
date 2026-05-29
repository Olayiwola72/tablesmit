import { createContext, useContext } from 'react'
import type { SelectionRange } from '../../utils/mergeUtils/mergeUtils.types'

export const TableSelectionCtx = createContext<SelectionRange | null>(null)

export function useSelectedRange(): SelectionRange | null {
  return useContext(TableSelectionCtx)
}
