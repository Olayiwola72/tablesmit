import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-freeze-header-row-in-table',
  title: 'How to Freeze a Header Row in a Table So It Stays Visible While Scrolling',
  date: '2026-05-11',
  description:
    'When a table is tall enough to scroll, the header disappears. Freezing the header row keeps column labels visible while you scroll through your data.',
  author: 'Olayiwola Akinnagbe',
  tags: ['freeze header', 'sticky row', 'tutorial'],
  readTime: 3,
  featured: false,
  content: `## The problem with scrolling tables

A table with ten rows fits on most screens. A table with twenty or thirty rows does not. Once you scroll down, the header row disappears and you can no longer see which column is which. You scroll back up, check the header, scroll down again — the friction adds up.

Spreadsheet applications solved this years ago with freeze panes. The header row stays pinned at the top while the rest of the table scrolls beneath it. Web table tools have been slower to adopt the pattern.

## What freeze panes look like

When freeze is active, the header row remains fixed at the top of the table during scroll. A thin line in the primary colour marks the boundary between the frozen area and the scrollable rows. The rest of the table behaves normally — you scroll down, the data moves, the headers stay.

You can also freeze the first column independently, which is useful for tables where the row labels are in the leftmost column.

## How to freeze a header row in Tablesmit

Tablesmit supports freeze panes for both the header row and the first column.

### Freeze the header row

1. Open your table in [Tablesmit](/).
2. Locate the Header Options panel in the left sidebar.
3. Check the box labelled **Freeze header row**.
4. Scroll through your table. The header row stays pinned at the top.

### Freeze the first column

1. In the same Header Options panel, check **Freeze first column**.
2. The first column stays pinned to the left as you scroll horizontally.

### Freeze both

Check both options. The top-left cell receives the highest z-index layer so it remains correctly positioned when both the header and first column are frozen.

## When to use each option

| Scenario | Freeze setting |
|---|---|
| A long table of research data with column headers | Freeze header row |
| A wide table with row labels in the first column | Freeze first column |
| A table that is both tall and wide | Freeze both |
| A small table that fits on one screen | Neither |

## What freeze does not affect

Freeze panes are a view-only feature. They do not change the underlying data, affect exports, or alter how the table prints. When you export to PDF or Excel, the table exports in full with no frozen panes — the freeze is a screen convenience only.

The frozen area is purely CSS-based (position: sticky on the relevant cells). There is no JavaScript recalculating positions during scroll, so there is no performance cost.

## Try it

Open [Tablesmit](/), create a table with at least fifteen rows, and toggle the freeze header option. Scroll and see the headers stay in place.`,
}

export default post
