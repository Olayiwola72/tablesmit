import type { CellCoordinate } from './cellUtils.types'
import type { HeaderStyle } from '../../types/table'

export function buildCellId(row: number, col: number): string {
  return `R${row}C${col}`
}

export function parseCellId(cellId: string): CellCoordinate {
  const match = /^R(\d+)C(\d+)$/.exec(cellId)
  if (!match) {
    throw new Error(`Invalid cell id: ${cellId}`)
  }

  return {
    row: Number(match[1]),
    col: Number(match[2]),
  }
}

export function isHeaderCell(headerStyle: HeaderStyle, row: number, col: number, colSpan = 1): boolean {
  if (headerStyle === 'both') return row === 0 || (col === 0 && colSpan === 1)
  if (headerStyle === 'first-row') return row === 0
  if (headerStyle === 'first-column') return col === 0 && colSpan === 1
  return false
}
