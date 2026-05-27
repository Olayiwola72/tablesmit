import { describe, expect, it } from 'vitest'
import { ANALYTICS_CONFIG } from '../../../config/analytics/analyticsConfig'

describe('ANALYTICS_CONFIG', () => {
  it('has a scriptId', () => {
    expect(ANALYTICS_CONFIG.scriptId).toBe('tablesmit-gtag')
  })

  it('has a baseUrl', () => {
    expect(ANALYTICS_CONFIG.baseUrl).toBe('https://www.googletagmanager.com/gtag/js?id=')
  })

  it('has an envVar', () => {
    expect(ANALYTICS_CONFIG.envVar).toBe('VITE_GA4_MEASUREMENT_ID')
  })

  it('has js, config, and event commands', () => {
    expect(ANALYTICS_CONFIG.commands.js).toBe('js')
    expect(ANALYTICS_CONFIG.commands.config).toBe('config')
    expect(ANALYTICS_CONFIG.commands.event).toBe('event')
  })
})
