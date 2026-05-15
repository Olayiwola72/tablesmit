# Structra

**Tables, your way.**

A minimalist table builder for analytical writing — with full control over headers, formatting, and export.

Built for writers, analysts, researchers, and technical thinkers who need clean structured tables without the noise of a spreadsheet.

## Features

- Customizable table dimensions up to configured limits.
- Inline cell editing.
- Multiple header layouts: top, left, both, or none.
- Header and content color palettes.
- Preset templates for schedules, checklists, pricing, contacts, and inventory.
- Merge and unmerge cell ranges.
- Per-column type formatting (text, number, currency, percentage, date).
- AutoFit columns by double-clicking resize handles.
- Drag-to-resize columns and rows with smooth ghost indicators.
- Export to PDF, PNG, JPEG, and Excel.
- Import from CSV and Excel.
- Dark mode support.

## Tech Stack

| Layer       | Technology                                           |
|-------------|------------------------------------------------------|
| Framework   | React 18 + Vite                                      |
| Language    | TypeScript (`strict: true`)                          |
| Styling     | Tailwind CSS v3                                      |
| Components  | shadcn/ui (Radix primitives)                         |
| Icons       | Lucide React                                         |
| Drag/Resize | @dnd-kit                                             |
| Export      | jsPDF, html2canvas, SheetJS                          |
| Import      | PapaParse (CSV), SheetJS (Excel)                     |
| Testing     | Vitest + React Testing Library                       |
| Routing     | React Router v6                                      |

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start development server       |
| `npm run build`   | Type-check and build for prod  |
| `npm run preview` | Preview production build       |
| `npm test`        | Run tests                      |
| `npm run lint`    | Run ESLint                     |

## Configuration

Product decisions live in `src/config/siteConfig.ts`:

- Brand name, tagline, GitHub URL
- Route paths
- Export formats
- Column format options
- Color palettes
- Presets
- Navigation links

Start there before changing component logic.

## Architecture

- Every page is lazy-loaded via `React.lazy()`.
- Heavy feature panels (Export, Presets, Column Formatting) are lazy-loaded inside the table maker.
- State lives in `TableContext` — no external state library.
- Export uses a strategy pattern: adding a new format means adding a new class.
- Utility functions are pure — zero React dependencies.

## License

MIT. See [LICENSE](LICENSE).
