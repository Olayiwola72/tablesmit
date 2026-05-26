import type { CellData, ColumnFormat, TextAlign } from '../../../../types/table'

export type CtxData =
  | { type: 'cell'; row: number; col: number; x: number; y: number }
  | { type: 'column'; col: number; x: number; y: number }
  | null

export interface TableCtxMenuProps {
  ctxMenu: NonNullable<CtxData>
  activeSub: string | null
  headerStyle: string
  columnColors: Record<number, string>
  cellColors: Record<string, string>
  cellTextColors: Record<string, string>
  rowTextColors: Record<number, string>
  rowColors: Record<number, string>
  columnTextAlign: Record<number, string>
  cellTextAlign: Record<string, string>
  cells: CellData[][]
  onClose: () => void
  onToggleSub: (key: string) => void
  autoFitColumn: (col: number) => void
  setColumnColor: (col: number, color: string) => void
  setCellColor: (cellId: string, color: string) => void
  setCellTextColor: (cellId: string, color: string) => void
  setRowTextColor: (row: number, color: string) => void
  setRowColor: (row: number, color: string) => void
  setColumnFormat: (col: number, format: ColumnFormat) => void
  setCellTextAlign: (cellId: string, align: TextAlign) => void
  setColumnTextAlign: (col: number, align: TextAlign) => void
  updateCell: (cellId: string, value: string) => void
  insertRowAbove: (index: number) => void
  insertRowBelow: (index: number) => void
  deleteRowAt: (index: number) => void
  insertColLeft: (col: number) => void
  insertColRight: (col: number) => void
  deleteColAt: (col: number) => void
  sortAsc: (col: number) => void
  sortDesc: (col: number) => void
}
