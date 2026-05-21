import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { siteConfig } from '../../../../../config/siteConfig'
import { TableHeaderCell } from '../../../../../components/features/TableGrid/TableHeaderCell/TableHeaderCell'
import type { TableHeaderCellProps } from '../../../../../components/features/TableGrid/TableHeaderCell/TableHeaderCell.types'

function createProps(overrides: Partial<TableHeaderCellProps> = {}): TableHeaderCellProps {
  return {
    index: 0,
    width: 120,
    format: 'text',
    sortDir: null,
    sortDisabled: false,
    onSort: vi.fn(),
    onFormatChange: vi.fn(),
    onResizeStart: vi.fn(),
    onAutoFit: vi.fn(),
    onContextMenu: vi.fn(),
    ...overrides,
  }
}

describe('TableHeaderCell', () => {
  it('renders column label C1 for index 0', () => {
    render(<TableHeaderCell {...createProps()} />)
    expect(screen.getByText('C1')).toBeInTheDocument()
  })

  it('renders column label C2 for index 1', () => {
    render(<TableHeaderCell {...createProps({ index: 1 })} />)
    expect(screen.getByText('C2')).toBeInTheDocument()
  })

  it('renders a column type select', () => {
    render(<TableHeaderCell {...createProps()} />)
    const select = screen.getByLabelText('Column type 1')
    expect(select).toBeInTheDocument()
  })

  it('renders all column format options', () => {
    render(<TableHeaderCell {...createProps()} />)
    for (const fmt of siteConfig.columnFormats) {
      const label = fmt.value === 'auto-number' ? '#' : fmt.label
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('shows ArrowUpDown icon when sortDir is null', () => {
    const { container } = render(<TableHeaderCell {...createProps({ sortDir: null })} />)
    expect(container.querySelector('.lucide-arrow-up-down')).toBeInTheDocument()
  })

  it('shows ArrowUp icon when sortDir is asc', () => {
    const { container } = render(<TableHeaderCell {...createProps({ sortDir: 'asc' })} />)
    expect(container.querySelector('.lucide-arrow-up')).toBeInTheDocument()
  })

  it('shows ArrowDown icon when sortDir is desc', () => {
    const { container } = render(<TableHeaderCell {...createProps({ sortDir: 'desc' })} />)
    expect(container.querySelector('.lucide-arrow-down')).toBeInTheDocument()
  })

  it('calls onSort when sort button is clicked', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()
    render(<TableHeaderCell {...createProps({ onSort })} />)
    await user.click(screen.getByLabelText('C1'))
    expect(onSort).toHaveBeenCalledOnce()
  })

  it('disables sort button when sortDisabled is true', () => {
    render(<TableHeaderCell {...createProps({ sortDisabled: true })} />)
    expect(screen.getByLabelText('C1')).toBeDisabled()
  })

  it('shows sortColumn title when sortDisabled is false', () => {
    render(<TableHeaderCell {...createProps({ sortDisabled: false })} />)
    expect(screen.getByLabelText('C1')).toHaveAttribute('title', 'Sort column')
  })

  it('shows sortDisabledMsg title when sortDisabled is true', () => {
    render(<TableHeaderCell {...createProps({ sortDisabled: true })} />)
    expect(screen.getByLabelText('C1')).toHaveAttribute('title', 'Clear merged cells to enable sorting')
  })

  it('calls onFormatChange when column type select changes', async () => {
    const user = userEvent.setup()
    const onFormatChange = vi.fn()
    render(<TableHeaderCell {...createProps({ onFormatChange })} />)
    const select = screen.getByLabelText('Column type 1')
    await user.selectOptions(select, 'number')
    expect(onFormatChange).toHaveBeenCalledWith('number')
  })

  it('select shows the current format value', () => {
    render(<TableHeaderCell {...createProps({ format: 'currency' })} />)
    const select = screen.getByLabelText('Column type 1') as HTMLSelectElement
    expect(select.value).toBe('currency')
  })

  it('calls onContextMenu on right-click', async () => {
    const user = userEvent.setup()
    const onContextMenu = vi.fn()
    const { container } = render(<TableHeaderCell {...createProps({ onContextMenu })} />)
    const outerDiv = container.firstChild as HTMLElement
    await user.pointer({ target: outerDiv, keys: '[MouseRight]' })
    expect(onContextMenu).toHaveBeenCalledWith(0, expect.any(Object))
  })

  it('renders a resize handle with auto-fit label', () => {
    render(<TableHeaderCell {...createProps()} />)
    expect(screen.getByRole('button', { name: siteConfig.labels.autoFitColumn })).toBeInTheDocument()
  })

  it('renders ChevronDown icon', () => {
    const { container } = render(<TableHeaderCell {...createProps()} />)
    expect(container.querySelector('.lucide-chevron-down')).toBeInTheDocument()
  })
})
