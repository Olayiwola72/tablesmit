import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableProvider'
import { ColumnFormattingPanel } from '../../../../components/features/ColumnFormattingPanel/ColumnFormattingPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('ColumnFormattingPanel', () => {
  it('renders the section label', () => {
    render(<ColumnFormattingPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Column Type')).toBeInTheDocument()
  })

  it('renders a select for each column', () => {
    render(<ColumnFormattingPanel />, { wrapper: Wrapper })
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThanOrEqual(5)
  })

  it('renders column labels (C1, C2, etc.)', () => {
    render(<ColumnFormattingPanel />, { wrapper: Wrapper })
    expect(screen.getByText('C1')).toBeInTheDocument()
    expect(screen.getByText('C2')).toBeInTheDocument()
  })

  it('renders format options', () => {
    render(<ColumnFormattingPanel />, { wrapper: Wrapper })
    const options = document.querySelectorAll('option')
    const labels = Array.from(options).map((o) => o.textContent)
    expect(labels).toContain('Text')
    expect(labels).toContain('Number')
    expect(labels).toContain('Currency')
    expect(labels).toContain('Percentage')
    expect(labels).toContain('Date')
  })

  it('renders Sum and Auto-number options', () => {
    render(<ColumnFormattingPanel />, { wrapper: Wrapper })
    const options = document.querySelectorAll('option')
    const labels = Array.from(options).map((o) => o.textContent)
    expect(labels).toContain('Sum')
    expect(labels).toContain('Auto-number')
  })

  it('changing column format does not throw', () => {
    render(<ColumnFormattingPanel />, { wrapper: Wrapper })
    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], { target: { value: 'number' } })
    expect(selects[0]).toHaveValue('number')
  })
})
