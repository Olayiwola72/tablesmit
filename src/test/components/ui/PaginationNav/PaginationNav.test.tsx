import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PaginationNav } from '../../../../components/ui/PaginationNav/PaginationNav'

describe('PaginationNav', () => {
  it('renders nothing when totalPages is 1 or less', () => {
    const onPageChange = vi.fn()
    const { container } = render(
      <PaginationNav currentPage={1} totalPages={1} onPageChange={onPageChange} />,
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders prev button, page numbers, and next button', () => {
    render(<PaginationNav currentPage={2} totalPages={3} onPageChange={vi.fn()} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('disables prev button on the first page', () => {
    render(<PaginationNav currentPage={1} totalPages={3} onPageChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
  })

  it('disables next button on the last page', () => {
    render(<PaginationNav currentPage={3} totalPages={3} onPageChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[buttons.length - 1]).toBeDisabled()
  })

  it('marks the current page button with aria-current="page"', () => {
    render(<PaginationNav currentPage={2} totalPages={3} onPageChange={vi.fn()} />)
    expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page')
  })

  it('does not mark non-current pages with aria-current', () => {
    render(<PaginationNav currentPage={2} totalPages={3} onPageChange={vi.fn()} />)
    expect(screen.getByText('1')).not.toHaveAttribute('aria-current')
    expect(screen.getByText('3')).not.toHaveAttribute('aria-current')
  })

  it('calls onPageChange with the correct page number on click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<PaginationNav currentPage={1} totalPages={3} onPageChange={onPageChange} />)
    await user.click(screen.getByText('3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with prev page when clicking previous', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<PaginationNav currentPage={3} totalPages={3} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with next page when clicking next', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<PaginationNav currentPage={1} totalPages={3} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[buttons.length - 1])
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('does not fire onPageChange when clicking disabled prev button', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<PaginationNav currentPage={1} totalPages={3} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('does not fire onPageChange when clicking disabled next button', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<PaginationNav currentPage={3} totalPages={3} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[buttons.length - 1])
    expect(onPageChange).not.toHaveBeenCalled()
  })
})
