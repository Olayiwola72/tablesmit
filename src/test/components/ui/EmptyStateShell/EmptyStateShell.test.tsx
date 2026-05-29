import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyStateShell } from '../../../../components/ui/EmptyStateShell/EmptyStateShell'

describe('EmptyStateShell', () => {
  it('renders title and description', () => {
    render(<EmptyStateShell title="No data" description="Nothing to show yet." />)
    expect(screen.getByText('No data')).toBeInTheDocument()
    expect(screen.getByText('Nothing to show yet.')).toBeInTheDocument()
  })

  it('renders action when provided', () => {
    render(
      <EmptyStateShell
        title="Empty"
        description="Add something."
        action={<button>Add</button>}
      />,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('renders secondary text when provided', () => {
    render(
      <EmptyStateShell
        title="Empty"
        description="Nothing here."
        secondary="or try something else"
      />,
    )
    expect(screen.getByText('or try something else')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(
      <EmptyStateShell
        title="Empty"
        description="Nothing here."
        icon={<span data-testid="icon">icon</span>}
      />,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('has dashed border wrapper', () => {
    render(<EmptyStateShell title="Empty" description="Nothing here." />)
    const wrapper = document.querySelector('.border-dashed')
    expect(wrapper).toBeInTheDocument()
  })

  it('accepts a custom className', () => {
    render(<EmptyStateShell title="Empty" description="Nothing." className="my-class" />)
    const container = document.querySelector('.my-class')
    expect(container).toBeInTheDocument()
  })
})
