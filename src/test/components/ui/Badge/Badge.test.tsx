import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from '../../../../components/ui/Badge/Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Coming soon</Badge>)
    expect(screen.getByText('Coming soon')).toBeInTheDocument()
  })

  it('renders with default classes', () => {
    render(<Badge>New</Badge>)
    const span = screen.getByText('New')
    expect(span.className).toContain('rounded-full')
    expect(span.className).toContain('text-xs')
  })

  it('forwards className', () => {
    render(<Badge className="custom-cls">Tag</Badge>)
    expect(screen.getByText('Tag').className).toContain('custom-cls')
  })

  it('forwards additional HTML attributes', () => {
    render(<Badge data-testid="badge-1">Test</Badge>)
    expect(screen.getByTestId('badge-1')).toBeInTheDocument()
  })
})
