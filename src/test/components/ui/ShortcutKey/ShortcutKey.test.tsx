import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ShortcutKey } from '../../../../components/ui/ShortcutKey/ShortcutKey'

describe('ShortcutKey', () => {
  it('renders children inside kbd element', () => {
    render(<ShortcutKey>Ctrl+Z</ShortcutKey>)
    const kbd = screen.getByText('Ctrl+Z')
    expect(kbd).toBeInTheDocument()
    expect(kbd.tagName).toBe('KBD')
  })

  it('has styling classes', () => {
    render(<ShortcutKey>Esc</ShortcutKey>)
    const kbd = screen.getByText('Esc')
    expect(kbd.className).toContain('rounded-md')
    expect(kbd.className).toContain('border-border')
    expect(kbd.className).toContain('bg-surface')
    expect(kbd.className).toContain('font-mono')
  })

  it('accepts a custom className', () => {
    render(<ShortcutKey className="ml-2">Enter</ShortcutKey>)
    const kbd = screen.getByText('Enter')
    expect(kbd.className).toContain('ml-2')
  })
})
