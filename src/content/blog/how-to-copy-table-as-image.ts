import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug: 'how-to-copy-table-as-image',
  title: 'How to Copy a Table as an Image for Presentations and Documents',
  date: '2026-04-08',
  description:
    'Need a picture of your table for a slide deck or a report? Here is how to copy any table as a clean PNG image — no cropping needed.',
  author: 'Olayiwola Akinnagbe',
  tags: ['copy table', 'table image', 'screenshot'],
  readTime: 3,
  featured: false,
  content: `## When you need a table as an image

Most of the time you want your table as data — editable cells in a spreadsheet, searchable text in a PDF, or structured rows in a database. But sometimes the format you are publishing to does not accept live tables. Presentation tools, certain document templates, and some CMS platforms expect images, not structured content.

In those cases, a screenshot is the fallback. But a screenshot captures whatever is on your screen at that moment — the toolbar, the scrollbar, the sidebar, the browser chrome around the edges. It takes multiple crops and resizes to get a clean image.

Tablesmit gives you a direct way to copy the table as a clean PNG image with none of the surrounding interface.

## How to copy a table as an image

### Method 1: Copy as Image (clipboard)

1. Open your table in [Tablesmit](/).
2. Click the **Copy** button in the toolbar.
3. Select **Copy as Image** from the dropdown.
4. The table is rendered to a canvas using html2canvas and copied to your clipboard as a PNG image.
5. Paste it into your presentation, document, or image editor (Ctrl+V or Cmd+V).

The image contains only the table — no toolbar, no sidebars, no browser chrome. The background is white, and the resolution is 2x (Retina) so it remains sharp on high-DPI displays.

### Method 2: Export as PNG or JPEG

If you need a file instead of a clipboard entry:

1. Click the **Export** button (desktop) or open the Export dropdown (mobile).
2. Select **PNG** or **JPEG**.
3. The file downloads immediately.

PNG is lossless and preferred for tables with text — the characters remain crisp. JPEG uses compression and may introduce slight artefacts around text edges. Use PNG for any table where readability matters.

## What the image includes

The exported image captures:
- All visible table cells with their current values
- Header row styling (background colour, text colour, font weight)
- Column widths and row heights as they appear on screen
- Cell borders and border styles
- Merged cells
- The table caption, if one is set

It does not include:
- The toolbar, sidebars, or navigation
- Row hover states or selection highlights
- The frozen pane indicator line
- The undo button or any interface chrome

## Tips for better table images

**Adjust column widths before exporting.** An image is a fixed pixel grid — unlike a web table, it does not reflow. Make sure all content is visible before you copy.

**Use a theme with sufficient contrast.** The Default, Academic, and Dark Header themes reproduce well in images. Minimal theme borders may be too subtle for small images.

**Set a caption if the image needs context.** The caption appears above the table in the image and helps readers understand what the table shows.

**Copy at 2x resolution.** Tablesmit renders at 2x scale automatically. The image is larger in pixel dimensions but appears sharp on Retina and high-DPI screens.

**JPEG quality setting.** JPEG export uses a configurable quality setting. The default is 0.92 — high enough for readable text while keeping file sizes reasonable. Reduce this for smaller file sizes at the cost of some text sharpness.

## When to use each format

| Format | Best for |
|---|---|
| PNG (clipboard) | Pasting directly into a presentation, document, or email |
| PNG (file) | Archiving a high-quality image of the table |
| JPEG (file) | Web pages where file size matters more than perfect text rendering |

Copy your table as an image — click Copy in the toolbar and select Copy as Image, then paste it where you need it.`,
  relatedFeature: 'copy-table',
}

export default post
