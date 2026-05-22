import type { CellData, ColumnFormat } from '../../types/table'
import { buildCellId } from '../cell/cellUtils'

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

export function insertRowAt(cells: CellData[][], index: number): CellData[][] {
  const colCount = cells[0]?.length ?? 1
  const newRow = Array.from({ length: colCount }, (_, col) => createCell(index, col))
  const next = [...cells]
  next.splice(index, 0, newRow)
  return next.map((row, ri) =>
    row.map((cell, ci) => (ri >= index ? { ...cell, id: buildCellId(ri, ci) } : cell)),
  )
}

export function deleteRowAt(cells: CellData[][], index: number): CellData[][] {
  if (cells.length <= 1) return cells
  return cells.filter((_, i) => i !== index).map((row, ri) =>
    row.map((cell, ci) => ({ ...cell, id: buildCellId(ri, ci) })),
  )
}

export function insertColAt(cells: CellData[][], index: number): CellData[][] {
  return cells.map((row, ri) => {
    const next = [...row]
    next.splice(index, 0, createCell(ri, index))
    return next.map((cell, ci) => ({ ...cell, id: buildCellId(ri, ci) }))
  })
}

export function deleteColAt(cells: CellData[][], index: number): CellData[][] {
  if ((cells[0]?.length ?? 0) <= 1) return cells
  return cells.map((row, ri) =>
    row.filter((_, ci) => ci !== index).map((cell, ci) => ({ ...cell, id: buildCellId(ri, ci) })),
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

export function isTableEmpty(cells: CellData[][]): boolean {
  return cells.every(row => row.every(cell => !cell.value.trim()))
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
