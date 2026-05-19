import type { BlogPost } from '../../types/blog.types'

const post: BlogPost = {
  slug: 'merge-cells-online-table',
  title: 'How to Merge Cells in an Online Table',
  date: '2025-10-15',
  description: 'Merging cells in a web table editor is surprisingly rare. Here is how Tablesmit handles it and why it matters.',
  author: 'Olayiwola Akinnagbe',
  tags: ['merge', 'tables', 'tutorial'],
  readTime: 3,
  featured: false,
  content: `## Why merge cells?

Merged cells let you create headers that span multiple columns, group related data under a common label, or create visual structure in your table.

## How to merge in Tablesmit

1. Click a cell to start your selection.
2. Shift-click another cell to select a range.
3. Click the Merge button in the toolbar.

The selected cells combine into one, with the content of the top-left cell preserved.

## Unmerging

To unmerge, select any cell in a merged range and click Unmerge. The individual cells are restored with their original borders.

## Limitations

- You cannot merge a single cell. Select at least a 2×2 range.
- Sorting is disabled when merged ranges exist. Clear merges to enable sorting.
- Merged cells that overlap with other merges are not allowed.

## Use cases

- **Table titles:** Merge the entire top row for a title that spans all columns.
- **Category headers:** Merge two cells in a column to group sub-items.
- **Multi-line labels:** Merge several cells in the first column for a label that describes multiple rows.

[Try merging cells in Tablesmit](/app).`,
}

export default post
