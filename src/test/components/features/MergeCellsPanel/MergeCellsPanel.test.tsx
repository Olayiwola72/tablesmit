import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { MergeCellsPanel } from '../../../../components/features/MergeCellsPanel/MergeCellsPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('MergeCellsPanel', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the section label', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Merge Cells')).toBeInTheDocument()
  })

  it('shows "No selection" by default', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('No selection')).toBeInTheDocument()
  })

  it('renders "Merge" and "Unmerge" button text', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Merge')).toBeInTheDocument()
    expect(screen.getByText('Unmerge')).toBeInTheDocument()
  })

  it('renders merge instructions text', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Select two or more cells to merge.')).toBeInTheDocument()
  })

  it('contains an aria-live region for screen reader announcements', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    const liveRegion = document.querySelector('[aria-live="assertive"]')
    expect(liveRegion).toBeInTheDocument()
  })
})
