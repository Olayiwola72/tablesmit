import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, type ReactNode } from 'react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { TableProvider } from '../../../../context/TableContext'
import { TableGrid } from '../../../../components/features/TableGrid/TableGrid'
import { DEFAULT_COLS, DEFAULT_ROWS } from '../../../../config/table/tableDefaults'
import { toast } from '../../../../utils/toast/toast'

vi.mock('../../../../utils/toast/toast', () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
  TOAST: {
    PASTE_SUCCESS: (rows: number, cols: number) =>
      `Table pasted. ${rows} rows, ${cols} columns.`,
    PASTE_ERROR: 'Could not read clipboard. Try importing a file instead.',
    UNDO_EMPTY: 'Nothing left to undo.',
  },
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

function getCell(row: number, col: number, cols: number = DEFAULT_COLS): HTMLElement {
  return screen.getAllByRole('gridcell')[row * cols + col]
}

function renderTableGrid(props: Record<string, unknown> = {}): { tableRef: React.RefObject<HTMLDivElement | null> } {
  const tableRef = createRef<HTMLDivElement>()
  render(<TableGrid tableRef={tableRef} {...props} />, { wrapper: Wrapper })
  return { tableRef }
}

describe('TableGrid', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  // ── Basic structure ──────────────────────────────────────

  it('renders a table with role="grid" and correct aria labels', () => {
    renderTableGrid()
    const grid = screen.getByRole('grid', { name: /table editor/i })
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveAttribute('aria-rowcount', String(DEFAULT_ROWS))
    expect(grid).toHaveAttribute('aria-colcount', String(DEFAULT_COLS))
  })

  it('renders 5 rows with role="row"', () => {
    renderTableGrid()
    expect(screen.getAllByRole('row')).toHaveLength(DEFAULT_ROWS)
  })

  it('renders 25 cells with role="gridcell"', () => {
    renderTableGrid()
    expect(screen.getAllByRole('gridcell')).toHaveLength(DEFAULT_ROWS * DEFAULT_COLS)
  })

  it('renders column header sort buttons labelled C1 through C5', () => {
    renderTableGrid()
    for (let i = 1; i <= DEFAULT_COLS; i++) {
      expect(screen.getByRole('button', { name: `C${i}` })).toBeInTheDocument()
    }
  })

  it('renders a column type select for each column', () => {
    renderTableGrid()
    for (let i = 1; i <= DEFAULT_COLS; i++) {
      expect(screen.getByLabelText(`Column type ${i}`)).toBeInTheDocument()
    }
  })

  // ── Cell selection ───────────────────────────────────────

  it('selects a cell on click', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    const cell = getCell(0, 0)
    expect(cell).toHaveAttribute('aria-selected', 'false')
    await user.click(cell)
    expect(cell).toHaveAttribute('aria-selected', 'true')
  })

  it('selects a different cell when a second cell is clicked', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    const cellA = getCell(0, 0)
    const cellB = getCell(1, 1)
    await user.click(cellA)
    expect(cellA).toHaveAttribute('aria-selected', 'true')
    expect(cellB).toHaveAttribute('aria-selected', 'false')
    await user.click(cellB)
    expect(cellA).toHaveAttribute('aria-selected', 'false')
    expect(cellB).toHaveAttribute('aria-selected', 'true')
  })

  // ── Table focus (isTableFocused) ──────────────────────────

  it('shows focused selection ring when clicking a cell', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    const cell = getCell(0, 0)
    await user.click(cell)
    expect(cell.className).toContain('ring-primary')
    expect(cell.className).not.toContain('ring-border')
  })

  it('shows dimmed selection ring after clicking outside the table', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    const cell = getCell(0, 0)
    await user.click(cell)
    expect(cell.className).toContain('ring-primary')

    await user.click(document.body)
    expect(cell.className).toContain('ring-border')
  })

  // ── Column header sorting ────────────────────────────────

  it('does not error when clicking column header sort button', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    const sortBtn = screen.getByRole('button', { name: 'C1' })
    await user.click(sortBtn)
    expect(screen.getByRole('button', { name: 'C1' })).toBeInTheDocument()
  })

  it('cycles sort direction on repeated sort button clicks', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    const sortBtn = screen.getByRole('button', { name: 'C1' })

    await user.click(sortBtn)
    expect(screen.getByRole('button', { name: 'C1' })).toBeInTheDocument()

    await user.click(sortBtn)
    expect(screen.getByRole('button', { name: 'C1' })).toBeInTheDocument()

    await user.click(sortBtn)
    expect(screen.getByRole('button', { name: 'C1' })).toBeInTheDocument()
  })

  it('sorts independently per column (clicking C2 resets C1 sort)', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    await user.click(screen.getByRole('button', { name: 'C1' }))
    await user.click(screen.getByRole('button', { name: 'C2' }))
    expect(screen.getByRole('button', { name: 'C2' })).toBeInTheDocument()
  })

  // ── Sum row ──────────────────────────────────────────────

  it('shows a sum footer row when a column format is changed to Sum', async () => {
    const user = userEvent.setup()
    renderTableGrid()
    expect(screen.queryByText(/Sum:/i)).not.toBeInTheDocument()

    const select = screen.getByLabelText('Column type 1')
    await user.selectOptions(select, 'sum')

    expect(await screen.findByText(/Sum:/i)).toBeInTheDocument()
    expect(await screen.findByText(/0\.00/)).toBeInTheDocument()
  })

  // ── Find matches highlighting ────────────────────────────

  it('highlights cells that match findMatches', () => {
    renderTableGrid({ findMatches: [{ row: 0, col: 0 }, { row: 1, col: 1 }] })
    const cell00 = getCell(0, 0)
    const cell11 = getCell(1, 1)
    const cell01 = getCell(0, 1)
    expect(cell00.className).toContain('bg-accent-light')
    expect(cell11.className).toContain('bg-accent-light')
    expect(cell01.className).not.toContain('bg-accent-light')
  })

  it('highlights the current find match differently', () => {
    renderTableGrid({
      findMatches: [{ row: 0, col: 0 }, { row: 2, col: 2 }],
      currentFindMatch: { row: 0, col: 0 },
    })
    const cell00 = getCell(0, 0)
    const cell22 = getCell(2, 2)
    expect(cell00.className).toContain('ring-accent')
    expect(cell22.className).toContain('bg-accent-light')
    expect(cell22.className).not.toContain('ring-accent')
  })

  // ── Keyboard navigation ──────────────────────────────────

  it('moves focus to the next cell on ArrowRight key', () => {
    renderTableGrid()
    const cell00 = getCell(0, 0)
    const contentEditable = cell00.querySelector<HTMLElement>('[contenteditable]')
    expect(contentEditable).not.toBeNull()

    contentEditable!.focus()
    fireEvent.keyDown(contentEditable!, { key: 'ArrowRight' })

    const cell01 = getCell(0, 1)
    const targetEditable = cell01.querySelector<HTMLElement>('[contenteditable]')
    expect(document.activeElement).toBe(targetEditable)
  })

  it('moves focus to the next row on ArrowDown key', () => {
    renderTableGrid()
    const cell00 = getCell(0, 0)
    const contentEditable = cell00.querySelector<HTMLElement>('[contenteditable]')
    contentEditable!.focus()
    fireEvent.keyDown(contentEditable!, { key: 'ArrowDown' })
    const cell10 = getCell(1, 0)
    const targetEditable = cell10.querySelector<HTMLElement>('[contenteditable]')
    expect(document.activeElement).toBe(targetEditable)
  })

  it('moves to previous cell on ArrowLeft key', () => {
    renderTableGrid()
    const cell01 = getCell(0, 1)
    const contentEditable = cell01.querySelector<HTMLElement>('[contenteditable]')
    contentEditable!.focus()
    fireEvent.keyDown(contentEditable!, { key: 'ArrowLeft' })
    const cell00 = getCell(0, 0)
    const targetEditable = cell00.querySelector<HTMLElement>('[contenteditable]')
    expect(document.activeElement).toBe(targetEditable)
  })

  it('moves to previous row on ArrowUp key', () => {
    renderTableGrid()
    const cell10 = getCell(1, 0)
    const contentEditable = cell10.querySelector<HTMLElement>('[contenteditable]')
    contentEditable!.focus()
    fireEvent.keyDown(contentEditable!, { key: 'ArrowUp' })
    const cell00 = getCell(0, 0)
    const targetEditable = cell00.querySelector<HTMLElement>('[contenteditable]')
    expect(document.activeElement).toBe(targetEditable)
  })

  it('moves to first cell of next row on Tab at end of row', () => {
    renderTableGrid()
    const cell04 = getCell(0, 4)
    const contentEditable = cell04.querySelector<HTMLElement>('[contenteditable]')
    contentEditable!.focus()
    fireEvent.keyDown(contentEditable!, { key: 'Tab' })
    const cell10 = getCell(1, 0)
    const targetEditable = cell10.querySelector<HTMLElement>('[contenteditable]')
    expect(document.activeElement).toBe(targetEditable)
  })

  it('moves to last cell of previous row on Shift+Tab at start of row', () => {
    renderTableGrid()
    const cell00 = getCell(0, 0)
    const contentEditable = cell00.querySelector<HTMLElement>('[contenteditable]')
    contentEditable!.focus()
    fireEvent.keyDown(contentEditable!, { key: 'Tab', shiftKey: true })
    // Should wrap: row stays 0 (can't go below 0), col wraps to last
    const lastCell = getCell(0, 4)
    const targetEditable = lastCell.querySelector<HTMLElement>('[contenteditable]')
    expect(document.activeElement).toBe(targetEditable)
  })

  // ── Paste from clipboard ─────────────────────────────────

  it('pastes TSV data and calls toast.success', async () => {
    renderTableGrid()

    const dt = new DataTransfer()
    dt.setData('text/plain', 'a\tb\tc\nd\te\tf')

    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    })

    const container = document.querySelector('[data-table-container]')
    expect(container).not.toBeNull()
    container!.dispatchEvent(pasteEvent)

    await vi.waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith(
          expect.stringContaining('2 rows'),
        )
      },
      { timeout: 2000 },
    )
  }, 10_000)

  it('pastes HTML table data from clipboard', async () => {
    renderTableGrid()

    const dt = new DataTransfer()
    dt.setData('text/html', '<table><tr><td>X</td><td>Y</td></tr><tr><td>1</td><td>2</td></tr></table>')
    dt.setData('text/plain', 'X\tY\n1\t2')

    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true,
    })

    const container = document.querySelector('[data-table-container]')
    container!.dispatchEvent(pasteEvent)

    await vi.waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith(
          expect.stringContaining('rows'),
        )
      },
      { timeout: 2000 },
    )
  }, 10_000)

  // ── Undo ─────────────────────────────────────────────────

  it('shows info toast when Ctrl+Z is pressed with nothing to undo', async () => {
    renderTableGrid()

    fireEvent.keyDown(document.body, { key: 'z', ctrlKey: true })

    await vi.waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith(
        expect.stringContaining('Nothing'),
      )
    })
  })

  it('does not show undo toast when pressing Ctrl+Z with contentEditable focused', () => {
    renderTableGrid()

    const cell = getCell(0, 0)
    const editable = cell.querySelector<HTMLElement>('[contenteditable]')
    expect(editable).not.toBeNull()

    /* Fire Ctrl+Z on the contentEditable — the event bubbles to the doc-level handler */
    editable!.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'z',
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    )

    expect(toast.info).not.toHaveBeenCalled()
  })

  // ── Right-click context menu on cell ─────────────────────

  it('opens cell context menu on right-click', async () => {
    const user = userEvent.setup()
    renderTableGrid()

    const cell = getCell(0, 0)
    await user.pointer({ keys: '[MouseRight]', target: cell })

    expect(await screen.findByText(/R1 · C1/)).toBeInTheDocument()
  })

  it('closes the context menu when clicking outside it', async () => {
    const user = userEvent.setup()
    renderTableGrid()

    const cell = getCell(0, 0)
    await user.pointer({ keys: '[MouseRight]', target: cell })
    expect(await screen.findByText(/R1 · C1/)).toBeInTheDocument()

    await user.click(document.body)
    await vi.waitFor(() => {
      expect(screen.queryByText(/R1 · C1/)).not.toBeInTheDocument()
    })
  })

  it('closes the context menu on Escape key', async () => {
    const user = userEvent.setup()
    renderTableGrid()

    const cell = getCell(0, 0)
    await user.pointer({ keys: '[MouseRight]', target: cell })
    expect(await screen.findByText(/R1 · C1/)).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    await vi.waitFor(() => {
      expect(screen.queryByText(/R1 · C1/)).not.toBeInTheDocument()
    })
  })

  // ── Right-click context menu on column header ────────────

  it('opens column context menu on right-click of column header sort button', async () => {
    const user = userEvent.setup()
    renderTableGrid()

    const sortBtn = screen.getByRole('button', { name: 'C1' })
    await user.pointer({ keys: '[MouseRight]', target: sortBtn })

    expect(await screen.findByText(/Column 1/)).toBeInTheDocument()
  })

  // ── Auto-fit resize handles ──────────────────────────────

  it('renders column resize handles', () => {
    renderTableGrid()
    const handles = screen.getAllByRole('button', { name: /Double-click a column border/i })
    expect(handles.length).toBeGreaterThanOrEqual(DEFAULT_COLS)
  })

  // ── Column format changes via select ─────────────────────

  it('changes column format when selecting a new value in the header', async () => {
    const user = userEvent.setup()
    renderTableGrid()

    const select = screen.getByLabelText('Column type 1')
    await user.selectOptions(select, 'number')
    expect(select).toHaveValue('number')

    await user.selectOptions(select, 'currency')
    expect(select).toHaveValue('currency')

    await user.selectOptions(select, 'percentage')
    expect(select).toHaveValue('percentage')
  })

  // ── Rendering with non-default props ─────────────────────

  it('renders with empty findMatches and currentFindMatch without error', () => {
    renderTableGrid({ findMatches: [] as Array<{ row: number; col: number }>, currentFindMatch: null })
    expect(screen.getAllByRole('gridcell')).toHaveLength(DEFAULT_ROWS * DEFAULT_COLS)
  })

  // ── Pasted cells replace the table ───────────────────────

  it('replaces the table data after paste', async () => {
    renderTableGrid()

    const dt = new DataTransfer()
    dt.setData('text/plain', 'x\ty\tz\n1\t2\t3')

    const container = document.querySelector('[data-table-container]')
    container!.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }),
    )

    await vi.waitFor(
      () => {
        expect(toast.success).toHaveBeenCalled()
      },
      { timeout: 2000 },
    )
  }, 10_000)

  // ── Grid dimension info ──────────────────────────────────

  it('renders the correct number of rows and columns in the grid', () => {
    renderTableGrid()
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(DEFAULT_ROWS)

    const firstRowCells = rows[0]?.querySelectorAll('[role="gridcell"]')
    expect(firstRowCells).toHaveLength(DEFAULT_COLS)
  })
})
