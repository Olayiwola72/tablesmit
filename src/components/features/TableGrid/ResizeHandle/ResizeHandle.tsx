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
    ? 'right-0 top-0 h-full w-3 cursor-col-resize sm:w-2 after:content-[""] after:absolute after:top-1/2 after:-translate-y-1/2 after:h-11 after:-left-4 after:w-11'
    : 'bottom-0 left-0 w-full h-3 cursor-row-resize sm:h-2 after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:w-11 after:-top-4 after:h-11'

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      data-print-hide
      className={`absolute ${axisClass} opacity-0 transition-opacity duration-100 hover:opacity-100 hover:bg-primary`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    />
  )
}

export const ResizeHandle = memo(ResizeHandleRaw)
