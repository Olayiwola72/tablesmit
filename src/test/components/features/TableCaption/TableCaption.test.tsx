import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TableCaption } from '../../../../components/features/TableCaption/TableCaption'

const defaultProps = {
  value: '',
  onChange: vi.fn(),
  alignment: 'left' as const,
  onAlignmentChange: vi.fn(),
}

describe('TableCaption', () => {
  it('renders placeholder when value is empty and not editing', () => {
    render(<TableCaption {...defaultProps} />)
    expect(screen.getByText('Add a table title or caption (optional)')).toBeInTheDocument()
  })

  it('shows textarea when placeholder is clicked', async () => {
    const user = userEvent.setup()
    render(<TableCaption {...defaultProps} />)
    await user.click(screen.getByText('Add a table title or caption (optional)'))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the caption text when value is provided and not editing', () => {
    render(<TableCaption {...defaultProps} value="Test Caption" />)
    expect(screen.getByText('Test Caption')).toBeInTheDocument()
  })

  it('calls onChange when textarea value changes', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<TableCaption {...defaultProps} onChange={onChange} />)
    await user.click(screen.getByText('Add a table title or caption (optional)'))
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'A')
    expect(onChange).toHaveBeenCalled()
  })

  it('exits edit mode on Escape key', async () => {
    const user = userEvent.setup()
    render(<TableCaption {...defaultProps} />)
    await user.click(screen.getByText('Add a table title or caption (optional)'))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('renders with correct alignment class', () => {
    const { rerender } = render(<TableCaption {...defaultProps} alignment="center" />)
    const btn = screen.getByText('Add a table title or caption (optional)')
    expect(btn.className).toContain('text-center')
    rerender(<TableCaption {...defaultProps} alignment="right" />)
    expect(screen.getByText('Add a table title or caption (optional)').className).toContain('text-right')
  })

  it('opens context menu on right-click', () => {
    render(<TableCaption {...defaultProps} />)
    const el = screen.getByText('Add a table title or caption (optional)')
    fireEvent.contextMenu(el)
    expect(screen.getByText('Edit caption')).toBeInTheDocument()
  })
})
