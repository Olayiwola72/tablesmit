import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useEffect, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TableProvider, useTableContext } from '../../../../context/TableContext'
import { TooltipProvider } from '../../../../components/ui/Tooltip/Tooltip'
import { TableMakerContent } from '../../../../components/features/TableMakerContent/TableMakerContent'

vi.mock('../../../../services/exportService', () => ({
  exportTable: vi.fn().mockResolvedValue(undefined),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return (
    <MemoryRouter>
      <TableProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </TableProvider>
    </MemoryRouter>
  )
}

function CaptionSetter({ value }: { value: string }): null {
  const { setCaption } = useTableContext()
  useEffect(() => { setCaption(value) }, [setCaption, value])
  return null
}

function WrapperWithCaption({ children, caption }: { children: ReactNode; caption: string }): ReactNode {
  return (
    <MemoryRouter>
      <TableProvider>
        <TooltipProvider>
          <CaptionSetter value={caption} />
          {children}
        </TooltipProvider>
      </TableProvider>
    </MemoryRouter>
  )
}

describe('TableMakerContent', () => {
  afterEach(() => {
    window.scrollY = 0
    vi.restoreAllMocks()
  })

  it('renders the main toolbar', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /add row/i })).toBeInTheDocument()
  })

  it('renders the Grid Size panel', async () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(await screen.findByText('Grid Size', {}, { timeout: 15000 })).toBeInTheDocument()
  })

  it('renders the table workspace region', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Editable table workspace')).toBeInTheDocument()
  })

  it('renders the headline', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.getByText('Tables built for analytical writing.')).toBeInTheDocument()
  })

  it('renders the table caption placeholder', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.getByText(/Add a table title or caption/i)).toBeInTheDocument()
  })

  it('renders the right sidebar with Merge and AI panels', async () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(await screen.findByText('Merge Cells')).toBeInTheDocument()
    expect(await screen.findByText('AI Features')).toBeInTheDocument()
  })

  it('renders the status bar with row and column count', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    const statusItems = screen.getAllByText(/table/i)
    expect(statusItems.length).toBeGreaterThanOrEqual(1)
  })

  it('opens find panel on Ctrl+F', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.queryByPlaceholderText(/Search/i)).not.toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'f', ctrlKey: true })
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument()
  })

  it('closes find panel on Escape', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    fireEvent.keyDown(document, { key: 'f', ctrlKey: true })
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByPlaceholderText(/Search/i)).not.toBeInTheDocument()
  })

  it('shows mobile settings button at mobile viewport', () => {
    vi.stubGlobal('innerWidth', 375)
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Open settings')).toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('shows mobile presets button at mobile viewport', () => {
    vi.stubGlobal('innerWidth', 375)
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Open presets')).toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('renders the Colors section in left sidebar', async () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(await screen.findByText('Colors')).toBeInTheDocument()
  })

  it('renders the Header color picker label', async () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(await screen.findByText('Header color')).toBeInTheDocument()
  })

  it('renders export format badges in the header', () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(screen.getAllByText(/PDF/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders the Border panel section', async () => {
    render(<TableMakerContent />, { wrapper: Wrapper })
    expect(await screen.findByText('Borders')).toBeInTheDocument()
  })

  // ── Whitespace context menu ──────────────────────────────

  function openWsCtx(): HTMLElement {
    render(<TableMakerContent />, { wrapper: Wrapper })
    const section = screen.getByLabelText('Editable table workspace')
    fireEvent.contextMenu(section, { clientX: 100, clientY: 100 })
    return section
  }

  function getWsCtxBox(): HTMLElement {
    const header = screen.getByText('Table')
    const menu = header.closest('[data-export-hide]')
    if (!menu) throw new Error('Menu container not found')
    return menu as HTMLElement
  }

  it('shows context menu on right-click of whitespace', () => {
    openWsCtx()
    const box = getWsCtxBox()
    expect(box.textContent).toContain('Copy')
    expect(box.textContent).toContain('Paste')
    expect(box.textContent).toContain('Close menu')
  })

  it('shows Clear All in whitespace context menu', () => {
    openWsCtx()
    const box = getWsCtxBox()
    expect(box.textContent).toContain('Clear All')
  })

  it('shows confirmation when Clear All is clicked in the menu', () => {
    openWsCtx()
    const box = getWsCtxBox()
    fireEvent.click(within(box).getByText('Clear All'))
    expect(screen.getByText('Clear all table data?')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('hides confirmation when Cancel is clicked', () => {
    openWsCtx()
    const box = getWsCtxBox()
    fireEvent.click(within(box).getByText('Clear All'))
    expect(screen.getByText('Clear all table data?')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByText('Clear all table data?')).not.toBeInTheDocument()
  })

  it('closes menu when Clear All confirmation is confirmed', () => {
    openWsCtx()
    const box = getWsCtxBox()
    fireEvent.click(within(box).getByText('Clear All'))
    // The confirmation block has a "Clear All" button inside it
    const confirm = within(box).getByText('Clear All')
    expect(confirm).toBeInTheDocument()
    fireEvent.click(confirm)
    expect(screen.queryByText('Clear all table data?')).not.toBeInTheDocument()
  })

  // ── Whitespace context menu header with caption ──────────

  it('shows "Table" in menu header when no caption is set', () => {
    openWsCtx()
    expect(screen.getByText('Table')).toBeInTheDocument()
  })

  it('shows "Table - Q1 Performance" in menu header when caption is set', () => {
    render(<TableMakerContent />, { wrapper: (p) => <WrapperWithCaption caption="Q1 Performance" {...p} /> })
    const section = screen.getByLabelText('Editable table workspace')
    fireEvent.contextMenu(section, { clientX: 100, clientY: 100 })
    expect(screen.getByText('Table - Q1 Performance')).toBeInTheDocument()
  })

  it('shows "Table - Research Notes" in menu header for a different caption', () => {
    render(<TableMakerContent />, { wrapper: (p) => <WrapperWithCaption caption="Research Notes" {...p} /> })
    const section = screen.getByLabelText('Editable table workspace')
    fireEvent.contextMenu(section, { clientX: 100, clientY: 100 })
    expect(screen.getByText('Table - Research Notes')).toBeInTheDocument()
  })

  it('still shows all menu items when header has a caption', () => {
    render(<TableMakerContent />, { wrapper: (p) => <WrapperWithCaption caption="Budget Summary" {...p} /> })
    const section = screen.getByLabelText('Editable table workspace')
    fireEvent.contextMenu(section, { clientX: 100, clientY: 100 })
    const header = screen.getByText('Table - Budget Summary')
    const box = header.closest('[data-export-hide]')!
    expect(box.textContent).toContain('Copy')
    expect(box.textContent).toContain('Paste')
    expect(box.textContent).toContain('Clear All')
    expect(box.textContent).toContain('Close menu')
  })

  // ── Create a Table clears typed header values ────────────

  it('clears typed header cell value after clicking Create a Table', async () => {
    const user = userEvent.setup()
    render(<TableMakerContent />, { wrapper: Wrapper })

    const cell = document.querySelector('[data-cell-id="R0C0"]')
    expect(cell).not.toBeNull()
    const editable = cell!.querySelector<HTMLElement>('[contenteditable]')
    expect(editable).not.toBeNull()

    await user.click(editable!)
    await user.keyboard('Product')
    fireEvent.blur(editable!)

    const cellAfterType = document.querySelector('[data-cell-id="R0C0"]')
    const editableAfterType = cellAfterType!.querySelector<HTMLElement>('[contenteditable]')
    expect(editableAfterType!.textContent).toBe('Product')

    const createBtn = screen.getByRole('button', { name: /create a table/i })
    await user.click(createBtn)

    await vi.waitFor(() => {
      const cellAfterGenerate = document.querySelector('[data-cell-id="R0C0"]')
      const editableAfterGenerate = cellAfterGenerate!.querySelector<HTMLElement>('[contenteditable]')
      expect(editableAfterGenerate!.textContent).toBe('')
    })
  })
})
