import type { FC } from 'react'
import { Dot } from 'lucide-react'
import type { BulletItemProps } from './BulletItem.types'

export const BulletItem: FC<BulletItemProps> = ({ children, className }) => (
  <span className={`inline-flex items-center gap-1 text-xs text-text-secondary ${className ?? ''}`}>
    <Dot size={16} className="text-primary" aria-hidden="true" />
    {children}
  </span>
)
