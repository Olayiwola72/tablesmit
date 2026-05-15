# Structra — Brand Identity & Engineering Implementation Guide
> For AI Coding Agents (Codex, Claude Code, etc.)
> Version 5.0 | Brand + Positioning + Architecture + TDD | Tailwind CSS Edition
> Status: Authoritative. Do not deviate without explicit instruction.

---

## 0. The North Star

**Structra** is a minimalist table builder for analytical writing.

It exists for writers, analysts, researchers, and technical thinkers who need clean
structured tables with full control over headers, formatting, and export —
without the noise of a spreadsheet, the complexity of a database, or the
aesthetic overwhelm of a design tool.

> **Tagline:** *Tables, your way.*
> **Subtext (hero):** *A minimalist table builder for analytical writing — with full control over headers, formatting, and export.*
> **About line:** *Structra was created by a writer who needed more control than basic table generators provided. Built for people who think in structure and publish with precision.*

### Positioning Statement
```
For:     Writers, analysts, researchers, and technical thinkers
Who:     Need clean, structured tables with customization control
Structra is: A minimalist table builder for analytical writing
That:    Gives full control over headers, formatting, and export
Unlike:  Generic table tools that are either too rigid or too complex
```

### What Structra Is Not
```
Not a spreadsheet.
Not a database.
Not a Notion competitor.
Not a design-heavy tool.

Structra is a structured writing tool.
```
Every product decision must be filtered through this. If a feature makes
Structra feel like any of the above — reconsider it.

### Tone of Voice
| Dimension   | Direction                                                        |
|-------------|------------------------------------------------------------------|
| Personality | Friendly productivity. Calm. Competent. Minimal.                 |
| Writing     | Short sentences. Active voice. No marketing fluff.               |
| UI copy     | Direct. Label the action. No clever wordplay in functional UI.   |
| Error msgs  | Clear cause + clear fix. Never blame the user.                   |
| Empty states| Invite action. Do not describe what is missing.                  |

### Emotional Design Goal
Every UI decision must make the user feel:

> **Clarity. Control. Calm confidence.**

If a design choice introduces visual noise, decision fatigue, or uncertainty —
remove it. When in doubt: simplify.

---

## 1. Brand Name & Identity

| Field          | Value                                                                    |
|----------------|--------------------------------------------------------------------------|
| Product Name   | **Structra**                                                             |
| Domain hint    | structra.app / usestructra.com / structra.io (check availability)        |
| Origin         | Structure + suffix "-a" — precision, form, control                       |
| Pronunciation  | STRUK-truh                                                               |
| Personality    | Calm. Competent. Minimal. Friendly but never chatty.                     |
| Open Source    | Yes — GitHub link in secondary CTA                                       |
| What it is NOT | Loud, cluttered, feature-heavy, or visually expressive.                  |

---

## 2. Logo

### 2A. Primary Logo (Full — Icon + Wordmark)

```svg
<svg width="220" height="48" viewBox="0 0 220 48" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(4,8)">
    <rect x="0" y="0" width="32" height="32" rx="6"
          stroke="#1E293B" stroke-width="1.5" fill="none"/>
    <line x1="12" y1="6" x2="12" y2="26"
          stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="6" y1="14" x2="26" y2="14"
          stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <text x="52" y="30"
        font-family="Inter, -apple-system, sans-serif"
        font-size="22" font-weight="600" letter-spacing="-0.5"
        fill="#1E293B">Structra</text>
</svg>
```

### 2B. Icon Mark Only (Favicon)

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="30" height="30" rx="6"
        stroke="#1E293B" stroke-width="1.5" fill="none"/>
  <line x1="11" y1="5" x2="11" y2="27"
        stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="5" y1="13" x2="27" y2="13"
        stroke="#1E293B" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

### 2C. Logo Rules
- Minimum: 120px wide (full) · 24px (icon)
- On white: full color as above
- On dark: swap `#1E293B` → `#FFFFFF`
- Never: stretch, rotate, recolor, add shadows, or animate

---

## 3. Design Tokens (Tailwind Config)

All colors, fonts, spacing, and radii are defined in `tailwind.config.ts`.
Do not use arbitrary Tailwind values (e.g. `text-[13px]`) for anything that
recurs more than once — extract it to the config instead.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          hover:   '#1D3899',
          light:   '#EFF6FF',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover:   '#D97706',
          light:   '#FFFBEB',
        },
        surface:  '#F9FAFB',
        border:   '#E5E7EB',
        'border-focus': '#1E40AF',
        text: {
          primary:   '#111827',
          secondary: '#6B7280',
          muted:     '#9CA3AF',
          inverse:   '#FFFFFF',
        },
        success: { DEFAULT: '#059669', light: '#ECFDF5' },
        danger:  { DEFAULT: '#DC2626', light: '#FEF2F2' },
        info:    { DEFAULT: '#0EA5E9', light: '#F0F9FF' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs':   ['0.75rem',   { lineHeight: '1rem' }],
        'sm':   ['0.875rem',  { lineHeight: '1.25rem' }],
        'base': ['1rem',      { lineHeight: '1.5rem' }],
        'lg':   ['1.125rem',  { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',   { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',    { lineHeight: '2rem' }],
        '3xl':  ['1.875rem',  { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',   { lineHeight: '2.5rem' }],
        '5xl':  ['3rem',      { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      maxWidth: {
        'content': '1200px',
        'narrow':  '720px',
      },
      height: {
        'nav': '60px',
      },
      width: {
        'sidebar-left':  '240px',
        'sidebar-right': '220px',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Token Usage Rules
- **Primary blue** → buttons, links, selected cell borders, active nav, focus rings
- **Accent amber** → ONE place only: the "Generate Table" CTA button. Merged cell highlight.
- **White** → always the page background. `bg-white` on `<body>`. Never `bg-gray-*` for pages.
- **Surface** → sidebars, toolbar, card backgrounds: `bg-surface`
- **No arbitrary colors** in JSX — every color must trace to a token

---

## 4. Typography

Load in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role              | Classes                                          |
|-------------------|--------------------------------------------------|
| Hero headline     | `text-5xl font-bold text-text-primary leading-tight` |
| Section heading   | `text-3xl font-bold text-text-primary`           |
| Card heading      | `text-xl font-semibold text-text-primary`        |
| Body copy         | `text-base font-normal text-text-secondary leading-relaxed` |
| UI label          | `text-sm font-medium text-text-primary`          |
| Section label     | `text-xs font-semibold text-text-muted uppercase tracking-widest` |
| Button text       | `text-sm font-semibold`                          |
| Cell content      | `text-sm font-sans text-text-primary`            |
| Monospace cell    | `text-sm font-mono text-text-primary`            |

---

## 5. UI Component Specifications

### UI Principles
These rules govern every visual decision in the product. No exceptions.

```
✅ Clean layout           — generous whitespace, logical grouping, breathing room
✅ Subtle borders         — border-border (#E5E7EB) only, never decorative
✅ Rounded corners        — max border-radius: 8px (--radius-md). Never exceed this.
✅ Minimal shadows        — shadow-sm for sticky elements only (navbar on scroll)
✅ No heavy shadows       — no shadow-lg, no drop-shadow on cards or panels
✅ No glass effects       — no backdrop-blur, no frosted panels, no opacity layering
✅ No visual clutter      — no decorative dividers, gradients, or background patterns
✅ Logical grouping       — related controls live together, separated by whitespace
                            not by heavy borders or background color blocks
✅ Emotion: Clarity       — every element has a clear purpose; nothing decorative
✅ Emotion: Control       — user always knows what will happen before they click
✅ Emotion: Calm          — no animations that demand attention; motion is functional
```

**Radius rule enforcement:**
```
rounded-sm  (4px)  → tags, badges, icon buttons, toolbar buttons
rounded-md  (8px)  → cards, panels, modals, input fields, standard buttons ← MAX
rounded-lg         → FORBIDDEN in this product
rounded-xl         → FORBIDDEN in this product
rounded-full       → ONLY for avatar-style elements or pill badges
```

**Shadow rule enforcement:**
```
shadow-sm   → sticky navbar (scroll state only), floating action buttons (mobile)
shadow-md   → FORBIDDEN in panels, cards, sidebars
shadow-lg   → FORBIDDEN everywhere
No shadow   → default for all cards, panels, table cells, buttons
```

---

### Navbar
```
height: h-nav (60px) | sticky top-0 z-50
bg-white border-b border-border shadow-sm (on scroll via JS class)
Layout: justify-between items-center px-6
Left: Logo SVG
Center: nav links — text-sm font-medium text-text-secondary hover:text-primary
Right: "Start Building" → Primary Button
Links: Home · Features · How It Works · About · Contact
```

### Button Classes (define as reusable component — see Section 10)

Every button variant has four explicit states: **default → hover → active (pressed) → disabled**.
The `active:scale-[0.97]` gives tactile press feedback without being dramatic.
All transitions use `transition-all duration-150 ease-in-out`.

```
BASE (applied to all variants)
  inline-flex items-center justify-center gap-2
  rounded-md font-semibold text-sm select-none
  transition-all duration-150 ease-in-out
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  motion-reduce:transition-none

PRIMARY
  Default:  bg-primary text-text-inverse px-5 py-2.5
  Hover:    hover:bg-primary-hover hover:shadow-md
  Active:   active:bg-[#1a3080] active:scale-[0.97] active:shadow-none
  Loading:  aria-busy cursor-wait opacity-70

ACCENT  (Generate Table — one instance only)
  Default:  bg-accent text-white px-5 py-2.5
  Hover:    hover:bg-accent-hover hover:shadow-md
  Active:   active:bg-[#b45309] active:scale-[0.97] active:shadow-none

SECONDARY / OUTLINE
  Default:  bg-transparent border border-border text-text-primary px-5 py-2.5
  Hover:    hover:bg-surface hover:border-primary hover:text-primary
  Active:   active:bg-gray-100 active:scale-[0.97]

GHOST / TOOLBAR
  Default:  bg-transparent text-text-secondary px-3 py-1.5 rounded-sm
  Hover:    hover:bg-surface hover:text-text-primary
  Active:   active:bg-border active:scale-[0.97]

DANGER  (Clear All only)
  Default:  bg-danger text-white px-5 py-2.5
  Hover:    hover:bg-red-700 hover:shadow-md
  Active:   active:bg-red-800 active:scale-[0.97] active:shadow-none

ICON BUTTON
  Default:  w-8 h-8 flex items-center justify-center rounded-sm
            text-text-secondary bg-transparent
  Hover:    hover:bg-surface hover:text-text-primary
  Active:   active:bg-border active:scale-90
  Rule:     Must have aria-label — no exceptions

SIZES
  sm:  px-3 py-1.5 text-xs rounded-sm
  md:  px-5 py-2.5 text-sm rounded-md   ← default
  lg:  px-6 py-3   text-base rounded-md

NAV LINK (not a button, but stateful)
  Default:  text-sm font-medium text-text-secondary
  Hover:    hover:text-primary
  Active:   text-primary font-semibold (current route)
  Underline: active route gets a 2px bottom border in primary color
```

**Button component implementation note for Codex:**
```tsx
// The Button component must use `cn()` (from shadcn/ui clsx helper) to
// compose variant classes. Never use string interpolation for class branching.
// Use cva() (class-variance-authority) to define variants cleanly.

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base classes applied to every variant
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold text-sm select-none ' +
  'transition-all duration-150 ease-in-out motion-reduce:transition-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:   'bg-primary text-text-inverse hover:bg-primary-hover hover:shadow-md active:bg-[#1a3080] active:scale-[0.97] active:shadow-none',
        accent:    'bg-accent text-white hover:bg-accent-hover hover:shadow-md active:bg-[#b45309] active:scale-[0.97] active:shadow-none',
        secondary: 'bg-transparent border border-border text-text-primary hover:bg-surface hover:border-primary hover:text-primary active:bg-gray-100 active:scale-[0.97]',
        ghost:     'bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary active:bg-border active:scale-[0.97]',
        danger:    'bg-danger text-white hover:bg-red-700 hover:shadow-md active:bg-red-800 active:scale-[0.97] active:shadow-none',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs rounded-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
```

### Table Toolbar
```
h-12 bg-surface border-b border-border px-4 flex items-center gap-2
Groups separated by: <div class="w-px h-5 bg-border mx-1" />

Groups:
  1. Add Row · Add Column · Remove Row · Remove Column   (ghost buttons)
  2. Merge · Unmerge                                     (ghost buttons)
  3. Import ▾ (DropdownMenu)                             (secondary button)
       └─ Import from CSV
       └─ Import from Excel
  4. Clear All · Reset                                   (ghost / danger)
  5. PDF · PNG · JPEG · Excel                            (outline, text-xs font-semibold)
       (on < lg: collapse group 5 into Export ▾ dropdown)
```

**CSV / Excel Import flow:**
```tsx
// Trigger: hidden <input type="file"> clicked via ref
// CSV  → PapaParse → Papa.parse(file, { header: true, skipEmptyLines: true })
// Excel → SheetJS  → XLSX.read(buffer) → XLSX.utils.sheet_to_json()
// Both → normalise to CellData[][] → dispatch to TableContext
// On error: show toast "Could not read file. Check the format and try again."
// Max file size: 5MB — validate before parsing, show toast if exceeded
```

### Sidebars
```
Left:  w-sidebar-left  bg-surface border-r border-border p-6 overflow-y-auto
Right: w-sidebar-right bg-surface border-l border-border p-6 overflow-y-auto
Section label: text-xs font-semibold text-text-muted uppercase tracking-widest mb-3
```

### Table Grid
```
Cell:          text-sm font-sans text-text-primary p-2 border border-border
Selected:      ring-2 ring-primary ring-inset (no shadow)
Merged cell:   bg-primary-light
Header row:    bg-primary text-text-inverse font-semibold
```

#### Smooth Drag-to-Resize Columns & Rows

The resize experience must feel instantaneous. No jank. No layout thrashing.
Use `requestAnimationFrame` so updates are batched at 60fps.

**Implementation pattern for `useColumnResize` hook:**
```ts
// The resize line (ghost indicator) follows the cursor during drag.
// The actual column width is applied only on mouseup — not on every mousemove.
// This prevents layout recalculation on every pixel movement.

const useColumnResize = () => {
  const isDragging   = useRef(false);
  const startX       = useRef(0);
  const startWidth   = useRef(0);
  const colIndex     = useRef(0);
  const rafId        = useRef<number>();
  const ghostLineRef = useRef<HTMLDivElement>(null); // vertical drag indicator

  const onMouseDown = (e: React.MouseEvent, idx: number, currentWidth: number) => {
    isDragging.current  = true;
    startX.current      = e.clientX;
    startWidth.current  = currentWidth;
    colIndex.current    = idx;
    document.body.style.cursor   = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      cancelAnimationFrame(rafId.current!);
      rafId.current = requestAnimationFrame(() => {
        const delta    = e.clientX - startX.current;
        const newWidth = Math.max(60, startWidth.current + delta); // min 60px
        // Move ghost line only — do NOT update state here
        if (ghostLineRef.current) {
          ghostLineRef.current.style.left = `${e.clientX}px`;
          ghostLineRef.current.style.display = 'block';
        }
        // Store pending width without triggering render
        pendingWidth.current = newWidth;
      });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      cancelAnimationFrame(rafId.current!);
      document.body.style.cursor    = '';
      document.body.style.userSelect = '';
      if (ghostLineRef.current) ghostLineRef.current.style.display = 'none';
      // Apply final width in ONE state update after drag ends
      setColumnWidths(prev => {
        const next = [...prev];
        next[colIndex.current] = pendingWidth.current;
        return next;
      });
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return { onMouseDown, ghostLineRef };
};
```

**Ghost drag-line element** (rendered once at top level of TableGrid):
```tsx
{/* Vertical indicator line — visible only during column drag */}
<div
  ref={ghostLineRef}
  className="fixed top-0 bottom-0 w-px bg-primary z-50 pointer-events-none hidden"
  aria-hidden="true"
/>
```

**Resize handle styling:**
```
Column handle: absolute right-0 top-0 h-full w-2 cursor-col-resize
               opacity-0 hover:opacity-100 hover:bg-primary/20
               transition-opacity duration-100
               (touch target 8px wide on mobile via ::after pseudo-element)

Row handle:    absolute bottom-0 left-0 w-full h-2 cursor-row-resize
               opacity-0 hover:opacity-100 hover:bg-primary/20
               transition-opacity duration-100
```

**Minimum / maximum constraints:**
```
Column width: min 60px · max 600px
Row height:   min 32px · max 300px
```

---

## 6. Page Copy — Complete

### Navigation
```
Left:   [Structra SVG Logo]
Center: Home  |  Features  |  Open Source  |  About
Right:  [Start Building]   (primary button, md size)
        [GitHub ↗]         (ghost button with ExternalLink icon)
```

---

### Hero Section

**Layout:** Full-width · centered text · white background · generous padding
`py-20 sm:py-28 lg:py-36`

```
HEADLINE (text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary):
  Tables built for
  analytical writing.

SUBTEXT (text-base sm:text-lg text-text-secondary max-w-xl mx-auto):
  A minimalist table builder for analytical writing — with full
  control over headers, formatting, and export.

CTA ROW (flex-col sm:flex-row gap-3 justify-center mt-8):
  PRIMARY:   [Start Building]          ← accent button, lg
  SECONDARY: [View on GitHub ↗]        ← secondary/outline button, lg
                                          with ExternalLink icon from Lucide

NO eyebrow badge. NO trust line. NO animation.
Clean white space speaks for itself.
```

---

### Features Section

**Heading:** `text-2xl sm:text-3xl font-bold text-text-primary text-center`
**Copy:**
```
HEADING:  What makes Structra different.
SUBTEXT:  Built around the things that actually matter when you're
          publishing structured content.
```

**Feature Cards** — 2 columns on tablet, 4 columns on desktop.
Each card: white background, `border border-border rounded-md p-6`
NO card shadow. Icon top-left. Heading + one-line description.

```
[icon: Palette]
Custom Header Styling
  Full control over header colors, fonts, and styles.
  Make your table reflect your document, not a generic template.

[icon: AlignJustify]
Precision Column Formatting
  Set column types — text, number, currency, percentage, date.
  Your data formatted exactly as it should be.

[icon: Download]
Clean Export Options
  PDF, PNG, JPEG, or Excel. Import from CSV or Excel.
  One click. No quality loss.

[icon: Layers]
Minimal Interface
  No popups. No ads. No onboarding flows.
  Just the table and the controls you need.
```

---

### Open Source Section

**Layout:** Full-width · `bg-surface` background · centered · `py-16 sm:py-20`

```
HEADING (text-2xl font-bold text-text-primary):
  Built in the open.

BODY (text-base text-text-secondary max-w-narrow mx-auto text-center):
  Structra is free and open source. The code is on GitHub — read it,
  fork it, improve it, or adapt it for your own needs.
  We believe tools for writing and thinking should be transparent.

CTA:
  [View on GitHub ↗]   ← secondary button with ExternalLink icon

NOTE (text-xs text-text-muted mt-4):
  MIT licensed. Contributions welcome.
```

---

### About Section

**Layout:** 2 columns on lg+ (text left · subtle graphic right) · stacked on mobile

```
HEADING (text-2xl sm:text-3xl font-bold text-text-primary):
  Built for structured thinkers.

BODY (text-base text-text-secondary leading-relaxed):
  Structra was created by a writer who needed more control than
  basic table generators provided.

  Most tools gave too little — no header customization, no column
  formatting, no clean export. Others gave too much — the full weight
  of a spreadsheet for something that just needed to be a table.

  Structra is the middle ground. Built for people who think in
  structure and publish with precision.

WHAT WE ARE NOT (rendered as a quiet list, text-sm text-text-muted):
  Not a spreadsheet.
  Not a database.
  Not a Notion competitor.
  Not a design-heavy tool.

  We are a structured writing tool.
```

---

### Footer

**Layout:** `border-t border-border bg-white py-10`
**Structure:** Logo + tagline left · links right (on lg+) · stacked on mobile

```
LEFT:
  [Structra icon mark]  Structra
  Tables, your way.
  © 2025 Structra. Open source under MIT license.

RIGHT (flex gap-8 text-sm text-text-secondary):
  Product:    Home · Features · Open Source
  Company:    About · Contact · GitHub ↗
  Export:     PDF · PNG · JPEG · Excel · CSV

Footer links: hover:text-primary transition-colors
NO heavy footer. NO newsletter signup. NO marketing.
```

---

### 404 Page

```
HEADING:   Page not found.
BODY:      That URL doesn't exist. Let's get you back to building.
CTA:       [← Back to Home]   ← primary button
```

---

## 7. Page Meta / SEO

```html
<title>Structra — Tables, Your Way</title>
<meta name="description" content="The web table maker with true spreadsheet
control. Resize rows and columns, merge cells, set custom colors, and export
to PDF, Excel, PNG, or JPEG — free, no account required.">

<!-- Favicon: icon-mark SVG from Section 2B → public/favicon.svg -->
```

---

## 8. Tech Stack

| Layer         | Technology                                                        | Notes                               |
|---------------|-------------------------------------------------------------------|-------------------------------------|
| Framework     | React 18 + Vite                                                   | –                                   |
| Language      | TypeScript — `strict: true`                                       | –                                   |
| Styling       | **Tailwind CSS v3**                                               | Config in `tailwind.config.ts`      |
| Components    | **shadcn/ui**                                                     | Dropdowns, tooltips, dialogs        |
| Icons         | **Lucide React**                                                  | `lucide-react` — only icon library  |
| Drag/Resize   | **@dnd-kit/core + @dnd-kit/utilities**                            | Column/row resize, row reorder      |
| Export PDF    | **jsPDF + html2canvas**                                           | –                                   |
| Export Excel  | **SheetJS (xlsx)**                                                | Export + import                     |
| Export Image  | **html2canvas**                                                   | PNG + JPEG                          |
| Import CSV    | **PapaParse**                                                     | Fast, typed, browser-safe CSV parse |
| Import Excel  | **SheetJS (xlsx)**                                                | Same lib as export — no extra dep   |
| Testing       | **Vitest + React Testing Library + @testing-library/user-event**  | –                                   |
| Routing       | **React Router v6**                                               | –                                   |

### Library Policy
- **Use libraries freely** — don't build what already exists well.
- **shadcn/ui** first for any UI primitive (Select, Tooltip, Dialog, DropdownMenu,
  Popover, Separator, Badge, etc.). Install components as needed with `npx shadcn@latest add`.
- **Lucide React** for all icons — consistent, tree-shakeable, typed.
- **@dnd-kit** for all drag interactions — resize handles, row reordering.
- **PapaParse** for CSV import — `Papa.parse(file, { header: true })` returns typed rows.
- **SheetJS** handles both Excel import and export — do not add a second Excel library.
- Introduce a new library only if: (a) it solves a real problem, and
  (b) it is actively maintained with >1k GitHub stars.
- Do NOT install two libraries that solve the same problem.

---

## 9. Project Architecture

### Folder Structure

```
structra/
├── public/
│   ├── favicon.svg                     ← icon-mark SVG (Section 2B)
│   └── og-image.png
│
├── src/
│   ├── assets/
│   │   └── logo.svg                    ← full logo SVG (Section 2A)
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                         # Reusable, domain-agnostic primitives
│   │   │   │                           # (extend shadcn/ui components here)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── IconButton/
│   │   │   │   ├── IconButton.tsx
│   │   │   │   ├── IconButton.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SectionLabel/
│   │   │   │   ├── SectionLabel.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ColorSwatch/
│   │   │   │   ├── ColorSwatch.tsx
│   │   │   │   ├── ColorSwatch.test.tsx
│   │   │   │   └── index.ts
│   │   │   └── Badge/
│   │   │       ├── Badge.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── layout/                     # Structural shell components
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Navbar.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Footer.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── index.ts
│   │   │   └── PageWrapper/
│   │   │       ├── PageWrapper.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── features/                   # Domain-specific feature components
│   │       ├── TableGrid/
│   │       │   ├── TableGrid.tsx
│   │       │   ├── TableGrid.test.tsx
│   │       │   ├── TableCell/
│   │       │   │   ├── TableCell.tsx
│   │       │   │   ├── TableCell.test.tsx
│   │       │   │   └── index.ts
│   │       │   ├── TableHeaderCell/
│   │       │   │   ├── TableHeaderCell.tsx
│   │       │   │   └── index.ts
│   │       │   ├── ResizeHandle/
│   │       │   │   ├── ResizeHandle.tsx
│   │       │   │   ├── ResizeHandle.test.tsx
│   │       │   │   └── index.ts
│   │       │   └── index.ts
│   │       ├── TableToolbar/
│   │       │   ├── TableToolbar.tsx
│   │       │   ├── TableToolbar.test.tsx
│   │       │   └── index.ts
│   │       ├── DimensionsPanel/
│   │       │   ├── DimensionsPanel.tsx
│   │       │   ├── DimensionsPanel.test.tsx
│   │       │   └── index.ts
│   │       ├── HeaderOptionsPanel/
│   │       │   ├── HeaderOptionsPanel.tsx
│   │       │   └── index.ts
│   │       ├── ColorPanel/
│   │       │   ├── ColorPanel.tsx
│   │       │   └── index.ts
│   │       ├── MergeCellsPanel/
│   │       │   ├── MergeCellsPanel.tsx
│   │       │   ├── MergeCellsPanel.test.tsx
│   │       │   └── index.ts
│   │       ├── ColumnFormattingPanel/
│   │       │   ├── ColumnFormattingPanel.tsx
│   │       │   └── index.ts
│   │       ├── QuickPresetsPanel/
│   │       │   ├── QuickPresetsPanel.tsx
│   │       │   ├── QuickPresetsPanel.test.tsx
│   │       │   └── index.ts
│   │       └── ExportPanel/
│   │           ├── ExportPanel.tsx
│   │           ├── ExportPanel.test.tsx
│   │           └── index.ts
│   │
│   ├── pages/
│   │   ├── TableMakerPage/
│   │   │   ├── TableMakerPage.tsx
│   │   │   ├── TableMakerPage.test.tsx
│   │   │   └── index.ts
│   │   ├── LandingPage/
│   │   │   ├── LandingPage.tsx
│   │   │   └── index.ts
│   │   ├── AboutPage/
│   │   │   ├── AboutPage.tsx
│   │   │   └── index.ts
│   │   └── ContactPage/
│   │       ├── ContactPage.tsx
│   │       └── index.ts
│   │
│   ├── context/
│   │   ├── TableContext.tsx             # Global table state + dispatch
│   │   └── TableContext.test.tsx
│   │
│   ├── hooks/
│   │   ├── useTable.ts                 # Core CRUD: add/remove row/col, update cell
│   │   ├── useTable.test.ts
│   │   ├── useTableSelection.ts        # Cell/range selection
│   │   ├── useTableSelection.test.ts
│   │   ├── useMergeCells.ts            # Merge / unmerge
│   │   ├── useMergeCells.test.ts
│   │   ├── useColumnResize.ts          # Drag-to-resize columns
│   │   ├── useColumnResize.test.ts
│   │   ├── useRowResize.ts             # Drag-to-resize rows
│   │   ├── useRowResize.test.ts
│   │   ├── useExport.ts                # Export orchestration
│   │   ├── useExport.test.ts
│   │   ├── useTableHistory.ts          # Undo / redo
│   │   └── useTableHistory.test.ts
│   │
│   ├── services/
│   │   ├── exportService.ts            # Strategy pattern: PDF/PNG/JPEG/Excel
│   │   └── exportService.test.ts
│   │
│   ├── utils/
│   │   ├── tableUtils.ts               # Pure table transformation functions
│   │   ├── tableUtils.test.ts
│   │   ├── mergeUtils.ts               # Merge range math
│   │   ├── mergeUtils.test.ts
│   │   ├── cellUtils.ts                # Cell ID parsing, coordinate helpers
│   │   ├── cellUtils.test.ts
│   │   ├── formatUtils.ts              # Column format helpers
│   │   └── formatUtils.test.ts
│   │
│   ├── types/
│   │   ├── table.types.ts
│   │   ├── export.types.ts
│   │   └── ui.types.ts
│   │
│   ├── config/
│   │   ├── tableDefaults.ts            # DEFAULT_ROWS, DEFAULT_COLS, MAX limits
│   │   ├── presets.ts                  # Preset table definitions
│   │   ├── exportConfig.ts             # Supported formats + options
│   │   └── colorPalette.ts             # Header color swatches
│   │
│   ├── constants/
│   │   └── keys.ts                     # Keyboard key constants
│   │
│   ├── styles/
│   │   └── globals.css                 # Tailwind directives + any global CSS
│   │
│   ├── test/
│   │   └── setup.ts                    # jest-dom import
│   │
│   ├── App.tsx                         # Router only. Zero business logic.
│   ├── App.test.tsx
│   └── main.tsx                        # ReactDOM.createRoot only.
│
├── tailwind.config.ts
├── vitest.config.ts
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
└── package.json
```

### Lazy Loading Strategy

**Rule:** Every page is lazy-loaded. No page bundle ships until its route is visited.
Heavy feature panels within the table maker are also lazy-loaded on first interaction.

#### `src/App.tsx` — Routing with Suspense

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLoader } from '@/components/ui/PageLoader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Pages — never imported directly; bundled separately per route
const LandingPage    = lazy(() => import('@/pages/LandingPage'));
const TableMakerPage = lazy(() => import('@/pages/TableMakerPage'));
const AboutPage      = lazy(() => import('@/pages/AboutPage'));
const ContactPage    = lazy(() => import('@/pages/ContactPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"        element={<LandingPage />} />
          <Route path="/app"     element={<TableMakerPage />} />
          <Route path="/about"   element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
```

#### Lazy-loaded Feature Panels (within `TableMakerPage`)

Heavy sidepanel components are lazy-loaded on mount so the core table
grid is interactive immediately:

```tsx
import { lazy, Suspense } from 'react';
import { PanelLoader } from '@/components/ui/PanelLoader';

const QuickPresetsPanel    = lazy(() => import('@/components/features/QuickPresetsPanel'));
const ColumnFormattingPanel = lazy(() => import('@/components/features/ColumnFormattingPanel'));
const ExportPanel          = lazy(() => import('@/components/features/ExportPanel'));

// Usage inside TableMakerPage layout:
<Suspense fallback={<PanelLoader />}>
  <QuickPresetsPanel />
</Suspense>
```

#### `PageLoader` Component (`src/components/ui/PageLoader/PageLoader.tsx`)

```tsx
export const PageLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none"
         xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
      <rect x="1" y="1" width="30" height="30" rx="6"
            stroke="#1E293B" strokeWidth="1.5" fill="none"/>
      <line x1="11" y1="5" x2="11" y2="27"
            stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="13" x2="27" y2="13"
            stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <p className="text-sm text-text-muted animate-pulse">Loading…</p>
  </div>
);
```

#### `PanelLoader` Component (`src/components/ui/PanelLoader/PanelLoader.tsx`)

```tsx
export const PanelLoader: React.FC = () => (
  <div className="flex items-center justify-center p-6">
    <div className="w-5 h-5 border-2 border-border border-t-primary
                    rounded-full animate-spin" />
  </div>
);
```

#### Vite Code Splitting Config

Vite handles code splitting automatically via dynamic `import()`.
Optionally name the chunks for readable bundle analysis:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui':     ['lucide-react', 'class-variance-authority', 'clsx'],
          'vendor-export': ['jspdf', 'html2canvas', 'xlsx'],
        },
      },
    },
  },
});
```

**Lazy loading rules:**
- `Suspense` must always have a meaningful `fallback` — never `fallback={null}` for page-level routes
- Every `lazy()` import must be wrapped in `Suspense` in the nearest parent that makes UX sense
- Do not lazy-load components that are always visible on first paint (Navbar, Footer)
- Do not lazy-load components smaller than ~10KB — the network overhead isn't worth it

---

### `src/styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; }
  body {
    @apply bg-white text-text-primary font-sans antialiased;
  }
  /* Custom focus ring using Tailwind token */
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}

@layer components {
  /* Only put things here that can't be expressed as a component prop */
  .resize-handle-col { @apply absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary; }
  .resize-handle-row { @apply absolute bottom-0 left-0 w-full h-1 cursor-row-resize hover:bg-primary; }
}
```

---

## 10. Engineering Principles

### 10A. SOLID

**S — Single Responsibility**
Each file has exactly one reason to change.
```
✅ TableCell.tsx       → renders one cell only
✅ useMergeCells.ts    → merge logic only
✅ exportService.ts    → export operations only
✅ mergeUtils.ts       → pure merge math, no React

❌ App.tsx             → must NOT contain any business logic
❌ TableGrid.tsx       → must NOT contain export logic
❌ TableToolbar.tsx    → must NOT transform table data
```

**O — Open/Closed**
Open for extension, closed for modification. Use variant props and the
strategy pattern — never `if/else` sprawl inside a component.

```tsx
// ✅ Button extended via variant prop — never modified internally
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';

// ✅ Export: new format = new class, zero changes to existing code
interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>;
}
class PDFExporter   implements ExportStrategy { /* ... */ }
class PNGExporter   implements ExportStrategy { /* ... */ }
class JPEGExporter  implements ExportStrategy { /* ... */ }
class ExcelExporter implements ExportStrategy { /* ... */ }
// Adding CSV later: just add CSVExporter. Nothing else changes.
```

**L — Liskov Substitution**
```tsx
// ✅ IconButton is substitutable for Button — same contract
<Button     onClick={fn} aria-label="Merge">Merge</Button>
<IconButton onClick={fn} aria-label="Merge" icon={<Merge size={16} />} />
```

**I — Interface Segregation**
```ts
// ❌ Bloated — components receive props they don't use
interface CellProps { value: string; isMerged: boolean; onExport: () => void; ... }

// ✅ Lean — each interface is minimal and purposeful
interface TableCellProps {
  cellId: string;
  value: string;
  isSelected: boolean;
  isMerged: boolean;
  colSpan?: number;
  rowSpan?: number;
  onSelect: (cellId: string) => void;
  onChange: (cellId: string, value: string) => void;
}
```

**D — Dependency Inversion**
```tsx
// ✅ Components depend on hook abstractions, not concrete services
const TableGrid: React.FC = () => {
  const { cells, selectCell, updateCell } = useTable(); // abstraction
};
const ExportPanel: React.FC = () => {
  const { exportAs } = useExport(); // abstraction — not jsPDF directly
};
```

---

### 10B. DRY

```
Repeated JSX structure  → shared component in components/ui/ or components/layout/
Repeated logic          → shared util in utils/
Repeated state pattern  → shared hook in hooks/
Repeated config value   → constant in config/ or constants/
Repeated Tailwind string → extract to a component or @layer components in globals.css
```

If the same Tailwind class string appears 3+ times, it belongs in a component.
```tsx
// ❌ Repeated everywhere
<div className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">

// ✅ Extracted
<SectionLabel>Table Dimensions</SectionLabel>
```

---

### 10C. KISS

```
Use shadcn/ui before building a custom component.
Use a library before building a custom hook for something generic.
Use Tailwind utilities before writing custom CSS.
Don't abstract until the second repetition confirms the pattern.
Don't add state management libraries (Zustand, Redux) unless
  TableContext is genuinely insufficient — and document why.
```

---

### 10D. GRASP

| Principle         | Application in Structra                                              |
|-------------------|----------------------------------------------------------------------|
| Information Expert| `useMergeCells` owns merge ranges → calculates mergeability          |
| Creator           | `TableContext` creates `TableState`; `useExport` creates strategies  |
| Controller        | `TableContext` receives all UI events, delegates to hooks             |
| Low Coupling      | Components never import each other — only context, hooks, types      |
| High Cohesion     | `TableCell/` contains only cell concerns; `ExportPanel/` export only |
| Pure Fabrication  | `exportService.ts`, all `utils/` — exist to reduce coupling          |

---

## 11. TypeScript Conventions

```ts
// src/types/table.types.ts
export interface CellData {
  id: string;           // "R{row}C{col}" e.g. "R0C2"
  value: string;
  colSpan: number;      // Default: 1
  rowSpan: number;      // Default: 1
  isMerged: boolean;    // True for anchor cell of a merge
  isHidden: boolean;    // True for cells absorbed by a merge
  format?: ColumnFormat;
}

export interface MergeRange {
  key: string;          // "R{r1}C{c1}:R{r2}C{c2}"
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface SelectionRange {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export type HeaderStyle  = 'none' | 'first-row' | 'first-column' | 'both';
export type ColumnFormat = 'text' | 'number' | 'currency' | 'percentage' | 'date';

export interface TableState {
  cells: CellData[][];
  columnWidths: number[];
  rowHeights: number[];
  mergedRanges: MergeRange[];
  headerStyle: HeaderStyle;
  headerColor: string;
  contentColor: string;
  selectedRange: SelectionRange | null;
}

// src/types/export.types.ts
export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'excel';
export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  quality?: number;     // JPEG only: 0–1
}
export interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>;
}

// src/types/ui.types.ts
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export interface ColorSwatch  { label: string; value: string; }
export interface PresetDefinition {
  id: string;
  label: string;
  rows: number;
  cols: number;
  headers: string[];
  data?: string[][];
}
```

**TypeScript Rules:**
- `"strict": true` in `tsconfig.json` — always
- No `any` without an inline comment explaining unavoidability
- All exported functions/hooks must have explicit return types
- Prefer `interface` for object shapes; `type` for unions and aliases

---

## 12. Testing Strategy (TDD)

### Philosophy
```
Red   → Write a failing test first.
Green → Write minimum code to pass it.
Refactor → Clean up. Commit. Move on.

Never write implementation code before a failing test exists.
```

### Config

**`vitest.config.ts`**
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts'],
      thresholds: { lines: 80, functions: 80, branches: 75, statements: 80 },
    },
  },
});
```

**`src/test/setup.ts`**
```ts
import '@testing-library/jest-dom';
```

---

### Layer 1 — Pure Utils (highest priority, zero dependencies)

```ts
// utils/tableUtils.test.ts
import { describe, it, expect } from 'vitest';
import { generateEmptyTable, addRow, removeRow, addColumn, removeColumn } from './tableUtils';

describe('generateEmptyTable', () => {
  it('creates the correct row and column count', () => {
    const t = generateEmptyTable(3, 4);
    expect(t).toHaveLength(3);
    expect(t[0]).toHaveLength(4);
  });
  it('initialises every cell with an empty string value', () => {
    expect(generateEmptyTable(2, 2)[0][0].value).toBe('');
  });
  it('assigns IDs in R{row}C{col} format', () => {
    expect(generateEmptyTable(2, 3)[1][2].id).toBe('R1C2');
  });
});

describe('addRow', () => {
  it('appends one new row', () => {
    expect(addRow(generateEmptyTable(2, 3))).toHaveLength(3);
  });
  it('does not mutate the original', () => {
    const t = generateEmptyTable(2, 3);
    addRow(t);
    expect(t).toHaveLength(2);
  });
});

describe('removeRow', () => {
  it('removes the last row', () => {
    expect(removeRow(generateEmptyTable(3, 3))).toHaveLength(2);
  });
  it('does not remove the last remaining row', () => {
    expect(removeRow(generateEmptyTable(1, 3))).toHaveLength(1);
  });
});

describe('addColumn', () => {
  it('appends a column to every row', () => {
    addColumn(generateEmptyTable(3, 2)).forEach(row => expect(row).toHaveLength(3));
  });
});
```

```ts
// utils/mergeUtils.test.ts
import { describe, it, expect } from 'vitest';
import { parseCellId, buildMergeKey, isCellInMergeRange } from './mergeUtils';

describe('parseCellId', () => {
  it('parses a valid ID', () => expect(parseCellId('R2C3')).toEqual({ row: 2, col: 3 }));
  it('throws on invalid format', () => expect(() => parseCellId('bad')).toThrow());
});

describe('buildMergeKey', () => {
  it('produces canonical key', () => expect(buildMergeKey(0, 0, 1, 2)).toBe('R0C0:R1C2'));
});

describe('isCellInMergeRange', () => {
  const range = { startRow: 0, startCol: 0, endRow: 1, endCol: 1 };
  it('true for cells inside range',   () => expect(isCellInMergeRange('R0C0', range)).toBe(true));
  it('false for cells outside range', () => expect(isCellInMergeRange('R2C2', range)).toBe(false));
});
```

---

### Layer 2 — Custom Hooks

```ts
// hooks/useTable.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTable } from './useTable';

describe('useTable', () => {
  it('initialises with default 5×5 grid', () => {
    const { result } = renderHook(() => useTable());
    expect(result.current.cells).toHaveLength(5);
    expect(result.current.cells[0]).toHaveLength(5);
  });
  it('updates a cell value', () => {
    const { result } = renderHook(() => useTable());
    act(() => result.current.updateCell('R0C0', 'Hello'));
    expect(result.current.cells[0][0].value).toBe('Hello');
  });
  it('adds a row', () => {
    const { result } = renderHook(() => useTable());
    act(() => result.current.addRow());
    expect(result.current.cells).toHaveLength(6);
  });
  it('does not exceed MAX_ROWS (50)', () => {
    const { result } = renderHook(() => useTable());
    act(() => { for (let i = 0; i < 100; i++) result.current.addRow(); });
    expect(result.current.cells.length).toBeLessThanOrEqual(50);
  });
  it('does not remove the last row', () => {
    const { result } = renderHook(() => useTable());
    act(() => { for (let i = 0; i < 100; i++) result.current.removeRow(); });
    expect(result.current.cells.length).toBeGreaterThanOrEqual(1);
  });
});
```

```ts
// hooks/useMergeCells.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMergeCells } from './useMergeCells';

describe('useMergeCells', () => {
  it('merges a valid multi-cell range', () => {
    const { result } = renderHook(() => useMergeCells());
    act(() => {
      result.current.setSelection({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 });
      result.current.merge();
    });
    expect(result.current.mergedRanges).toHaveLength(1);
  });
  it('does not merge a single cell', () => {
    const { result } = renderHook(() => useMergeCells());
    act(() => {
      result.current.setSelection({ startRow: 0, startCol: 0, endRow: 0, endCol: 0 });
      result.current.merge();
    });
    expect(result.current.mergedRanges).toHaveLength(0);
  });
  it('unmerges an existing range', () => {
    const { result } = renderHook(() => useMergeCells());
    act(() => {
      result.current.setSelection({ startRow: 0, startCol: 0, endRow: 1, endCol: 1 });
      result.current.merge();
    });
    act(() => result.current.unmerge('R0C0:R1C1'));
    expect(result.current.mergedRanges).toHaveLength(0);
  });
});
```

---

### Layer 3 — UI Components

```tsx
// components/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button variant="primary">Generate Table</Button>);
    expect(screen.getByRole('button', { name: /generate table/i })).toBeInTheDocument();
  });
  it('fires onClick on click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button variant="primary" onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button variant="primary" isDisabled onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
  it('sets aria-busy when isLoading', () => {
    render(<Button variant="primary" isLoading>Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

```tsx
// components/features/TableToolbar/TableToolbar.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TableToolbar } from './TableToolbar';
import { TableProvider } from '../../../context/TableContext';

const wrap = (ui: React.ReactElement) =>
  render(<TableProvider>{ui}</TableProvider>);

describe('TableToolbar', () => {
  it('renders all action buttons', () => {
    wrap(<TableToolbar />);
    ['add row', 'add column', 'remove row', 'remove column', 'clear all']
      .forEach(name =>
        expect(screen.getByRole('button', { name: new RegExp(name, 'i') }))
          .toBeInTheDocument()
      );
  });
  it('renders export buttons for all four formats', () => {
    wrap(<TableToolbar />);
    ['pdf', 'png', 'jpeg', 'excel'].forEach(fmt =>
      expect(screen.getByRole('button', { name: new RegExp(fmt, 'i') }))
        .toBeInTheDocument()
    );
  });
});
```

---

### Layer 4 — Page Integration

```tsx
// pages/TableMakerPage/TableMakerPage.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { TableMakerPage } from './TableMakerPage';

describe('TableMakerPage', () => {
  it('renders default 5×5 grid (25 cells)', () => {
    render(<TableMakerPage />);
    expect(screen.getAllByRole('cell')).toHaveLength(25);
  });
  it('adds a row on button click', async () => {
    const user = userEvent.setup();
    render(<TableMakerPage />);
    await user.click(screen.getByRole('button', { name: /add row/i }));
    expect(screen.getAllByRole('cell')).toHaveLength(30);
  });
  it('allows typing into a cell', async () => {
    const user = userEvent.setup();
    render(<TableMakerPage />);
    const cell = screen.getAllByRole('cell')[0];
    await user.click(cell);
    await user.type(cell, 'Product');
    expect(cell).toHaveTextContent('Product');
  });
});
```

### Coverage Targets

| Layer               | Target |
|---------------------|--------|
| `utils/`            | 95%    |
| `services/`         | 90%    |
| `hooks/`            | 90%    |
| `components/ui/`    | 85%    |
| `components/features/` | 80% |
| `pages/`            | 75%    |

Run: `npx vitest run --coverage`

---

## 13. Micro-copy & UX Writing

| Context        | Rule                                     | Example                                   |
|----------------|------------------------------------------|-------------------------------------------|
| Empty state    | Tell them what to do                     | "Click + Add Column to get started."      |
| Success        | Confirm the action                       | "Table exported." not "Export complete."  |
| Error          | What failed + what to try               | "Export failed. Try reducing table size." |
| Tooltip        | Short phrase, no period                  | "Merge selected cells"                    |
| Confirm dialog | Verb + object on the button              | [Delete Table] not [OK]                   |
| Placeholder    | Example value, not instruction           | "e.g. Product Name"                       |
| Toolbar labels | 1–2 words, title case                    | "Add Row", "Remove Column", "Clear All"   |

---

## 14. Accessibility

- All interactive elements must have visible `:focus-visible` ring (via Tailwind `focus-visible:outline-primary`)
- Icon-only buttons require `aria-label` — no exceptions
- Table cells keyboard navigable: Tab / Shift+Tab / Arrow keys
- Color swatches: ring or checkmark indicator for selected state (not color alone)
- Merge outcomes: announce via `aria-live="polite"`
- Min contrast: 4.5:1 body text, 3:1 large text (WCAG 2.1 AA)
- Respect `prefers-reduced-motion` — wrap transitions accordingly

---

## 15. Animation & Motion

- Hover transitions: `transition-colors duration-150`
- Panel open/close: `transition-all duration-200 ease-out`
- Merge cell flash: brief `bg-primary-light` transition
- No page transitions. No spinners unless async > 500ms.
- Use Tailwind's `motion-reduce:transition-none` on all animated elements

---

## 16. Responsive Design

Structra must be fully functional and visually correct on every screen size.
Use a **mobile-first** approach — write base styles for mobile, then override
upward with `sm:`, `md:`, `lg:`, `xl:` prefixes.

### Breakpoint Reference

| Prefix | Min-width | Target devices                        |
|--------|-----------|---------------------------------------|
| (none) | 0px       | Mobile portrait (320px–639px)         |
| `sm:`  | 640px     | Mobile landscape / small tablet       |
| `md:`  | 768px     | Tablet portrait                       |
| `lg:`  | 1024px    | Tablet landscape / small laptop       |
| `xl:`  | 1280px    | Desktop                               |
| `2xl:` | 1536px    | Wide desktop / large monitor          |

These are Tailwind's defaults — do not add custom breakpoints unless a specific
device target demands it and it is documented with a reason.

---

### Navbar — Responsive Behavior

```
Mobile (< md):
  - Show: logo (icon mark only, not wordmark) + hamburger menu icon button
  - Hide: nav links, CTA button
  - Hamburger opens: full-screen slide-in drawer (from right, 280px wide)
    - Drawer contains: all nav links stacked vertically + "Start Building" CTA
    - Drawer overlay: bg-black/40 backdrop, closes on click-outside or ESC
  - Height: h-14 (56px)

Tablet (md – lg):
  - Show: full logo (icon + wordmark) + condensed nav links + CTA button
  - Hide: hamburger
  - Height: h-nav (60px)
  - Nav links: smaller gap, text-xs if needed

Desktop (lg+):
  - Full layout: logo · nav links centered · CTA right
  - Height: h-nav (60px)

Classes:
  <nav className="sticky top-0 z-50 bg-white border-b border-border">
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8
                    h-14 md:h-nav flex items-center justify-between">

  {/* Logo: icon-only on mobile, full on md+ */}
  <Logo className="w-8 h-8 md:hidden" variant="icon" />
  <Logo className="hidden md:block" variant="full" />

  {/* Nav links: hidden on mobile */}
  <nav className="hidden md:flex items-center gap-6"> ... </nav>

  {/* CTA: hidden on mobile (lives in drawer) */}
  <Button className="hidden md:inline-flex"> Start Building </Button>

  {/* Hamburger: visible on mobile only */}
  <IconButton className="md:hidden" aria-label="Open menu"> <Menu /> </IconButton>
```

---

### Table Maker Page — Responsive Layout

The table maker is a 3-column layout on desktop. On smaller screens the
sidebars collapse into toggled panels to preserve table working space.

```
Mobile (< md):
  Layout: Single column, full height
  - Toolbar: horizontal scroll if buttons overflow (overflow-x-auto)
  - Left sidebar: collapsed by default
    → Accessible via a floating "⚙ Settings" button (bottom-left)
    → Opens as a bottom sheet (slides up from bottom, 80vh max)
  - Right sidebar: collapsed by default
    → Accessible via a floating "✦ Presets" button (bottom-right)
    → Opens as a bottom sheet
  - Table grid: full viewport width, horizontally scrollable container
  - Export buttons: move into a dropdown menu ("Export ▾") to save space

Tablet (md – lg):
  Layout: 2 columns — Left sidebar (240px fixed) + Table (flex-1)
  - Right sidebar: hidden, accessible via toggle button in toolbar
  - Toolbar: all buttons visible, may wrap to 2 rows if needed
  - Table grid: fills remaining space, horizontally scrollable

Desktop (lg+):
  Layout: 3 columns — Left sidebar + Table + Right sidebar
  - All panels visible simultaneously
  - Table toolbar: single row, all actions visible

Classes for the main layout shell:
  {/* Page wrapper */}
  <div className="flex flex-col h-screen overflow-hidden">

    {/* Toolbar */}
    <div className="flex-none overflow-x-auto"> <TableToolbar /> </div>

    {/* Body: sidebar(s) + table */}
    <div className="flex flex-1 overflow-hidden">

      {/* Left sidebar: hidden on mobile, shown md+ */}
      <aside className="hidden md:flex flex-col w-sidebar-left
                        border-r border-border bg-surface overflow-y-auto flex-none">
        ...
      </aside>

      {/* Table grid: always visible, scrollable */}
      <main className="flex-1 overflow-auto p-2 sm:p-4">
        <TableGrid />
      </main>

      {/* Right sidebar: hidden below lg */}
      <aside className="hidden lg:flex flex-col w-sidebar-right
                        border-l border-border bg-surface overflow-y-auto flex-none">
        ...
      </aside>

    </div>
  </div>

Mobile bottom sheet (sidebar substitute):
  <div className="fixed inset-x-0 bottom-0 z-40 bg-white rounded-t-xl shadow-lg
                  max-h-[80vh] overflow-y-auto transition-transform duration-300
                  md:hidden">
    {/* Drag handle */}
    <div className="w-10 h-1 bg-border rounded-full mx-auto mt-3 mb-4" />
    ...
  </div>

  {/* Overlay */}
  <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={close} />

Floating action buttons (mobile only):
  <div className="fixed bottom-4 left-4 z-20 md:hidden">
    <IconButton aria-label="Open settings" className="shadow-lg bg-white border border-border rounded-full w-10 h-10">
      <Settings size={18} />
    </IconButton>
  </div>
  <div className="fixed bottom-4 right-4 z-20 md:hidden">
    <IconButton aria-label="Open presets" className="shadow-lg bg-white border border-border rounded-full w-10 h-10">
      <Sparkles size={18} />
    </IconButton>
  </div>
```

---

### Table Grid — Responsive Behavior

```
All sizes:
  - Container: overflow-x-auto overflow-y-auto (both axes scrollable)
  - Table itself: min-w-max (never squishes below its natural width)
  - Cells: min-w-[80px] to prevent unreadable narrow cells on mobile

Mobile:
  - Column widths: default to 100px (narrower than desktop's 120px)
  - Font size: text-xs (smaller than desktop's text-sm) to fit more content
  - Resize handles: increase touch target to 8px wide (easier to grab)
  - Cell padding: p-1.5 (tighter than desktop's p-2)

Desktop:
  - Column widths: 120px default, user-resizable
  - Font size: text-sm
  - Resize handles: 4px wide
  - Cell padding: p-2
```

---

### Landing Page — Responsive Layout

```tsx
{/* Hero Section */}
<section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center
                    max-w-content mx-auto">
  {/* Eyebrow badge */}
  <div className="inline-flex items-center gap-2 text-xs font-semibold
                  text-text-muted border border-border rounded-full px-3 py-1 mb-6">
    Free · No account required · Export anywhere
  </div>

  {/* Headline: scales from 3xl → 5xl */}
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary
                 leading-tight mb-4 sm:mb-6">
    Build Tables That<br />Mean Business.
  </h1>

  {/* Subheadline: single col on mobile */}
  <p className="text-base sm:text-lg text-text-secondary leading-relaxed
                max-w-narrow mx-auto mb-8">
    ...
  </p>

  {/* CTAs: stacked on mobile, inline on sm+ */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
    <Button variant="accent" size="lg">→ Start Building for Free</Button>
    <a className="text-sm font-medium text-primary hover:underline">
      See how it works ↓
    </a>
  </div>
</section>

{/* Features Grid: 1 col → 2 col → 3 col */}
<section className="px-4 sm:px-6 lg:px-8 py-16 max-w-content mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map(f => <FeatureCard key={f.id} {...f} />)}
  </div>
</section>

{/* How It Works: stacked → side by side */}
<section className="px-4 sm:px-6 lg:px-8 py-16 max-w-content mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {steps.map(s => <StepCard key={s.number} {...s} />)}
  </div>
</section>

{/* Footer: stacked on mobile, 4-col on lg+ */}
<footer className="border-t border-border bg-surface px-4 sm:px-6 lg:px-8
                   py-12 sm:py-16">
  <div className="max-w-content mx-auto
                  grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    ...
  </div>
  <p className="text-xs text-text-muted text-center mt-8">
    © 2025 Structra. All rights reserved.
  </p>
</footer>
```

---

### Table Toolbar — Responsive Behavior

```
Mobile:
  - Overflow-x: toolbar scrolls horizontally — do NOT wrap buttons
  - Export group: collapse PDF/PNG/JPEG/Excel into a single "Export ▾" DropdownMenu
  - Add/Remove group: keep visible (most-used actions)
  - Merge/Unmerge: keep visible

Tablet+:
  - All groups visible in a single row

Implementation:
  {/* Export group: dropdown on mobile, individual buttons on lg+ */}
  <div className="lg:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">Export <ChevronDown size={14} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => exportAs('pdf')}>PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAs('png')}>PNG</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAs('jpeg')}>JPEG</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAs('excel')}>Excel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div className="hidden lg:flex items-center gap-1">
    {/* individual PDF PNG JPEG Excel buttons */}
  </div>
```

---

### Typography — Responsive Scale

| Element        | Mobile          | Tablet          | Desktop         |
|----------------|-----------------|-----------------|-----------------|
| Hero headline  | `text-3xl`      | `text-4xl`      | `text-5xl`      |
| Section h2     | `text-2xl`      | `text-3xl`      | `text-3xl`      |
| Card h3        | `text-lg`       | `text-xl`       | `text-xl`       |
| Body           | `text-sm`       | `text-base`     | `text-base`     |
| Cell content   | `text-xs`       | `text-sm`       | `text-sm`       |

Apply as: `text-3xl sm:text-4xl lg:text-5xl` — never hard-code one size for all screens.

---

### Touch Target Rules (Mobile)

- Minimum tap target: **44×44px** on all interactive elements (WCAG 2.5.5)
- Icon buttons on mobile: `w-11 h-11` (44px) instead of `w-8 h-8`
- Resize handles: `w-3` (12px touch width) on mobile vs `w-1` on desktop
- Cell tap targets: minimum `h-11` row height on mobile

---

### Responsive Checklist (add to Section 18)

- [ ] Navbar shows hamburger on mobile; full nav on md+
- [ ] Drawer/sheet opens and closes correctly with overlay + ESC key
- [ ] Table maker sidebars hidden on mobile, shown progressively on md+ and lg+
- [ ] Bottom sheet panels work on mobile with drag handle
- [ ] Floating action buttons appear on mobile only
- [ ] Table grid is horizontally scrollable on all screen sizes
- [ ] Toolbar scrolls horizontally on mobile without wrapping
- [ ] Export buttons collapse to dropdown on mobile
- [ ] All touch targets meet 44×44px minimum on mobile
- [ ] Hero headline scales correctly across all breakpoints
- [ ] Features grid: 1 col → 2 col → 3 col
- [ ] Footer: 2 col → 4 col
- [ ] No horizontal overflow on any page at 320px viewport width
- [ ] Test on: iPhone SE (375px), iPhone 14 (390px), iPad (768px),
      iPad Pro (1024px), Laptop (1280px), Desktop (1440px+)

---

## 17. What NOT to Do

- ❌ No business logic in `App.tsx` or `main.tsx` — routing only
- ❌ No multiple components in a single file
- ❌ No inline `style={{}}` — use Tailwind classes
- ❌ No arbitrary Tailwind values (`text-[13px]`) for recurring patterns — use config tokens
- ❌ No `any` type without an explanatory inline comment
- ❌ No direct cross-feature imports — use context
- ❌ No implementation code written before a failing test exists
- ❌ No two libraries solving the same problem installed simultaneously
- ❌ No reference to "Tabley" anywhere in codebase, comments, or copy
- ❌ No `Suspense` with `fallback={null}` on page-level routes — always show a loader
- ❌ No fixed pixel widths on layout containers — use `max-w-*` + `mx-auto` + responsive padding
- ❌ No tap targets smaller than 44×44px on mobile screens
- ❌ No hard-coded single font size for text that appears across breakpoints
- ❌ No desktop-only layout assumptions — every view must be designed mobile-first

---

## 18. Installation Sequence for Codex

Run in this exact order:

```bash
# 1. Create Vite project
npm create vite@latest structra -- --template react-ts
cd structra

# 2. Core dependencies
npm install react-router-dom lucide-react class-variance-authority clsx

# 3. Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. shadcn/ui (follow prompts: TypeScript, Tailwind, src/components/ui)
npx shadcn@latest init
npx shadcn@latest add button select tooltip dropdown-menu separator badge dialog

# 5. Table resize/drag
npm install @dnd-kit/core @dnd-kit/utilities

# 6. Export libraries
npm install jspdf html2canvas xlsx

# 7. Import libraries
npm install papaparse
npm install -D @types/papaparse

# 8. Testing
npm install -D vitest @testing-library/react @testing-library/user-event
npm install -D @testing-library/jest-dom @vitejs/plugin-react jsdom

# 9. Dev tools
npm install -D @types/react @types/react-dom
```

---

## 19. Full Implementation Checklist for Codex

### Brand & Positioning
- [ ] Rename all "Tabley" occurrences to "Structra" across all files and strings
- [ ] Implement full logo SVG (Section 2A) in Navbar — icon-only variant for mobile
- [ ] Implement icon-mark SVG (Section 2B) as `public/favicon.svg`
- [ ] Configure Tailwind tokens from Section 3 in `tailwind.config.ts`
- [ ] Add Google Fonts link to `index.html` (Section 4)
- [ ] Nav updated: Home · Features · Open Source · About + GitHub ghost button
- [ ] Hero matches Section 6 exactly — no eyebrow badge, no trust line, minimal
- [ ] Open Source section implemented with MIT license note
- [ ] About section includes "What Structra Is Not" quiet list
- [ ] 404 page built with back-to-home CTA

### UI Principles Enforcement
- [ ] No `rounded-lg` or larger anywhere in the product — `rounded-md` (8px) is the maximum
- [ ] No `shadow-md` or `shadow-lg` on any card, panel, or sidebar
- [ ] No glass effects: zero `backdrop-blur`, zero opacity layering
- [ ] No decorative dividers, gradients, or background texture patterns
- [ ] Every hover state reviewed for "calm confidence" — nothing jumps, flashes, or demands attention

### Architecture
- [ ] Exact folder structure from Section 9 created
- [ ] `App.tsx` contains routing + lazy imports only — zero business logic
- [ ] All pages in `src/pages/` — each lazy-loaded via `React.lazy()`
- [ ] All primitives in `src/components/ui/`
- [ ] All feature components in `src/components/features/`
- [ ] All hooks in `src/hooks/`
- [ ] All types in `src/types/`
- [ ] All config in `src/config/`
- [ ] `TableContext.tsx` is the single global state provider
- [ ] `exportService.ts` implements the strategy pattern
- [ ] `globals.css` contains Tailwind directives + resize handle utilities only

### Lazy Loading
- [ ] Every page lazy-loaded via `React.lazy()` + `Suspense` with `<PageLoader />` fallback
- [ ] `QuickPresetsPanel`, `ColumnFormattingPanel`, `ExportPanel` lazy-loaded inside `TableMakerPage`
- [ ] `vite.config.ts` has `manualChunks` splitting vendor-react, vendor-ui, vendor-export
- [ ] `PageLoader` and `PanelLoader` components built with icon-mark SVG
- [ ] No `Suspense fallback={null}` on any page-level route

### Smooth Drag-to-Resize
- [ ] `useColumnResize` uses `requestAnimationFrame` — zero React state updates during drag
- [ ] Ghost vertical line indicator rendered at top of `TableGrid` during column drag
- [ ] `useRowResize` mirrors the same rAF pattern for row height
- [ ] Column width committed in a single `setColumnWidths` call on `mouseup` only
- [ ] `document.body` cursor and `userSelect` set on dragstart, cleaned on mouseup
- [ ] Column width clamped: min 60px · max 600px
- [ ] Row height clamped: min 32px · max 300px
- [ ] Resize handle touch target: 8px desktop · 12px mobile

### CSV & Excel Import
- [ ] Toolbar has `Import ▾` dropdown (CSV and Excel options)
- [ ] Hidden `<input type="file">` triggered via ref for both types
- [ ] CSV: PapaParse with `{ header: true, skipEmptyLines: true }`
- [ ] Excel: SheetJS `XLSX.read()` + `utils.sheet_to_json()`
- [ ] Both normalise to `CellData[][]` before dispatching to `TableContext`
- [ ] Files >5MB rejected before parsing with toast: "File too large. Maximum size is 5MB."
- [ ] Parse errors show toast: "Could not read file. Check the format and try again."
- [ ] `useImport` hook lives in `src/hooks/` with full test coverage

### Buttons
- [ ] `Button` uses `cva()` from `class-variance-authority`
- [ ] Five variants: primary · accent · secondary · ghost · danger
- [ ] Three sizes: sm · md · lg
- [ ] Four states per variant: default · hover · active `scale-[0.97]` · disabled
- [ ] `motion-reduce:transition-none` on all buttons
- [ ] Icon buttons: `w-11 h-11` mobile · `w-8 h-8` desktop

### Responsive Design
- [ ] Mobile-first: base = mobile, override upward with `sm:` `md:` `lg:`
- [ ] Navbar: hamburger + slide-in drawer on mobile · full nav on md+
- [ ] Table maker: bottom sheets mobile · left sidebar md+ · right sidebar lg+
- [ ] Floating Settings + Presets buttons visible on mobile only
- [ ] Table grid: `overflow-x-auto` container · `min-w-max` table · scrollable on all sizes
- [ ] Toolbar: `overflow-x-auto` mobile · export group collapses to dropdown on `< lg`
- [ ] Hero: `text-3xl sm:text-4xl lg:text-5xl`
- [ ] Features: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- [ ] Footer: `grid-cols-2 lg:grid-cols-3` · stacked on mobile
- [ ] All touch targets ≥ 44×44px
- [ ] Zero horizontal overflow at 320px viewport
- [ ] Tested at: 375px · 390px · 768px · 1024px · 1280px · 1440px

### Libraries
- [ ] shadcn/ui: Select, Tooltip, Dialog, DropdownMenu, Separator installed
- [ ] Lucide React only — no second icon library
- [ ] @dnd-kit for all drag and resize interactions
- [ ] jsPDF + html2canvas for PDF and image export
- [ ] SheetJS for Excel import + export
- [ ] PapaParse + `@types/papaparse` for CSV import
- [ ] `cva` + `clsx` for variant class composition

### TypeScript
- [ ] `"strict": true` in `tsconfig.json`
- [ ] All types from Section 11 in `src/types/`
- [ ] Zero `any` without explanatory inline comment

### Testing
- [ ] `vitest.config.ts` configured per Section 12
- [ ] `src/test/setup.ts` created with `@testing-library/jest-dom`
- [ ] Utils → 95% · Services → 90% · Hooks → 90% · UI components → 85% · Features → 80% · Pages → 75%
- [ ] `useImport` tests: valid CSV · valid Excel · malformed file · file >5MB
- [ ] `useColumnResize` tests: full mousedown→mousemove→mouseup cycle · min/max clamping
- [ ] All tests pass before any feature is marked complete

### Engineering Principles
- [ ] Single Responsibility: no file has more than one concern
- [ ] Open/Closed: `Button` uses `cva` · `ExportService` uses strategy pattern
- [ ] Interface Segregation: no component receives props it doesn't use
- [ ] Dependency Inversion: all components depend on hooks/context, not services directly
- [ ] DRY: no Tailwind class string repeated 3+ times without a component extraction
- [ ] KISS: no abstraction created before its second confirmed use case

---

*End of Brand Identity & Engineering Implementation Guide — Structra v5.0*
*Single source of truth. Any deviation requires explicit sign-off.*
