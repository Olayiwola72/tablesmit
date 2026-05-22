export interface RowColumnActionsProps {
  rows: number
  cols: number
  onAddRow: () => void
  onAddColumn: () => void
  onRemoveRow: () => void
  onRemoveColumn: () => void
}
