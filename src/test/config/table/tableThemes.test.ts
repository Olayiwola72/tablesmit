import { describe, expect, it } from 'vitest'
import { TABLE_THEMES } from '../../../config/table/tableThemes/tableThemes'

describe('TABLE_THEMES', () => {
  it('has exactly 6 theme entries', () => {
    expect(TABLE_THEMES).toHaveLength(6)
  })

  it('includes all required theme IDs', () => {
    const ids = TABLE_THEMES.map((t) => t.id)
    expect(ids).toContain('default')
    expect(ids).toContain('minimal')
    expect(ids).toContain('dark-header')
    expect(ids).toContain('striped')
    expect(ids).toContain('academic')
    expect(ids).toContain('monochrome')
  })

  it('each theme has all required fields', () => {
    for (const theme of TABLE_THEMES) {
      expect(theme).toHaveProperty('id')
      expect(theme).toHaveProperty('label')
      expect(theme).toHaveProperty('headerBg')
      expect(theme).toHaveProperty('headerText')
      expect(theme).toHaveProperty('rowBg')
      expect(theme).toHaveProperty('altRowBg')
      expect(theme).toHaveProperty('borderStyle')
      expect(theme).toHaveProperty('borderColor')
    }
  })

  it('every headerBg and headerText combination is valid', () => {
    for (const theme of TABLE_THEMES) {
      expect(typeof theme.headerBg).toBe('string')
      expect(theme.headerBg).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(typeof theme.headerText).toBe('string')
      expect(theme.headerText).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it('has unique IDs', () => {
    const ids = TABLE_THEMES.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique labels', () => {
    const labels = TABLE_THEMES.map((t) => t.label)
    expect(new Set(labels).size).toBe(labels.length)
  })
})
