import { describe, expect, it } from 'vitest'
import arPresets from '../../../config/presets/ar'
import dePresets from '../../../config/presets/de'
import enPresets from '../../../config/presets/en'
import esPresets from '../../../config/presets/es'
import frPresets from '../../../config/presets/fr'
import jaPresets from '../../../config/presets/ja'
import noPresets from '../../../config/presets/no'
import ptPresets from '../../../config/presets/pt'

const LOCALES = [
  { code: 'en', presets: enPresets },
  { code: 'ar', presets: arPresets },
  { code: 'de', presets: dePresets },
  { code: 'es', presets: esPresets },
  { code: 'fr', presets: frPresets },
  { code: 'ja', presets: jaPresets },
  { code: 'no', presets: noPresets },
  { code: 'pt', presets: ptPresets },
] as const

const EXPECTED_IDS = ['research', 'matrix', 'tracker', 'budget', 'q1']

describe.each(LOCALES)('$code presets', ({ presets }) => {
  it('has exactly 5 presets', () => {
    expect(presets).toHaveLength(5)
  })

  it('has the expected IDs in order', () => {
    expect(presets.map(p => p.id)).toEqual(EXPECTED_IDS)
  })

  it.each(presets)('$label has required fields', (preset) => {
    expect(preset.id).toBeTruthy()
    expect(preset.label).toBeTruthy()
    expect(preset.rows).toBeGreaterThan(0)
    expect(preset.cols).toBeGreaterThan(0)
    expect(Array.isArray(preset.headers)).toBe(true)
    expect(Array.isArray(preset.data)).toBe(true)
  })

  it.each(presets)('$label data.length equals rows', (preset) => {
    expect(preset.data).toHaveLength(preset.rows)
  })

  it.each(presets)('$label data dimensions match rows x cols', (preset) => {
    if (!preset.data) return
    preset.data.forEach(row => {
      expect(row.length).toBe(preset.cols)
    })
  })

  it.each(presets)('$label last row is not all empty', (preset) => {
    if (!preset.data || preset.data.length === 0) return
    const lastRow = preset.data[preset.data.length - 1]
    expect(lastRow.some(cell => cell.trim() !== '')).toBe(true)
  })

  it.each(presets)('$label headers length matches cols when provided', (preset) => {
    if (preset.headers.length > 0) {
      expect(preset.headers).toHaveLength(preset.cols)
    }
  })
})
