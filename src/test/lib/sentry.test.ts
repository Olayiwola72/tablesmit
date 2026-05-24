import { afterEach, describe, expect, it, vi } from 'vitest'

describe('sentry module', () => {
  it('does not export initSentry (deferred init removed)', async () => {
    const mod = await import('../../lib/sentry')
    expect(mod).not.toHaveProperty('initSentry')
    expect(mod).toHaveProperty('captureException')
  })
})

describe('captureException', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('logs error to console.error in dev mode', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { captureException } = await import('../../lib/sentry')

    captureException(new Error('test error'), { componentStack: 'TestComponent' })

    expect(spy).toHaveBeenCalledWith(
      '[ErrorBoundary]',
      expect.any(Error),
      { componentStack: 'TestComponent' },
    )
  })

  it('passes context as second argument to console.error', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { captureException } = await import('../../lib/sentry')

    captureException(new Error('no context'))

    expect(spy).toHaveBeenCalledWith(
      '[ErrorBoundary]',
      expect.any(Error),
      undefined,
    )
  })

  it('does not throw when called with no context', async () => {
    const { captureException } = await import('../../lib/sentry')
    expect(() => captureException(new Error('test'))).not.toThrow()
  })

  it('does not throw when called with empty context', async () => {
    const { captureException } = await import('../../lib/sentry')
    expect(() => captureException(new Error('test'), {})).not.toThrow()
  })
})
