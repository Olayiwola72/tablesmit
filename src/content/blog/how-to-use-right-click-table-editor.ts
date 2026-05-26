import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-use-right-click-table-editor',
  title: 'How to Use Right-Click in an Online Table Editor',
  date: '2026-05-31',
  description:
    'Right-click any cell or column header to access AutoFit, insert and delete rows or columns, sort, copy, and paste — without reaching for the toolbar.',
  author: 'Olayiwola Akinnagbe',
  tags: ['context menu', 'right-click', 'productivity', 'tutorial', 'tables'],
  readTime: 4,
  featured: false,
  content: `## The fastest way to edit tables

The toolbar is useful, but the context menu is faster. Right-clicking the element you want to modify skips the mental step of finding the right button in the toolbar.

Tablesmit includes a full right-click context menu on every cell and column header. It mirrors the most common table operations so you never have to leave your workflow.

## Cell context menu

Right-click any data cell to see:

- **Auto-fit column width** — adjusts the column to fit the widest cell
- **Auto-fit row height** — adjusts the row to fit the tallest cell
- **Background color** — opens a color picker for the selected cells
- **Text color** — opens a color picker for text
- **Column type** — changes the type of the current column (Text, Number, Currency, Percentage, Date)
- **Insert row above / below** — adds a new row at the click position
- **Insert column left / right** — adds a new column at the click position
- **Cut / Copy / Paste** — standard clipboard operations
- **Clear cell** — empties the cell content
- **Delete row** — removes the entire row
- **Delete column** — removes the entire column

## Column header context menu

Right-click a column header for column-specific operations:

- **Auto-fit column width** — resize to content
- **Sort ascending / descending** — sort the table by this column
- **Column type** — change the data format
- **Background color** — applies to the entire column
- **Insert column left / right**
- **Delete column**

## When the context menu saves the most time

**Editing a large table.** Instead of scrolling to the toolbar, right-click where you are. Insert a row. Delete a column. Adjust width. The context menu keeps your focus on the data.

**Sorting quickly.** Click a header, right-click, choose sort. No need to find the sort button or navigate a dialog.

**Formatting individual cells.** Right-click to change a cell's background or text color without selecting it from a panel.

## The toolbar vs context menu balance

The toolbar is best for batch operations and first-time discovery (seeing all buttons at once). The context menu is best for fast, targeted edits when you already know what you want to do.

Both are always available. Use whichever fits the moment.`,
  relatedFeature: 'context-menu',
}

export default post
