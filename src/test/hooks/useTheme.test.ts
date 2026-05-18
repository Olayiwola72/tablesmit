import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTheme } from '../../hooks/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('defaults to system preference when no stored value', () => {
    const { result } = renderHook(() => useTheme())
    expect(['light', 'dark']).toContain(result.current.theme)
  })

  it('toggle() switches theme and persists to localStorage', () => {
    const { result } = renderHook(() => useTheme())
    const initial = result.current.theme

    act(() => result.current.toggle())

    expect(result.current.theme).not.toBe(initial)
    expect(localStorage.getItem('tablesmit-theme')).toBe(result.current.theme)
  })

  it('adds .dark class to html when theme is dark', () => {
    localStorage.setItem('tablesmit-theme', 'dark')
    renderHook(() => useTheme())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
