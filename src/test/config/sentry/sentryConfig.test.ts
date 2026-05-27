import { describe, expect, it } from 'vitest'
import { SENTRY_OPTIONS } from '../../../config/sentry/sentryConfig'

describe('SENTRY_OPTIONS', () => {
  it('environment is production', () => {
    expect(SENTRY_OPTIONS.environment).toBe('production')
  })

  it('sendDefaultPii is false', () => {
    expect(SENTRY_OPTIONS.sendDefaultPii).toBe(false)
  })

  it('tracesSampleRate is 0.1', () => {
    expect(SENTRY_OPTIONS.tracesSampleRate).toBe(0.1)
  })

  it('enableLogs is true', () => {
    expect(SENTRY_OPTIONS.enableLogs).toBe(true)
  })

  it('consoleLogLevels has log, warn, error', () => {
    expect(SENTRY_OPTIONS.consoleLogLevels).toEqual(['log', 'warn', 'error'])
  })

  it('consoleLogLevels has exactly 3 levels', () => {
    expect(SENTRY_OPTIONS.consoleLogLevels).toHaveLength(3)
  })
})
