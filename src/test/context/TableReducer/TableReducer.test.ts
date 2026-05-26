import { describe, expect, it } from 'vitest'
import { reducer } from '../../../context/TableReducer/TableReducer'
import { initialState } from '../../../context/TableState/TableState'
import { TABLE_THEMES } from '../../../config/table/tableThemes'
import { generateEmptyTable } from '../../../utils/tableUtils/tableUtils'
import type { PresetDefinition } from '../../../types/table'

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
