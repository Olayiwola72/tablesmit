import { describe, expect, it } from 'vitest'
import { sponsors } from '../../../config/sponsors/sponsorsConfig'

describe('sponsors', () => {
  it('has exactly 3 sponsors', () => {
    expect(sponsors).toHaveLength(3)
  })

  it.each([
    { id: 'github', label: 'GitHub Sponsors' },
    { id: 'bmac', label: 'Buy Me a Coffee' },
    { id: 'opencollective', label: 'Open Collective' },
  ])('includes $label with correct id', (expected) => {
    expect(sponsors.find((s) => s.id === expected.id)?.label).toBe(expected.label)
  })

  it('has description, url, and cta on every sponsor', () => {
    for (const sponsor of sponsors) {
      expect(sponsor.description).toBeTruthy()
      expect(sponsor.url).toBeTruthy()
      expect(sponsor.cta).toBeTruthy()
    }
  })

  it('has all sponsors disabled by default', () => {
    for (const sponsor of sponsors) {
      expect(sponsor.enabled).toBe(false)
    }
  })
})
