import { describe, expect, it } from 'vitest'
import { TESTIMONIALS } from '../../../config/testimonials/testimonials'

describe('TESTIMONIALS', () => {
  it('has at least two testimonials', () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(2)
  })

  it('first testimonial has the correct shape', () => {
    const t = TESTIMONIALS[0]
    expect(t.id).toBe('testimonial-abdulahi')
    expect(t.name).toBe('Abdulahi Akintayo Taiwo')
    expect(t.role).toContain('PhD Student')
    expect(t.quote).toContain('LaTeX export')
    expect(t.rating).toBe(5)
    expect(t.source).toBe('Direct')
  })

  it('second testimonial has the correct shape', () => {
    const t = TESTIMONIALS[1]
    expect(t.id).toBe('testimonial-aderibigbe')
    expect(t.name).toBe('Aderibigbe Oluwakayode')
    expect(t.role).toContain('Medical Student')
    expect(t.quote).toContain('Medical school')
    expect(t.rating).toBe(5)
    expect(t.source).toBe('Twitter')
    expect(t.sourceUrl).toContain('x.com')
  })

  it('every testimonial has required fields', () => {
    for (const t of TESTIMONIALS) {
      expect(t.id).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.role).toBeTruthy()
      expect(t.quote).toBeTruthy()
    }
  })
})
