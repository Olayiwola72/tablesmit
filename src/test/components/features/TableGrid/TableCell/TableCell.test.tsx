import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { CellData } from '../../../../../types/table.types'
import { TableCell } from '../../../../../components/features/TableGrid/TableCell/TableCell'

const baseCell: CellData = {
  id: 'R0C0',
  value: 'Hello',
  colSpan: 1,
  rowSpan: 1,
  isMerged: false,
  isHidden: false,
  format: 'text',
}

describe('TableCell', () => {
  it('renders a regular cell by default', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell
              cell={baseCell}
              row={0} col={0}
              headerStyle="none"
              headerColor="#1E40AF"
              headerTextColor="#ffffff"
              contentColor="#111827"
              contentBgColor=""
              rowHeight={44}
              selectedRange={null}
              onSelect={vi.fn()}
              onBlur={vi.fn()}
              onRowResizeStart={vi.fn()}
              onAutoFitRow={vi.fn()}
              onColumnResizeStart={vi.fn()}
              onAutoFitColumn={vi.fn()}
              columnWidth={120}
              onKeyDown={vi.fn()}
              onContextMenu={vi.fn()}
              borderStyle="solid"
              borderColor="#000000"
              rowColor=""
              columnColor=""
              cellColor=""
              textAlign="left"
            />
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByRole('cell')).toBeInTheDocument()
  })

  it('renders as columnheader when headerStyle is first-row', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell
              cell={baseCell}
              row={0} col={0}
              headerStyle="first-row"
              headerColor="#1E40AF"
              headerTextColor="#ffffff"
              contentColor="#111827"
              contentBgColor=""
              rowHeight={44}
              selectedRange={null}
              onSelect={vi.fn()}
              onBlur={vi.fn()}
              onRowResizeStart={vi.fn()}
              onAutoFitRow={vi.fn()}
              onColumnResizeStart={vi.fn()}
              onAutoFitColumn={vi.fn()}
              columnWidth={120}
              onKeyDown={vi.fn()}
              onContextMenu={vi.fn()}
              borderStyle="solid"
              borderColor="#000000"
              rowColor=""
              columnColor=""
              cellColor=""
              textAlign="left"
            />
          </tr>
        </tbody>
      </table>,
    )
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
  })

  it('calls onSelect when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <table>
        <tbody>
          <tr>
            <TableCell
              cell={baseCell}
              row={2} col={3}
              headerStyle="none"
              headerColor="#1E40AF"
              headerTextColor="#ffffff"
              contentColor="#111827"
              contentBgColor=""
              rowHeight={44}
              selectedRange={null}
              onSelect={onSelect}
              onBlur={vi.fn()}
              onRowResizeStart={vi.fn()}
              onAutoFitRow={vi.fn()}
              onColumnResizeStart={vi.fn()}
              onAutoFitColumn={vi.fn()}
              columnWidth={120}
              onKeyDown={vi.fn()}
              onContextMenu={vi.fn()}
              borderStyle="solid"
              borderColor="#000000"
              rowColor=""
              columnColor=""
              cellColor=""
              textAlign="left"
            />
          </tr>
        </tbody>
      </table>,
    )
    await user.click(screen.getByRole('cell'))
    expect(onSelect).toHaveBeenCalledWith(2, 3, expect.anything())
  })
})
