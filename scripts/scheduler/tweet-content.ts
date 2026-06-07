export interface TweetEntry {
  id: string
  day: 2 | 3 | 4
  hour: number
  type: 'build' | 'education'
  text: string
  media?: string
}

export const TWEETS: TweetEntry[] = [
  // ── Week 1 ─────────────────────────────────────────────
  {
    id: 'w1-tue',
    day: 2,
    hour: 10,
    type: 'build',
    media: 'home.png',
    text:
      'The drag-to-resize took three implementations to get right.\n' +
      'First try: update column width on every mousemove. Two frames per second on fifty columns. Wrong.\n' +
      'Second try: debounce the update. Columns snap at the end. Feels broken.\n' +
      'Final: requestAnimationFrame plus ghost line indicator plus commit only on mouseup. Sixty frames per second. That is what Tablesmit uses now.\n' +
      'tablesmit.com',
  },
  {
    id: 'w1-wed',
    day: 3,
    hour: 12,
    type: 'education',
    media: 'home.png',
    text:
      'You can paste directly from Excel into Tablesmit.\n' +
      'Copy any cells in Excel. Switch to Tablesmit. Ctrl+V.\n' +
      'It reads the tab-separated format and fills the table automatically.\n' +
      'No export, no CSV, no reformatting.\n' +
      'tablesmit.com',
  },
  {
    id: 'w1-thu',
    day: 4,
    hour: 10,
    type: 'build',
    media: 'about.png',
    text:
      'Open source lesson: I wanted to ship fast, but I spent the first two weeks on architecture. Types. Tests. File structure. The brand spec alone is 8,000 lines.\n' +
      'Was it worth it? Every time I add a feature now, it fits into a predictable slot. No refactoring. No rewiring. The upfront cost paid off three times over.\n' +
      'tablesmit.com',
  },

  // ── Week 2 ─────────────────────────────────────────────
  {
    id: 'w2-tue',
    day: 2,
    hour: 10,
    type: 'build',
    media: '404.png',
    text:
      'The 404 page has a table grid animation. Four columns slide in from the left. Three rows drop in from the top. A question mark pulses in the center.\n' +
      'CSS keyframes. Zero JavaScript. 1.2 kilobytes.\n' +
      'You will probably never see it. But if you land on a broken link, it is there. Calm. On brand. Unnoticeable unless you need it.\n' +
      'tablesmit.com',
  },
  {
    id: 'w2-wed',
    day: 3,
    hour: 12,
    type: 'education',
    media: 'home.png',
    text:
      'Every column in Tablesmit has a type. Text, Number, Currency, Percentage, Date.\n' +
      'Change the type of any column from the sidebar. Currency cells get a dollar sign and auto-sum at the bottom. Percentage cells format with % and auto-sum. Date cells get a date picker on click.\n' +
      'One dropdown. Changes the whole column.\n' +
      'tablesmit.com',
  },
  {
    id: 'w2-thu',
    day: 4,
    hour: 10,
    type: 'build',
    media: 'dark.png',
    text:
      'Dark mode was easy. The CSS took an hour. The Tailwind config took 15 minutes.\n' +
      'html2canvas took three hours.\n' +
      'Every time you export a table as an image, html2canvas renders the DOM. In dark mode, every white cell flashed white before the screenshot. The fix: pass {backgroundColor: \'#1E293B\'} to every canvas call.\n' +
      'One line. Three hours. Shipping is debugging.\n' +
      'tablesmit.com',
  },

  // ── Week 3 ─────────────────────────────────────────────
  {
    id: 'w3-tue',
    day: 2,
    hour: 10,
    type: 'build',
    media: 'home.png',
    text:
      'I track every table export as an analytics event. After 36 blog posts and 30 feature landing pages, the data is clear.\n' +
      'PDF is the most used export format by a wide margin. Excel is second. Image export is growing fastest.\n' +
      'Writers and researchers export to paste into documents. Not spreadsheets. That changed how I think about the product.\n' +
      'tablesmit.com',
  },
  {
    id: 'w3-wed',
    day: 3,
    hour: 12,
    type: 'education',
    media: 'home.png',
    text:
      'Merging cells in Tablesmit: Select two or more cells. Click Merge. The top-left value survives. The rest is absorbed.\n' +
      'Unmerge restores every cell. The merged value stays in the anchor position.\n' +
      'Behaves like Word. Works with keyboard navigation. Undoable with Ctrl+Z.\n' +
      'tablesmit.com',
  },
  {
    id: 'w3-thu',
    day: 4,
    hour: 10,
    type: 'build',
    media: 'home.png',
    text:
      'I added a table caption field because every academic table I have ever written needed one. It sits above the table. Italic. Left, center, or right aligned.\n' +
      'Took one afternoon to build. Every week since, someone thanks me for it.\n' +
      'The smallest features get the most gratitude.\n' +
      'tablesmit.com',
  },

  // ── Week 4 ─────────────────────────────────────────────
  {
    id: 'w4-tue',
    day: 2,
    hour: 10,
    type: 'build',
    media: 'home.png',
    text:
      'Border styles were the most requested feature before they shipped. People wanted Word-style control: outside borders, inside borders, top, bottom, thick box, double line.\n' +
      'I resisted at first. Too complex. Too much UI.\n' +
      'Then I realized: just mirror Word. Every writer already knows how Word borders work. No learning curve. Ship it.\n' +
      'tablesmit.com',
  },
  {
    id: 'w4-wed',
    day: 3,
    hour: 12,
    type: 'education',
    media: 'about.png',
    text:
      'Tablesmit keyboard shortcuts:\n' +
      '\n' +
      'Tab / Shift+Tab: next / previous cell\n' +
      'Arrow keys: navigate cells\n' +
      'Ctrl+Z: undo\n' +
      'Ctrl+F: find in table\n' +
      'Ctrl+H: find and replace\n' +
      'Ctrl+P: print\n' +
      'Enter: edit cell\n' +
      'Escape: stop editing\n' +
      '\n' +
      'Every shortcut works in your browser. No menu diving.\n' +
      'tablesmit.com',
  },
  {
    id: 'w4-thu',
    day: 4,
    hour: 10,
    type: 'build',
    media: 'home.png',
    text:
      'The brand calls for a primary blue: #1E40AF. I tried six shades before landing on it.\n' +
      '#2563EB was too bright. #1D4ED8 was too cold. #1E3A8A was too dark.\n' +
      '#1E40AF sits exactly between confident and calm. It is the blue of a fountain pen. Not a billboard.\n' +
      'tablesmit.com',
  },

  // ── Week 5 ─────────────────────────────────────────────
  {
    id: 'w5-tue',
    day: 2,
    hour: 10,
    type: 'build',
    media: 'about.png',
    text:
      'I deleted 2,000 lines of code last month. A whole formatting system I built early on that nobody used. Column presets, combo formatters, a visual style builder.\n' +
      'The code worked. The feature was wrong.\n' +
      'Keep what people use. Delete the rest. A smaller codebase is faster, safer, and easier to maintain.\n' +
      'tablesmit.com',
  },
  {
    id: 'w5-wed',
    day: 3,
    hour: 12,
    type: 'education',
    media: 'home.png',
    text:
      'Tablesmit ships with five templates. Research Notes. Feature Matrix. Content Tracker. Budget Summary. Q1 Performance.\n' +
      'Each one sets up headers, column types, and merges for a specific use case. Click the template, get the structure. Fill in your data.\n' +
      'No blank slate anxiety. Just start writing.\n' +
      'tablesmit.com',
  },
  {
    id: 'w5-thu',
    day: 4,
    hour: 10,
    type: 'build',
    media: 'open-source.png',
    text:
      'My testing philosophy for Tablesmit:\n' +
      'Test pure functions first. Table math, merge logic, CSV parsing. These are the foundation. If utils are wrong, everything is wrong.\n' +
      'Test hooks second. State transitions, edge cases, user flows.\n' +
      'Test UI last. Buttons render. Toasts appear. Cells update.\n' +
      '85% of my tests are layers 1 and 2. That is where the bugs actually live.\n' +
      'tablesmit.com',
  },

  // ── Week 6 ─────────────────────────────────────────────
  {
    id: 'w6-tue',
    day: 2,
    hour: 10,
    type: 'build',
    media: 'home.png',
    text:
      'Tablesmit scores 99 on Lighthouse Performance. LCP is 0.9 seconds. CLS is zero.\n' +
      'It was not always this way. At launch it scored 72. The problems: Google Fonts CDN, unused JavaScript, large vendor chunks, no lazy loading.\n' +
      'The fixes: self-host fonts, manualChunks in Vite, lazy load everything below the fold, inline critical CSS.\n' +
      'Performance is a feature. It is also a choice you make every sprint.\n' +
      'tablesmit.com',
  },
  {
    id: 'w6-wed',
    day: 3,
    hour: 12,
    type: 'education',
    media: 'home.png',
    text:
      'Six export formats in Tablesmit:\n' +
      '\n' +
      'PDF: best for reports and documents\n' +
      'Excel: best for data analysis and sharing\n' +
      'CSV: best for portability and automation\n' +
      'PNG: best for pasting into presentations\n' +
      'JPEG: best for smaller image files\n' +
      'LaTeX: best for academic papers\n' +
      '\n' +
      'Pick the format that matches where your table is going next.\n' +
      'tablesmit.com',
  },
  {
    id: 'w6-thu',
    day: 4,
    hour: 10,
    type: 'build',
    media: 'home.png',
    text:
      'The first 100 users of Tablesmit taught me three things:\n' +
      '1. Writers want fewer features, not more. Every option is a decision. Remove decisions.\n' +
      '2. Paste from Excel is the killer feature. Not export. Paste.\n' +
      '3. Open source matters to users. They trust code they can read. They contribute docs, translations, and bug reports.\n' +
      'Listen to the first 100. They tell you what the next 1,000 will need.\n' +
      'tablesmit.com',
  },
]
