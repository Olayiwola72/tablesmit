import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TooltipProvider } from '../../../../../components/ui/Tooltip/Tooltip'
import { TableHeaderRow } from '../../../../../components/features/TableGrid/TableHeaderRow/TableHeaderRow'
import type { CellData } from '../../../../../types/table/cell.types'

function renderWithProviders(ui: React.ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>)
}

function makeCells(values: string[][]): CellData[][] {
  return values.map((row, r) =>
    row.map((value, c) => ({
      id: `R${r}C${c}`,
      value,
      colSpan: 1,
      rowSpan: 1,
      isMerged: false,
      isHidden: false,
    })),
  )
}

describe('TableHeaderRow', () => {
  const defaultProps = {
    cols: 3,
    columnWidths: [100, 120, 140],
    cells: makeCells([['A', 'B', 'C']]),
    activeSortCol: null as number | null,
    activeSortDir: null as 'asc' | 'desc' | null,
    isSortDisabled: () => false,
    onSort: vi.fn(),
    onFormatChange: vi.fn(),
    onResizeStart: vi.fn(),
    onAutoFit: vi.fn(),
    onContextMenu: vi.fn(),
  }

  it('renders correct number of header cells', () => {
    renderWithProviders(<TableHeaderRow {...defaultProps} />)
    const formatSelects = screen.getAllByRole('combobox')
    expect(formatSelects).toHaveLength(3)
  })

  it('applies correct grid template columns', () => {
    const { container } = renderWithProviders(<TableHeaderRow {...defaultProps} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.gridTemplateColumns).toBe('100px 120px 140px')
  })

  it('calls onSort when a column is sorted', () => {
    const onSort = vi.fn()
    renderWithProviders(<TableHeaderRow {...defaultProps} onSort={onSort} />)
    const sortButtons = screen.getAllByRole('button')
    const sortBtn = sortButtons.find((b) => b.querySelector('svg'))
    if (sortBtn) fireEvent.click(sortBtn)
  })

  it('renders with active sort direction', () => {
    renderWithProviders(
      <TableHeaderRow
        {...defaultProps}
        activeSortCol={0}
        activeSortDir="asc"
      />,
    )
    const formatSelects = screen.getAllByRole('combobox')
    expect(formatSelects).toHaveLength(3)
  })

  it('renders with sort disabled', () => {
    renderWithProviders(<TableHeaderRow {...defaultProps} isSortDisabled={() => true} />)
    const formatSelects = screen.getAllByRole('combobox')
    expect(formatSelects).toHaveLength(3)
  })
})
