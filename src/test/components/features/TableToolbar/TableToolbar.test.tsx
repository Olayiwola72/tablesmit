import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { createRef, type ReactNode } from 'react'
import { TooltipProvider } from '../../../../components/ui/Tooltip'
import { TableProvider } from '../../../../context/TableContext'
import { TableToolbar } from '../../../../components/features/TableToolbar/TableToolbar'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TooltipProvider><TableProvider>{children}</TableProvider></TooltipProvider>
}

function renderToolbar(): void {
  render(<TableToolbar tableRef={createRef<HTMLDivElement>()} />, { wrapper: Wrapper })
}

describe('TableToolbar', () => {
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
})
