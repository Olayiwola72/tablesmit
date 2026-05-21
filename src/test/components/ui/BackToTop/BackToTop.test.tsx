import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BackToTop } from '../../../../components/ui/BackToTop/BackToTop'

describe('BackToTop', () => {
  let scrollY = 0

  beforeEach(() => {
    scrollY = 0
    Object.defineProperty(window, 'scrollY', {
      get: () => scrollY,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function fireScroll(): void {
    fireEvent.scroll(window)
  }

  it('does not render when scroll is below threshold', () => {
    render(<BackToTop threshold={400} />)
    scrollY = 100
    fireScroll()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders when scroll exceeds threshold', () => {
    render(<BackToTop threshold={400} />)
    scrollY = 500
    fireScroll()
    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
  })

  it('uses default threshold of 400', () => {
    scrollY = 300
    const { unmount } = render(<BackToTop />)
    fireScroll()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    unmount()

    scrollY = 500
    render(<BackToTop />)
    fireScroll()
    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
  })

  it('calls window.scrollTo on click', () => {
    scrollY = 500
    const scrollTo = vi.fn()
    vi.spyOn(window, 'scrollTo').mockImplementation(scrollTo)
    render(<BackToTop threshold={400} />)
    fireScroll()
    screen.getByRole('button').click()
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('adds and removes scroll listener', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<BackToTop />)
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })

    unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
