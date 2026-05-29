import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CtxMenuItem } from '../../../../components/ui/CtxMenuItem/CtxMenuItem'

describe('CtxMenuItem', () => {
  it('renders a button with label', () => {
    render(<CtxMenuItem>Auto-fit column</CtxMenuItem>)
    const btn = screen.getByRole('button', { name: 'Auto-fit column' })
    expect(btn).toBeInTheDocument()
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CtxMenuItem onClick={onClick}>Sort ascending</CtxMenuItem>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders icon when provided', () => {
    render(<CtxMenuItem icon={<span data-testid="icon" />}>With icon</CtxMenuItem>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<CtxMenuItem>Item</CtxMenuItem>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('text-xs')
    expect(btn.className).toContain('text-text-primary')
    expect(btn.className).toContain('hover:bg-surface')
  })

  it('accepts a custom className', () => {
    render(<CtxMenuItem className="text-primary">Item</CtxMenuItem>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('text-primary')
  })
})
