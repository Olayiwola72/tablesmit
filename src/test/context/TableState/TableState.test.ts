import { describe, expect, it } from 'vitest'
import { initialState, STORAGE_KEY, SESSION_KEY } from '../../../context/TableState/TableState'

describe('TableState', () => {
  it('initialState has 5 rows and 5 columns', () => {
    expect(initialState.rows).toBe(5)
    expect(initialState.cols).toBe(5)
    expect(initialState.cells).toHaveLength(5)
    expect(initialState.cells[0]).toHaveLength(5)
  })

  it('initialState has no merged ranges', () => {
    expect(initialState.mergedRanges).toEqual([])
  })

  it('initialState has null selection', () => {
    expect(initialState.selectedRange).toBeNull()
  })

  it('initialState has default header style of first-row', () => {
    expect(initialState.headerStyle).toBe('first-row')
  })

  it('initialState cell values are empty strings', () => {
    expect(initialState.cells[0][0].value).toBe('')
    expect(initialState.cells[2][3].value).toBe('')
  })

  it('initialState cell IDs follow R{row}C{col} format', () => {
    expect(initialState.cells[0][0].id).toBe('R0C0')
    expect(initialState.cells[1][2].id).toBe('R1C2')
    expect(initialState.cells[4][4].id).toBe('R4C4')
  })

  it('initialState has default theme', () => {
    expect(initialState.theme).toBe('default')
  })

  it('initialState has freezeRow and freezeCol set to false', () => {
    expect(initialState.freezeRow).toBe(false)
    expect(initialState.freezeCol).toBe(false)
  })

  it('STORAGE_KEY is set', () => {
    expect(STORAGE_KEY).toBe('tablesmit-state')
  })

  it('SESSION_KEY is set', () => {
    expect(SESSION_KEY).toBe('tablesmit-session')
  })

  it('columnWidths matches column count', () => {
    expect(initialState.columnWidths).toHaveLength(initialState.cols)
  })

  it('rowHeights matches row count', () => {
    expect(initialState.rowHeights).toHaveLength(initialState.rows)
  })
})
