import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { LatexExporter } from '../../../../services/exportService/impl/latexExporter'
import type { CellData } from '../../../../types/table'
import type { ExportStyleOptions } from '../../../../services/exportService/export.types'

const mockDownloadUrl = vi.hoisted(() => vi.fn())
vi.mock('../../../../services/exportService/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../services/exportService/utils')>()
  return { ...actual, downloadUrl: mockDownloadUrl }
})

function makeCell(value: string, overrides: Partial<CellData> = {}): CellData {
  return { id: 'R0C0', value, colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false, ...overrides }
}

function el(): HTMLElement {
  return document.createElement('div')
}

describe('LatexExporter', () => {
  let capturedBlob: Blob | MediaSource | null

  beforeEach(() => {
    vi.clearAllMocks()
    capturedBlob = null
    vi.spyOn(URL, 'createObjectURL').mockImplementation((blob: Blob | MediaSource) => {
      capturedBlob = blob
      return 'blob:mock-url'
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  async function getResult(): Promise<string> {
    if (!capturedBlob) return ''
    const blob = capturedBlob instanceof Blob ? capturedBlob : new Blob()
    return blob.text()
  }

  it('produces a valid tabular environment', async () => {
    const cells: CellData[][] = [
      [makeCell('Name'), makeCell('Age')],
      [makeCell('Alice'), makeCell('30')],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    expect(result).toContain('\\begin{tabular}')
    expect(result).toContain('\\end{tabular}')
  })

  it('wraps header row cells in \\textbf{}', async () => {
    const cells: CellData[][] = [
      [makeCell('Name'), makeCell('Age')],
      [makeCell('Alice'), makeCell('30')],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells, headerStyle: 'first-row' })
    const result = await getResult()
    expect(result).toContain('\\textbf{Name}')
    expect(result).toContain('\\textbf{Age}')
    expect(result).not.toContain('\\textbf{Alice}')
  })

  it('separates cells with & and ends rows with \\\\', async () => {
    const cells: CellData[][] = [
      [makeCell('A'), makeCell('B')],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    expect(result).toContain('A & B \\\\')
  })

  it('includes \\hline when borderStyle is solid', async () => {
    const cells: CellData[][] = [[makeCell('x')]]
    await new LatexExporter().export(el(), {
      format: 'latex', cells,
      styles: { borderStyle: 'solid' } as ExportStyleOptions,
    })
    const result = await getResult()
    const hlines = result.match(/\\hline/g)?.length ?? 0
    expect(hlines).toBeGreaterThanOrEqual(2)
  })

  it('omits \\hline when borderStyle is none', async () => {
    const cells: CellData[][] = [[makeCell('x')]]
    await new LatexExporter().export(el(), {
      format: 'latex', cells,
      styles: { borderStyle: 'none' } as ExportStyleOptions,
    })
    const result = await getResult()
    expect(result).not.toContain('\\hline')
  })

  it('includes vertical bars in column spec when borderStyle is solid', async () => {
    const cells: CellData[][] = [[makeCell('a'), makeCell('b')]]
    await new LatexExporter().export(el(), {
      format: 'latex', cells,
      styles: { borderStyle: 'solid' } as ExportStyleOptions,
    })
    const result = await getResult()
    expect(result).toContain('{|l|l|}')
  })

  it('omits vertical bars when borderStyle is none', async () => {
    const cells: CellData[][] = [[makeCell('a'), makeCell('b')]]
    await new LatexExporter().export(el(), {
      format: 'latex', cells,
      styles: { borderStyle: 'none' } as ExportStyleOptions,
    })
    const result = await getResult()
    expect(result).toContain('{ll}')
  })

  it('includes \\caption{} when caption is provided', async () => {
    const cells: CellData[][] = [[makeCell('x')]]
    await new LatexExporter().export(el(), {
      format: 'latex', cells, caption: 'My Table',
    })
    const result = await getResult()
    expect(result).toContain('\\caption{My Table}')
    expect(result).toContain('\\begin{table}')
    expect(result).toContain('\\end{table}')
  })

  it('does not wrap in table environment when caption is absent', async () => {
    const cells: CellData[][] = [[makeCell('x')]]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    expect(result).not.toContain('\\begin{table}')
    expect(result).not.toContain('\\end{table}')
  })

  it('escapes special LaTeX characters', async () => {
    const cells: CellData[][] = [[makeCell('$100 & more_')]]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    expect(result).toContain('\\$100 \\& more\\_')
  })

  it('emits empty placeholder for hidden cells to preserve column count', async () => {
    const cells: CellData[][] = [
      [makeCell('A'), makeCell('B', { isHidden: true }), makeCell('C')],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    expect(result).toContain('A &  & C \\\\')
  })

  it('uses \\multicolumn for cells with colSpan > 1', async () => {
    const cells: CellData[][] = [
      [makeCell('Span', { colSpan: 2 }), makeCell('C')],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    expect(result).toContain('\\multicolumn{2}')
  })

  it('uses \\multirow for cells with rowSpan > 1', async () => {
    const cells: CellData[][] = [
      [makeCell('A', { rowSpan: 2 }), makeCell('B')],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    expect(result).toContain('\\multirow{2}')
  })

  it('respects column alignment via styles.columnTextAlign', async () => {
    const cells: CellData[][] = [[makeCell('a'), makeCell('b')]]
    await new LatexExporter().export(el(), {
      format: 'latex', cells,
      styles: { columnTextAlign: ['center', 'right'], borderStyle: 'none' } as ExportStyleOptions,
    })
    const result = await getResult()
    expect(result).toContain('{cr}')
  })

  it('preserves column count under rowspan via empty placeholders', async () => {
    const cells: CellData[][] = [
      [makeCell('A', { rowSpan: 2 }), makeCell('B'), makeCell('C')],
      [makeCell('', { isHidden: true }), makeCell('D'), makeCell('E')],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    const lines = result.split('\n').filter(l => l.includes('\\\\'))
    // Row 0: multirow + 2 normal cells
    expect(lines[0]).toContain('\\multirow{2}')
    expect(lines[0]).toContain('B')
    expect(lines[0]).toContain('C')
    // Row 1: empty placeholder (hidden) + 2 normal cells = 3 columns
    expect(lines[1]).toMatch(/^\s*& D & E/)
  })

  it('skips colspan-covered hidden cells to avoid extra separators', async () => {
    const cells: CellData[][] = [
      [
        makeCell('A', { colSpan: 3 }),
        makeCell('', { isHidden: true }),
        makeCell('', { isHidden: true }),
        makeCell('B'),
      ],
    ]
    await new LatexExporter().export(el(), { format: 'latex', cells })
    const result = await getResult()
    const line = result.split('\n').find(l => l.includes('\\\\')) ?? ''
    // \multicolumn{3} should consume cols 0-2, then col 3 standalone → 2 entries
    const parts = line.split('\\\\')[0].split('&')
    expect(parts).toHaveLength(2)
    expect(parts[0].trim()).toContain('\\multicolumn{3}')
  })

  it('uses default filename tablesmit-table.tex when none provided', () => {
    const cells: CellData[][] = [[makeCell('x')]]
    new LatexExporter().export(el(), { format: 'latex', cells })
    expect(mockDownloadUrl).toHaveBeenCalledWith(expect.any(String), 'tablesmit-table.tex')
  })

  it('uses custom filename with .tex extension', () => {
    const cells: CellData[][] = [[makeCell('x')]]
    new LatexExporter().export(el(), { format: 'latex', cells, filename: 'my-table' })
    expect(mockDownloadUrl).toHaveBeenCalledWith(expect.any(String), 'my-table.tex')
  })

  it('handles empty cells gracefully', async () => {
    await new LatexExporter().export(el(), { format: 'latex' })
    const result = await getResult()
    expect(result).toContain('% Empty table')
  })

  it('handles empty cells array gracefully', async () => {
    await new LatexExporter().export(el(), { format: 'latex', cells: [] })
    const result = await getResult()
    expect(result).toContain('% Empty table')
  })
})
