import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MAX_COLS, MAX_ROWS } from '../../../config/table/tableDefaults'
import { useClipboardPaste } from '../../../hooks/useClipboardPaste/useClipboardPaste'

describe('useClipboardPaste', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns pasting false initially', () => {
    const setCells = vi.fn()
    const { result } = renderHook(() => useClipboardPaste(setCells))
    expect(result.current.pasting).toBe(false)
  })

  it('adds and removes paste event listener', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const setCells = vi.fn()

    const { unmount } = renderHook(() => useClipboardPaste(setCells))
    expect(addSpy).toHaveBeenCalledWith('paste', expect.any(Function))

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('paste', expect.any(Function))
  })

  it('ignores paste inside contenteditable', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    const event = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true,
    })
    editable.dispatchEvent(event)
    expect(setCells).not.toHaveBeenCalled()
    document.body.removeChild(editable)
  })

  it('parses LaTeX tabular from plain text clipboard', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const latex = `\\begin{tabular}{|l|l|}
\\hline
Name & Age \\\\
\\hline
Alice & 30 \\\\
\\hline
\\end{tabular}`

    const data = new DataTransfer()
    data.setData('text/plain', latex)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells[0][0].value).toBe('Name')
    expect(cells[0][1].value).toBe('Age')
    expect(cells[1][0].value).toBe('Alice')
    expect(cells[1][1].value).toBe('30')
  })

  it('parses LaTeX tabular with \\textbf headers', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const latex = `\\begin{tabular}{|l|l|}
\\hline
\\textbf{Product} & \\textbf{Price} \\\\
\\hline
Widget & 9.99 \\\\
\\hline
\\end{tabular}`

    const data = new DataTransfer()
    data.setData('text/plain', latex)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells[0][0].value).toBe('Product')
    expect(cells[0][1].value).toBe('Price')
  })

  it('parses a Markdown table from plain text clipboard', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const md = [
      '| Product | Price | Qty |',
      '|---------|-------|-----|',
      '| Widget  | 9.99  | 5   |',
      '| Gadget  | 14.99 | 3   |',
    ].join('\n')

    const data = new DataTransfer()
    data.setData('text/plain', md)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(3)
    expect(cells[0]).toHaveLength(3)
    expect(cells[0][0].value).toBe('Product')
    expect(cells[0][1].value).toBe('Price')
    expect(cells[0][2].value).toBe('Qty')
    expect(cells[1][0].value).toBe('Widget')
    expect(cells[1][1].value).toBe('9.99')
    expect(cells[1][2].value).toBe('5')
    expect(cells[2][0].value).toBe('Gadget')
    expect(cells[2][1].value).toBe('14.99')
    expect(cells[2][2].value).toBe('3')
  })

  it('parses Markdown table with alignment colons', async () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const md = [
      '| Left | Center | Right |',
      '|:-----|:------:|------:|',
      '| A    | B      | C     |',
    ].join('\n')

    const data = new DataTransfer()
    data.setData('text/plain', md)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    await vi.waitFor(() => {
      expect(setCells).toHaveBeenCalled()
    })

    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(2)
    expect(cells[0][0].value).toBe('Left')
    expect(cells[0][1].value).toBe('Center')
    expect(cells[0][2].value).toBe('Right')
    expect(cells[1][0].value).toBe('A')
  })

  it('falls through to TSV/CSV when Markdown has no pipe-separator line', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const data = new DataTransfer()
    data.setData('text/plain', 'just some text without a table')

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    expect(setCells).not.toHaveBeenCalled()
  })

  it('falls through to TSV/CSV when LaTeX is not tabular', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const data = new DataTransfer()
    data.setData('text/plain', 'plain text without latex')

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    expect(setCells).not.toHaveBeenCalled()
  })

  it('clamps large clipboard tables before setting cells', () => {
    const setCells = vi.fn()
    renderHook(() => useClipboardPaste(setCells))

    const data = new DataTransfer()
    const text = Array.from({ length: MAX_ROWS + 10 }, (_, row) =>
      Array.from({ length: MAX_COLS + 5 }, (_, col) => `${row}:${col}`).join('\t'),
    ).join('\n')
    data.setData('text/plain', text)

    document.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
    }))

    const cells = setCells.mock.calls[0][0]
    expect(cells).toHaveLength(MAX_ROWS)
    expect(cells[0]).toHaveLength(MAX_COLS)
  })
})
