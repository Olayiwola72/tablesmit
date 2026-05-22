import { describe, it, expect } from 'vitest'
import { cellsToLatex } from '../../../utils/latexUtils'
import type { CellData } from '../../../types/table'

function cell(id: string, value: string, overrides: Partial<CellData> = {}): CellData {
  return {
    id,
    value,
    colSpan: 1,
    rowSpan: 1,
    isMerged: false,
    isHidden: false,
    ...overrides,
  }
}

describe('cellsToLatex', () => {
  it('returns empty string for empty cells array', () => {
    expect(cellsToLatex([])).toBe('')
  })

  it('returns empty string for cells with empty first row', () => {
    expect(cellsToLatex([[]])).toBe('')
  })

  it('produces correct tabular for 2x2 table', () => {
    const cells: CellData[][] = [
      [cell('R0C0', 'Name'), cell('R0C1', 'Age')],
      [cell('R1C0', 'Alice'), cell('R1C1', '30')],
    ]
    const result = cellsToLatex(cells)
    expect(result).toContain('\\begin{tabular}{|l|l|}')
    expect(result).toContain('\\end{tabular}')
    expect(result).toContain('Name & Age')
    expect(result).toContain('Alice & 30')
  })

  it('applies \\textbf{} to first row when headerStyle is first-row', () => {
    const cells: CellData[][] = [
      [cell('R0C0', 'Name'), cell('R0C1', 'Age')],
      [cell('R1C0', 'Alice'), cell('R1C1', '30')],
    ]
    const result = cellsToLatex(cells, 'first-row')
    expect(result).toContain('\\textbf{Name} & \\textbf{Age}')
    expect(result).not.toContain('\\textbf{Alice}')
  })

  it('does not bold headers when headerStyle is not first-row', () => {
    const cells: CellData[][] = [
      [cell('R0C0', 'Name'), cell('R0C1', 'Age')],
      [cell('R1C0', 'Alice'), cell('R1C1', '30')],
    ]
    const result = cellsToLatex(cells, 'first-column')
    expect(result).not.toContain('\\textbf{Name}')
  })

  it('escapes special LaTeX characters', () => {
    const cells: CellData[][] = [
      [cell('R0C0', '100%'), cell('R0C1', '$10')],
    ]
    const result = cellsToLatex(cells)
    expect(result).toContain('100\\%')
    expect(result).toContain('\\$10')
  })

  it('escapes & characters in cell values', () => {
    const cells: CellData[][] = [
      [cell('R0C0', 'Rock & Roll')],
    ]
    const result = cellsToLatex(cells)
    expect(result).toContain('Rock \\& Roll')
  })

  it('escapes underscore characters', () => {
    const cells: CellData[][] = [
      [cell('R0C0', 'a_b')],
    ]
    const result = cellsToLatex(cells)
    expect(result).toContain('a\\_b')
  })

  it('filters out hidden cells', () => {
    const cells: CellData[][] = [
      [cell('R0C0', 'Visible'), cell('R0C1', 'Hidden', { isHidden: true })],
      [cell('R1C0', 'Data'), cell('R1C1', '', { isHidden: true })],
    ]
    const result = cellsToLatex(cells)
    expect(result).toContain('Visible \\\\')
    expect(result).not.toContain('Hidden')
  })

  it('replaces empty values with a space', () => {
    const cells: CellData[][] = [
      [cell('R0C0', ''), cell('R0C1', 'Value')],
    ]
    const result = cellsToLatex(cells)
    expect(result).toMatch(/ \.?.? & Value/)
  })
})
