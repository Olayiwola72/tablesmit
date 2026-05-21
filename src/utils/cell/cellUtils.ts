import type { CellCoordinate } from './cellUtils.types'

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
