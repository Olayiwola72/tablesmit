import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TableCtxMenu } from '../../../../../components/features/TableGrid/TableCtxMenu/TableCtxMenu'
import type { TableCtxMenuProps } from '../../../../../components/features/TableGrid/TableCtxMenu/TableCtxMenu.types'
import { columnFormats } from '../../../../../config/columnFormats/columnFormatsConfig'

// Use translation values matching setup.ts
const tLabels = {
  autoFitColumn: 'Auto-fit column width',
  sortAscending: 'Sort ascending',
  sortDescending: 'Sort descending',
  changeBackground: 'Change cell background color',
  changeColumnBackground: 'Change column background color',
  changeRowBackground: 'Change row background color',
  clearCell: 'Clear cell',
  deleteRow: 'Delete row',
  deleteColumn: 'Delete column',
  insertRowAbove: 'Insert row above',
  insertRowBelow: 'Insert row below',
  insertColumnLeft: 'Insert column left',
  insertColumnRight: 'Insert column right',
  paste: 'Paste',
  copy: 'Copy',
  noColor: 'Clear',
}

function createProps(overrides: Partial<TableCtxMenuProps> = {}): TableCtxMenuProps {
  return {
    ctxMenu: { type: 'cell', row: 0, col: 0, x: 0, y: 0 },
    activeSub: null,
    columnColors: {},
    cellColors: {},
    rowColors: {},
    columnTextAlign: {},
    cellTextAlign: {},
    cells: [[{ id: 'R0C0', value: '', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false }]],
    onClose: vi.fn(),
    onToggleSub: vi.fn(),
    autoFitColumn: vi.fn(),
    setColumnColor: vi.fn(),
    setCellColor: vi.fn(),
    setRowColor: vi.fn(),
    setColumnFormat: vi.fn(),
    setCellTextAlign: vi.fn(),
    setColumnTextAlign: vi.fn(),
    updateCell: vi.fn(),
    insertRowAbove: vi.fn(),
    insertRowBelow: vi.fn(),
    deleteRowAt: vi.fn(),
    insertColLeft: vi.fn(),
    insertColRight: vi.fn(),
    deleteColAt: vi.fn(),
    isSortDisabled: () => false,
    sortAsc: vi.fn(),
    sortDesc: vi.fn(),
    ...overrides,
  }
}

describe('TableCtxMenu', () => {
  it('renders cell context menu header as R1 · C1', () => {
    render(<TableCtxMenu {...createProps()} />)
    expect(screen.getByText('R1 \u00B7 C1')).toBeInTheDocument()
  })

  it('renders column context menu header as Column 1', () => {
    render(<TableCtxMenu {...createProps({ ctxMenu: { type: 'column', col: 0, x: 0, y: 0 } })} />)
    expect(screen.getByText('Column 1')).toBeInTheDocument()
  })

  it('calls autoFitColumn from cell mode', async () => {
    const user = userEvent.setup()
    const autoFitColumn = vi.fn()
    render(<TableCtxMenu {...createProps({ autoFitColumn })} />)
    await user.click(screen.getByText(tLabels.autoFitColumn))
    expect(autoFitColumn).toHaveBeenCalledWith(0)
  })

  it('calls autoFitColumn from column mode with correct column index', async () => {
    const user = userEvent.setup()
    const autoFitColumn = vi.fn()
    render(<TableCtxMenu {...createProps({ autoFitColumn, ctxMenu: { type: 'column', col: 2, x: 0, y: 0 } })} />)
    await user.click(screen.getByText(tLabels.autoFitColumn))
    expect(autoFitColumn).toHaveBeenCalledWith(2)
  })

  it('calls sortAsc and sortDesc from column mode', async () => {
    const user = userEvent.setup()
    const sortAsc = vi.fn()
    const sortDesc = vi.fn()
    render(<TableCtxMenu {...createProps({ sortAsc, sortDesc, ctxMenu: { type: 'column', col: 0, x: 0, y: 0 } })} />)

    await user.click(screen.getByText(tLabels.sortAscending))
    expect(sortAsc).toHaveBeenCalledWith(0)

    await user.click(screen.getByText(tLabels.sortDescending))
    expect(sortDesc).toHaveBeenCalledWith(0)
  })

  it('toggles background submenu and shows column color, cell color, and swatches', () => {
    render(<TableCtxMenu {...createProps({ activeSub: 'bg' })} />)
    expect(screen.getAllByText(tLabels.changeBackground).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(tLabels.changeColumnBackground)).toBeInTheDocument()
    const swatches = screen.getAllByRole('button', { name: /^#/ })
    expect(swatches.length).toBeGreaterThan(0)
  })

  it('shows row background color toggle in cell context menu', () => {
    render(<TableCtxMenu {...createProps({ activeSub: 'rowColor' })} />)
    expect(screen.getByText(tLabels.changeRowBackground)).toBeInTheDocument()
  })

  it('shows column background color toggle in column context menu', () => {
    render(<TableCtxMenu {...createProps({ ctxMenu: { type: 'column', col: 0, x: 0, y: 0 }, activeSub: 'bg' })} />)
    expect(screen.getByText(tLabels.changeColumnBackground)).toBeInTheDocument()
  })

  it('toggles column type submenu and shows all format options', () => {
    render(<TableCtxMenu {...createProps({ activeSub: 'type' })} />)
    for (const fmt of columnFormats) {
      expect(screen.getByText(fmt.label)).toBeInTheDocument()
    }
  })

  it('toggles text align submenu and shows alignment options', () => {
    render(<TableCtxMenu {...createProps({ ctxMenu: { type: 'column', col: 0, x: 0, y: 0 }, activeSub: 'align' })} />)
    const expected = ['Align left', 'Align center', 'Align right']
    for (const text of expected) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })

  it('calls updateCell with empty string on clear cell click', async () => {
    const user = userEvent.setup()
    const updateCell = vi.fn()
    render(<TableCtxMenu {...createProps({ updateCell })} />)
    await user.click(screen.getByText(tLabels.clearCell))
    expect(updateCell).toHaveBeenCalledWith('R0C0', '')
  })

  it('calls deleteRowAt with correct row index', async () => {
    const user = userEvent.setup()
    const deleteRowAt = vi.fn()
    render(<TableCtxMenu {...createProps({ deleteRowAt })} />)
    await user.click(screen.getByText(tLabels.deleteRow))
    expect(deleteRowAt).toHaveBeenCalledWith(0)
  })

  it('calls deleteColAt with correct column index', async () => {
    const user = userEvent.setup()
    const deleteColAt = vi.fn()
    render(<TableCtxMenu {...createProps({ deleteColAt })} />)
    await user.click(screen.getByText(tLabels.deleteColumn))
    expect(deleteColAt).toHaveBeenCalledWith(0)
  })

  it('calls insertRowAbove and insertRowBelow with correct row index', async () => {
    const user = userEvent.setup()
    const insertRowAbove = vi.fn()
    const insertRowBelow = vi.fn()
    render(<TableCtxMenu {...createProps({ insertRowAbove, insertRowBelow })} />)

    await user.click(screen.getByText(tLabels.insertRowAbove))
    expect(insertRowAbove).toHaveBeenCalledWith(0)

    await user.click(screen.getByText(tLabels.insertRowBelow))
    expect(insertRowBelow).toHaveBeenCalledWith(0)
  })

  it('calls insertColLeft and insertColRight with correct column index', async () => {
    const user = userEvent.setup()
    const insertColLeft = vi.fn()
    const insertColRight = vi.fn()
    render(<TableCtxMenu {...createProps({ insertColLeft, insertColRight })} />)

    await user.click(screen.getByText(tLabels.insertColumnLeft))
    expect(insertColLeft).toHaveBeenCalledWith(0)

    await user.click(screen.getByText(tLabels.insertColumnRight))
    expect(insertColRight).toHaveBeenCalledWith(0)
  })

  it('copies cell value to clipboard on copy click', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    const originalClipboard = navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const cellValue = 'test value'
    render(<TableCtxMenu {...createProps({ cells: [[{ id: 'R0C0', value: cellValue, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false }]] })} />)
    await user.click(screen.getByText(tLabels.copy))

    expect(writeText).toHaveBeenCalledWith(cellValue)

    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    })
  })

  it('reads clipboard text and calls updateCell on paste', async () => {
    const user = userEvent.setup()
    const readText = vi.fn().mockResolvedValue('pasted content')
    const originalClipboard = navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: { readText },
      writable: true,
      configurable: true,
    })

    const updateCell = vi.fn()
    render(<TableCtxMenu {...createProps({ updateCell })} />)
    await user.click(screen.getByText(tLabels.paste))

    expect(readText).toHaveBeenCalledOnce()
    await waitFor(() => {
      expect(updateCell).toHaveBeenCalledWith('R0C0', 'pasted content')
    })

    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    })
  })

  it('renders color swatches with aria-labels and custom color input', () => {
    render(<TableCtxMenu {...createProps({ activeSub: 'bg' })} />)
    expect(screen.getAllByLabelText('#FFE4E1').length).toBe(2)
    expect(screen.getAllByLabelText('#FF5722').length).toBe(2)
    const colorInputs = screen.getAllByDisplayValue('#ffffff')
    expect(colorInputs.length).toBe(2)
  })

  it('shows remove color button when a column color is set', () => {
    render(<TableCtxMenu {...createProps({
      ctxMenu: { type: 'column', col: 0, x: 0, y: 0 },
      activeSub: 'bg',
      columnColors: { 0: '#FF5722' },
    })} />)
    expect(screen.getByText(tLabels.noColor)).toBeInTheDocument()
  })
})
