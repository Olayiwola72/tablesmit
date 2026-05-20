# Show HN: Tablesmit — I built the table maker I kept wishing existed

**Title (for HN submission field):**
Show HN: Tablesmit – a minimalist table builder for writers and analysts (free, open source)

**URL:** https://tablesmit.com

---

## Post Body

---

I am a writer who works with data.

Not a developer building dashboards. Not a data engineer with a pipeline.
A writer. Someone who needs one clean, well-formatted table — for a report,
a research piece, a comparison — and then needs to get out.

For years, I kept hitting the same wall from a different direction.

Tables Generator gave me syntax. I needed a table, not LaTeX code.
Notion gave me a database with filters and views. I needed a grid I could
hold in my hand. Google Docs corrupted my formatting the moment I pasted
from Excel. And every dedicated table tool I found — the ones that looked
exactly right in the screenshot — could not merge a cell. Not one of them.
It was the one thing I needed most and somehow the one thing they all
quietly agreed to skip.

I spent an afternoon on what should have been a twenty-minute task.

That afternoon is the reason Tablesmit exists.

---

The things that drove me insane about other tools became the things I
built first.

**Drag-to-resize columns and rows.** Using requestAnimationFrame so the
resize is smooth at 60fps — no layout thrashing, no jank. The ghost line
follows your cursor. The column updates when you release. Exactly like Excel.

**Merge and unmerge cells.** Select any rectangular range with Shift+click.
Click Merge. Done. The merged cell exports correctly to Excel as a native
merge, renders correctly in PDF, and unmerges cleanly back to its original
cells without data loss.

**Smart clipboard paste.** Copy a table from Excel, Word, or Google Sheets.
Open Tablesmit. Press Ctrl+V anywhere on the page. It reads the TSV or HTML
table from your clipboard and generates the full grid automatically. No
import dialog. No column mapping. It just works.

**Export that does not embarrass you.** PDF exports only the table — not the
toolbar, not the sidebar, not a screenshot of an application. A real document.
Excel export produces genuine .xlsx with merged cells intact. PNG at 2x
resolution. CSV with injection-safe sanitisation.

Everything runs in the browser. Your data never touches a server.

---

The stack, since you will ask:

React 18 · TypeScript strict · Vite · Tailwind · shadcn/ui · react-i18next
(8 languages, Arabic RTL included) · Vitest with 404 tests passing ·
Playwright for E2E · Sentry for error monitoring · PWA with offline support.

Export uses a strategy pattern — each format (PDF, Excel, PNG, JPEG, CSV) is
a class implementing a shared interface. Adding a new format is adding one file.

The blog is file-driven. A new post is a TypeScript file dropped into a
directory. No CMS, no database, no deploy step beyond git push.

The entire project — every architectural decision — is documented in a living
`agents.md` file that I use to brief AI coding agents. It started as a
two-page spec and is now a 7,000-line document covering brand, engineering
principles, SEO strategy, and release notes. It turned out to be the most
useful thing I ever wrote for my own project.

MIT licensed. GitHub: https://github.com/Olayiwola72/tablesmit

---

I built this in Nigeria.

I want to say that clearly, not as a disclaimer, but as a declaration. There
is a generation of builders on this continent who are making real software
for the world — not for a local niche, not to win a grant, not to be
celebrated for where they are from. Just because they had a problem and
knew how to solve it.

Tablesmit is that kind of project.

If you have ever spent half an hour rebuilding a table from scratch because
every other tool failed you in some quiet, infuriating way — this was built
for you. Not for you in aggregate. For you specifically, the person who knows
exactly how their table should look and just needs a tool that gets out of
the way.

No account. No onboarding tour. No pop-ups. No subscription tier where
features hide behind a paywall.

Open it. Build your table. Leave.

https://tablesmit.com

---

## Notes for submission day

**Best time to post:** Tuesday, Wednesday, or Thursday — 9:00–11:00am ET
(when US East Coast wakes up and European traffic is still active).

**Watch the thread for the first two hours.** Reply to every comment
within 90 minutes. HN rewards conversations that start early. Your
first 5–10 upvotes usually come from people who find you through the
comment activity, not the link itself.

**What HN will ask — have answers ready:**

- "What's different from [Tables Generator / Notion / Airtable]?"
  → Those tools are either format converters or databases. Tablesmit is a
    document tool — you build one table, format it, export it, and you're done.
    It's closer to a precision instrument than a platform.

- "Why not just use Excel?"
  → Excel is a spreadsheet. Tablesmit is for writers who need one clean table
    for a document — not formulas, not pivot tables, not a 200-column sheet.
    The browser interface and the export quality are the point.

- "Is this sustainable? Will you abandon it?"
  → It's MIT licensed. The code exists regardless of what I do. And I use it
    myself, which is the only guarantee that has ever meant anything.

- "Why did you choose React over [something]?"
  → React gave me the widest library ecosystem for the specific things I needed:
    DnD Kit for drag, shadcn/ui for accessible primitives, react-i18next for
    8-language support, and Vitest for a fast test suite. The bundle is under
    180KB gzipped. It was the right call.

- "Will you add [feature]?"
  → Open an issue. The roadmap is public. I read everything.

---

## Backup: Twitter/X launch thread

**Tweet 1 (pinned, the hook):**
I spent two hours trying to build one table for a report.

Every tool I tried failed me in some quiet, specific way.

So I built my own.

Tablesmit is live. Free. Open source. Made in Nigeria.

→ tablesmit.com

**Tweet 2:**
What it does that others don't:

· Drag-to-resize columns (smooth, 60fps, no jank)
· Merge and unmerge cells — any range, one click
· Paste from Excel directly — it reads your clipboard
· Export to PDF, Excel, PNG, CSV — table only, no chrome

No account. Ever.

**Tweet 3:**
The technical bit, for those who care:

React 18 · TypeScript strict · Vite · shadcn/ui
8-language i18n including Arabic RTL
404 unit tests passing
PWA — works offline
Strategy pattern for exports
File-driven blog

MIT licensed. github.com/Olayiwola72/tablesmit

**Tweet 4 (the soul):**
I built this in Nigeria.

Not as a statement. Just as a fact I'm proud of.

The best tools are built by people who genuinely needed them.

I needed this one.
