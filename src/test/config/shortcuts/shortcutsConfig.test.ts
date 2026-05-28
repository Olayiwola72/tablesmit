import { describe, expect, it } from 'vitest'
import { SHORTCUTS } from '../../../config/shortcuts/shortcutsConfig'

describe('SHORTCUTS', () => {
  it('has at least 10 entries', () => {
    expect(SHORTCUTS.length).toBeGreaterThanOrEqual(10)
  })

  it.each(SHORTCUTS)('$keys has a non-empty keys and labelKey', (shortcut) => {
    expect(shortcut.keys).toBeTruthy()
    expect(shortcut.labelKey).toBeTruthy()
  })

  it.each(SHORTCUTS.filter((s) => s.id !== undefined))('$id has a truthy id string', (shortcut) => {
    expect(shortcut.id).toBeTruthy()
  })

  it('includes Ctrl+Z for undo', () => {
    expect(SHORTCUTS.some((s) => s.keys === 'Ctrl+Z')).toBe(true)
  })

  it('includes Ctrl+F for find', () => {
    expect(SHORTCUTS.some((s) => s.keys === 'Ctrl+F')).toBe(true)
  })

  it('includes Ctrl+H for find and replace', () => {
    expect(SHORTCUTS.some((s) => s.keys === 'Ctrl+H')).toBe(true)
  })

  it('includes Ctrl+/ for shortcuts modal', () => {
    expect(SHORTCUTS.some((s) => s.keys === 'Ctrl+/')).toBe(true)
  })

  it('all labelKeys start with shortcuts.', () => {
    SHORTCUTS.forEach((s) => {
      expect(s.labelKey).toMatch(/^shortcuts\./)
    })
  })

  it('has unique keys among entries', () => {
    const keys = SHORTCUTS.map((s) => s.keys)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
