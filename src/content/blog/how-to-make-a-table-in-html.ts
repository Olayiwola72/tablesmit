import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-make-a-table-in-html',
  title: 'How to Make a Table in HTML (and a Faster Alternative)',
  date: '2026-06-03',
  description:
    'Learn the HTML table syntax — thead, tbody, th, td, colspan, rowspan — then discover a faster way to build tables without writing markup.',
  author: 'Olayiwola Akinnagbe',
  tags: ['html tables', 'web development', 'tutorial', 'html beginners'],
  readTime: 5,
  featured: false,
  content: `## The basic HTML table structure

Every HTML table follows the same skeleton. Here is a simple product table:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>In Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget A</td>
      <td>$10.00</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Widget B</td>
      <td>$15.00</td>
      <td>No</td>
    </tr>
  </tbody>
</table>
\`\`\`

Breaking this down:

- \`<table>\` — the container element
- \`<thead>\` — the header section (optional but recommended for accessibility)
- \`<tbody>\` — the data section
- \`<tr>\` — a table row
- \`<th>\` — a header cell (bold and centred by default in most browsers)
- \`<td>\` — a standard data cell

## Adding headers with scope

The \`scope\` attribute tells screen readers which cells a header applies to:

\`\`\`html
<thead>
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
    <th scope="col">Quantity</th>
  </tr>
</thead>
\`\`\`

Use \`scope="col"\` for column headers and \`scope="row"\` for row headers (the leftmost cell in each row that labels that row).

## Merging cells with colspan and rowspan

Real tables are rarely a perfect grid. Use \`colspan\` to merge cells horizontally and \`rowspan\` to merge them vertically.

\`\`\`html
<table>
  <thead>
    <tr>
      <th colspan="2">Product Details</th>
      <th>Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Widget A</td>
      <td>$10.00</td>
      <td>In stock</td>
    </tr>
    <tr>
      <td>$8.00 (bulk)</td>
      <td>In stock</td>
    </tr>
  </tbody>
</table>
\`\`\`

This is where writing HTML by hand gets error-prone — one mismatched \`colspan\` value and your entire table layout breaks.

## Styling with CSS borders

A table without borders is hard to read. The most common pattern is collapsed borders:

\`\`\`css
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}
th {
  background-color: #1E40AF;
  color: white;
}
\`\`\`

Add a class or inline styles — either works. The HTML structure stays the same.

## The problem with writing HTML by hand

For a one-off table, writing raw HTML is manageable. But if you build tables regularly, you run into the same problems:

- **Repetitive markup** — every \`<tr>\` and \`<td>\` tag is boilerplate
- **Error-prone colspan math** — one miscount breaks the layout silently
- **Hard to edit** — adding a column means editing every row
- **No visual feedback** — you only see the result after refreshing the browser
- **No export** — if you need a PDF, image, or Excel version, you start from scratch

## A faster alternative: build visually, export HTML

Tablesmit is a browser-based table builder that generates clean HTML output. Here is the workflow:

1. Open Tablesmit in your browser
2. Build your table visually — add rows and columns, type your content, drag to resize
3. Click **Copy** → **Copy as HTML**
4. Paste the generated \`<table>\` markup into your project

The output is semantic, accessible HTML with proper \`<thead>\`, \`<tbody>\`, \`<th>\`, \`scope\` attributes, and inline styles that match what you designed visually.

You get the same result as writing the HTML by hand — without writing a single tag.

[Build your HTML table in Tablesmit](/) — free, no signup.`,
}

export default post
