import { describe, expect, it } from 'vitest'
import { reducer } from '../../../context/TableReducer/TableReducer'
import { initialState } from '../../../context/TableState/TableState'
import { generateEmptyTable } from '../../../utils/tableUtils/tableUtils'

describe('TableReducer', () => {
  it('processes SET_CELLS action', () => {
    const cells = generateEmptyTable(3, 4)
    const next = reducer(initialState, { type: 'setCells', cells })
    expect(next.rows).toBe(3)
    expect(next.cols).toBe(4)
    expect(next.cells).toHaveLength(3)
    expect(next.cells[0]).toHaveLength(4)
  })

  it('processes UPDATE_CELL action', () => {
    const next = reducer(initialState, { type: 'updateCell', cellId: 'R0C0', value: 'test' })
    expect(next.cells[0][0].value).toBe('test')
  })

  it('processes ADD_ROW action', () => {
    const next = reducer(initialState, { type: 'addRow' })
    expect(next.rows).toBe(6)
    expect(next.cells).toHaveLength(6)
  })

  it('processes REMOVE_ROW action', () => {
    const next = reducer(initialState, { type: 'removeRow' })
    expect(next.rows).toBe(4)
    expect(next.cells).toHaveLength(4)
  })

  it('does not remove last row', () => {
    const singleRow = reducer(initialState, { type: 'generate', rows: 1, cols: 3 })
    const next = reducer(singleRow, { type: 'removeRow' })
    expect(next.rows).toBe(1)
  })

  it('processes ADD_COLUMN action', () => {
    const next = reducer(initialState, { type: 'addColumn' })
    expect(next.cols).toBe(6)
    expect(next.cells[0]).toHaveLength(6)
  })

  it('processes REMOVE_COLUMN action', () => {
    const next = reducer(initialState, { type: 'removeColumn' })
    expect(next.cols).toBe(4)
    expect(next.cells[0]).toHaveLength(4)
  })

  it('processes CLEAR_ALL action', () => {
    const filled = reducer(initialState, { type: 'updateCell', cellId: 'R0C0', value: 'data' })
    expect(filled.cells[0][0].value).toBe('data')
    const next = reducer(filled, { type: 'clearAll' })
    expect(next.cells[0][0].value).toBe('')
  })

  it('processes SET_HEADER_STYLE action', () => {
    const next = reducer(initialState, { type: 'setHeaderStyle', headerStyle: 'first-row' })
    expect(next.headerStyle).toBe('first-row')
  })

  it('processes SET_HEADER_COLOR action', () => {
    const next = reducer(initialState, { type: 'setHeaderColor', color: '#ff0000' })
    expect(next.headerColor).toBe('#ff0000')
  })

  it('processes SET_COLUMN_WIDTH action', () => {
    const next = reducer(initialState, { type: 'setColumnWidth', col: 0, width: 200 })
    expect(next.columnWidths[0]).toBe(200)
  })

  it('processes SET_ROW_HEIGHT action', () => {
    const next = reducer(initialState, { type: 'setRowHeight', row: 0, height: 100 })
    expect(next.rowHeights[0]).toBe(100)
  })

  it('processes GENERATE action', () => {
    const next = reducer(initialState, { type: 'generate', rows: 3, cols: 7 })
    expect(next.rows).toBe(3)
    expect(next.cols).toBe(7)
    expect(next.cells).toHaveLength(3)
    expect(next.cells[0]).toHaveLength(7)
  })

  it('clamps generate to MAX bounds', () => {
    const next = reducer(initialState, { type: 'generate', rows: 999, cols: 999 })
    expect(next.rows).toBeLessThanOrEqual(50)
    expect(next.cols).toBeLessThanOrEqual(20)
  })

  it('rejects addRow when at MAX_ROWS', () => {
    const big = reducer(initialState, { type: 'generate', rows: 50, cols: 5 })
    const next = reducer(big, { type: 'addRow' })
    expect(next.rows).toBe(50)
  })

  it('processes SET_FREEZE_ROW action', () => {
    const next = reducer(initialState, { type: 'setFreezeRow', freeze: true })
    expect(next.freezeRow).toBe(true)
  })

  it('returns state unchanged for unknown action type', () => {
    const next = reducer(initialState, { type: 'UNKNOWN' } as never)
    expect(next).toBe(initialState)
  })
})
