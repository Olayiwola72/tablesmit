import type { RefObject } from 'react'

export interface TableGridProps {
  tableRef: RefObject<HTMLDivElement>
  findMatches?: Array<{ row: number; col: number }>
  currentFindMatch?: { row: number; col: number } | null
}
