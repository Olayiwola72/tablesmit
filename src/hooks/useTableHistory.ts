import { useCallback, useRef, useState } from 'react'
import type { TableState } from '../types/table.types'
import { MAX_HISTORY } from '../config/tableDefaults'

export interface TableHistoryApi {
  undo: () => TableState | undefined
  canUndo: boolean
  recordSnapshot: (state: TableState) => void
}

export function useTableHistory(): TableHistoryApi {
  const pastStates = useRef<TableState[]>([])
  const [version, setVersion] = useState(0)

  const recordSnapshot = useCallback((state: TableState): void => {
    pastStates.current.push(state)
    if (pastStates.current.length > MAX_HISTORY) {
      pastStates.current.shift()
    }
    setVersion((v) => v + 1)
  }, [])

  const undo = useCallback((): TableState | undefined => {
    const prev = pastStates.current.pop()
    setVersion((v) => v + 1)
    return prev
  }, [])

  return { undo, canUndo: pastStates.current.length > 0, recordSnapshot }
}
