export const SENTRY_OPTIONS = {
  environment: 'production' as const,
  sendDefaultPii: false,
  tracesSampleRate: 0.1,
  enableLogs: true,
  consoleLogLevels: ['log', 'warn', 'error'] as Array<'log' | 'warn' | 'error'>,
} as const
