import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../../../../components/ui/Button/Button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button variant="primary">Generate Table</Button>)
    expect(screen.getByRole('button', { name: /generate table/i })).toBeInTheDocument()
  })

  it('fires onClick on click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button variant="primary" onClick={onClick}>Go</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button variant="primary" isDisabled onClick={onClick}>Go</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('sets aria-busy and renders spinner when isLoading', () => {
    render(<Button variant="primary" isLoading>Go</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('svg.animate-spin')).toBeInTheDocument()
  })

  it('forwards className', () => {
    render(<Button variant="primary" className="extra-class">Go</Button>)
    expect(screen.getByRole('button').className).toContain('extra-class')
  })

  it('renders all five variants without error', () => {
    const variants = ['primary', 'accent', 'secondary', 'ghost', 'danger'] as const
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    }
  })
})
