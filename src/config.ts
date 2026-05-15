import { siteConfig } from './config/siteConfig'
import {
  AUTOFIT_PADDING,
  DEFAULT_COLS,
  DEFAULT_ROWS,
  MAX_COLS,
  MAX_COLUMN_WIDTH,
  MAX_ROWS,
  MIN_COLUMN_WIDTH,
} from './config/tableDefaults'

export const appConfig = {
  brand: {
    name: siteConfig.brand.name,
    shortName: 'ST',
    tagline: siteConfig.brand.tagline,
  },
  exportFileBaseName: siteConfig.exportFileBaseName,
  table: {
    initialRows: DEFAULT_ROWS,
    initialColumns: DEFAULT_COLS,
    maxRows: MAX_ROWS,
    maxColumns: MAX_COLS,
    minColumnWidth: MIN_COLUMN_WIDTH,
    maxColumnWidth: MAX_COLUMN_WIDTH,
    autoFitPadding: AUTOFIT_PADDING,
  },
  columnFormats: siteConfig.columnFormats,
  presets: siteConfig.presets.map((preset) => ({
    name: preset.label,
    rows: preset.rows,
    cols: preset.cols,
    headerMode:
      preset.headerStyle === 'first-row'
        ? 'top'
        : preset.headerStyle === 'first-column'
          ? 'left'
          : preset.headerStyle,
    data: preset.data ?? [],
  })),
  exports: siteConfig.exports.map((item) => ({
    ...item,
    format: item.format === 'excel' ? 'xls' : item.format,
  })),
  colorPalettes: {
    defaultHeader: siteConfig.colors.defaultHeader,
    defaultContent: siteConfig.colors.defaultContent,
    header: siteConfig.colors.header.map((swatch) => swatch.value),
    content: siteConfig.colors.content.map((swatch) => swatch.value),
  },
  languageMeta: {
    English: { code: 'en', dir: 'ltr' },
  },
  footer: {
    links: ['Home', 'Features', 'Open Source', 'About', 'Contact'],
    note: 'Tables, your way. Built for clear thinking and precise publishing.',
  },
} as const

export type SupportedExport = (typeof appConfig.exports)[number]['format']
export type SupportedLanguage = keyof typeof appConfig.languageMeta
