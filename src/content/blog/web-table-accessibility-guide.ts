import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'web-table-accessibility-guide',
  title: 'Web Table Accessibility — How to Make Tables Usable With a Screen Reader',
  date: '2026-03-27',
  description:
    'Tables are one of the hardest HTML elements to navigate with a screen reader. Here is how to build tables that work for everyone.',
  author: 'Olayiwola Akinnagbe',
  tags: ['accessibility', 'screen reader', 'a11y'],
  readTime: 4,
  featured: false,
  content: `## Why table accessibility matters

Tables present information in two dimensions — rows and columns. Sighted users scan a table by looking at the headers and moving their eyes across the grid. Screen reader users cannot scan visually. They navigate the table cell by cell, and without the proper structure, each cell is an isolated piece of data with no context.

A screen reader needs to announce the row and column position of each cell as the user navigates. Without this announcement, the user hears plain text values without knowing which row or column they belong to.

Accessible tables benefit everyone, not just screen reader users. Keyboard navigation helps power users move through data quickly. Clear headers and structure help people with cognitive disabilities parse information. Proper labelling helps search engines understand the table content.

## The ARIA grid pattern

The WAI-ARIA specification defines a **grid** pattern for interactive tables — tables where cells can be selected, edited, or navigated with arrow keys. This is different from a static data table (which uses native \`<table>\` semantics).

An accessible table editor grid requires:

### 1. Correct roles

The container element gets \`role="grid"\` with a descriptive label. Each row gets \`role="row"\` with an \`aria-rowindex\` attribute. Each cell gets \`role="gridcell"\` or \`role="columnheader"\` with \`aria-colindex\`.

\`\`\`html
<div role="grid" aria-label="Table editor" aria-rowcount="5" aria-colcount="4">
  <div role="row" aria-rowindex="1">
    <div role="columnheader" aria-colindex="1" scope="col">Product</div>
    <div role="columnheader" aria-colindex="2" scope="col">Price</div>
  </div>
  <div role="row" aria-rowindex="2">
    <div role="gridcell" aria-colindex="1" aria-selected="false">Widget</div>
    <div role="gridcell" aria-colindex="2" aria-selected="false">19.99</div>
  </div>
</div>
\`\`\`

### 2. Indication of selected state

When a cell is selected, \`aria-selected="true"\` is set on the cell element. This lets the screen reader announce "Widget, column 1, row 2, selected" as the user navigates.

### 3. Live region announcements

Structural changes to the table — rows added or removed, cells merged, data cleared — are announced via a live region (\`aria-live="polite"\`). The announcement is minimal: "Row added. 6 rows total." or "Cells merged."

The screen reader reads these announcements without interrupting the user's current action.

## Merged cells

Merged cells present a difficulty for screen readers because the cell spans multiple rows or columns. The correct approach is to use \`aria-colspan\` and \`aria-rowspan\` on the anchor cell of the merge, and mark the absorbed cells with \`aria-hidden="true"\`.

Tablesmit handles this automatically when you merge cells. The anchor cell gets the correct ARIA span attributes, and hidden cells are removed from the accessibility tree.

## Colour alone is not sufficient

Tablesmit uses a combination of indicators for cell state, not colour alone:
- Selected cells show a visible ring (\`ring-2 ring-primary ring-inset\`)
- Colour swatches show a checkmark icon for the selected state
- Merged cells use both a background colour change (\`bg-primary-light\`) and the merged range label
- Focus indication uses \`:focus-visible\` outlines (keyboard navigation only — mouse clicks do not show the outline)

## Colour contrast

Tablesmit's colour palette meets WCAG 2.1 AA standards:
- Body text against white background: 12:1 (passes)
- Body text against dark mode background: 13:1 (passes)
- Muted text against white: 4.7:1 (passes, exceeds 4.5:1 minimum)
- Muted text against dark background: 5.1:1 (passes)
- Primary blue (#1E40AF) against white: 9:1 for text (passes)
- Accent amber against white: 5.2:1 for text (passes)

## Keyboard navigation

An accessible table grid supports full keyboard navigation without a mouse:

| Key | Action |
|---|---|
| Arrow keys | Move focus between cells in the grid |
| Tab | Move to the next cell or control |
| Shift+Tab | Move to the previous cell |
| Enter | Enter edit mode on the focused cell |
| Escape | Exit edit mode, return focus to the cell |
| Ctrl+Z | Undo last action |
| Ctrl+F | Open find panel |
| Ctrl+H | Open find and replace panel |

These keyboard bindings are set on the grid container, not on individual cells, so the arrow keys navigate the grid rather than scrolling the page.

## Reduced motion

Users with vestibular disorders can experience discomfort from animations. Tablesmit applies \`motion-reduce:transition-none\` to all animated elements. When the user's system is set to "reduce motion" in accessibility settings, all transitions, animations, and hover effects are disabled.

## Testing table accessibility

To verify your tables are accessible:

1. Navigate the table using only the keyboard (Tab and arrow keys). Every cell should be reachable and editable.
2. Test with a screen reader. NVDA (Windows, free) and VoiceOver (Mac, built-in) both support the ARIA grid pattern. Navigate the table and confirm the screen reader announces column and row positions.
3. Use a colour contrast checker on all text and background combinations.
4. Enable "reduce motion" in your system settings and confirm no animations play.

## Tablesmit's accessibility status

Tablesmit implements the full ARIA grid pattern, keyboard navigation, proper colour contrast, and screen reader announcements as described above. The icon-only buttons have aria-labels. The table grid announces structural changes. Colour is never the sole indicator of state.

If you encounter an accessibility issue while using Tablesmit, the contact page is the best place to report it — specific feedback helps prioritise fixes.

Build an accessible table in [Tablesmit](/) — the grid pattern and keyboard navigation are active from the first cell.`,
}

export default post
