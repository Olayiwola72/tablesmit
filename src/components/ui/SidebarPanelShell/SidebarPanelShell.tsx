import type { FC } from 'react'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import type { SidebarPanelShellProps } from './SidebarPanelShell.types'

export const SidebarPanelShell: FC<SidebarPanelShellProps> = ({ label, children, className }) => (
  <section className={className}>
    <SectionLabel>{label}</SectionLabel>
    <div className="space-y-3 sm:space-y-4">{children}</div>
  </section>
)
