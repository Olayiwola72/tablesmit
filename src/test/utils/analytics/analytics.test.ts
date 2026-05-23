import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadAnalytics, trackEvent } from '../../../utils/analytics/analytics'

describe('loadAnalytics', () => {
  afterEach(() => {
    document.head.querySelector('#tablesmit-gtag')?.remove()
    vi.unstubAllEnvs()
  })

  it('creates a gtag script element and appends it to head', () => {
    vi.stubEnv('VITE_GA4_MEASUREMENT_ID', 'G-TEST123')
    loadAnalytics()
    const script = document.head.querySelector('#tablesmit-gtag')
    expect(script).toBeTruthy()
    expect(script).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST123')
    expect(script).toHaveProperty('async', true)
  })

  it('sets up window.dataLayer and calls gtag js + config', () => {
    vi.stubEnv('VITE_GA4_MEASUREMENT_ID', 'G-TEST123')
    window.dataLayer = []
    loadAnalytics()
    expect(window.dataLayer).toContainEqual(['js', expect.any(Date)])
    expect(window.dataLayer).toContainEqual(['config', 'G-TEST123'])
  })

  it('does nothing if GA_ID is not set', () => {
    vi.stubEnv('VITE_GA4_MEASUREMENT_ID', '')
    loadAnalytics()
    expect(document.head.querySelector('#tablesmit-gtag')).toBeNull()
  })

  it('does not create a duplicate script tag', () => {
    vi.stubEnv('VITE_GA4_MEASUREMENT_ID', 'G-TEST123')
    loadAnalytics()
    loadAnalytics()
    const scripts = document.head.querySelectorAll('#tablesmit-gtag')
    expect(scripts).toHaveLength(1)
  })
})

describe('trackEvent', () => {
  afterEach(() => {
    delete window.gtag
  })

  it('does not call gtag in dev mode', () => {
    window.gtag = vi.fn()
    trackEvent('test_event', { key: 'value' })
    expect(window.gtag).not.toHaveBeenCalled()
  })

  it('does not call gtag when GA_ID is missing', () => {
    vi.stubEnv('VITE_GA4_MEASUREMENT_ID', '')
    window.gtag = vi.fn()
    trackEvent('test_event', { key: 'value' })
    expect(window.gtag).not.toHaveBeenCalled()
  })
})
