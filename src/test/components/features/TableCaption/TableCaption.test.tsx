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

  it('renders center alignment directly without responsive fallback', () => {
    renderWithProviders(<TableCaption {...defaultProps} alignment="center" />)
    const btn = screen.getByText('Add a table title or caption (optional)')
    expect(btn.className).toContain('text-center')
    expect(btn.className).not.toContain('md:text-center')
  })

  it('renders right alignment without responsive override', () => {
    renderWithProviders(<TableCaption {...defaultProps} alignment="right" />)
    expect(screen.getByText('Add a table title or caption (optional)').className).toContain('text-right')
  })

  it('renders left alignment without responsive override', () => {
    renderWithProviders(<TableCaption {...defaultProps} alignment="left" />)
    expect(screen.getByText('Add a table title or caption (optional)').className).toContain('text-left')
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

  it('shows Copy button in context menu', () => {
    renderWithProviders(<TableCaption {...defaultProps} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('copies caption text to clipboard when Copy button is clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    const origClipboard = navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText, readText: vi.fn() },
      configurable: true,
      writable: true,
    })

    renderWithProviders(<TableCaption {...defaultProps} value="Caption to copy" />)
    fireEvent.contextMenu(screen.getByText('Caption to copy'))
    const copyBtn = screen.getByText('Copy')
    expect(copyBtn).toBeInTheDocument()
    fireEvent.click(copyBtn)
    await vi.waitFor(() => { expect(writeText).toHaveBeenCalledWith('Caption to copy') })

    Object.defineProperty(navigator, 'clipboard', { value: origClipboard, configurable: true })
  })

  it('shows Paste button in context menu', () => {
    renderWithProviders(<TableCaption {...defaultProps} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    expect(screen.getByText('Paste')).toBeInTheDocument()
  })

  it('calls onChange with clipboard text when paste button is clicked', async () => {
    const mockText = 'Pasted Caption Text'
    const readText = vi.fn().mockResolvedValue(mockText)

    const origClipboard = navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: { readText, writeText: vi.fn() },
      configurable: true,
      writable: true,
    })

    const onChange = vi.fn()
    renderWithProviders(<TableCaption {...defaultProps} onChange={onChange} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    const pasteBtn = screen.getByText('Paste')
    expect(pasteBtn).toBeInTheDocument()
    fireEvent.click(pasteBtn)
    await vi.waitFor(() => { expect(readText).toHaveBeenCalled() })
    expect(onChange).toHaveBeenCalledWith(mockText)

    Object.defineProperty(navigator, 'clipboard', { value: origClipboard, configurable: true })
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

  it('places cursor at the end of the text when entering edit mode', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} value="Existing caption" />)
    await user.click(screen.getByText('Existing caption'))
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea.selectionStart).toBe(16)
    expect(textarea.selectionEnd).toBe(16)
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

  it('shows Italic toggle in context menu', () => {
    renderWithProviders(<TableCaption {...defaultProps} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    expect(screen.getByText('Italic')).toBeInTheDocument()
  })

  it('calls onItalicChange when Italic toggle is clicked', async () => {
    const onItalicChange = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} onItalicChange={onItalicChange} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText('Italic'))
    expect(onItalicChange).toHaveBeenCalledWith(true)
  })

  it('shows checkmark when italic is true', () => {
    renderWithProviders(<TableCaption {...defaultProps} italic={true} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    const italicBtn = screen.getByText('Italic')
    expect(italicBtn.querySelector('span')?.textContent).toBe('✓')
  })

  it('applies italic fontStyle when italic is true', () => {
    renderWithProviders(<TableCaption {...defaultProps} value="Italic Caption" italic={true} />)
    const el = screen.getByText('Italic Caption')
    expect(el.style.fontStyle).toBe('italic')
  })

  it('does not apply italic fontStyle when italic is false', () => {
    renderWithProviders(<TableCaption {...defaultProps} value="Normal Caption" italic={false} />)
    const el = screen.getByText('Normal Caption')
    expect(el.style.fontStyle).toBe('normal')
  })

  it('calls onItalicChange with false when Italic toggle is clicked while already italic', async () => {
    const onItalicChange = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(<TableCaption {...defaultProps} italic={true} onItalicChange={onItalicChange} />)
    fireEvent.contextMenu(screen.getByText('Add a table title or caption (optional)'))
    await user.click(screen.getByText('Italic'))
    expect(onItalicChange).toHaveBeenCalledWith(false)
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

  describe('auto-resize', () => {
    function Wrapper({ value = '', captionH }: { value?: string; captionH?: number }) {
      return (
        <TooltipProvider>
          <TableCaption {...defaultProps} value={value} captionH={captionH} />
        </TooltipProvider>
      )
    }

    async function setupWithRerender() {
      const user = userEvent.setup()
      const renderResult = render(Wrapper({}))
      await user.click(screen.getByText('Add a table title or caption (optional)'))
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      return { ...renderResult, textarea, user }
    }

    it('sets initial height to captionH on mount', async () => {
      const { textarea } = await setupWithRerender()
      expect(Number.parseInt(textarea.style.height)).toBeGreaterThanOrEqual(32)
    })

    it('sets height to scrollHeight when content exceeds captionH', async () => {
      const { textarea, rerender } = await setupWithRerender()
      Object.defineProperty(textarea, 'scrollHeight', { value: 150, configurable: true })
      rerender(Wrapper({ value: 'Line 1\nLine 2\nLine 3' }))
      await vi.waitFor(() => expect(textarea.style.height).toBe('150px'))
    })

    it('keeps height at captionH when scrollHeight is smaller', async () => {
      const { textarea, rerender } = await setupWithRerender()
      Object.defineProperty(textarea, 'scrollHeight', { value: 12, configurable: true })
      rerender(Wrapper({ value: 'short text' }))
      await vi.waitFor(() => expect(Number.parseInt(textarea.style.height)).toBeGreaterThanOrEqual(32))
    })

    it('updates height when captionH changes via resize handle drag', async () => {
      const user = userEvent.setup()
      render(Wrapper({}))
      await user.click(screen.getByText('Add a table title or caption (optional)'))
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      Object.defineProperty(textarea, 'scrollHeight', { value: 30, configurable: true })
      await vi.waitFor(() => expect(textarea.style.height).toBe('32px'))
      const handle = screen.getByRole('separator', { name: /resize caption height/i })
      fireEvent.mouseDown(handle, { clientY: 0 })
      fireEvent.mouseMove(document, { clientY: 68 })
      fireEvent.mouseUp(document)
      await vi.waitFor(() => expect(textarea.style.height).toBe('100px'))
    })
  })
})
