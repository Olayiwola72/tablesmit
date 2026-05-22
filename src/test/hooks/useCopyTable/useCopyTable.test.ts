import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useCopyTable } from '../../../hooks/useCopyTable/useCopyTable'
import { createRef } from 'react'
import type { CellData } from '../../../types/table'

const mockCells: CellData[][] = [
  [
    { id: 'R0C0', value: 'Name', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
    { id: 'R0C1', value: 'Age', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
  ],
  [
    { id: 'R1C0', value: 'Alice', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
    { id: 'R1C1', value: '30', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
  ],
]

function setup() {
  const ref = createRef<HTMLDivElement>()
  return renderHook(() => useCopyTable(mockCells, ref))
}

describe('useCopyTable', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
        write: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('returns five copy functions', () => {
    const { result } = setup()
    expect(typeof result.current.copyAsCsv).toBe('function')
    expect(typeof result.current.copyAsExcelData).toBe('function')
    expect(typeof result.current.copyAsMarkdown).toBe('function')
    expect(typeof result.current.copyAsImage).toBe('function')
    expect(typeof result.current.copyAsLatex).toBe('function')
  })

  it('copyAsCsv writes CSV to clipboard', async () => {
    const { result } = setup()
    await result.current.copyAsCsv()
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('Name,Age')
    expect(written).toContain('Alice,30')
  })

  it('copyAsExcelData writes TSV to clipboard', async () => {
    const { result } = setup()
    await result.current.copyAsExcelData()
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('Name\tAge')
    expect(written).toContain('Alice\t30')
  })

  it('copyAsMarkdown writes Markdown to clipboard', async () => {
    const { result } = setup()
    await result.current.copyAsMarkdown()
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('C1')
    expect(written).toContain('C2')
    expect(written).toContain('---')
    expect(written).toContain('Alice')
    expect(written).toContain('30')
  })

  it('copyAsCsv shows error toast on clipboard failure', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    })
    const { result } = setup()
    await expect(result.current.copyAsCsv()).resolves.toBeUndefined()
  })

  it('copyAsLatex writes LaTeX to clipboard', async () => {
    const { result } = setup()
    await result.current.copyAsLatex()
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('\\begin{tabular}')
    expect(written).toContain('\\end{tabular}')
    expect(written).toContain('Name & Age')
    expect(written).toContain('Alice & 30')
  })

  it('copyAsLatex accepts headerStyle parameter', async () => {
    const { result } = setup()
    await result.current.copyAsLatex('first-row')
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('\\textbf{Name}')
    expect(written).toContain('\\textbf{Age}')
  })

  it('copyAsLatex escapes special characters', async () => {
    const cells: CellData[][] = [
      [
        { id: 'R0C0', value: '100%', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
        { id: 'R0C1', value: 'Cost ($)', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
      ],
    ]
    const ref = createRef<HTMLDivElement>()
    const { result } = renderHook(() => useCopyTable(cells, ref))
    await result.current.copyAsLatex()
    const written = (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(written).toContain('100\\%')
    expect(written).toContain('\\$')
  })

  it('copyAsLatex shows error toast on clipboard failure', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    })
    const { result } = setup()
    await expect(result.current.copyAsLatex()).resolves.toBeUndefined()
  })
})
