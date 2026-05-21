import type { RefObject } from 'react'

export interface ColumnResizeApi {
  ghostLineRef: RefObject<HTMLDivElement>
  onMouseDown: (event: React.MouseEvent, colIndex: number, currentWidth: number) => void
}
