import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('react-i18next', () => {
  const translations: Record<string, string> = {
    // testimonials
    'testimonials.heading': 'What People Are Saying',
    'testimonials.emptyHeading': 'No testimonials yet',
    'testimonials.emptyBody': 'We\'re collecting feedback from early users. If you\'ve used Tablesmit, we\'d love to hear from you.',
    'testimonials.shareExperience': 'Share your experience',
    'testimonials.orReachOnX': 'or reach out on',
    'testimonials.sourceOn': 'on {{source}}',
    'meta.testimonialsTitle': 'Testimonials — Tablesmit',
    // grid
    'grid.tableEditor': 'Table editor',
    'grid.selectCell': 'Select cell {{id}}',
    // aria
    'aria.closeMenuSearch': 'Close search',
    // export
    'export.exportAs': 'Export as',
    // aiFeatures
    'aiFeatures.description': 'AI features are in development. Join the waitlist.',
    'aiFeatures.joinWaitlist': 'Join Waitlist',
    // brand
    'brand.name': 'Tablesmit',
    'brand.tagline': 'Tables, your way.',
    'brand.description': 'A minimalist table builder for analytical writing — with full control over headers, formatting, and export.',
    'brand.aboutLine': 'Tablesmit was created by a writer who needed more control than basic table generators provided.',
    // nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.openSource': 'Open Source',
    'nav.changelog': 'Changelog',
    'nav.testimonials': 'Testimonials',
    // hero
    'hero.headline': 'Tables built for analytical writing.',
    'hero.subtext': 'A minimalist table builder for analytical writing — with full control over headers, formatting, and export.',
    'hero.cta': 'Create a Table',
    'hero.viewGitHub': 'View on GitHub',
    'hero.customHeaders': 'Custom headers',
    'hero.columnTypes': 'Column types',
    'hero.mergeCells': 'Merge cells',
    // toolbar
    'toolbar.templates': 'Templates',
    'toolbar.theme': 'Theme',
    'toolbar.addRow': 'Add Row',
    'toolbar.addColumn': 'Add Column',
    'toolbar.removeRow': 'Remove Row',
    'toolbar.removeColumn': 'Remove Column',
    'toolbar.merge': 'Merge',
    'toolbar.unmerge': 'Unmerge',
    'toolbar.import': 'Import',
    'toolbar.importCsv': 'Import from CSV',
    'toolbar.importExcel': 'Import from Excel',
    'toolbar.clearAll': 'Clear All',
    'toolbar.undo': 'Undo',
    'toolbar.copy': 'Copy',
    'toolbar.copyImage': 'Copy as Image',
    'toolbar.copyExcel': 'Copy as Excel Data',
    'toolbar.ai': 'AI',
    'toolbar.nothingToUndo': 'Nothing to undo',
    'toolbar.undoActions': 'Undo ({{count}} action)',
    'toolbar.undoActions_plural': 'Undo ({{count}} actions)',
    // export
    'export.exportButton': 'Export',
    'export.pdf': 'PDF',
    'export.png': 'PNG',
    'export.jpeg': 'JPEG',
    'export.excel': 'Excel',
    'export.csv': 'CSV',
    // aria
    'aria.mergeButton': 'Merge selected cells',
    'aria.undoButton': 'Undo. {{depth}} actions available.',
    'aria.undoDisabled': 'Nothing to undo',
    'aria.languageSelect': 'Select language',
    'aria.openMenu': 'Open menu',
    'aria.closeMenu': 'Close menu',
    'aria.closePanelOverlay': 'Close panel overlay',
    'aria.closePanel': 'Close panel',
    'aria.themeSelect': 'Select table theme',
    // table
    'table.gridSize': 'Grid Size',
    'table.rows': 'Rows',
    'table.columns': 'Columns',
    'table.limitInfo': 'Limit: {{rows}} rows x {{cols}} columns',
    'table.headerDefinitions': 'Header Definitions',
    'table.none': 'None',
    'table.firstRow': 'First Row',
    'table.firstColumn': 'First Column',
    'table.both': 'Both',
    'table.freezeHeaderRow': 'Freeze header row',
    'table.freezeFirstColumn': 'Freeze first column',
    'table.columnType': 'Column Type',
    'table.text': 'Text',
    'table.number': 'Number',
    'table.currency': 'Currency',
    'table.percentage': 'Percentage',
    'table.date': 'Date',
    'table.autoNumber': 'Auto-number',
    'table.sum': 'Sum',
    'table.showSumRow': 'Show sum row',
    'table.sortColumn': 'Sort column',
    'table.sortDisabledMsg': 'Clear merged cells to enable sorting',
    'table.mergeCells': 'Merge Cells',
    'table.selectCellsToMerge': 'Select two or more cells to merge.',
    'table.selectedRange': 'Selected: {{range}}',
    'table.mergedCell': 'Merged cell',
    'table.noSelection': 'No selection',
    'table.cannotMergeSingleCell': 'Cannot merge a single cell. Select a range of cells first.',
    'table.cellsMerged': 'Cells merged.',
    'table.cellsUnmerged': 'Cells unmerged.',
    'table.noMergeFound': 'No merge found in the selected range.',
    'table.findInTable': 'Find in table',
    'table.findAndReplace': 'Find and replace',
    'table.search': 'Search',
    'table.replace': 'Replace',
    'table.previousMatch': 'Previous match',
    'table.nextMatch': 'Next match',
    'table.replaceWith': 'Replace with',
    'table.replaceOne': 'Replace',
    'table.replaceAll': 'Replace All',
    'table.matchCount': '{{current}} of {{total}} matches',
    'table.noMatches': 'No matches',
    'table.confirmClearTitle': 'Clear table?',
    'table.confirmClearBody': 'This will remove all cell content. This action can be undone.',
    'table.confirmDelete': 'Delete',
    'table.confirmCancel': 'Cancel',
    'table.addCaption': 'Add a table title or caption (optional)',
    // grid
    'grid.keyboardHint': 'Ctrl+/ for shortcuts',
    'grid.rowsCount': '{{count}} rows',
    'grid.colsCount': '{{count}} columns',
    'grid.totalCells': '{{rows}} × {{cols}} table',
    // contextMenu
    'contextMenu.autoFitColumn': 'Auto-fit column width',
    'contextMenu.autoFitRow': 'Auto-fit row height',
    'contextMenu.changeBackground': 'Change cell background color',
    'contextMenu.changeTextColor': 'Change text color',
    'contextMenu.changeColumnType': 'Change column type',
    'contextMenu.insertRowAbove': 'Insert row above',
    'contextMenu.insertRowBelow': 'Insert row below',
    'contextMenu.insertColumnLeft': 'Insert column left',
    'contextMenu.insertColumnRight': 'Insert column right',
    'contextMenu.cut': 'Cut',
    'contextMenu.copy': 'Copy',
    'contextMenu.paste': 'Paste',
    'contextMenu.clearCell': 'Clear cell',
    'contextMenu.deleteRow': 'Delete row',
    'contextMenu.deleteColumn': 'Delete column',
    'contextMenu.sortAscending': 'Sort ascending',
    'contextMenu.sortDescending': 'Sort descending',
    'contextMenu.editCaption': 'Edit caption',
    'contextMenu.alignLeft': 'Align left',
    'contextMenu.alignCenter': 'Align center',
    'contextMenu.alignRight': 'Align right',
    // panels
    'panels.dimensions': 'Grid Size',
    'panels.headerOptions': 'Header Definitions',
    'panels.columnFormatting': 'Column Type',
    'panels.quickPresets': 'Templates',
    'panels.borderStyle': 'Borders',
    'panels.colorPicker': 'Colors',
    'panels.export': 'Export',
    'panels.theme': 'Theme',
    'panels.aiFeatures': 'AI Features',
    'panels.findReplace': 'Find & Replace',
    // colorPanel
    'colorPanel.headerColor': 'Header color',
    'colorPanel.contentColor': 'Content color',
    'colorPanel.noColor': 'No color',
    'colorPanel.customColor': 'Custom',
    // borderPanel
    'borderPanel.noBorder': 'No Border',
    'borderPanel.allBorders': 'All Borders',
    'borderPanel.outsideBorders': 'Outside Borders',
    'borderPanel.insideBorders': 'Inside Borders',
    'borderPanel.insideHorizontal': 'Inside Horizontal',
    'borderPanel.insideVertical': 'Inside Vertical',
    'borderPanel.topBorder': 'Top Border',
    'borderPanel.bottomBorder': 'Bottom Border',
    'borderPanel.leftBorder': 'Left Border',
    'borderPanel.rightBorder': 'Right Border',
    'borderPanel.thickBox': 'Thick Box Border',
    'borderPanel.doubleBorder': 'Double Border',
    'borderPanel.dashedBorder': 'Dashed Border',
    'borderPanel.dottedBorder': 'Dotted Border',
    'borderPanel.borderColor': 'Border color',
    'borderPanel.borderWeight': 'Border weight',
    'borderPanel.thin': 'Thin',
    'borderPanel.medium': 'Medium',
    'borderPanel.thick': 'Thick',
    'borderPanel.solid': 'Solid',
    'borderPanel.dotted': 'Dotted',
    'borderPanel.dashed': 'Dashed',
    'borderPanel.double': 'Double',
    // aiFeatures
    'aiFeatures.comingSoon': 'Coming soon',
    'aiFeatures.cleanData': 'Clean messy data',
    'aiFeatures.heading': 'AI Features',
    'aiFeatures.generateFromText': 'Generate from text',
    'aiFeatures.summarizeTable': 'Summarize table',
    'aiFeatures.waitlistMessage': 'AI features are coming soon! Reach out to share what you\'d like to see.',
    // shortcuts
    'shortcuts.title': 'Keyboard Shortcuts',
    'shortcuts.toggleList': 'to toggle this list.',
    // blog
    'blog.heading': 'Writing about tables, structure, and analytical thinking.',
    'blog.featured': 'Featured',
    'blog.minRead': '{{count}} min read',
    'blog.openTablesmit': 'Open Tablesmit',
    'blog.ctaTitle': 'Try Tablesmit for yourself — free, no signup required.',
    'blog.backToBlog': 'Back to Blog',
    // notFound
    'notFound.heading': 'Page not found.',
    'notFound.body': 'That URL doesn\'t exist. Let\'s get you back to building.',
    'notFound.cta': 'Back to Home',
    // footer
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.home': 'Home',
    'footer.openSource': 'Open Source',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.github': 'GitHub',
    'footer.pdf': 'PDF',
    'footer.png': 'PNG',
    'footer.jpeg': 'JPEG',
    'footer.excel': 'Excel',
    'footer.csv': 'CSV',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfUse': 'Terms of Use',
    'footer.copyright': 'Tables, your way.',
    'footer.license': 'Open source under MIT license.',
    // features UI
    'features.cta': 'Open Tablesmit',
    // toast
    'toast.importSuccess': 'Table imported. {{rows}} rows, {{cols}} columns.',
    'toast.importError': 'Could not read file. Check the format and try again.',
    'toast.exportSuccess': 'Table exported as {{format}}.',
    'toast.exportError': 'Export failed. Try reducing the table size.',
    'toast.tableCleared': 'Table cleared.',
    'toast.undoEmpty': 'Nothing left to undo.',
    'toast.copyData': 'Table data copied. Paste into Excel or Google Sheets.',
    'toast.copyImage': 'Table copied as image.',
    'toast.aiWaitlist': 'AI features are coming soon! Reach out to share what you\'d like to see.',
    // themePicker
    'themePicker.selectTheme': 'Select table theme',
    'themePicker.default': 'Default',
    'themePicker.minimal': 'Minimal',
    'themePicker.darkHeader': 'Dark Header',
    'themePicker.striped': 'Striped',
    'themePicker.academic': 'Academic',
    'themePicker.monochrome': 'Monochrome',
    // features
    'features.heading': 'Features',
    'features.subtext': 'Every feature you need to build clean, structured tables.',
    'features.learnMore': 'Learn more',
    'features.emptyState': 'No features listed yet.',
    // errors
    'errors.somethingWrong': 'Something went wrong.',
    'errors.unexpectedError': 'An unexpected error occurred.',
    'errors.reload': 'Reload the page',
    // cookieConsent
    'cookieConsent.message': 'This site uses cookies for analytics. No personal data is collected.',
    'cookieConsent.learnMore': 'Learn more',
    'cookieConsent.learnMoreAria': 'Learn more about our privacy policy',
    'cookieConsent.accept': 'Accept',
    'cookieConsent.decline': 'Decline',
    'cookieConsent.dialogAria': 'Cookie consent',
  }
  function interpolate(value: string, opts?: Record<string, unknown>): string {
    if (!opts) return value
    return Object.entries(opts).reduce((str, [k, v]) => str.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v)), value)
  }

  return {
    useTranslation: () => ({
      t: (key: string, opts?: Record<string, unknown> | string) => {
        const effectiveOpts = typeof opts === 'string' ? { defaultValue: opts } : (opts ?? {})
        if (effectiveOpts.defaultValue) return effectiveOpts.defaultValue as string
        const value = translations[key] ?? key
        return interpolate(value, effectiveOpts)
      },
      i18n: { language: 'en', changeLanguage: vi.fn() },
    }),
  }
})

/* DataTransfer + ClipboardEvent polyfill for jsdom (used by clipboard paste tests) */
if (typeof DataTransfer === 'undefined') {
  const DataTransferMock = class DataTransfer {
    data: Record<string, string> = {}
    setData(type: string, value: string): void { this.data[type] = value }
    getData(type: string): string { return this.data[type] ?? '' }
    get types(): string[] { return Object.keys(this.data) }
    get items(): DataTransferItem[] {
      return Object.entries(this.data).map(
        ([type, value]) => ({ type, kind: 'string' as const, getAsString: (cb: (s: string) => void) => cb(value) }) as unknown as DataTransferItem,
      )
    }
    get files(): FileList { return [] as unknown as FileList }
    clearData(): void { this.data = {} }
  }
  globalThis.DataTransfer = DataTransferMock as unknown as typeof DataTransfer
}

if (typeof ClipboardEvent === 'undefined') {
  globalThis.ClipboardEvent = class ClipboardEvent extends Event {
    clipboardData: DataTransfer | null
    constructor(type: string, opts?: ClipboardEventInit) {
      super(type, opts)
      this.clipboardData = opts?.clipboardData ?? null
    }
  } as unknown as typeof ClipboardEvent
}

afterEach(() => {
  cleanup()
})
