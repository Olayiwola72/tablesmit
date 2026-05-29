import type { FC } from 'react'
import type { CtxMenuItemProps } from './CtxMenuItem.types'

export const CtxMenuItem: FC<CtxMenuItemProps> = ({
  icon,
  children,
  className,
  ...props
}) => (
  <button
    className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-text-primary hover:bg-surface ${className ?? ''}`}
    {...props}
  >
    {icon && <span className="flex shrink-0 items-center">{icon}</span>}
    {children}
  </button>
)
