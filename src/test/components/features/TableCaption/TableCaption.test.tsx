import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TableCaption } from '../../../../components/features/TableCaption/TableCaption'
import { TooltipProvider } from '../../../../components/ui/Tooltip/Tooltip'

function renderWithProviders(ui: React.ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>)
}

const defaultProps = {
  value: '',
  onChange: vi.fn(),
  alignment: 'left' as const,
  onAlignmentChange: vi.fn(),
}

describe('TableCaption', () => {
  it('renders placeholder when value is empty and not editing', () => {
    renderWithProviders(<TableCaption {...defaultProps} />)
    expect(screen.getByText('Add a table title or caption (optional)')).toBeInTheDocument()
  })

  it('shows textarea when placeholder is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} />)
    await user.click(screen.getByText('Add a table title or caption (optional)'))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the caption text when value is provided and not editing', () => {
    renderWithProviders(<TableCaption {...defaultProps} value="Test Caption" />)
    expect(screen.getByText('Test Caption')).toBeInTheDocument()
  })

  it('calls onChange when textarea value changes', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} onChange={onChange} />)
    await user.click(screen.getByText('Add a table title or caption (optional)'))
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'A')
    expect(onChange).toHaveBeenCalled()
  })

  it('exits edit mode on Escape key', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} />)
    await user.click(screen.getByText('Add a table title or caption (optional)'))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('renders with correct alignment class', () => {
    const { rerender } = renderWithProviders(<TableCaption {...defaultProps} alignment="center" />)
    const btn = screen.getByText('Add a table title or caption (optional)')
    expect(btn.className).toContain('text-center')
    rerender(<TooltipProvider><TableCaption {...defaultProps} alignment="right" /></TooltipProvider>)
    expect(screen.getByText('Add a table title or caption (optional)').className).toContain('text-right')
  })

  it('opens context menu on right-click', () => {
    renderWithProviders(<TableCaption {...defaultProps} />)
    const el = screen.getByText('Add a table title or caption (optional)')
    fireEvent.contextMenu(el)
    expect(screen.getByText('Edit caption')).toBeInTheDocument()
  })

  it('applies width + 1 when tableWidth is provided with border (default)', () => {
    const { container } = renderWithProviders(<TableCaption {...defaultProps} tableWidth={600} />)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv.style.width).toBe('601px')
  })

  it('applies exact width when tableWidth is provided with no border', () => {
    const { container } = renderWithProviders(<TableCaption {...defaultProps} tableWidth={600} hasBorder={false} />)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv.style.width).toBe('600px')
  })

  it('does not set width when tableWidth is omitted', () => {
    const { container } = renderWithProviders(<TableCaption {...defaultProps} />)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv.style.width).toBe('')
  })

  it('does not set maxWidth when tableWidth is omitted', () => {
    const { container } = renderWithProviders(<TableCaption {...defaultProps} />)
    const outerDiv = container.firstChild as HTMLElement
    expect(outerDiv.style.maxWidth).toBe('')
  })

  it('shows color options in context menu', () => {
    renderWithProviders(<TableCaption {...defaultProps} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    expect(screen.getByText(/Caption text color/)).toBeInTheDocument()
    expect(screen.getByText(/Caption background/)).toBeInTheDocument()
  })

  it('expands text color swatches on click', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText(/Caption text color/))
    expect(screen.getByLabelText('Black')).toBeInTheDocument()
    expect(screen.getByLabelText('White')).toBeInTheDocument()
  })

  it('expands background color swatches on click', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText(/Caption background/))
    expect(screen.getByLabelText('Black')).toBeInTheDocument()
  })

  it('calls onTextColorChange when a text color swatch is selected', async () => {
    const onTextColorChange = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} onTextColorChange={onTextColorChange} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText(/Caption text color/))
    await user.click(screen.getByLabelText('Primary Blue'))
    expect(onTextColorChange).toHaveBeenCalledWith('#1E40AF')
  })

  it('calls onBgColorChange when a background color swatch is selected', async () => {
    const onBgColorChange = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} onBgColorChange={onBgColorChange} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText(/Caption background/))
    await user.click(screen.getByLabelText('Teal'))
    expect(onBgColorChange).toHaveBeenCalledWith('#0f766e')
  })

  it('applies textColor style to displayed caption', () => {
    renderWithProviders(<TableCaption {...defaultProps} value="Colored Caption" textColor="#DC2626" />)
    const el = screen.getByText('Colored Caption')
    expect(el.style.color).toBe('rgb(220, 38, 38)')
  })

  it('applies bgColor style to displayed caption', () => {
    renderWithProviders(<TableCaption {...defaultProps} value="Bg Caption" bgColor="#EFF6FF" />)
    const el = screen.getByText('Bg Caption')
    expect(el.style.backgroundColor).toBe('rgb(239, 246, 255)')
  })

  it('shows custom color input when text color picker is expanded', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText(/Caption text color/))
    expect(screen.getByLabelText('Custom')).toBeInTheDocument()
  })

  it('calls onTextColorChange from custom color input', async () => {
    const onTextColorChange = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} onTextColorChange={onTextColorChange} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText(/Caption text color/))
    const customInput = screen.getByLabelText('Custom')
    fireEvent.change(customInput, { target: { value: '#ff0000' } })
    expect(onTextColorChange).toHaveBeenCalledWith('#ff0000')
  })
})
