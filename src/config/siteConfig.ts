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
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Open Source', href: '/#open-source' },
    { label: 'About', href: '/about' },
  ],
} as const
