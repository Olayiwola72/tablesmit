export interface TableHistoryApi {
  undo: () => void
  redo: () => void
}

export function useTableHistory(): TableHistoryApi {
  return {
    undo: () => undefined,
    redo: () => undefined,
  }
}
