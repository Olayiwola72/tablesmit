export interface MergeUndoGroupProps {
  canMerge: boolean
  canUndo: boolean
  historyDepth: number
  onMerge: () => void
  onUnmerge: () => void
  onUndo: () => void
}
