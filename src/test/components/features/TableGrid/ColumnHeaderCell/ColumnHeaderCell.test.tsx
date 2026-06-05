import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TooltipProvider } from '../../../../../components/ui/Tooltip/Tooltip'
import { columnFormats } from '../../../../../config/columnFormats/columnFormatsConfig'
import { ColumnHeaderCell } from '../../../../../components/features/TableGrid/ColumnHeaderCell/ColumnHeaderCell'
import type { ColumnHeaderCellProps } from '../../../../../components/features/TableGrid/ColumnHeaderCell/ColumnHeaderCell.types'

function renderWithProviders(ui: React.ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>)
}

function createProps(overrides: Partial<ColumnHeaderCellProps> = {}): ColumnHeaderCellProps {
  return {
    index: 0,
    width: 120,
    format: 'text',
    sortDir: null,
    isSortDisabled: () => false,
    onSort: vi.fn(),
    onFormatChange: vi.fn(),
    onResizeStart: vi.fn(),
    onAutoFit: vi.fn(),
    onContextMenu: vi.fn(),
    ...overrides,
  }
}

describe('ColumnHeaderCell', () => {
  it('renders column label C1 for index 0', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps()} />)
    expect(screen.getByText('C1')).toBeInTheDocument()
  })

  it('renders column label C2 for index 1', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps({ index: 1 })} />)
    expect(screen.getByText('C2')).toBeInTheDocument()
  })

  it('renders a column type select', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps()} />)
    const select = screen.getByLabelText('Column type 1')
    expect(select).toBeInTheDocument()
  })

  it('renders all column format options', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps()} />)
    for (const fmt of columnFormats) {
      const label = fmt.value === 'auto-number' ? '#' : fmt.label
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('shows ArrowUpDown icon when sortDir is null', () => {
    const { container } = renderWithProviders(<ColumnHeaderCell {...createProps({ sortDir: null })} />)
    expect(container.querySelector('.lucide-arrow-up-down')).toBeInTheDocument()
  })

  it('shows ArrowUp icon when sortDir is asc', () => {
    const { container } = renderWithProviders(<ColumnHeaderCell {...createProps({ sortDir: 'asc' })} />)
    expect(container.querySelector('.lucide-arrow-up')).toBeInTheDocument()
  })

  it('shows ArrowDown icon when sortDir is desc', () => {
    const { container } = renderWithProviders(<ColumnHeaderCell {...createProps({ sortDir: 'desc' })} />)
    expect(container.querySelector('.lucide-arrow-down')).toBeInTheDocument()
  })

  it('calls onSort when sort button is clicked', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()
    renderWithProviders(<ColumnHeaderCell {...createProps({ onSort })} />)
    await user.click(screen.getByLabelText('C1'))
    expect(onSort).toHaveBeenCalledOnce()
  })

  it('disables sort button when isSortDisabled returns true', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps({ isSortDisabled: () => true })} />)
    expect(screen.getByLabelText('C1')).toBeDisabled()
  })

  it('does not have native title when isSortDisabled returns false (Tooltip replaces it)', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps({ isSortDisabled: () => false })} />)
    expect(screen.getByLabelText('C1')).not.toHaveAttribute('title')
  })

  it('shows sortDisabledMsg title when isSortDisabled returns true', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps({ isSortDisabled: () => true })} />)
    expect(screen.getByLabelText('C1')).toHaveAttribute('title', 'Clear merged cells to enable sorting')
  })

  it('calls onFormatChange when column type select changes', async () => {
    const user = userEvent.setup()
    const onFormatChange = vi.fn()
    renderWithProviders(<ColumnHeaderCell {...createProps({ onFormatChange })} />)
    const select = screen.getByLabelText('Column type 1')
    await user.selectOptions(select, 'number')
    expect(onFormatChange).toHaveBeenCalledWith('number')
  })

  it('select shows the current format value', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps({ format: 'currency' })} />)
    const select = screen.getByLabelText('Column type 1') as HTMLSelectElement
    expect(select.value).toBe('currency')
  })

  it('calls onContextMenu on right-click', async () => {
    const user = userEvent.setup()
    const onContextMenu = vi.fn()
    const { container } = renderWithProviders(<ColumnHeaderCell {...createProps({ onContextMenu })} />)
    const outerDiv = container.firstChild as HTMLElement
    await user.pointer({ target: outerDiv, keys: '[MouseRight]' })
    expect(onContextMenu).toHaveBeenCalledWith(0, expect.any(Object))
  })

  it('renders a resize handle with auto-fit label', () => {
    renderWithProviders(<ColumnHeaderCell {...createProps()} />)
    expect(screen.getByRole('button', { name: 'Double-click resize handle to auto-fit' })).toBeInTheDocument()
  })
})
