import type { FC } from 'react'
import type { EmptyStateShellProps } from './EmptyStateShell.types'

export const EmptyStateShell: FC<EmptyStateShellProps> = ({
  icon,
  title,
  description,
  action,
  secondary,
  className,
}) => (
  <div className={`mx-auto max-w-sm space-y-4 text-center ${className ?? ''}`}>
    <div className="border-2 border-dashed border-border rounded-md p-10 space-y-4">
      {icon && <div className="flex justify-center">{icon}</div>}
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
      {secondary && <div className="text-xs text-text-muted">{secondary}</div>}
    </div>
  </div>
)
