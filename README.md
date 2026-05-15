# Structra

Structra is a minimalist table builder for analytical writing.

It is built for writers, analysts, researchers, and technical thinkers who need clean structured tables with control over headers, formatting, merging, resizing, and export without the noise of a spreadsheet.

## Features

- Generate custom tables up to the configured row and column limits.
- Edit cells directly in the table surface.
- Apply top, left, both, or no-header layouts.
- Pick header and content colors from configurable palettes.
- Use presets for schedules, checklists, pricing tables, contacts, and inventory.
- Merge and unmerge selected cell ranges.
- Set per-column types directly above the table.
- Apply column formatting for text, dates, numbers, currency, and amounts.
- AutoFit a column by double-clicking the right edge of a header cell.
- Export to PDF, PNG, JPEG, and Excel.
- Switch between light and dark mode.
- Switch supported interface languages.

## Tech Stack

- React
- TypeScript
- Vite
- SCSS
- `html2canvas` and `jspdf`, lazy-loaded only when image/PDF export is used
- `lucide-react` for icons

## Configuration

Product decisions live in [src/config.ts](src/config.ts):

- Brand name and tagline
- Export file base name
- Supported export formats
- Supported language metadata
- Table limits and sizing rules
- Column format options
- Header and content color palettes
- Presets
- Marketing/site copy
- Footer links

Start there before changing component logic.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Notes

- Export libraries are split into lazy chunks for better initial load performance.
- Excel export escapes cell content and neutralizes formula-like values to reduce spreadsheet injection risk.
- Table content is edited locally in the browser; the app does not upload cell data.
- Lower content sections use browser lazy rendering via `content-visibility`.
