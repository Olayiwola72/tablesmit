import type { ChangelogEntry } from './changelog.types'

const typeStyles: Record<ChangelogEntry['changes'][number]['type'], { bg: string; text: string; label: string }> = {
  added:    { bg: 'bg-success-light', text: 'text-success', label: 'Added' },
  fixed:    { bg: 'bg-info-light', text: 'text-info', label: 'Fixed' },
  improved: { bg: 'bg-accent-light', text: 'text-accent', label: 'Improved' },
  removed:  { bg: 'bg-danger-light', text: 'text-danger', label: 'Removed' },
}

export function getChangeStyle(type: ChangelogEntry['changes'][number]['type']): { bg: string; text: string; label: string } {
  return typeStyles[type]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.3.0',
    date: '2026-06-04',
    changes: [
      { type: 'fixed',    description: 'Restore accent color to original bright amber (#F59E0B) matching brand spec' },
      { type: 'improved', description: 'Responsive RowColumnActions — collapses to dropdown on lg- screens' },
      { type: 'improved', description: 'Reduce column type select height from 44px to 32px in TableHeaderCell' },
      { type: 'improved', description: 'Tighten toolbar spacing to prevent overflow on desktop' },
      { type: 'fixed',    description: 'Move trailing separator into MobileExportDropdown to avoid phantom separator' },
      { type: 'fixed',    description: 'Stack Navbar mobile drawer buttons vertically instead of cramped side-by-side' },
      { type: 'improved', description: 'Restructured types — merge.types.ts moved to utils/mergeUtils/; deleted stale type barrel files' },
      { type: 'improved', description: 'Extracted clipboardParser, tableHtmlBuilder, useCopyTable into dedicated services' },
      { type: 'improved', description: 'Replaced useBlogSearch/useFeatureSearch with generic useSearch hook + searchUtils' },
      { type: 'added',    description: 'useTableFocus hook — focus management extracted from merge logic' },
      { type: 'added',    description: 'useAutoFit hook — auto-fit column/row on double-click' },
      { type: 'added',    description: 'reducerHelpers — extracted from TableReducer for maintainability' },
      { type: 'fixed',    description: '5 pre-existing test failures — parameter ordering, act() wrapping, return value capture' },
    ],
  },
  {
    version: '1.2.3',
    date: '2026-05-23',
    changes: [
      { type: 'fixed',    description: 'PDF export failing on large tables — html2canvas retries at lower scale when initial render exceeds browser canvas limits' },
      { type: 'fixed',    description: 'Caption default alignment responsive — center on desktop, left on mobile, explicit user choice always respected' },
    ],
  },
  {
    version: '1.2.2',
    date: '2026-05-21',
    changes: [
      { type: 'improved', description: 'Lighthouse Performance 79 → 86 — unused JS reduced from 75 KiB to 1 KiB' },
      { type: 'improved', description: 'Sentry moved to dynamic import — no longer blocks initial page render' },
      { type: 'improved', description: 'PWA registration deferred to requestIdleCallback' },
      { type: 'improved', description: 'formatDate uses i18n.language instead of hardcoded en-GB' },
      { type: 'fixed',    description: 'TypeScript error in blogService.ts (escaped closure scope for load variable)' },
      { type: 'fixed',    description: 'Wrong import path in importService.types.ts' },
      { type: 'fixed',    description: 'Lint errors: removed synchronous setState in effects across 4 pages' },
      { type: 'fixed',    description: 'TestimonialsPage test — fixed mock path and removed duplicated tests' },
    ],
  },
  {
    version: '1.2.1',
    date: '2026-05-21',
    changes: [
      { type: 'added',    description: 'Pagination for blog and features list pages (6 per page)' },
      { type: 'fixed',    description: 'Language picker now visible in mobile navigation drawer' },
      { type: 'removed',  description: 'Duplicate English locale file (src/i18n/locales/en.json is the source)' },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-05-18',
    changes: [
      { type: 'added',    description: 'Blog — JSON-driven Markdown posts with auto-discovery' },
      { type: 'added',    description: 'Iframe-based print (Ctrl+P) preserves screen styling' },
      { type: 'added',    description: 'Logo 2 — T-form icon with brand blue header and opacity fade' },
      { type: 'added',    description: 'Multi-line caption with TextArea and right-click alignment menu' },
      { type: 'added',    description: 'Table state persistence across page reloads' },
      { type: 'added',    description: 'Column freeze — sticky header row and first column' },
      { type: 'added',    description: 'Find and Replace (Ctrl+F / Ctrl+H) within table cells' },
      { type: 'added',    description: 'Table theme picker — Dark header, Striped, Academic, Monochrome' },
      { type: 'improved', description: 'Three-context state split prevents cascade re-renders' },
      { type: 'improved', description: 'React.memo on TableCell — only edited cell re-renders' },
      { type: 'improved', description: 'Changelog page with versioned release notes' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-05-17',
    changes: [
      { type: 'added',    description: 'Dark mode with system preference detection' },
      { type: 'added',    description: 'Table caption and title field' },
      { type: 'added',    description: 'Word-style border picker' },
      { type: 'added',    description: 'Right-click context menu on cells and columns' },
      { type: 'added',    description: 'Smart clipboard paste from Excel, Word, and CSV' },
      { type: 'added',    description: 'Copy table as image or Excel data' },
      { type: 'added',    description: 'Auto-sum and auto-numbering column types' },
      { type: 'added',    description: 'AutoFit column width and row height on double-click' },
      { type: 'added',    description: 'Undo stack (Ctrl+Z)' },
      { type: 'improved', description: 'Smooth drag-to-resize using requestAnimationFrame' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-05-01',
    changes: [
      { type: 'added', description: 'Initial release' },
      { type: 'added', description: 'CSV and Excel import and export' },
      { type: 'added', description: 'Merge and unmerge cells' },
      { type: 'added', description: 'Custom header styles and colors' },
      { type: 'added', description: 'Responsive design. Works on all screen sizes.' },
    ],
  },
]
