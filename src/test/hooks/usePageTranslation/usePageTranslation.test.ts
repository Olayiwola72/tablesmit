import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePageTranslation } from '../../../hooks/usePageTranslation/usePageTranslation'

const loadNamespace = vi.hoisted(() => vi.fn())

vi.mock('../../../i18n/i18n', () => ({
  loadNamespace,
  NS: ['common', 'home', 'about', 'openSource', 'blog', 'contact', 'legal', 'table', 'features', 'testimonials', 'changelog', 'notFound'],
}))

describe('usePageTranslation', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns t', () => {
    const { result } = renderHook(() => usePageTranslation())
    expect(result.current.t).toBeDefined()
  })

  it('calls loadNamespace for each provided namespace', () => {
    renderHook(() => usePageTranslation('about', 'blog'))
    expect(loadNamespace).toHaveBeenCalledWith('en', 'about')
    expect(loadNamespace).toHaveBeenCalledWith('en', 'blog')
  })

  it('does not call loadNamespace when no namespaces provided', () => {
    renderHook(() => usePageTranslation())
    expect(loadNamespace).not.toHaveBeenCalled()
  })

  it('deduplicates re-renders with same namespaces', () => {
    const { rerender } = renderHook(() => usePageTranslation('about'))
    expect(loadNamespace).toHaveBeenCalledTimes(1)

    rerender()
    expect(loadNamespace).toHaveBeenCalledTimes(1)
  })

  it('calls loadNamespace for new namespaces on rerender', () => {
    const { rerender } = renderHook(
      (initial: string[] = ['about']) => usePageTranslation(...initial),
    )

    expect(loadNamespace).toHaveBeenCalledWith('en', 'about')

    rerender(['about', 'blog'])
    expect(loadNamespace).toHaveBeenCalledWith('en', 'blog')
  })
})
