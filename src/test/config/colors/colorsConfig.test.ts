import { describe, expect, it } from 'vitest'
import { colors } from '../../../config/colors/colorsConfig'

describe('colors', () => {
  it('has a default header color of white', () => {
    expect(colors.defaultHeader).toBe('#ffffff')
  })

  it('has a default content color of near-black', () => {
    expect(colors.defaultContent).toBe('#111827')
  })

  it('has header color swatches', () => {
    expect(colors.header.length).toBeGreaterThanOrEqual(4)
    expect(colors.header[0].label).toBe('White')
    expect(colors.header[0].value).toBe('#ffffff')
  })

  it('has content color swatches', () => {
    expect(colors.content.length).toBeGreaterThanOrEqual(4)
    expect(colors.content[0].label).toBe('Black')
    expect(colors.content[0].value).toBe('#111827')
  })
})
