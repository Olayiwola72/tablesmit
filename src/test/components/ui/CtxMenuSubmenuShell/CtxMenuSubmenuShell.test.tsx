import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CtxMenuSubmenuShell } from '../../../../components/ui/CtxMenuSubmenuShell/CtxMenuSubmenuShell'

describe('CtxMenuSubmenuShell', () => {
  const items = [
    { label: 'Left', onClick: vi.fn() },
    { label: 'Center', onClick: vi.fn(), isActive: true },
    { label: 'Right', onClick: vi.fn() },
  ]

  it('renders the section label', () => {
    render(<CtxMenuSubmenuShell label="Align" items={items} />)
    expect(screen.getByText('Align')).toBeInTheDocument()
  })

  it('renders all items as buttons', () => {
    render(<CtxMenuSubmenuShell label="Align" items={items} />)
    expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Center' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument()
  })

  it('applies text-primary class to active items', () => {
    render(<CtxMenuSubmenuShell label="Align" items={items} />)
    const centerBtn = screen.getByRole('button', { name: 'Center' })
    expect(centerBtn.className).toContain('text-primary')
  })

  it('renders icons when provided', () => {
    const itemsWithIcons = [
      { label: 'Left', onClick: vi.fn(), icon: <span data-testid="left-icon" /> },
    ]
    render(<CtxMenuSubmenuShell label="Align" items={itemsWithIcons} />)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('accepts a custom className', () => {
    render(<CtxMenuSubmenuShell label="Align" items={items} className="my-class" />)
    const shell = document.querySelector('.my-class')
    expect(shell).toBeInTheDocument()
  })
})
