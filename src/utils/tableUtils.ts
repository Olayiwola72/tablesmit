import type { CellData, ColumnFormat } from '../types/table.types'
import { buildCellId } from './cellUtils'

export function createCell(row: number, col: number, value = ''): CellData {
  return {
    id: buildCellId(row, col),
    value,
    colSpan: 1,
    rowSpan: 1,
    isMerged: false,
    isHidden: false,
    format: 'text',
  }
}

export function generateEmptyTable(rows: number, cols: number): CellData[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => createCell(row, col)),
  )
}

export function normalizeTableData(data: string[][], rows: number, cols: number): CellData[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => createCell(row, col, data[row]?.[col] ?? '')),
  )
}

export function addRow(cells: CellData[][]): CellData[][] {
  const colCount = cells[0]?.length ?? 1
  const nextRowIndex = cells.length
  return [...cells, Array.from({ length: colCount }, (_, col) => createCell(nextRowIndex, col))]
}

export function removeRow(cells: CellData[][]): CellData[][] {
  return cells.length <= 1 ? cells : cells.slice(0, -1)
}

export function addColumn(cells: CellData[][]): CellData[][] {
  return cells.map((row, rowIndex) => [...row, createCell(rowIndex, row.length)])
}

export function removeColumn(cells: CellData[][]): CellData[][] {
  if ((cells[0]?.length ?? 0) <= 1) return cells
  return cells.map((row) => row.slice(0, -1))
}

export function updateCellValue(cells: CellData[][], cellId: string, value: string): CellData[][] {
  return cells.map((row) =>
    row.map((cell) => (cell.id === cellId ? { ...cell, value } : cell)),
  )
}

export function updateColumnFormat(
  cells: CellData[][],
  col: number,
  format: ColumnFormat,
): CellData[][] {
  return cells.map((row) =>
    row.map((cell, colIndex) => (colIndex === col ? { ...cell, format } : cell)),
  )
}

export function sortRows(
  rows: CellData[][],
  colIndex: number,
  direction: 'asc' | 'desc',
): CellData[][] {
  return [...rows].sort((rowA, rowB) => {
    const aVal = rowA[colIndex]?.value ?? ''
    const bVal = rowB[colIndex]?.value ?? ''
    if (aVal === '') return 1
    if (bVal === '') return -1

    const aNum = parseFloat(aVal)
    const bNum = parseFloat(bVal)
    const isNumeric = !Number.isNaN(aNum) && !Number.isNaN(bNum)
    const compared = isNumeric ? aNum - bNum : aVal.localeCompare(bVal)
    return direction === 'asc' ? compared : -compared
  })
}
