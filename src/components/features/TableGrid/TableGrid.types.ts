import type { MutableRefObject, RefObject } from 'react'
import type { TableCaptionProps } from '../TableCaption/TableCaption.types'

export interface TableGridProps {
  tableRef: RefObject<HTMLDivElement>
  findMatches?: Array<{ row: number; col: number }>
  currentFindMatch?: { row: number; col: number } | null
  caption?: TableCaptionProps
  blurTableRef?: MutableRefObject<(() => void) | null>
}
