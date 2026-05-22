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
