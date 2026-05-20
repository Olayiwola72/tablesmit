import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MobileSheet } from '../../../../components/layout/MobileSheet'

describe('MobileSheet', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <MobileSheet title="Test" open={false} onClose={vi.fn()}>
        <p>Content</p>
      </MobileSheet>,
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders content when open', () => {
    render(
      <MobileSheet title="Test" open onClose={vi.fn()}>
        <p>Content</p>
      </MobileSheet>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <MobileSheet title="Settings" open onClose={vi.fn()}>
        <p>Content</p>
      </MobileSheet>,
    )
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <MobileSheet title="Test" open onClose={onClose}>
        <p>Content</p>
      </MobileSheet>,
    )
    await user.click(screen.getByLabelText('Close panel overlay'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on Escape key', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <MobileSheet title="Test" open onClose={onClose}>
        <p>Content</p>
      </MobileSheet>,
    )
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <MobileSheet title="Test" open onClose={onClose}>
        <p>Content</p>
      </MobileSheet>,
    )
    await user.click(screen.getByRole('button', { name: 'Close panel' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('toggles from closed to open on re-render', () => {
    const { rerender } = render(
      <MobileSheet title="Test" open={false} onClose={vi.fn()}>
        <p>Content</p>
      </MobileSheet>,
    )
    rerender(
      <MobileSheet title="Test" open onClose={vi.fn()}>
        <p>Content</p>
      </MobileSheet>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
