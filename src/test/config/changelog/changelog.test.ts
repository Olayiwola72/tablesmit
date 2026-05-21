import { describe, expect, it } from 'vitest'
import { CHANGELOG, getChangeStyle } from '../../../config/changelog/changelog'

describe('CHANGELOG', () => {
  it('has at least one entry', () => {
    expect(CHANGELOG.length).toBeGreaterThan(0)
  })

  it.each(CHANGELOG)('$version has a valid date', (entry) => {
    expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it.each(CHANGELOG)('$version has at least one change', (entry) => {
    expect(entry.changes.length).toBeGreaterThan(0)
  })

  it.each(CHANGELOG)('$version changes have valid types', (entry) => {
    entry.changes.forEach(c => {
      expect(['added', 'fixed', 'improved', 'removed']).toContain(c.type)
    })
  })

  it.each(CHANGELOG)('$version changes have non-empty descriptions', (entry) => {
    entry.changes.forEach(c => {
      expect(c.description.length).toBeGreaterThan(0)
    })
  })

  it('is sorted newest first', () => {
    for (let i = 1; i < CHANGELOG.length; i++) {
      expect(new Date(CHANGELOG[i - 1].date).getTime())
        .toBeGreaterThanOrEqual(new Date(CHANGELOG[i].date).getTime())
    }
  })
})

describe('getChangeStyle', () => {
  it('returns correct style for each type', () => {
    expect(getChangeStyle('added').label).toBe('Added')
    expect(getChangeStyle('fixed').label).toBe('Fixed')
    expect(getChangeStyle('improved').label).toBe('Improved')
    expect(getChangeStyle('removed').label).toBe('Removed')
  })

  it('returns bg and text classes', () => {
    const style = getChangeStyle('added')
    expect(style.bg).toContain('bg-')
    expect(style.text).toContain('text-')
  })
})
