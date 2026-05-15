import { exportFormats } from './exportConfig'
import { headerColorSwatches, contentColorSwatches } from './colorPalette'
import { presets } from './presets'

export const siteConfig = {
  brand: {
    name: 'Structra',
    tagline: 'Tables, your way.',
    githubUrl: 'https://github.com/Olayiwola72/structra',
  },
  exportFileBaseName: 'structra-table',
  exports: exportFormats,
  colors: {
    defaultHeader: '#1E293B',
    defaultContent: '#111827',
    header: headerColorSwatches,
    content: contentColorSwatches,
  },
  presets,
  columnFormats: [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'currency', label: 'Currency' },
    { value: 'percentage', label: 'Percentage' },
    { value: 'date', label: 'Date' },
  ],
  routes: {
    home: '/',
    app: '/app',
    about: '/about',
    contact: '/contact',
    openSource: '/open-source',
  },
  nav: [
    { label: 'Home', route: 'home' },
    { label: 'Open Source', route: 'openSource' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ],
} as const
