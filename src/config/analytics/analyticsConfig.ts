export const ANALYTICS_CONFIG = {
  scriptId: 'tablesmit-gtag',
  baseUrl: 'https://www.googletagmanager.com/gtag/js?id=',
  envVar: 'VITE_GA4_MEASUREMENT_ID',
  commands: {
    js: 'js',
    config: 'config',
    event: 'event',
  },
} as const
