import type { FC } from 'react'
import type { ToolbarSeparatorProps } from './ToolbarSeparator.types'

export const ToolbarSeparator: FC<ToolbarSeparatorProps> = ({ className }) => (
  <div className={`mx-0.5 h-5 w-px shrink-0 bg-border ${className ?? ''}`} />
)
