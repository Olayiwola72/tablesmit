import { describe, expect, it } from 'vitest'
import { cn } from '../../lib/utils'

describe('cn', () => {
  it('returns a single class string', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('merges multiple class strings', () => {
    expect(cn('px-4 py-2', 'text-sm')).toBe('px-4 py-2 text-sm')
  })

  it('filters out falsy values', () => {
    const falsy = false
    expect(cn('px-4', falsy && 'hidden', 'py-2', undefined, null, '')).toBe('px-4 py-2')
  })

  it('resolves Tailwind conflicts via twMerge', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })

  it('resolves padding conflicts correctly', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
  })

  it('handles object syntax', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
  })
})
