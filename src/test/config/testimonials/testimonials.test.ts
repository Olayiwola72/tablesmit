import { describe, expect, it } from 'vitest'
import { TESTIMONIALS } from '../../../config/testimonials/testimonials'

describe('TESTIMONIALS', () => {
  it('has at least one testimonial', () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0)
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

  it('every testimonial has required fields', () => {
    for (const t of TESTIMONIALS) {
      expect(t.id).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.role).toBeTruthy()
      expect(t.quote).toBeTruthy()
    }
  })
})
