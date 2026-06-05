import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'table-builder-keyboard-shortcuts-guide',
  title: '10 Table Builder Keyboard Shortcuts',
  date: '2026-05-22',
  description:
    'Master every shortcut in this table builder keyboard shortcuts guide from Tablesmit. Navigate and format without touching your mouse. Tablesmit makes it...',
  author: 'Olayiwola Akinnagbe',
  tags: ['shortcuts', 'productivity', 'keyboard', 'tutorial', 'tables'],
  readTime: 5,
  featured: true,
  content: `## Why keyboard shortcuts matter

This table builder keyboard shortcuts guide covers every Tablesmit shortcut. [Table builder keyboard shortcuts](/features/keyboard-shortcuts) save you minutes of wasted motion every editing session. Every time your hand moves from keyboard to mouse and back, you lose a fraction of a second. Over the course of editing a table, those fractions add up to minutes of lost time. Keyboard shortcuts eliminate the movement entirely.

Tablesmit has a full set of keyboard shortcuts for every major operation. Here are the ten that will change how you work.

## 1. Navigate cells with Arrow keys

Use the arrow keys to move between cells. Up, Down, Left, Right — each press moves to the adjacent cell. No clicking needed.

Pro tip: hold Shift while pressing an arrow key to extend the selection range for merging or formatting.

## 2. Tab and Shift+Tab

Tab moves to the next cell (rightward, then down to the next row). Shift+Tab moves backward. This is the fastest way to fill data across a table row by row.

## 3. Ctrl+Z — Undo

The most important shortcut in any application. Undo the last action. Works for cell edits, structural changes, theme applications, and more. The undo stack holds up to 50 actions.

## 4. Ctrl+F / Ctrl+H — Find and Replace

Ctrl+F opens the [find and replace](/features/find-replace) panel. Type to search across all cell values. Use the ▲ and ▼ buttons to jump between matches. Ctrl+H opens find and replace — enter the search term and replacement, then click Replace or Replace All.

Matches are highlighted in amber. The active match has an amber ring around it.

## 5. Ctrl+C — Copy

Copies the selected cell value to clipboard. Works the same as standard text copy. To copy the entire table in different formats, use the Copy dropdown in the toolbar.

## 6. Ctrl+V — Paste

Paste content from your clipboard. Tablesmit automatically detects the format:

- HTML tables from Excel or Word → full table paste with formatting
- LaTeX tabular → parsed and converted to cells
- Markdown pipe tables → parsed into rows and columns
- TSV or CSV → split into cells
- Plain text → pasted directly into the selected cell

## 7. Enter and Escape

- **Enter** on a selected cell enters edit mode (contentEditable).
- **Escape** exits edit mode without saving changes.

## 8. Double-click to auto-fit

Double-click a column resize handle to auto-fit that column to its content. Double-click a row resize handle to auto-fit the row height. Available from the keyboard by tabbing to the resize handle and pressing Enter twice (simulating double-click).

## 9. Ctrl+/ — Open shortcuts modal

Press **Ctrl+/** at any time to open the Keyboard Shortcuts modal. It lists every available shortcut with its key combination. This is the fastest way to discover shortcuts you have not memorised yet.

## 10. Ctrl+P — Print

Ctrl+P opens the browser print dialog with print-specific styles. The table renders full-width, borders are preserved, header rows have a light grey background (ink-saving), and the toolbar and sidebars are hidden.

## Full shortcut reference

| Action | Shortcut |
|---|---|
| Undo | Ctrl+Z |
| Find | Ctrl+F |
| Find and Replace | Ctrl+H |
| Copy cell | Ctrl+C |
| Paste | Ctrl+V |
| Print | Ctrl+P |
| Open shortcuts | Ctrl+/ |
| Navigate cells | Arrow keys |
| Extend selection | Shift+Arrow keys |
| Next cell | Tab |
| Previous cell | Shift+Tab |
| Enter edit mode | Enter |
| Exit edit mode | Escape |

## Making shortcuts a habit

Start with three: **Arrow keys** for navigation, **Ctrl+Z** for undo, and **Ctrl+F** for find. Once those feel natural, add **Tab** for data entry and **Ctrl+/** for discovering new shortcuts.

Every shortcut you learn is one less trip to the toolbar.`,
  relatedFeature: 'keyboard-shortcuts',
}

export default post
