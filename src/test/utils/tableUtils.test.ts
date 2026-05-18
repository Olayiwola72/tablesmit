import { describe, expect, it } from 'vitest'
import {
  addColumn,
  addRow,
  createCell,
  generateEmptyTable,
  normalizeTableData,
  removeColumn,
  removeRow,
  sortRows,
  updateCellValue,
  updateColumnFormat,
} from '../../utils/tableUtils'

describe('createCell', () => {
  it('creates a CellData with the correct ID and defaults', () => {
    const cell = createCell(2, 3)
    expect(cell.id).toBe('R2C3')
    expect(cell.value).toBe('')
    expect(cell.colSpan).toBe(1)
    expect(cell.rowSpan).toBe(1)
    expect(cell.isMerged).toBe(false)
    expect(cell.isHidden).toBe(false)
    expect(cell.format).toBe('text')
  })

  it('accepts an initial value', () => {
    expect(createCell(0, 0, 'hello').value).toBe('hello')
  })
})

describe('generateEmptyTable', () => {
  it('creates the correct row and column counts', () => {
    const t = generateEmptyTable(3, 5)
    expect(t).toHaveLength(3)
    expect(t[0]).toHaveLength(5)
    expect(t[2]).toHaveLength(5)
  })

  it('initialises every cell with an empty string value', () => {
    const t = generateEmptyTable(2, 2)
    expect(t[0][0].value).toBe('')
    expect(t[1][1].value).toBe('')
  })

  it('assigns IDs in R{row}C{col} format', () => {
    const t = generateEmptyTable(2, 3)
    expect(t[0][0].id).toBe('R0C0')
    expect(t[0][1].id).toBe('R0C1')
    expect(t[1][2].id).toBe('R1C2')
  })

  it('returns empty array for 0 rows', () => {
    expect(generateEmptyTable(0, 5)).toHaveLength(0)
  })

  it('returns an array with 0-length rows for 0 cols', () => {
    expect(generateEmptyTable(3, 0)[0]).toHaveLength(0)
  })
})

describe('normalizeTableData', () => {
  it('fills values from partial data', () => {
    const result = normalizeTableData([['a', 'b'], ['c']], 2, 3)
    expect(result[0][0].value).toBe('a')
    expect(result[0][1].value).toBe('b')
    expect(result[0][2].value).toBe('')
    expect(result[1][0].value).toBe('c')
    expect(result[1][1].value).toBe('')
    expect(result[1][2].value).toBe('')
  })

  it('creates rows larger than the provided data', () => {
    const result = normalizeTableData([], 3, 2)
    expect(result).toHaveLength(3)
    expect(result[0][0].value).toBe('')
  })
})

describe('addRow', () => {
  it('appends one new row to the bottom', () => {
    const t = generateEmptyTable(2, 3)
    const result = addRow(t)
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveLength(3)
    expect(result[2]).toHaveLength(3)
  })

  it('does not mutate the original', () => {
    const t = generateEmptyTable(2, 3)
    addRow(t)
    expect(t).toHaveLength(2)
  })
})

describe('removeRow', () => {
  it('removes the last row', () => {
    expect(removeRow(generateEmptyTable(3, 3))).toHaveLength(2)
  })

  it('does not remove the last remaining row', () => {
    expect(removeRow(generateEmptyTable(1, 3))).toHaveLength(1)
  })
})

describe('addColumn', () => {
  it('appends a column to every row', () => {
    const t = generateEmptyTable(3, 2)
    const result = addColumn(t)
    expect(result[0]).toHaveLength(3)
    expect(result[1]).toHaveLength(3)
    expect(result[2]).toHaveLength(3)
  })
})

describe('removeColumn', () => {
  it('removes the last column from every row', () => {
    const t = generateEmptyTable(3, 3)
    const result = removeColumn(t)
    result.forEach((row) => expect(row).toHaveLength(2))
  })

  it('does not remove the last remaining column', () => {
    const t = generateEmptyTable(3, 1)
    expect(removeColumn(t)[0]).toHaveLength(1)
  })
})

describe('updateCellValue', () => {
  it('updates a specific cell by ID', () => {
    const t = generateEmptyTable(2, 2)
    const result = updateCellValue(t, 'R1C1', 'updated')
    expect(result[1][1].value).toBe('updated')
    expect(result[0][0].value).toBe('')
  })

  it('does not mutate the original', () => {
    const t = generateEmptyTable(2, 2)
    updateCellValue(t, 'R0C0', 'changed')
    expect(t[0][0].value).toBe('')
  })
})

describe('updateColumnFormat', () => {
  it('updates the format of every cell in a column', () => {
    const t = generateEmptyTable(3, 4)
    const result = updateColumnFormat(t, 2, 'currency')
    result.forEach((row) => {
      expect(row[2].format).toBe('currency')
      expect(row[0].format).toBe('text')
    })
  })
})

describe('sortRows', () => {
  function tableWithValues(values: string[][]): ReturnType<typeof generateEmptyTable> {
    return values.map((row, rowIndex) =>
      row.map((value, colIndex) => createCell(rowIndex, colIndex, value)),
    )
  }

  it('sorts string column ascending alphabetically', () => {
    const rows = tableWithValues([['b'], ['a'], ['c']])
    const sorted = sortRows(rows, 0, 'asc')
    expect(sorted.map((row) => row[0].value)).toEqual(['a', 'b', 'c'])
  })

  it('sorts numeric column numerically', () => {
    const rows = tableWithValues([['10'], ['2'], ['1']])
    const sorted = sortRows(rows, 0, 'asc')
    expect(sorted.map((row) => row[0].value)).toEqual(['1', '2', '10'])
  })

  it('places empty cells at the bottom regardless of direction', () => {
    const rows = tableWithValues([[''], ['b'], ['a']])
    const sorted = sortRows(rows, 0, 'asc')
    expect(sorted.map((row) => row[0].value)).toEqual(['a', 'b', ''])
  })

  it('does not mutate the original rows array', () => {
    const rows = tableWithValues([['b'], ['a']])
    const original = rows.map((row) => row[0].value)
    sortRows(rows, 0, 'asc')
    expect(rows.map((row) => row[0].value)).toEqual(original)
  })
})
