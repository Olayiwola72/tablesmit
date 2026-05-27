import { describe, it, expect } from 'vitest'
import {
  LATEX_ESCAPE_MAP,
  LATEX_UNESCAPE_MAP,
  LATEX_COLUMN_ALIGN,
} from '../../../config/latex/latexConfig'

describe('LATEX_ESCAPE_MAP', () => {
  it('covers all 10 special characters', () => {
    expect(Object.keys(LATEX_ESCAPE_MAP)).toHaveLength(10)
  })

  it('maps backslash to textbackslash', () => {
    expect(LATEX_ESCAPE_MAP['\\']).toBe('\\textbackslash{}')
  })

  it('maps % to percent escape', () => {
    expect(LATEX_ESCAPE_MAP['%']).toBe('\\%')
  })

  it('maps & to ampersand escape', () => {
    expect(LATEX_ESCAPE_MAP['&']).toBe('\\&')
  })

  it('maps $ to dollar escape', () => {
    expect(LATEX_ESCAPE_MAP['$']).toBe('\\$')
  })
})

describe('LATEX_UNESCAPE_MAP', () => {
  it('has the same number of entries as the forward map', () => {
    expect(Object.keys(LATEX_UNESCAPE_MAP)).toHaveLength(
      Object.keys(LATEX_ESCAPE_MAP).length,
    )
  })

  it('reverses every escape in LATEX_ESCAPE_MAP', () => {
    for (const [char, escaped] of Object.entries(LATEX_ESCAPE_MAP)) {
      expect(LATEX_UNESCAPE_MAP[escaped]).toBe(char)
    }
  })

  it('round-trips through both maps', () => {
    for (const char of Object.keys(LATEX_ESCAPE_MAP)) {
      const escaped = LATEX_ESCAPE_MAP[char]
      const unescaped = LATEX_UNESCAPE_MAP[escaped]
      expect(unescaped).toBe(char)
    }
  })
})

describe('LATEX_COLUMN_ALIGN', () => {
  it('is the default column alignment', () => {
    expect(LATEX_COLUMN_ALIGN).toBe('l')
  })
})
