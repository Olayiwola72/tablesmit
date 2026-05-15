import type { ReactNode } from 'react'
import { cn } from '../../../../lib/utils'

export function ResizeHandle({
  axis,
  label,
  onMouseDown,
  onDoubleClick,
}: {
  axis: 'column' | 'row'
  label: string
  onMouseDown?: (event: React.MouseEvent<HTMLSpanElement>) => void
  onDoubleClick?: () => void
}): ReactNode {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      className={cn(axis === 'column' ? 'resize-handle-col' : 'resize-handle-row', 'opacity-0 transition-opacity duration-100 hover:opacity-100')}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    />
  )
}
