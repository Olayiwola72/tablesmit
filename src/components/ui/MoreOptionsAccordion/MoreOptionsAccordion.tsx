import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import type { MoreOptionsAccordionProps } from './MoreOptionsAccordion.types'

export function MoreOptionsAccordion({ icon: Icon, label, className, children }: MoreOptionsAccordionProps): ReactNode {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`border-t border-border pt-3 ${className ?? ''}`}>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
        onClick={() => setExpanded((v) => !v)}
      >
        {Icon ? <Icon size={13} /> : null}
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown size={13} className={`transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded ? <div className="mt-3">{children}</div> : null}
    </div>
  )
}

export default MoreOptionsAccordion
