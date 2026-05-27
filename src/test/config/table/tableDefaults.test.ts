import { describe, expect, it } from 'vitest'
import {
  DEFAULT_ROWS, DEFAULT_COLS, MAX_ROWS, MAX_COLS,
  MIN_COLUMN_WIDTH, MAX_COLUMN_WIDTH, DEFAULT_COLUMN_WIDTH,
  MIN_ROW_HEIGHT, MAX_ROW_HEIGHT, DEFAULT_ROW_HEIGHT,
  AUTOFIT_PADDING, MAX_IMPORT_FILE_SIZE, MAX_HISTORY,
  DEFAULT_BORDER_STYLE, DEFAULT_BORDER_COLOR,
} from '../../../config/table/tableDefaults/tableDefaults'

describe('tableDefaults', () => {
  it('DEFAULT_ROWS is 5', () => expect(DEFAULT_ROWS).toBe(5))
  it('DEFAULT_COLS is 5', () => expect(DEFAULT_COLS).toBe(5))
  it('MAX_ROWS is 50', () => expect(MAX_ROWS).toBe(50))
  it('MAX_COLS is 20', () => expect(MAX_COLS).toBe(20))
  it('MIN_COLUMN_WIDTH is 60', () => expect(MIN_COLUMN_WIDTH).toBe(60))
  it('MAX_COLUMN_WIDTH is 600', () => expect(MAX_COLUMN_WIDTH).toBe(600))
  it('DEFAULT_COLUMN_WIDTH is 120', () => expect(DEFAULT_COLUMN_WIDTH).toBe(120))
  it('MIN_ROW_HEIGHT is 32', () => expect(MIN_ROW_HEIGHT).toBe(32))
  it('MAX_ROW_HEIGHT is 300', () => expect(MAX_ROW_HEIGHT).toBe(300))
  it('DEFAULT_ROW_HEIGHT is 44', () => expect(DEFAULT_ROW_HEIGHT).toBe(44))
  it('AUTOFIT_PADDING is 16', () => expect(AUTOFIT_PADDING).toBe(16))
  it('MAX_IMPORT_FILE_SIZE is 5MB', () => expect(MAX_IMPORT_FILE_SIZE).toBe(5 * 1024 * 1024))
  it('MAX_HISTORY is 50', () => expect(MAX_HISTORY).toBe(50))
  it('DEFAULT_BORDER_STYLE is solid', () => expect(DEFAULT_BORDER_STYLE).toBe('solid'))
  it('DEFAULT_BORDER_COLOR is #000000', () => expect(DEFAULT_BORDER_COLOR).toBe('#000000'))
})
