import type { RefObject } from 'react'

export interface RowResizeApi {
  ghostLineRef: RefObject<HTMLDivElement>
  onMouseDown: (event: React.MouseEvent, rowIndex: number, currentHeight: number) => void
}
