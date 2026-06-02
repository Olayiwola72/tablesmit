import { describe, expect, it, vi } from 'vitest'

vi.mock('../../../i18n/i18n', () => ({
  default: {
    t: (key: string, opts?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'errors.fileTooLarge': 'File too large. Maximum size is {{maxSize}}{{unitLabel}}.',
        'errors.importParseError': 'Could not read file. Check the format and try again.',
      }
      let msg = translations[key] ?? key
      if (opts) {
        for (const [k, v] of Object.entries(opts)) {
          msg = msg.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v))
        }
      }
      return msg
    },
    language: 'en',
    isInitialized: true,
    on: () => vi.fn(),
    changeLanguage: () => Promise.resolve(),
  },
}))

import { argbToHex, extractCellValue, getFillColor, trimTrailingEmptyRows } from '../../../services/importService/utils'

describe('argbToHex', () => {
  it('converts 8-character ARGB to 6-character hex, stripping alpha', () => {
    expect(argbToHex('FFFF0000')).toBe('#FF0000')
    expect(argbToHex('FF1E40AF')).toBe('#1E40AF')
    expect(argbToHex('FF000000')).toBe('#000000')
    expect(argbToHex('FFFFFFFF')).toBe('#FFFFFF')
  })

  it('strips # prefix if present', () => {
    expect(argbToHex('#FFFF0000')).toBe('#FF0000')
    expect(argbToHex('#FF1E40AF')).toBe('#1E40AF')
  })

  it('returns input as-is if not 8 characters (after stripping #)', () => {
    expect(argbToHex('FF0000')).toBe('#FF0000')
    expect(argbToHex('1E40AF')).toBe('#1E40AF')
  })
})

describe('getFillColor', () => {
  it('returns undefined for null/undefined fill', () => {
    expect(getFillColor(null)).toBeUndefined()
    expect(getFillColor(undefined)).toBeUndefined()
    expect(getFillColor({})).toBeUndefined()
  })

  it('returns undefined for non-object fill', () => {
    expect(getFillColor('string')).toBeUndefined()
    expect(getFillColor(123)).toBeUndefined()
    expect(getFillColor(true)).toBeUndefined()
  })

  it('extracts fgColor from pattern fill', () => {
    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF0000' }
    })).toBe('#FF0000')

    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E40AF' }
    })).toBe('#1E40AF')
  })

  it('returns undefined for pattern fill without fgColor', () => {
    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid'
    })).toBeUndefined()

    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: {}
    })).toBeUndefined()

    expect(getFillColor({
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '' }
    })).toBeUndefined()
  })

  it('extracts first stop color from gradient angle fill', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: { argb: 'FFFF0000' } },
        { position: 1, color: { argb: 'FF0000FF' } }
      ]
    })).toBe('#FF0000')
  })

  it('extracts first stop color from gradient path fill', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'path',
      center: { left: 0.5, top: 0.5 },
      stops: [
        { position: 0, color: { argb: 'FF1E40AF' } },
        { position: 1, color: { argb: 'FF60A5FA' } }
      ]
    })).toBe('#1E40AF')
  })

  it('returns undefined for gradient fill without stops', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: []
    })).toBeUndefined()

    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90
    })).toBeUndefined()
  })

  it('returns undefined for gradient fill without valid first stop color', () => {
    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: {} }
      ]
    })).toBeUndefined()

    expect(getFillColor({
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: { argb: '' } }
      ]
    })).toBeUndefined()
  })

  it('returns undefined for unknown fill type', () => {
    expect(getFillColor({
      type: 'unknown',
      fgColor: { argb: 'FFFF0000' }
    })).toBeUndefined()
  })
})

describe('extractCellValue', () => {
  it('returns empty string for null and undefined', () => {
    expect(extractCellValue(null)).toBe('')
    expect(extractCellValue(undefined)).toBe('')
  })

  it('returns string representation for primitives', () => {
    expect(extractCellValue(42)).toBe('42')
    expect(extractCellValue(3.14)).toBe('3.14')
    expect(extractCellValue('hello')).toBe('hello')
    expect(extractCellValue(true)).toBe('true')
    expect(extractCellValue(false)).toBe('false')
  })

  it('extracts result from formula value object', () => {
    const formulaValue = { formula: 'SUM(B3:D3)', result: 450 }
    expect(extractCellValue(formulaValue)).toBe('450')
  })

  it('extracts result as string for string result', () => {
    const formulaValue = { formula: 'CONCAT(A1,B1)', result: 'HelloWorld' }
    expect(extractCellValue(formulaValue)).toBe('HelloWorld')
  })

  it('returns empty string when formula has no result', () => {
    const formulaValue = { formula: 'SUM(B3:D3)' }
    expect(extractCellValue(formulaValue)).toBe('')
  })

  it('extracts text from hyperlink value object', () => {
    const hyperlinkValue = { text: 'Click here', hyperlink: 'https://example.com' }
    expect(extractCellValue(hyperlinkValue)).toBe('Click here')
  })

  it('extracts text from rich text value object', () => {
    const richTextValue = { richText: [{ text: 'Hello' }, { text: ' ' }, { text: 'World' }] }
    expect(extractCellValue(richTextValue)).toBe('Hello World')
  })

  it('returns empty string for empty rich text', () => {
    expect(extractCellValue({ richText: [] })).toBe('')
  })

  it('extracts error from cell error value object', () => {
    const errorValue = { error: '#DIV/0!' }
    expect(extractCellValue(errorValue)).toBe('#DIV/0!')
  })

  it('returns empty string for unrecognised object', () => {
    expect(extractCellValue({ some: 'unknown' })).toBe('')
  })

  it('handles shared formula value with result', () => {
    const sharedFormula = { sharedFormula: 'A1', result: 100 }
    expect(extractCellValue(sharedFormula)).toBe('100')
  })

  it('returns empty string for empty string', () => {
    expect(extractCellValue('')).toBe('')
  })

  it('returns string representation for zero', () => {
    expect(extractCellValue(0)).toBe('0')
  })
})

describe('trimTrailingEmptyRows', () => {
  it('returns the same array when there are no trailing empty rows', () => {
    const rows = [['a', 'b'], ['c', 'd']]
    expect(trimTrailingEmptyRows(rows)).toEqual(rows)
  })

  it('trims trailing all-empty rows', () => {
    const rows = [['a', 'b'], ['c', 'd'], ['', ''], ['', '']]
    expect(trimTrailingEmptyRows(rows)).toEqual([['a', 'b'], ['c', 'd']])
  })

  it('preserves mid-table empty rows', () => {
    const rows = [['a', 'b'], ['', ''], ['c', 'd']]
    expect(trimTrailingEmptyRows(rows)).toEqual(rows)
  })

  it('preserves mid-table empty rows and trims trailing ones', () => {
    const rows = [['a', 'b'], ['', ''], ['c', 'd'], ['', '']]
    expect(trimTrailingEmptyRows(rows)).toEqual([['a', 'b'], ['', ''], ['c', 'd']])
  })

  it('returns empty array when all rows are empty', () => {
    const rows = [['', ''], ['', ''], ['', '']]
    expect(trimTrailingEmptyRows(rows)).toEqual([])
  })

  it('trims rows that are all whitespace as empty', () => {
    const rows = [['a', 'b'], ['  ', '  '], [' ', ' ']]
    expect(trimTrailingEmptyRows(rows)).toEqual([['a', 'b']])
  })

  it('handles single non-empty row', () => {
    const rows = [['hello']]
    expect(trimTrailingEmptyRows(rows)).toEqual([['hello']])
  })

  it('handles empty array', () => {
    expect(trimTrailingEmptyRows([])).toEqual([])
  })
})
