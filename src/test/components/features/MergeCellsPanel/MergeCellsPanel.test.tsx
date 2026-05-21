import { render, screen, fireEvent } from '@testing-library/react'
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

  it('clicking Merge does not throw when no selection', async () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    const mergeBtn = screen.getByText('Merge')
    fireEvent.click(mergeBtn)
  })

  it('clicking Unmerge does not throw when no selection', async () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    const unmergeBtn = screen.getByText('Unmerge')
    fireEvent.click(unmergeBtn)
  })

  it('has sr-only aria-live assertive region for announcements', () => {
    render(<MergeCellsPanel />, { wrapper: Wrapper })
    const srRegion = document.querySelector('.sr-only[aria-live="assertive"]')
    expect(srRegion).toBeInTheDocument()
  })
})
