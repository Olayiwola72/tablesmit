import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-find-and-replace-in-table',
  title: 'How to Find and Replace Text in a Table Online',
  date: '2026-04-18',
  description:
    'The browser\'s built-in find bar does not navigate between table cells. Here is a table-aware find and replace that works inside your data.',
  author: 'Olayiwola Akinnagbe',
  tags: ['find and replace', 'search table', 'tutorial'],
  readTime: 3,
  featured: false,
  content: `## Why the browser find bar is not enough

The browser's find function (Ctrl+F) searches the entire page as flat text. In a table editor, this has two problems. First, it highlights text anywhere on the page — including the toolbar, sidebars, and navigation — cluttering the results. Second, it cannot help you replace values. You find a cell, you edit it manually, you repeat.

For a table with dozens or hundreds of cells, a table-aware find and replace saves significant time.

## How it works in Tablesmit

Tablesmit's find and replace panel opens with Ctrl+F (find only) or Ctrl+H (find and replace). The panel sits at the top-right of the table area — floating above the data so you can see the table while you search.

### Find mode

Type any text into the search input. Tablesmit scans every cell in the table and highlights matching cells with a soft amber background. The panel shows a match counter — "3 of 12 matches" — so you know how many cells contain the text and where you are in the list.

Use the up and down arrows to jump between matches. The active match is outlined with an amber ring for clear focus.

Search is case-insensitive by default. The panel includes a case-sensitive toggle for when capitalisation matters.

### Replace mode

With Ctrl+H, an additional replace input appears below the search field.

- **Replace** — replaces the current active match only and advances to the next match.
- **Replace all** — replaces every match in the table in a single operation. This is registered as one undo entry, so you can reverse it with a single Ctrl+Z.

### Example workflow

You have a research table where "N/A" appears in twelve cells across four columns. You need to change them all to "—".

1. Press Ctrl+H to open the replace panel.
2. Type "N/A" in the search field. All twelve cells highlight.
3. Type "—" in the replace field.
4. Click **Replace all**.
5. All twelve cells update in one step. Press Ctrl+Z if you need to revert.

## What is searchable

The find and replace operates on cell values only. It does not search column headers in the header row, colour codes, column types, or metadata. If you need to rename a column header, edit it directly in the header cell.

## Keyboard shortcuts

| Action | Shortcut |
|---|---|
| Open find panel | Ctrl+F |
| Open replace panel | Ctrl+H |
| Next match | Enter (in search field) |
| Previous match | Shift+Enter (in search field) |
| Close panel | Escape |

## When find and replace is most useful

- Renaming a category label that appears across multiple rows
- Standardising inconsistent data entry (e.g. "n/a", "N/A", "NA" to "—")
- Updating product names or version numbers in a comparison table
- Cleaning imported data where the same value appears in many cells

Open [Tablesmit](/), press Ctrl+F, and search your table data.`,
  relatedFeature: 'find-replace',
}

export default post
