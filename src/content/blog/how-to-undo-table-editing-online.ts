import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-undo-table-editing-online',
  title: 'How Undo Makes Online Table Editing Safer',
  date: '2026-05-26',
  description:
    'Learn how to undo table editing online with Tablesmit. The undo stack tracks every resize, merge, delete, or clear action you perform. Tablesmit makes i...',
  author: 'Olayiwola Akinnagbe',
  tags: ['undo', 'editing', 'productivity', 'tutorial', 'tables'],
  readTime: 4,
  featured: false,
  content: `## The one feature most table tools forget

Learn how to undo table editing online with Tablesmit. If you want undo to make online table editing safer, Tablesmit has a full snapshot stack. You are editing a table and accidentally hit Delete Row instead of Add Row. The row vanishes — along with the data you spent ten minutes entering. In most web table tools, that data is gone for good. There is no undo.

This is astonishing when you think about it. Every operating system, every text editor, every spreadsheet has undo. But somehow, most web table builders skip it. It is the single biggest reason experienced users avoid online table editors.

## How undo works in Tablesmit

[Tablesmit](/) tracks every significant change to your table in a snapshot-based undo stack:

- Adding or removing rows and columns
- Merging or unmerging cells
- Changing cell values
- Applying themes or border styles
- Importing data
- Clearing the table

The stack stores up to 50 snapshots. Each snapshot captures the full table state — cells, widths, heights, merged ranges, styles, colours. Undo restores the exact previous state, not a partial approximation.

## What undo does NOT cover

Some operations are excluded from the undo stack to keep the editor responsive:

- Cell selection changes (undo would be confusing)
- Caption text changes (typed character by character)
- Mouse movements during drag-to-resize

These are either too granular or non-destructive.

## How to use undo

- **Toolbar:** Click the Undo button (Undo2 icon) in the toolbar
- **Keyboard:** Ctrl+Z (Windows) / Cmd+Z (Mac)
- **Indicator:** The toolbar button shows a tooltip with the number of undoable actions: "Undo (3 actions)"

The button is disabled when there is nothing to undo — so you always know where you stand.

## Undo replaces the reset button

Older versions of table editors often include a "Reset" button that clears everything. In Tablesmit, Reset is replaced by Undo. The philosophy is simple: Undo respects your work. Reset destroys it. A user who makes a mistake needs a safety net, not a punishment.

## Undo in practice

- Make a change you do not like. Press Ctrl+Z. The previous state returns immediately.
- Experiment with a [table theme](/features/table-themes). If it does not work, undo it. Try another.
- Clear the whole table by accident. One undo restores everything.

The undo stack makes Tablesmit safe enough to experiment with — which is exactly what you need when you are learning a new tool or refining a complex table.`,
  relatedFeature: 'undo',
}

export default post
