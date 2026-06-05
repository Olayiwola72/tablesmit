import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-apply-table-themes',
  title: 'How to Apply Table Themes Online',
  date: '2026-05-27',
  description:
    'Learn how to apply table themes with Tablesmit. Restyle with Default, Minimal, Striped, Academic, or Monochrome in one click. Tablesmit makes it simple.',
  author: 'Olayiwola Akinnagbe',
  tags: ['themes', 'styling', 'tutorial', 'tables'],
  readTime: 4,
  featured: false,
  content: `## The problem with manual formatting

Learn how to apply table themes online with Tablesmit. Choosing colors, borders, and backgrounds for every part of a table takes time. It is easy to end up with a table that looks inconsistent.

[Table themes](/) solve this. One click applies a complete, consistent visual style to the entire table.

## Available themes

| Theme | Best for |
|---|---|
| **Default** | General-purpose tables. White cells, primary blue header, standard border. Works everywhere. |
| **Minimal** | Embedding in blog posts or dashboards. No header colour, hairline borders. Clean and lightweight. |
| **Dark Header** | Formal reports and presentations. Deep navy header, white text, light grey alternating rows. Creates authority. |
| **Striped** | Data-heavy tables. Alternating row backgrounds make long rows easier to scan. Standard choice for financial data. |
| **Academic** | Research papers and theses. Grey header, double top border. Matches common academic style guides. |
| **Monochrome** | Print-first documents. Greyscale only — no colour accents. Photocopies cleanly. |

## How to apply a theme

1. Open the **Theme Picker** in the right sidebar.
2. Browse the six theme thumbnails. Each one shows a tiny preview of the table style.
3. Click any theme. The entire table restyles immediately.
4. Switch themes freely — they are undoable, so experimentation costs nothing.

## Combining themes with manual overrides

Themes are a starting point, not a cage. After applying a theme, you can still change:

- Individual cell background colours
- Border styles on selected cells
- Header colour
- Text alignment per column

The theme sets the baseline. Manual overrides refine it.

## Theme persistence

The current theme is stored as part of your table state. If you refresh the page or come back later (within the session), your theme choice is preserved.

## Themes in export

Whatever theme you have selected is what exports. A Monochrome table exports as greyscale to PDF and PNG. An Academic table keeps its grey header and double top border in Excel. What you see is what you get.

## Which theme should you choose?

Start with the audience:

- **Internal or general use** → Default
- **Published on the web** → Minimal
- **Executive presentation** → Dark Header
- **Report with lots of rows** → Striped
- **Journal or conference paper** → Academic
- **Print or photocopy** → Monochrome

One click. [Apply a table theme in Tablesmit](/) — instant polish.`,
  relatedFeature: 'table-themes',
}

export default post
