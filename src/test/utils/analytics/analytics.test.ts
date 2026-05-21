import { describe, expect, it, vi } from 'vitest'
import { trackEvent } from '../../../utils/analytics/analytics'

describe('trackEvent', () => {
  it('does not call gtag in dev mode', () => {
    window.gtag = vi.fn()
    trackEvent('test_event', { key: 'value' })
    expect(window.gtag).not.toHaveBeenCalled()
  })
})
