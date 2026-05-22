import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createRef, type ReactNode } from 'react'
import { TooltipProvider } from '../../../../components/ui/Tooltip/Tooltip'
import { TableProvider } from '../../../../context/TableContext'
import { TableToolbar } from '../../../../components/features/TableToolbar/TableToolbar'

vi.mock('../../../../hooks/useImport/useImport', () => ({
  useImport: () => ({ error: null, importFile: vi.fn() }),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TooltipProvider><TableProvider>{children}</TableProvider></TooltipProvider>
}

function renderToolbar(): void {
  render(<TableToolbar tableRef={createRef<HTMLDivElement>()} />, { wrapper: Wrapper })
}

describe('TableToolbar', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders add row, add column, remove row, remove column buttons', () => {
    renderToolbar()
    expect(screen.getByRole('button', { name: /add row/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add column/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /remove row/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /remove column/i })).toBeInTheDocument()
  })

  it('renders merge and unmerge buttons', () => {
    renderToolbar()
    expect(screen.getByRole('button', { name: 'Merge' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /unmerge/i })).toBeInTheDocument()
  })

  it('renders clear all and undo buttons', () => {
    renderToolbar()
    expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument()
  })

  it('clicking add row does not crash', () => {
    renderToolbar()
    const addRowBtn = screen.getByRole('button', { name: /add row/i })
    act(() => { addRowBtn.click() })
  })

  it('clicking remove row does not crash', () => {
    renderToolbar()
    const removeRowBtn = screen.getByRole('button', { name: /remove row/i })
    act(() => { removeRowBtn.click() })
  })

  it('clicking add column does not crash', () => {
    renderToolbar()
    const addColBtn = screen.getByRole('button', { name: /add column/i })
    act(() => { addColBtn.click() })
  })

  it('clicking remove column does not crash', () => {
    renderToolbar()
    const removeColBtn = screen.getByRole('button', { name: /remove column/i })
    act(() => { removeColBtn.click() })
  })

  it('clicking merge does not crash', () => {
    renderToolbar()
    const mergeBtn = screen.getByRole('button', { name: 'Merge' })
    act(() => { mergeBtn.click() })
  })

  it('clicking unmerge does not crash', () => {
    renderToolbar()
    const unmergeBtn = screen.getByRole('button', { name: /unmerge/i })
    act(() => { unmergeBtn.click() })
  })

  it('clicking undo does not crash', () => {
    renderToolbar()
    const undoBtn = screen.getByRole('button', { name: /undo/i })
    act(() => { undoBtn.click() })
  })

  it('clicking clear all does not crash', () => {
    renderToolbar()
    const clearBtn = screen.getByRole('button', { name: /clear all/i })
    act(() => { clearBtn.click() })
  })

  it('renders Templates and Theme dropdowns', () => {
    renderToolbar()
    expect(screen.getByText('Templates')).toBeInTheDocument()
    expect(screen.getByText('Theme')).toBeInTheDocument()
  })

  it('renders the AI features button', () => {
    renderToolbar()
    expect(screen.getByRole('button', { name: /AI/i })).toBeInTheDocument()
  })

})
