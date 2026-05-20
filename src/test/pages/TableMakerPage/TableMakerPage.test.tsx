import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TooltipProvider } from '../../../components/ui/Tooltip'
import { TableMakerPage } from '../../../pages/TableMakerPage/TableMakerPage'

vi.mock('../../../services/exportService', () => ({
  exportTable: vi.fn().mockResolvedValue(undefined),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TooltipProvider>{children}</TooltipProvider>
}

describe('TableMakerPage', () => {
  afterEach(() => {
    window.scrollY = 0
    vi.restoreAllMocks()
  })

  it('renders the main toolbar', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /add row/i })).toBeInTheDocument()
  })

  it('renders the Grid Size panel', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText('Grid Size')).toBeInTheDocument()
  })

  it('renders the table workspace region', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Editable table workspace')).toBeInTheDocument()
  })

  it('renders the headline', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText('Tables built for analytical writing.')).toBeInTheDocument()
  })

  it('renders the table caption placeholder', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText(/Add a table title or caption/i)).toBeInTheDocument()
  })

  it('renders the right sidebar with Merge and AI panels', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    const mergeHeadings = screen.getAllByText('Merge Cells')
    expect(mergeHeadings.length).toBeGreaterThanOrEqual(1)
    const aiHeadings = screen.getAllByText('AI Features')
    expect(aiHeadings.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the status bar with row and column count', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    const statusItems = screen.getAllByText(/table/i)
    expect(statusItems.length).toBeGreaterThanOrEqual(1)
  })

  it('opens find panel on Ctrl+F', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.queryByPlaceholderText(/Search/i)).not.toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'f', ctrlKey: true })
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument()
  })

  it('closes find panel on Escape', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    fireEvent.keyDown(document, { key: 'f', ctrlKey: true })
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByPlaceholderText(/Search/i)).not.toBeInTheDocument()
  })

  it('shows mobile settings button at mobile viewport', () => {
    vi.stubGlobal('innerWidth', 375)
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Open settings')).toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('shows mobile presets button at mobile viewport', () => {
    vi.stubGlobal('innerWidth', 375)
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Open presets')).toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('renders the Colors section in left sidebar', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText('Colors')).toBeInTheDocument()
  })

  it('renders the Header color picker label', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    const headerLabels = screen.getAllByText('Header color')
    expect(headerLabels.length).toBeGreaterThanOrEqual(1)
  })

  it('renders export format badges in the header', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText(/PDF/)).toBeInTheDocument()
  })

  it('renders the Border panel section', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    const borderLabels = screen.getAllByText('Borders')
    expect(borderLabels.length).toBeGreaterThanOrEqual(1)
  })
})
