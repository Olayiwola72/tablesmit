import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadAnalytics, trackEvent } from '../../../utils/analytics/analytics'
import { ANALYTICS_CONFIG } from '../../../config/analytics/analyticsConfig'

const TEST_ID = 'G-TEST123'

describe('loadAnalytics', () => {
  afterEach(() => {
    document.head.querySelector(`#${ANALYTICS_CONFIG.scriptId}`)?.remove()
    vi.unstubAllEnvs()
  })

  it('creates a gtag script element and appends it to head', () => {
    vi.stubEnv(ANALYTICS_CONFIG.envVar, TEST_ID)
    loadAnalytics()
    const script = document.head.querySelector(`#${ANALYTICS_CONFIG.scriptId}`)
    expect(script).toBeTruthy()
    expect(script).toHaveAttribute('src', `${ANALYTICS_CONFIG.baseUrl}${TEST_ID}`)
    expect(script).toHaveProperty('async', true)
  })

  it('sets up window.dataLayer and calls gtag js + config', () => {
    vi.stubEnv(ANALYTICS_CONFIG.envVar, TEST_ID)
    window.dataLayer = []
    loadAnalytics()
    expect(window.dataLayer).toContainEqual([ANALYTICS_CONFIG.commands.js, expect.any(Date)])
    expect(window.dataLayer).toContainEqual([ANALYTICS_CONFIG.commands.config, TEST_ID])
  })

  it('does nothing if GA_ID is not set', () => {
    vi.stubEnv(ANALYTICS_CONFIG.envVar, '')
    loadAnalytics()
    expect(document.head.querySelector(`#${ANALYTICS_CONFIG.scriptId}`)).toBeNull()
  })

  it('does not create a duplicate script tag', () => {
    vi.stubEnv(ANALYTICS_CONFIG.envVar, TEST_ID)
    loadAnalytics()
    loadAnalytics()
    const scripts = document.head.querySelectorAll(`#${ANALYTICS_CONFIG.scriptId}`)
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
    vi.stubEnv(ANALYTICS_CONFIG.envVar, '')
    window.gtag = vi.fn()
    trackEvent('test_event', { key: 'value' })
    expect(window.gtag).not.toHaveBeenCalled()
  })
})
