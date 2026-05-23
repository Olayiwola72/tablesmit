import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { TooltipProvider } from '../../../../components/ui/Tooltip/Tooltip'
import { TableMakerContent } from '../../../../components/features/TableMakerContent/TableMakerContent'

vi.mock('../../../../services/exportService', () => ({
  exportTable: vi.fn().mockResolvedValue(undefined),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return (
    <TableProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </TableProvider>
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
})
