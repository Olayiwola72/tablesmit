import { describe, expect, it } from 'vitest'
import { reducer } from '../../../context/TableReducer/TableReducer'
import { initialState } from '../../../context/TableState/TableState'
import { TABLE_THEMES } from '../../../config/table/tableThemes/tableThemes'
import { generateEmptyTable } from '../../../utils/tableUtils/tableUtils'
import type { PresetDefinition } from '../../../config/table/presets/presets.types'
import type { ColumnFormat } from '../../../config/columnFormats/columnFormats.types'

describe('TableReducer', () => {
  it('processes SET_CELLS action', () => {
    const cells = generateEmptyTable(3, 4)
    const next = reducer(initialState, { type: 'setCells', cells })
    expect(next.rows).toBe(3)
    expect(next.cols).toBe(4)
    expect(next.cells).toHaveLength(3)
    expect(next.cells[0]).toHaveLength(4)
  })

  it('setCells resets headerStyle, headerColor and theme', () => {
    const styled = reducer(initialState, { type: 'setHeaderStyle', headerStyle: 'none' })
    const colored = reducer(styled, { type: 'setHeaderColor', color: '#ff0000' })
    const dark = reducer(colored, { type: 'setTheme', theme: 'dark-header' })
    expect(dark.headerStyle).toBe('first-row')
    expect(dark.headerColor).toBe('#1E293B')
    expect(dark.theme).toBe('dark-header')
    const cells = generateEmptyTable(3, 3)
    const next = reducer(dark, { type: 'setCells', cells })
    expect(next.headerStyle).toBe('first-row')
    expect(next.headerColor).not.toBe('#ff0000')
  })

  it('setCells resets cellTextColors', () => {
    const colored = reducer(initialState, { type: 'setCellTextColor', cellId: 'R0C0', color: '#ff0000' })
    expect(colored.cellTextColors).toEqual({ R0C0: '#ff0000' })
    const cells = generateEmptyTable(3, 3)
    const next = reducer(colored, { type: 'setCells', cells })
    expect(next.cellTextColors).toEqual({})
  })

  it('setCells clears caption', () => {
    const withCaption = reducer(initialState, { type: 'setCaption', caption: 'My Table' })
    expect(withCaption.caption).toBe('My Table')
    const cells = generateEmptyTable(3, 3)
    const next = reducer(withCaption, { type: 'setCells', cells })
    expect(next.caption).toBe('')
  })

  it('setCells resets mergedRanges and selectedRange', () => {
    const cells = generateEmptyTable(3, 3)
    const next = reducer(initialState, { type: 'setCells', cells })
    expect(next.mergedRanges).toEqual([])
    expect(next.selectedRange).toBeNull()
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

  it('generate clears header cell values', () => {
    const withHeaders = reducer(initialState, { type: 'updateCell', cellId: 'R0C0', value: 'Product' })
    const withHeaders2 = reducer(withHeaders, { type: 'updateCell', cellId: 'R0C1', value: 'Price' })
    expect(withHeaders2.cells[0][0].value).toBe('Product')
    expect(withHeaders2.cells[0][1].value).toBe('Price')
    const next = reducer(withHeaders2, { type: 'generate', rows: 5, cols: 5 })
    expect(next.cells[0][0].value).toBe('')
    expect(next.cells[0][1].value).toBe('')
  })

  it('generate clears caption', () => {
    const withCaption = reducer(initialState, { type: 'setCaption', caption: 'My Table' })
    expect(withCaption.caption).toBe('My Table')
    const next = reducer(withCaption, { type: 'generate', rows: 3, cols: 3 })
    expect(next.caption).toBe('')
  })

  it('generate clears caption text color and bg color', () => {
    const colored = reducer(initialState, { type: 'setCaptionTextColor', color: '#ff0000' })
    const withBg = reducer(colored, { type: 'setCaptionBgColor', color: '#eee' })
    expect(withBg.captionTextColor).toBe('#ff0000')
    expect(withBg.captionBgColor).toBe('#eee')
    const next = reducer(withBg, { type: 'generate', rows: 3, cols: 3 })
    expect(next.captionTextColor).toBe('')
    expect(next.captionBgColor).toBe('')
  })

  it('generate resets captionAlignment to center', () => {
    const leftAlign = reducer(initialState, { type: 'setCaptionAlignment', alignment: 'left' })
    expect(leftAlign.captionAlignment).toBe('left')
    const next = reducer(leftAlign, { type: 'generate', rows: 3, cols: 3 })
    expect(next.captionAlignment).toBe('center')
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

  it('processes SET_THEME action', () => {
    const next = reducer(initialState, { type: 'setTheme', theme: 'minimal' })
    expect(next.theme).toBe('minimal')
    expect(next.headerColor).toBe('#FFFFFF')
    expect(next.borderColor).toBe('#F3F4F6')
  })

  it('setTheme with headerStyle none sets headerStyle to first-row', () => {
    const next = reducer(initialState, { type: 'setTheme', theme: 'academic' })
    expect(next.headerStyle).toBe('first-row')
  })

  it('setTheme preserves existing headerStyle when not none', () => {
    const withHeader = reducer(initialState, { type: 'setHeaderStyle', headerStyle: 'first-column' })
    const next = reducer(withHeader, { type: 'setTheme', theme: 'monochrome' })
    expect(next.headerStyle).toBe('first-column')
  })

  it('setTheme with unknown theme returns state unchanged', () => {
    const next = reducer(initialState, { type: 'setTheme', theme: 'nonexistent' as never })
    expect(next).toBe(initialState)
  })

  it('setTheme applies correct theme config values', () => {
    for (const themeConfig of TABLE_THEMES) {
      const next = reducer(initialState, { type: 'setTheme', theme: themeConfig.id })
      expect(next.theme).toBe(themeConfig.id)
      expect(next.headerColor).toBe(themeConfig.headerBg)
      expect(next.borderColor).toBe(themeConfig.borderColor)
    }
  })

  it('processes SET_CAPTION_ITALIC action to true', () => {
    const next = reducer(initialState, { type: 'setCaptionItalic', italic: true })
    expect(next.captionItalic).toBe(true)
  })

  it('processes SET_CAPTION_ITALIC action to false', () => {
    const enabled = reducer(initialState, { type: 'setCaptionItalic', italic: true })
    expect(enabled.captionItalic).toBe(true)
    const next = reducer(enabled, { type: 'setCaptionItalic', italic: false })
    expect(next.captionItalic).toBe(false)
  })

  it('setCells resets captionItalic to false', () => {
    const enabled = reducer(initialState, { type: 'setCaptionItalic', italic: true })
    expect(enabled.captionItalic).toBe(true)
    const cells = generateEmptyTable(3, 3)
    const next = reducer(enabled, { type: 'setCells', cells })
    expect(next.captionItalic).toBe(false)
  })

  it('generate resets captionItalic to false', () => {
    const enabled = reducer(initialState, { type: 'setCaptionItalic', italic: true })
    expect(enabled.captionItalic).toBe(true)
    const next = reducer(enabled, { type: 'generate', rows: 3, cols: 3 })
    expect(next.captionItalic).toBe(false)
  })

  it('applyPreset resets captionItalic to false', () => {
    const enabled = reducer(initialState, { type: 'setCaptionItalic', italic: true })
    expect(enabled.captionItalic).toBe(true)
    const next = reducer(enabled, {
      type: 'applyPreset',
      preset: { id: 'test', label: 'Test', rows: 3, cols: 3, headerStyle: 'first-row', headers: [] },
    })
    expect(next.captionItalic).toBe(false)
  })

  it('clearAll resets captionItalic to false', () => {
    const enabled = reducer(initialState, { type: 'setCaptionItalic', italic: true })
    expect(enabled.captionItalic).toBe(true)
    const next = reducer(enabled, { type: 'clearAll' })
    expect(next.captionItalic).toBe(false)
  })

  describe('mergeSelection', () => {
    function setupMergeState(
      rows: number,
      cols: number,
      col0Format: ColumnFormat,
      col1Format: ColumnFormat,
      col0Values?: string[],
      col1Values?: string[],
    ) {
      const generated = reducer(initialState, { type: 'generate', rows, cols })
      const withCol0Format = reducer(generated, { type: 'setColumnFormat', col: 0, format: col0Format })
      const withCol1Format = reducer(withCol0Format, { type: 'setColumnFormat', col: 1, format: col1Format })
      let result = withCol1Format
      if (col0Values) {
        col0Values.forEach((val, r) => {
          result = reducer(result, { type: 'updateCell', cellId: `R${r}C0`, value: val })
        })
      }
      if (col1Values) {
        col1Values.forEach((val, r) => {
          result = reducer(result, { type: 'updateCell', cellId: `R${r}C1`, value: val })
        })
      }
      return result
    }

    it('gives priority to non-computed cell value when anchor is auto-number', () => {
      const state = setupMergeState(3, 2, 'auto-number', 'text', ['1', '2', '3'], ['name', 'desc', 'note'])
      const withSelection = reducer(state, {
        type: 'selectRange',
        range: { startRow: 0, startCol: 0, endRow: 0, endCol: 1 },
      })
      const merged = reducer(withSelection, { type: 'mergeSelection' })
      expect(merged.cells[0][0].value).toBe('name')
    })

    it('changes anchor format from auto-number to text when merging with a text cell', () => {
      const state = setupMergeState(3, 2, 'auto-number', 'text', ['1', '2', '3'], ['name', 'desc', 'note'])
      const withSelection = reducer(state, {
        type: 'selectRange',
        range: { startRow: 0, startCol: 0, endRow: 0, endCol: 1 },
      })
      const merged = reducer(withSelection, { type: 'mergeSelection' })
      expect(merged.cells[0][0].format).toBe('text')
    })

    it('re-sequences auto-number cells below the merged range', () => {
      const state = setupMergeState(4, 2, 'auto-number', 'text', ['1', '2', '3', '4'], ['a', 'b', 'c', 'd'])
      const withSelection = reducer(state, {
        type: 'selectRange',
        range: { startRow: 0, startCol: 0, endRow: 0, endCol: 1 },
      })
      const merged = reducer(withSelection, { type: 'mergeSelection' })
      expect(merged.cells[1][0].value).toBe('1')
      expect(merged.cells[2][0].value).toBe('2')
      expect(merged.cells[3][0].value).toBe('3')
    })

    it('keeps anchor value when anchor is non-computed (text)', () => {
      const state = setupMergeState(2, 2, 'text', 'auto-number', ['hello'], ['1'])
      const withSelection = reducer(state, {
        type: 'selectRange',
        range: { startRow: 0, startCol: 0, endRow: 0, endCol: 1 },
      })
      const merged = reducer(withSelection, { type: 'mergeSelection' })
      expect(merged.cells[0][0].value).toBe('hello')
      expect(merged.cells[0][0].format).toBe('text')
    })

    it('keeps anchor value when all cells in range are auto-number', () => {
      const state = setupMergeState(2, 2, 'auto-number', 'auto-number', ['1'], ['2'])
      const withSelection = reducer(state, {
        type: 'selectRange',
        range: { startRow: 0, startCol: 0, endRow: 0, endCol: 1 },
      })
      const merged = reducer(withSelection, { type: 'mergeSelection' })
      expect(merged.cells[0][0].value).toBe('1')
      expect(merged.cells[0][0].format).toBe('auto-number')
    })

    it('returns state unchanged when no selectedRange', () => {
      const next = reducer(initialState, { type: 'mergeSelection' })
      expect(next).toBe(initialState)
    })
  })

  function setupCustomState(
    rows: number,
    cols: number,
    columnFormats: ColumnFormat[],
    data?: string[][],
  ) {
    const generated = reducer(initialState, { type: 'generate', rows, cols })
    let result = generated
    columnFormats.forEach((fmt, c) => {
      result = reducer(result, { type: 'setColumnFormat', col: c, format: fmt })
    })
    if (data) {
      data.forEach((row, r) => {
        row.forEach((val, c) => {
          result = reducer(result, { type: 'updateCell', cellId: `R${r}C${c}`, value: val })
        })
      })
    }
    return result
  }

  describe('deleteRowAt with auto-number re-sequencing', () => {
    it('re-sequences auto-number column values when first row is deleted', () => {
      const columns: ColumnFormat[] = ['auto-number', 'text']
      const data = [
        ['1', 'A'],
        ['2', 'B'],
        ['3', 'C'],
      ]
      const state = setupCustomState(3, 2, columns, data)
      const next = reducer(state, { type: 'deleteRowAt', index: 0 })
      expect(next.cells[0][0].value).toBe('1')
      expect(next.cells[0][0].format).toBe('auto-number')
      expect(next.cells[0][1].value).toBe('B')
      expect(next.cells[1][0].value).toBe('2')
      expect(next.cells[1][0].format).toBe('auto-number')
      expect(next.cells[1][1].value).toBe('C')
    })

    it('re-sequences auto-number column values when middle row is deleted', () => {
      const columns: ColumnFormat[] = ['auto-number', 'text']
      const data = [
        ['1', 'A'],
        ['2', 'B'],
        ['3', 'C'],
      ]
      const state = setupCustomState(3, 2, columns, data)
      const next = reducer(state, { type: 'deleteRowAt', index: 1 })
      expect(next.cells[0][0].value).toBe('1')
      expect(next.cells[1][0].value).toBe('2')
      expect(next.rows).toBe(2)
    })

    it('does not re-sequence non-auto-number columns', () => {
      const columns: ColumnFormat[] = ['text', 'number']
      const data = [
        ['A', '42'],
        ['B', '99'],
      ]
      const state = setupCustomState(2, 2, columns, data)
      const next = reducer(state, { type: 'deleteRowAt', index: 0 })
      expect(next.cells[0][0].value).toBe('B')
      expect(next.cells[0][1].value).toBe('99')
      expect(next.rows).toBe(1)
    })
  })

  describe('insertRowAt with auto-number re-sequencing', () => {
    it('re-sequences auto-number column values when inserting at row 0', () => {
      const columns: ColumnFormat[] = ['auto-number', 'text']
      const data = [
        ['1', 'A'],
        ['2', 'B'],
        ['3', 'C'],
      ]
      const state = setupCustomState(3, 2, columns, data)
      const next = reducer(state, { type: 'insertRowAt', index: 0 })
      expect(next.rows).toBe(4)
      expect(next.cells[0][0].value).toBe('1')
      expect(next.cells[0][0].format).toBe('auto-number')
      expect(next.cells[1][0].value).toBe('2')
      expect(next.cells[1][0].format).toBe('auto-number')
      expect(next.cells[2][0].value).toBe('3')
      expect(next.cells[2][0].format).toBe('auto-number')
      expect(next.cells[3][0].value).toBe('4')
      expect(next.cells[3][0].format).toBe('auto-number')
    })

    it('re-sequences auto-number column values when inserting in middle', () => {
      const columns: ColumnFormat[] = ['auto-number']
      const data = [['1'], ['2'], ['3']]
      const state = setupCustomState(3, 1, columns, data)
      const next = reducer(state, { type: 'insertRowAt', index: 2 })
      expect(next.rows).toBe(4)
      expect(next.cells[0][0].value).toBe('1')
      expect(next.cells[1][0].value).toBe('2')
      expect(next.cells[2][0].value).toBe('3')
      expect(next.cells[3][0].value).toBe('4')
    })

    it('does not re-sequence non-auto-number columns', () => {
      const columns: ColumnFormat[] = ['currency']
      const data = [['100']]
      const state = setupCustomState(1, 1, columns, data)
      const next = reducer(state, { type: 'insertRowAt', index: 1 })
      expect(next.rows).toBe(2)
      expect(next.cells[0][0].value).toBe('100')
      expect(next.cells[1][0].value).toBe('')
    })
  })

  it('returns state unchanged for unknown action type', () => {
    const next = reducer(initialState, { type: 'UNKNOWN' } as never)
    expect(next).toBe(initialState)
  })

  describe('applyPreset', () => {
    const preset: PresetDefinition = {
      id: 'test',
      label: 'Test Preset',
      rows: 3,
      cols: 4,
      headerStyle: 'first-row',
      headers: ['A', 'B', 'C', 'D'],
    }

    it('sets caption from preset.label', () => {
      const next = reducer(initialState, { type: 'applyPreset', preset })
      expect(next.caption).toBe('Test Preset')
    })

    it('uses preset.caption over label when provided', () => {
      const withCaption = { ...preset, caption: 'Custom Caption' }
      const next = reducer(initialState, { type: 'applyPreset', preset: withCaption })
      expect(next.caption).toBe('Custom Caption')
    })

    it('builds correct cell dimensions', () => {
      const next = reducer(initialState, { type: 'applyPreset', preset })
      expect(next.rows).toBe(3)
      expect(next.cols).toBe(4)
      expect(next.cells).toHaveLength(3)
      expect(next.cells[0]).toHaveLength(4)
    })
  })
})
