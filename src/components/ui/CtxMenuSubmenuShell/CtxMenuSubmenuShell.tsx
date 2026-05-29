import type { FC, ReactNode } from 'react'
import { CtxMenuItem } from '../CtxMenuItem/CtxMenuItem'

interface SubmenuItem {
  icon?: ReactNode
  label: string
  onClick: () => void
  isActive?: boolean
}

interface CtxMenuSubmenuShellProps {
  label: string
  items: SubmenuItem[]
  className?: string
}

export const CtxMenuSubmenuShell: FC<CtxMenuSubmenuShellProps> = ({
  label,
  items,
  className,
}) => (
  <div className={`border-t border-border ${className ?? ''}`}>
    <span className="block px-3 py-1 text-xs font-medium text-text-muted">{label}</span>
    {items.map((item) => (
      <CtxMenuItem
        key={item.label}
        icon={item.icon}
        onClick={item.onClick}
        className={item.isActive ? 'text-primary' : ''}
      >
        {item.label}
      </CtxMenuItem>
    ))}
  </div>
)
