import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SidebarPanelShell } from '../../../../components/ui/SidebarPanelShell/SidebarPanelShell'

describe('SidebarPanelShell', () => {
  it('renders a section with a label', () => {
    render(<SidebarPanelShell label="Grid Size">content</SidebarPanelShell>)
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(screen.getByText('Grid Size')).toBeInTheDocument()
  })

  it('renders children inside the container', () => {
    render(<SidebarPanelShell label="Settings"><span data-testid="child">child</span></SidebarPanelShell>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('accepts a custom className', () => {
    render(<SidebarPanelShell label="Test" className="mt-4">content</SidebarPanelShell>)
    const section = document.querySelector('section')
    expect(section?.className).toContain('mt-4')
  })
})
