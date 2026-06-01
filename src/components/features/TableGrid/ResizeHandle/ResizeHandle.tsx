import { memo, type ReactNode } from 'react'

function ResizeHandleRaw({
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
  const axisClass = axis === 'column'
    ? 'right-0 top-0 h-full w-3 cursor-col-resize sm:w-2'
    : 'bottom-0 left-0 w-full h-3 cursor-row-resize sm:h-2'

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      data-print-hide
      data-axis={axis}
      className={`absolute ${axisClass} opacity-0 transition-opacity duration-100 hover:opacity-100 hover:bg-primary`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    />
  )
}

export const ResizeHandle = memo(ResizeHandleRaw)
