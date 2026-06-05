import type { MutableRefObject, RefObject } from 'react'
import type { CellData } from '@/types/table/cell.types'
import type { TableCaptionProps } from '../TableCaption/TableCaption.types'

export interface TableGridProps {
  tableRef: RefObject<HTMLDivElement>
  findMatches?: Array<{ row: number; col: number }>
  currentFindMatch?: { row: number; col: number } | null
  caption?: TableCaptionProps
  blurTableRef?: MutableRefObject<(() => void) | null>
  sortedRows: CellData[][]
  sortedToOriginal: number[]
  toggleSort: (col: number) => void
  sortAsc: (col: number) => void
  sortDesc: (col: number) => void
  activeSortCol: number | null
  activeSortDir: 'asc' | 'desc' | null
  isSortDisabled: (col: number) => boolean
}
