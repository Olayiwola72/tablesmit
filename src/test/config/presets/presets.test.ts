import { describe, expect, it } from 'vitest'
import enPresets from '../../../config/presets/en'

describe('en presets', () => {
  it('has exactly 5 presets', () => {
    expect(enPresets).toHaveLength(5)
  })

  it.each(enPresets)('$label has required fields', (preset) => {
    expect(preset.id).toBeTruthy()
    expect(preset.label).toBeTruthy()
    expect(preset.rows).toBeGreaterThan(0)
    expect(preset.cols).toBeGreaterThan(0)
    expect(Array.isArray(preset.headers)).toBe(true)
    expect(Array.isArray(preset.data)).toBe(true)
  })

  it.each(enPresets)('$label data dimensions match rows x cols', (preset) => {
    if (!preset.data) return
    preset.data.forEach(row => {
      expect(row.length).toBe(preset.cols)
    })
  })
})
