# Tablesmit

> A minimalist table builder for analytical writing.

Build clean, structured tables with full control over headers, formatting, and export. No bloat. No account required. Free and open source.

**[→ Open Tablesmit](https://tablesmit.com)**

---

## Features

- Drag-to-resize columns and rows
- Merge and unmerge cells
- Custom header colors and styles
- Word-style border controls
- Column types: Text, Number, Currency, Percentage, Date
- Auto-sum and auto-numbering column types
- Column sorting
- Smart clipboard paste from Excel, Word, or CSV
- Copy as image or Excel data (TSV/CSV)
- Find and replace across all cells
- Table themes: Default, Minimal, Dark Header, Striped, Academic, Monochrome
- Freeze first row/column
- Right-click context menu on cells and columns
- Export: PDF, PNG, JPEG, Excel, CSV
- Import: CSV, Excel
- Table caption / title
- Dark mode
- Keyboard navigation
- Undo / redo (Ctrl+Z)

## Getting Started

```bash
git clone https://github.com/Olayiwola72/tablesmit.git
cd tablesmit
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Vitest

## Configuration

Product decisions — brand name, routes, nav links, export formats, color palettes, and presets — live in one file:

```
src/config/siteConfig.ts
```

Check there before changing component logic.

## Status

**Tests:** 206 passing (37 test files), lint zero-warnings, TypeScript strict.

---

## Writing a Blog Post

The blog is JSON-driven. Adding a new post requires **one action only:**
create a JSON or TypeScript file in `src/content/blog/`.

No code change. No registry to update. The post appears automatically.

### 1. Create the file

Name the file using the post's target keyword in kebab-case.
Both `.json` and `.ts` extensions are supported.
The filename becomes the URL slug.

```
src/content/blog/how-to-make-a-table-in-markdown.json
```

→ Published at: `https://tablesmit.com/blog/how-to-make-a-table-in-markdown`

### 2. Fill in the JSON

```json
{
  "title":       "How to Make a Table in Markdown",
  "date":        "2025-09-15",
  "description": "A practical guide to Markdown tables — with examples you can build in Tablesmit and paste anywhere.",
  "author":      "Olayiwola Akin",
  "tags":        ["markdown", "tutorial", "tables"],
  "readTime":    4,
  "featured":    false,
  "content":     "## Introduction\n\nMarkdown tables look complex but follow a simple pattern..."
}
```

### 3. Using the helper script (optional)

Write the post in a `.md` file, then convert it:

```bash
npm run new-post my-draft.md
```

This creates `src/content/blog/my-draft.json` with the content pre-filled.
Edit the JSON to add `title`, `description`, and `tags`.

### 4. Commit and push

```bash
git add src/content/blog/your-post.json
git commit -m "content: add blog post — your post title"
git push
```

GitHub Actions will lint, test, build, and deploy to Netlify automatically.
The post is live within minutes of merging.

### Content tips

- Write content as standard Markdown
- Start with `## Heading 2` for sections (the post title is the H1)
- Link to `/` at least once per post for internal SEO
- Target one primary keyword per post
- Update `public/sitemap.xml` after publishing a post

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE)

---

Built with care. Sponsored by the community.
[Support this project →](https://tablesmit.com/open-source)
