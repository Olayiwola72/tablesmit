import { useCallback, useRef, useState } from 'react'
import type { TableState } from '../../context/table.types'
import { MAX_HISTORY } from '../../config/table/tableDefaults'
import type { TableHistoryApi } from './useTableHistory.types'

export function useTableHistory(): TableHistoryApi {
  const pastStates = useRef<TableState[]>([])
  const [historyDepth, setHistoryDepth] = useState(0)

  const syncDepth = useCallback((): void => {
    setHistoryDepth(pastStates.current.length)
  }, [])

  const recordSnapshot = useCallback((state: TableState): void => {
    pastStates.current.push(state)
    if (pastStates.current.length > MAX_HISTORY) {
      pastStates.current.shift()
    }
    syncDepth()
  }, [syncDepth])

  const undo = useCallback((): TableState | undefined => {
    const prev = pastStates.current.pop()
    syncDepth()
    return prev
  }, [syncDepth])

  return {
    undo,
    canUndo: historyDepth > 0,
    historyDepth,
    recordSnapshot,
  }
}
