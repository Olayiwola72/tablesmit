# Tablesmit — Brand Identity & Engineering Implementation Guide
> For AI Coding Agents (Codex, Claude Code, etc.)
> Brand + Positioning + Architecture + TDD | Tailwind CSS Edition
> Status: Authoritative. Do not deviate without explicit instruction.
> Current Release: v1.3.0

---

## 0. The North Star

**Tablesmit** is a minimalist table builder for analytical writing.

It exists for writers, analysts, researchers, and technical thinkers who need clean
structured tables with full control over headers, formatting, and export —
without the noise of a spreadsheet, the complexity of a database, or the
aesthetic overwhelm of a design tool.

> **Tagline:** *Tables, your way.*
> **Subtext (hero):** *A minimalist table builder for analytical writing — with full control over headers, formatting, and export.*
> **About line:** *Tablesmit was created by a writer who needed more control than basic table generators provided. Built for people who think in structure and publish with precision.*

### Positioning Statement
```
For:     Writers, analysts, researchers, and technical thinkers
Who:     Need clean, structured tables with customization control
Tablesmit is: A minimalist table builder for analytical writing
That:    Gives full control over headers, formatting, and export
Unlike:  Generic table tools that are either too rigid or too complex
```

### What Tablesmit Is Not
```
Not a spreadsheet.
Not a database.
Not a Notion competitor.
Not a design-heavy tool.

Tablesmit is a structured writing tool.
```
Every product decision must be filtered through this. If a feature makes
Tablesmit feel like any of the above — reconsider it.

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

| Field          | Value                                                                              |
|----------------|------------------------------------------------------------------------------------|
| Product Name   | **Tablesmit**                                                                      |
| Domain         | tablesmit.com (confirmed, ~$11/year)                                               |
| Origin         | Table + Smith. A smith crafts with precision — wordsmith, goldsmith, tablesmith.   |
|                | The missing "h" is intentional — own it as the brand spelling (cf. Tumblr, Flickr)|
| Pronunciation  | TAY-bul-smit                                                                       |
| SEO note       | Cover "tablesmith" in meta description and GitHub — users will search both spellings|
| Personality    | Calm. Competent. Minimal. Friendly but never chatty.                               |
| Open Source    | Yes — GitHub link in secondary CTA + Sponsor button                                |
| What it is NOT | Loud, cluttered, feature-heavy, or visually expressive.                            |

---

## 2. Logo

The only logo is the **T-form** — three rectangles forming a table with a header row.
No outlines, no strokes. Pure filled shapes only.
Rendered as a React SVG component (`src/components/ui/Logo/Logo.tsx`), not an external image file.

### Concept

Three rectangles. Full opacity on top (the header row), fading opacity below
(two data columns). Reads as a table with a header from 16px up.
The decreasing opacity from left column to right subtly implies "more columns beyond."
The shape is also a T — a quiet reference to the brand name.

### 2A. Full Logo (Icon + Wordmark)

**Light background:**
```svg
<svg width="220" height="48" viewBox="0 0 220 48" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(4,8)">
    <rect x="0" y="0" width="30" height="10" rx="4" fill="#1E40AF"/>
    <rect x="0" y="13" width="13" height="15" rx="3" fill="#1E40AF" opacity="0.28"/>
    <rect x="17" y="13" width="13" height="15" rx="3" fill="#1E40AF" opacity="0.14"/>
  </g>
  <text x="46" y="30"
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="22" font-weight="600" letter-spacing="-0.5"
        fill="#1E293B">Tablesmit</text>
</svg>
```

**Dark background:**
```svg
<svg width="220" height="48" viewBox="0 0 220 48" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(4,8)">
    <rect x="0" y="0" width="30" height="10" rx="4" fill="#60A5FA"/>
    <rect x="0" y="13" width="13" height="15" rx="3" fill="#60A5FA" opacity="0.35"/>
    <rect x="17" y="13" width="13" height="15" rx="3" fill="#60A5FA" opacity="0.18"/>
  </g>
  <text x="46" y="30"
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="22" font-weight="600" letter-spacing="-0.5"
        fill="#FFFFFF">Tablesmit</text>
</svg>
```

### 2B. Icon Mark Only (Favicon / App Icon)

**Light background:**
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="28" height="10" rx="4" fill="#1E40AF"/>
  <rect x="2" y="15" width="12" height="15" rx="3" fill="#1E40AF" opacity="0.28"/>
  <rect x="18" y="15" width="12" height="15" rx="3" fill="#1E40AF" opacity="0.14"/>
</svg>
```

**Dark background:**
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="28" height="10" rx="4" fill="#60A5FA"/>
  <rect x="2" y="15" width="12" height="15" rx="3" fill="#60A5FA" opacity="0.4"/>
  <rect x="18" y="15" width="12" height="15" rx="3" fill="#60A5FA" opacity="0.2"/>
</svg>
```

### 2C. Anatomy & Rules

```
Full logo:   220×48 viewBox, icon at (4,8), wordmark at x=46, y=30
Icon mark:   32×32 viewBox

Header bar:     x=2, y=2, width=28, height=10, rx=4
                fill: #1E40AF (light) · #60A5FA (dark)
                Represents: the header row — the product's signature feature

Left cell:      x=2, y=15, width=12, height=15, rx=3
                opacity: 0.28 (light) · 0.40 (dark)
                Gap from header: 3px

Right cell:     x=18, y=15, width=12, height=15, rx=3
                opacity: 0.14 (light) · 0.20 (dark)
                Gap from left cell: 6px

Wordmark:       font-size 22, font-weight 600, letter-spacing -0.5
                fill: #1E293B (light) · #FFFFFF (dark)
```

### 2D. Logo Rules
- Minimum: 120px wide (full) · 24px (icon)
- No outlines, no strokes — pure filled shapes only
- Opacity fade (left → right) implies "more columns beyond"
- 3px gap between header and body = visual table separation
- All `rx` values ≤ 4px — consistent with UI rounded corner rules
- Minimum render size: 16px (favicon) — all three shapes remain distinct
- Never recolor the header bar to anything other than `#1E40AF` (light) or `#60A5FA` (dark)
- Never remove the opacity difference between left and right cells
- Never add outlines or strokes
- Never: stretch, rotate, recolor, add shadows, or animate

### 2E. Implementation

The logo is a pure React SVG component at `src/components/ui/Logo/Logo.tsx` with two variants:
- `variant="full"` — 220×48 SVG with icon + wordmark
- `variant="icon"` — 32×32 SVG, icon only (used in Navbar mobile, favicon, PageLoader)

Theme is handled via the `theme` prop (`'light'` | `'dark'`), which controls fill colors.
No external image files are loaded at runtime — `src/assets/logo.svg` exists for reference only.

---

## 3. Design Tokens (Tailwind Config)

All colors, fonts, spacing, and radii are defined in `tailwind.config.ts`.
Do not use arbitrary Tailwind values (e.g. `text-[13px]`) for anything that
recurs more than once — extract it to the config instead.

```ts
// tailwind.config.ts
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          hover: '#1D3899',
          light: '#EFF6FF',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FFFBEB',
        },
        surface: '#F9FAFB',
        border: '#E5E7EB',
        'border-focus': '#1E40AF',
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          inverse: '#FFFFFF',
        },
        success: { DEFAULT: '#059669', light: '#ECFDF5' },
        danger: { DEFAULT: '#DC2626', light: '#FEF2F2' },
        info: { DEFAULT: '#0EA5E9', light: '#F0F9FF' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      maxWidth: {
        content: '1200px',
        narrow: '720px',
      },
      height: {
        nav: '60px',
      },
      width: {
        'sidebar-left': '240px',
        'sidebar-right': '220px',
      },
    },
  },
  plugins: [typography],
}

export default config
```

### Token Usage Rules
- **Primary blue** → buttons, links, selected cell borders, active nav, focus rings
- **Accent amber** → ONE place only: the "Create Table" CTA button. Merged cell highlight.
- **White** → always the page background. `bg-white` on `<body>`. Never `bg-gray-*` for pages.
- **Surface** → sidebars, toolbar, card backgrounds: `bg-surface`
- **No arbitrary colors** in JSX — every color must trace to a token

---

## 4. Typography

Loaded in `index.html` (via preload) and `globals.css` (via raw `@font-face` — self-hosted, no external requests):

Font files are preloaded in `index.html` to prevent late font swap:
```html
<link rel="preload" href="/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/jetbrains-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/jetbrains-mono-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
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
| Cell content      | `text-xs sm:text-sm font-sans text-text-primary`  |
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
Right: GitHub ghost button (ExternalLink icon)
Links: Home · About · Features · Blog · Contact · Open Source · Testimonials
CTA: "Create a Table" lives in the hero section — not in the navbar
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

ACCENT  (Create Table — one instance only)
  Default:  bg-accent text-white px-5 py-2.5
  Hover:    hover:bg-accent-hover hover:shadow-md
  Active:   active:bg-[#78350F] active:scale-[0.97] active:shadow-none

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
import { cn } from '../../lib/utils';

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
        accent:    'bg-accent text-white hover:bg-accent-hover hover:shadow-md active:bg-[#B45309] active:scale-[0.97] active:shadow-none',
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
  1. Templates ▾ (DropdownMenu)                          (secondary button)
       └─ Research Notes · Feature Matrix · Content Tracker · Budget Summary · Q1 Performance
  2. Theme ▾ (DropdownMenu)                              (secondary button)
  3. Add Row · Add Column · Remove Row · Remove Column   (ghost buttons)
  4. Merge · Unmerge                                     (ghost buttons)
  5. AI ✦                                                (ghost button, "Coming soon")
  6. Copy ▾ (DropdownMenu)                               (secondary button)
       └─ Copy as Excel Data · Copy as CSV · Copy as Markdown · Copy as LaTeX · Copy as Image · Copy as HTML
  7. Paste                                                (secondary button, auto-detect)
  8. Import ▾ (DropdownMenu)                             (secondary button)
       └─ Import from CSV · Import from Excel · Clean Data (Coming soon)
  9. Clear All · Undo                                    (danger / ghost)
  (Export lives in the right sidebar ExportPanel — not in the toolbar)
```

**CSV / Excel Import flow:**
```tsx
// Trigger: hidden <input type="file"> clicked via ref
// CSV  → papaparse → Papa.parse(file, { header: true, skipEmptyLines: true })
// Excel → SheetJS  → XLSX.read(buffer) → XLSX.utils.sheet_to_json()
// Both → normalise to CellData[][] → dispatch to TableContext
// Excel import passes worksheet.dimensions to normaliseRows as minRows/minCols
// so empty styled worksheets preserve their full dimensions.
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
Cell:          text-xs sm:text-sm font-sans text-text-primary p-0
               Cell content: p-1.5 sm:p-2
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
Left:   [Tablesmit SVG Logo]
Center: Home  |  About  |  Features  |  Blog  |  Contact  |  Open Source  |  Testimonials
Right:  [GitHub ↗]         (ghost button with ExternalLink icon)
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
  PRIMARY:   [Create a Table]          ← accent button, lg
  SECONDARY: [View on GitHub ↗]        ← secondary/outline button, lg
                                          with ExternalLink icon from Lucide

The actual `HeroBanner` component renders a trust-building feature bullet row below the
subtext (custom headers, column types, merge cells, export formats). This replaces
the "trust line" described in earlier drafts — the actual implementation includes
this lightweight feature highlight while keeping the overall hero clean and minimal.

NO eyebrow badge. NO separate trust line. NO animation.
Clean white space speaks for itself.
```

---

> **Note:** The table maker page (`/`) serves as the primary entry point. The About page (`/about`) contains the brand story and "What Tablesmit Is Not" list. There is no separate LandingPage — AboutPage at `/about` fulfills that role.

---

### Open Source Section

**Layout:** Full-width · `bg-surface` background · centered · `py-16 sm:py-20`

```
HEADING (text-2xl font-bold text-text-primary):
  Built in the open.

BODY (text-base text-text-secondary max-w-narrow mx-auto text-center):
  Tablesmit is free and open source. The code is on GitHub — read it,
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
  Tablesmit was created by a writer who needed more control than
  basic table generators provided.

  Most tools gave too little — no header customization, no column
  formatting, no clean export. Others gave too much — the full weight
  of a spreadsheet for something that just needed to be a table.

  Tablesmit is the middle ground. Built for people who think in
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
  [Tablesmit icon mark]  Tablesmit
  Tables, your way.
  © {getCurrentYear()} Tablesmit. Open source under MIT license.

RIGHT (flex gap-8 text-sm text-text-secondary):
  Product:    Home · Blog · Features · Changelog · Open Source
  Company:    About · Contact · Testimonials · Privacy Policy · Terms of Use · GitHub ↗
  Export:     PDF · PNG · JPEG · Excel · CSV · LaTeX

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

### 404 Animation SVG

```svg
<svg width="200" height="140" viewBox="0 0 200 140" fill="none"
     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <style>
    @keyframes drawGrid {
      to { stroke-dashoffset: 0; }
    }
    @keyframes fadeCell {
      to { opacity: 1; }
    }
    @keyframes pulseZero {
      0%, 100% { opacity: 0.25; }
      50% { opacity: 0.6; }
    }
    .grid-line { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawGrid 0.8s ease-out forwards; }
    .grid-line:nth-child(2) { animation-delay: 0.1s; }
    .grid-line:nth-child(3) { animation-delay: 0.2s; }
    .grid-line:nth-child(4) { animation-delay: 0.3s; }
    .grid-line:nth-child(5) { animation-delay: 0.4s; }
    .cell-digit { opacity: 0; animation: fadeCell 0.4s ease-out forwards; }
    .cell-digit:nth-child(1) { animation-delay: 0.5s; }
    .cell-digit:nth-child(2) { animation: fadeCell 0.4s ease-out forwards, pulseZero 2.5s ease-in-out 1s infinite; }
    .cell-digit:nth-child(3) { animation-delay: 0.6s; }
  </style>
  <rect x="1" y="1" width="198" height="138" rx="10"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="1" y1="47" x2="199" y2="47"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="1" y1="93" x2="199" y2="93"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="67" y1="1" x2="67" y2="139"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <line x1="134" y1="1" x2="134" y2="139"
        stroke="#1E40AF" strokeWidth="1.5" className="grid-line" />
  <text x="33" y="112" textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="38" fontWeight="600"
        fill="#1E40AF" className="cell-digit">4</text>
  <text x="100" y="112" textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="38" fontWeight="600"
        fill="#1E40AF" className="cell-digit">0</text>
  <text x="167" y="112" textAnchor="middle"
        fontFamily="Inter, sans-serif" fontSize="38" fontWeight="600"
        fill="#1E40AF" className="cell-digit">4</text>
</svg>
```

Component location: `src/components/ui/NotFoundAnimation/NotFoundAnimation.tsx`

---

## 7. Page Meta / SEO

```html
<title>Tablesmit — Tables, Your Way</title>
<meta name="description" content="The web table maker with true spreadsheet
control. Resize rows and columns, merge cells, set custom colors, and export
to PDF, Excel, PNG, or JPEG — free, no account required.">

<!-- Favicon: icon-mark SVG from Section 2B → public/favicon.svg -->
```

---

## 8. Tech Stack

| Layer             | Technology                                                        | Notes                               |
|-------------------|-------------------------------------------------------------------|-------------------------------------|
| Framework         | React 18 + Vite                                                   | –                                   |
| Language          | TypeScript — `strict: true`                                       | –                                   |
| Styling           | **Tailwind CSS v3**                                               | Config in `tailwind.config.ts`      |
| Components        | **shadcn/ui**                                                     | Dropdowns, tooltips, dialogs        |
| Icons             | **Lucide React**                                                  | `lucide-react` — only icon library  |
| Drag/Resize       | **@dnd-kit/core + @dnd-kit/utilities**                            | Column/row resize, row reorder      |
| Export PDF        | **jsPDF + html2canvas**                                           | –                                   |
| Export Excel      | **exceljs**                                     | Export + import                     |

| Import Excel      | **exceljs**                                     | Same lib as export — no extra dep   |
| Unit Testing      | **Vitest + React Testing Library + @testing-library/user-event**  | –                                   |
| E2E Testing       | **Playwright**                                                    | Tests in `e2e/`                     |
| Routing           | **React Router v6**                                               | –                                   |
| Fonts             | **`@font-face` blocks in `globals.css`**                          | Self-hosted, no external requests   |
| Toast             | **sonner**                                                        | –                                   |
| Markdown/Blog     | **react-markdown + remark-gfm**                                   | Blog content rendering              |
| Meta/SEO          | **react-helmet-async**                                            | Per-page meta tags, JSON-LD         |
| Theme/Typography  | **@tailwindcss/typography**                                       | `prose` class for blog content      |
| Error Monitoring  | **@sentry/react**                                                 | Production only                     |
| PWA               | **vite-plugin-pwa**                                               | Service worker, offline support     |
| Git Hooks         | **husky + lint-staged**                                           | Pre-commit lint + format            |
| Button Variants   | **class-variance-authority + clsx**                               | `cva()` for Button component        |

### Library Policy
- **Use libraries freely** — don't build what already exists well.
- **shadcn/ui** first for any UI primitive (Select, Tooltip, Dialog, DropdownMenu,
  Popover, Separator, Badge, etc.). Install components as needed with `npx shadcn@latest add`.
- **Lucide React** for all icons — consistent, tree-shakeable, typed.
- **@dnd-kit** for all drag interactions — resize handles, row reordering.
- **papaparse** for CSV import — `Papa.parse(file, { header: true })` returns typed rows.
- **exceljs** handles both Excel import and export — do not add a second Excel library.
- Introduce a new library only if: (a) it solves a real problem, and
  (b) it is actively maintained with >1k GitHub stars.
- Do NOT install two libraries that solve the same problem.

---

## 9. Project Architecture

### Folder Structure

```
tablesmit/
├── public/
│   ├── favicon.svg                     ← icon-mark SVG (Section 2B)
│   ├── og-image.png
│   ├── og-image.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt                        # LLM-friendly project summary (llmstxt.dev)
│   ├── fonts/                          # Self-hosted woff2 font files
│   ├── icons/                          # PWA icons (192, 512)
│   ├── launch/                         # Product Hunt + HN launch copy
│   └── locales/                        # i18n JSON per language
│       ├── ar/common.json
│       ├── de/common.json
│       ├── ...
│       └── no/common.json
│
├── scripts/
│   ├── prerender.ts                    # Playwright-based prerender — run locally, output to prerendered/
│   ├── version.cjs                     # Writes dist/version.json with DEPLOY_ID or timestamp
│   ├── md-to-blog-post.ts              # Helper: .md → blog JSON
│   └── sitemap/
│       ├── generate-sitemap.ts
│       └── sitemap.types.ts
│
├── e2e/
│   └── critical-path.spec.ts           # Playwright E2E tests
│
├── .github/
│   ├── workflows/
│   │   └── deploy-netlify.yml          # CI/CD: lint + test + build + deploy
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
│
├── src/
│   ├── assets/
│   │   └── logo.svg                    ← full logo SVG (Section 2A)
│   │
│   ├── lib/
│   │   ├── utils.ts                    # cn() helper (clsx + tailwind-merge)
│   │   └── sentry.ts                   # Lazy Sentry init — never eagerly imported
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                         # Reusable, domain-agnostic primitives
│   │   │   │                           # (extend shadcn/ui components here)
│   │   │   ├── BackToTop/
│   │   │   │   └── BackToTop.tsx
│   │   │   ├── Badge/
│   │   │   │   └── Badge.tsx
│   │   │   ├── Breadcrumb/
│   │   │   │   ├── Breadcrumb.tsx
│   │   │   │   └── Breadcrumb.types.ts
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.types.ts
│   │   │   ├── ColorSwatch/
│   │   │   │   ├── ColorSwatch.tsx
│   │   │   │   └── ColorSwatch.types.ts
│   │   │   ├── ContentCard/
│   │   │   │   ├── ContentCard.tsx
│   │   │   │   └── ContentCard.types.ts
│   │   │   ├── ContentListPage/
│   │   │   │   ├── ContentListPage.tsx
│   │   │   │   └── ContentListPage.types.ts
│   │   │   ├── CookieConsent/
│   │   │   │   └── CookieConsent.tsx
│   │   │   ├── DropdownMenu/            # shadcn/ui wrapper
│   │   │   │   └── DropdownMenu.tsx
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── ErrorBoundary.types.ts
│   │   │   ├── IconButton/
│   │   │   │   ├── IconButton.tsx
│   │   │   │   └── IconButton.types.ts
│   │   │   ├── LanguagePicker/
│   │   │   │   ├── LanguagePicker.tsx
│   │   │   │   └── LanguagePicker.types.ts
│   │   │   ├── LearnMoreLink/
│   │   │   │   ├── LearnMoreLink.tsx
│   │   │   │   └── LearnMoreLink.types.ts
│   │   │   ├── Logo/
│   │   │   │   ├── Logo.tsx
│   │   │   │   └── Logo.types.ts
│   │   │   ├── NotFoundAnimation/
│   │   │   │   ├── NotFoundAnimation.tsx
│   │   │   │   └── not-found-animation.styles.css
│   │   │   ├── PageLoader/
│   │   │   │   └── PageLoader.tsx
│   │   │   ├── PaginationNav/
│   │   │   │   ├── PaginationNav.tsx
│   │   │   │   └── PaginationNav.types.ts
│   │   │   ├── PanelLoader/
│   │   │   │   └── PanelLoader.tsx
│   │   │   ├── MoreOptionsAccordion/
│   │   │   │   ├── MoreOptionsAccordion.tsx
│   │   │   │   └── MoreOptionsAccordion.types.ts
│   │   │   ├── SectionLabel/
│   │   │   │   └── SectionLabel.tsx
│   │   │   ├── TableSkeleton/
│   │   │   │   ├── TableSkeleton.tsx
│   │   │   │   └── TableSkeleton.types.ts
│   │   │   └── Tooltip/                 # shadcn/ui wrapper
│   │   │       └── Tooltip.tsx
│   │   │
│   │   ├── layout/                     # Structural shell components
│   │   │   ├── Footer/
│   │   │   │   └── Footer.tsx
│   │   │   ├── FooterGroup/
│   │   │   │   ├── FooterGroup.tsx
│   │   │   │   └── FooterGroup.types.ts
│   │   │   ├── MobileSheet/
│   │   │   │   ├── MobileSheet.tsx
│   │   │   │   └── MobileSheet.types.ts
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.tsx
│   │   │   ├── PageWrapper/
│   │   │   │   └── PageWrapper.tsx
│   │   │   └── Sidebar/
│   │   │       └── Sidebar.tsx
│   │   │
│   │   ├── routing/
│   │   │   └── RouteElements.tsx
│   │   │
│   │   └── features/                   # Domain-specific feature components
│   │       ├── AiFeaturesPanel/
│   │       │   └── AiFeaturesPanel.tsx
│   │       ├── BlogPostCard/
│   │       │   ├── BlogPostCard.tsx
│   │       │   └── BlogPostCard.types.ts
│   │       ├── BorderPanel/
│   │       │   └── BorderPanel.tsx
│   │       ├── ColorPanel/
│   │       │   └── ColorPanel.tsx
│   │       ├── DimensionsPanel/
│   │       │   └── DimensionsPanel.tsx
│   │       ├── ExportPanel/
│   │       │   └── ExportPanel.tsx
│   │       ├── FeatureCard/
│   │       │   ├── FeatureCard.tsx
│   │       │   └── FeatureCard.types.ts
│   │       ├── FeatureSections/         # For feature landing pages
│   │       │   ├── FeatureBenefitsSection/
│   │       │   ├── FeatureCtaSection/
│   │       │   ├── FeatureHeroSection/
│   │       │   ├── FeatureRelatedSection/
│   │       │   ├── FeatureStepsSection/
│   │       │   └── FeatureUseCasesSection/
│   │       ├── FindReplace/
│   │       │   ├── FindReplace.tsx
│   │       │   └── FindReplace.types.ts
│   │       ├── HeaderOptionsPanel/
│   │       │   └── HeaderOptionsPanel.tsx
│   │       ├── HeroBanner/
│   │       │   └── HeroBanner.tsx
│   │       ├── MergeCellsPanel/
│   │       │   └── MergeCellsPanel.tsx
│   │       ├── MobileFloatingActions/
│   │       │   ├── MobileFloatingActions.tsx
│   │       │   └── MobileFloatingActions.types.ts
│   │       ├── SearchBar/
│   │       │   ├── SearchBar.tsx
│   │       │   └── SearchBar.types.ts
│   │       ├── ShortcutsModal/
│   │       │   ├── ShortcutsModal.tsx
│   │       │   └── ShortcutsModal.types.ts
│   │       ├── StatusBar/
│   │       │   ├── StatusBar.tsx
│   │       │   └── StatusBar.types.ts
│   │       ├── TableCaption/
│   │       │   ├── TableCaption.tsx
│   │       │   └── TableCaption.types.ts
│   │       ├── TableGrid/
│   │       │   ├── TableGrid.tsx
│   │       │   ├── TableGrid.types.ts
│   │       │   ├── PastingOverlay/
│   │       │   │   ├── PastingOverlay.tsx
│   │       │   │   └── PastingOverlay.types.ts
│   │       │   ├── ResizeHandle/
│   │       │   │   └── ResizeHandle.tsx
│   │       │   ├── SumRowFooter/
│   │       │   │   ├── SumRowFooter.tsx
│   │       │   │   └── SumRowFooter.types.ts
│   │       │   ├── TableCell/
│   │       │   │   ├── TableCell.tsx
│   │       │   │   └── TableCell.types.ts
│   │       │   ├── TableCtxMenu/
│   │       │   │   ├── TableCtxMenu.tsx
│   │       │   │   └── TableCtxMenu.types.ts
│   │       │   │   ├── CtxAlignSubmenu/
│   │       │   │   ├── CtxColorSubmenu/
│   │       │   │   └── CtxColumnTypeSubmenu/
│   │       │   ├── TableHeaderCell/
│   │       │   │   ├── TableHeaderCell.tsx
│   │       │   │   └── TableHeaderCell.types.ts
│   │       │   └── TableHeaderRow/
│   │       │       ├── TableHeaderRow.tsx
│   │       │       └── TableHeaderRow.types.ts
│   │       ├── TableMakerContent/
│   │       │   └── TableMakerContent.tsx
│   │       ├── TableToolbar/
│   │       │   ├── TableToolbar.tsx
│   │       │   ├── TableToolbar.types.ts
│   │       │   ├── CopyDropdown/
│   │       │   │   ├── CopyDropdown.tsx
│   │       │   │   └── CopyDropdown.types.ts
│   │       │   ├── ImportDropdown/
│   │       │   │   └── ImportDropdown.tsx
│   │       │   ├── MergeUndoGroup/
│   │       │   │   ├── MergeUndoGroup.tsx
│   │       │   │   └── MergeUndoGroup.types.ts
│   │       │   ├── MobileExportDropdown/
│   │       │   │   ├── MobileExportDropdown.tsx
│   │       │   │   └── MobileExportDropdown.types.ts
│   │       │   ├── RowColumnActions/
│   │       │   │   ├── RowColumnActions.tsx
│   │       │   │   └── RowColumnActions.types.ts
│   │       │   ├── TemplatesDropdown/
│   │       │   │   ├── TemplatesDropdown.tsx
│   │       │   │   └── TemplatesDropdown.types.ts
│   │       │   └── ThemeDropdown/
│   │       │       ├── ThemeDropdown.tsx
│   │       │       └── ThemeDropdown.types.ts
│   │       ├── TestimonialCard/
│   │       │   ├── TestimonialCard.tsx
│   │       │   └── TestimonialCard.types.ts
│   │       ├── TestimonialEmptyState/
│   │       │   └── TestimonialEmptyState.tsx
│   │       └── ThemePicker/
│   │           └── ThemePicker.tsx
│   │
│   ├── pages/                           # No index.ts files — lazy-imported by path
│   │   ├── AboutPage/
│   │   │   └── AboutPage.tsx
│   │   ├── BlogListPage/
│   │   │   └── BlogListPage.tsx
│   │   ├── BlogPostPage/
│   │   │   └── BlogPostPage.tsx
│   │   ├── ChangelogPage/
│   │   │   └── ChangelogPage.tsx
│   │   ├── ContactPage/
│   │   │   └── ContactPage.tsx
│   │   ├── FeatureDetailPage/
│   │   │   └── FeatureDetailPage.tsx
│   │   ├── FeaturesListPage/
│   │   │   └── FeaturesListPage.tsx
│   │   ├── NotFoundPage/
│   │   │   └── NotFoundPage.tsx
│   │   ├── OpenSourcePage/
│   │   │   └── OpenSourcePage.tsx
│   │   ├── PrivacyPage/
│   │   │   └── PrivacyPage.tsx
│   │   ├── TableMakerPage/
│   │   │   └── TableMakerPage.tsx
│   │   ├── TermsPage/
│   │   │   └── TermsPage.tsx
│   │   └── TestimonialsPage/
│   │       └── TestimonialsPage.tsx
│   │
│   ├── context/
│   │   ├── TableContext.tsx             # Barrel re-export from sub-modules
│   │   ├── TableDataContext/            # TableCellsContext — cells array only
│   │   │   └── TableDataContext.tsx
│   │   ├── TableProvider/               # Main provider wrapping all 3 contexts
│   │   │   └── TableProvider.tsx
│   │   ├── TableReducer/                # Reducer + action types + helpers
│   │   │   ├── TableReducer.ts
│   │   │   └── helpers/
│   │   │       └── reducerHelpers.ts
│   │   ├── TableSelectionContext/       # TableSelectionCtx — selectedRange only
│   │   │   └── TableSelectionContext.tsx
│   │   └── TableState/                  # Initial state + persistence
│   │       └── TableState.ts
│   │   # no index.ts — contexts imported directly from their .tsx files
│   │
│   ├── hooks/                           # Each in own directory with optional .types.ts
│   │   ├── useBlogSearch/
│   │   ├── useClipboardPaste/
│   │   ├── useColumnResize/
│   │   ├── useColumnSort/
│   │   ├── useCopyTable/
│   │   ├── useExport/
│   │   ├── useFeatureSearch/
│   │   ├── useFindReplace/
│   │   ├── useImport/
│   │   ├── useMergeCells/
│   │   ├── usePageTranslation/
│   │   ├── usePrintTable/
│   │   ├── useRowResize/
│   │   ├── useTableCopyShortcut/
│   │   ├── useTableGridKeyHandlers/
│   │   ├── useTableHistory/
│   │   ├── useTableSelection/
│   │   └── useTheme/
│   │
│   ├── services/
│   │   ├── blogService/                 # import.meta.glob blog discovery
│   │   │   ├── blogService.ts
│   │   │   └── blogService.types.ts
│   │   ├── exportService/               # Strategy pattern per format
│   │   │   ├── index.ts                  # Factory + dynamic import
│   │   │   ├── utils.ts                  # downloadUrl helper
│   │   │   ├── export.types.ts           # ExportFormat, ExportStrategy
│   │   │   └── impl/
│   │   │       ├── csvExporter.ts
│   │   │       ├── excelExporter.ts
│   │   │       ├── imageExporter.ts
│   │   │       ├── latexExporter.ts
│   │   │       └── pdfExporter.ts
│   │   ├── featureService/              # import.meta.glob feature discovery
│   │   │   ├── featureService.ts
│   │   │   └── featureService.types.ts
│   │   ├── importService/               # Strategy pattern (mirrors exportService/)
│   │   │   ├── index.ts                  # Barrel re-export
│   │   │   ├── import.types.ts           # ImportResult, ImporterStrategy
│   │   │   ├── utils.ts                  # argbToHex, getFillColor, normaliseRows, assertFileSize
│   │   │   └── impl/
│   │   │       ├── csvImporter.ts        # CSV (papaparse)
│   │   │       └── excelImporter.ts      # Excel (exceljs)
│   │
│   ├── i18n/
│   │   ├── i18n.ts                      # i18next init (manual fetch, no http-backend)
│   │   ├── types.d.ts                   # TS augmentation for type-safe t()
│   │   └── locales/
│   │       └── en/                       # English source of truth (12 per-domain JSON files, bundled directly)
│   │           ├── about.json
│   │           ├── blog.json
│   │           ├── changelog.json
│   │           ├── common.json
│   │           ├── contact.json
│   │           ├── features.json
│   │           ├── home.json
│   │           ├── legal.json
│   │           ├── notFound.json
│   │           ├── openSource.json
│   │           ├── table.json
│   │           └── testimonials.json
│   │
│   ├── utils/
│   │   ├── analytics/                   # GA4 event tracking
│   │   ├── cell/                        # buildCellId, parseCellId
│   │   ├── dateUtils/                   # getCurrentYear
│   │   ├── formatDate/                  # Intl.DateTimeFormat
│   │   ├── formatUtils/                 # Column format helpers
│   │   ├── latexUtils/                  # cellsToLatex() — cells → LaTeX tabular string; parseLatexTabular() — LaTeX → string[][]
│   │   ├── markdownUtils/               # parseMarkdownTable() — detects and parses Markdown pipe tables → string[][]
│   │   ├── mergeUtils/                  # Merge range math
│   │   ├── searchUtils/                 # searchItems() — generic search utility with boost-field ranking
│   │   ├── tableUtils/                  # Pure table transformation functions
│   │   ├── colorUtils/                  # Color manipulation helpers
│   │   └── toast/                       # Sonner toast wrapper + TOAST consts
│   │
│   ├── types/
│   │   └── table/                       # All table-related types
│   │       ├── index.ts
│   │       ├── cell.types.ts
│   │       ├── merge.types.ts
│   │       ├── preset.types.ts
│   │       └── table-state.types.ts
│   │   # Per-service types live in the service directory (export.types.ts, etc.)
│   │   # No top-level ui.types.ts — button/types exist in Button.types.ts
│   │
│   ├── config/                         # Per-domain config files, no barrel
│   │   ├── analytics/                  # analyticsConfig.ts — GA4 script ID, env var, events
│   │   ├── brand/                      # brandConfig.ts — brand name, tagline, description, URLs
│   │   ├── changelog/                  # changelog.ts + changelog.types.ts — ChangelogEntry[] data
│   │   ├── colorPalette/               # colorPalette.ts + colorPalette.types.ts — color swatches
│   │   ├── colors/                     # colorsConfig.ts — UI color tokens
│   │   ├── columnFormats/              # columnFormatsConfig.ts — format definitions
│   │   ├── date/                       # dateConfig.ts — Intl.DateTimeFormatOptions
│   │   ├── export/                     # exportConfig.ts + exportConfig.types.ts — formats + options
│   │   ├── import/                     # importConfig.ts — file size limits, row/col caps
│   │   ├── latex/                      # latexConfig.ts — LaTeX export/import config
│   │   ├── locale/                     # localesConfig.ts + localesConfig.types.ts — i18n locale metadata
│   │   ├── pagination/                 # paginationConfig.ts — ITEMS_PER_PAGE
│   │   ├── routes/                     # routesConfig.ts — route paths + nav link definitions
│   │   ├── sentry/                     # sentryConfig.ts — Sentry init options
│   │   ├── shortcuts/                  # shortcutsConfig.ts + shortcutsConfig.types.ts — keyboard shortcut definitions
│   │   ├── sponsors/                   # sponsorsConfig.ts — sponsor platform links
│   │   ├── table/                      # tableDefaults/, tableThemes/, presets/
│   │   └── testimonials/               # testimonials.ts + testimonials.types.ts
│   │
│   ├── constants/
│   │   └── keys.ts                     # Keyboard key constants
│   │
│   ├── content/
│   │   ├── blog/                       # 36 posts — auto-discovered via import.meta.glob (see Section 58)
│   │   └── features/                   # 30 feature page JSON definitions
│   │
│   ├── styles/
│   │   └── globals.css                 # Tailwind directives + print styles
│   │
│   ├── index.scss                      # SCSS entry (imported by main.tsx)
│   ├── pwa.ts                          # Custom service worker registration
│   │
│   ├── test/                           # All tests live here (never co-located with source)
│   │   ├── setup.ts                    # jest-dom import + polyfills
│   │   ├── App.test.tsx
│   │   ├── pwa.test.ts                 # PWA service worker test
│   │   ├── scripts/                    # 3 test files (md-to-blog-post, prerender, sitemap)
│   │   ├── config/                     # 20 test files (all config domains)
│   │   ├── constants/                  # keys.test.ts
│   │   ├── content/                    # 2 test files (blog.test.ts, features.test.ts)
│   │   ├── context/                    # 7 test files (TableContext, TableProvider, TableReducer, etc.)
│   │   ├── hooks/                      # 19 test files (all hooks tested)
│   │   ├── i18n/                       # i18n.test.ts
│   │   ├── lib/                        # 2 test files (utils.test.ts, sentry.test.ts)
│   │   ├── pages/                      # 13 test files (every page tested)
│   │   ├── services/                   # 16 test files (all services)
│   │   ├── components/
│   │   │   ├── ui/                     # 22 test files (every UI component)
│   │   │   ├── layout/                 # 6 test files (every layout component)
│   │   │   ├── routing/                # RouteElements.test.tsx
│   │   │   └── features/               # 47 test files (every feature component)
│   │   └── utils/                      # 13 test files (every util)
│   │
│   ├── App.tsx                         # Router + providers only. Zero business logic.
│   └── main.tsx                        # ReactDOM.createRoot + Sentry + Toaster.
│
├── tailwind.config.ts
├── vitest.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── postcss.config.js
├── playwright.config.ts                # E2E test config
├── netlify.toml                        # HTTP headers (CSP, security, cache) + SPA redirects
├── .env.example                        # Documented env vars
├── eslint.config.js
├── .husky/                             # pre-commit hook
├── CONTRIBUTING.md
├── README.md
└── package.json
```

### Lazy Loading Strategy

**Rule:** Every page is lazy-loaded. No page bundle ships until its route is visited.
Heavy feature panels within the table maker are also lazy-loaded on first interaction.

#### `src/App.tsx` — Routing with `useRoutes`

Page lazy imports live in `src/components/routing/RouteElements.tsx`, not in `App.tsx`.
Routing config is defined in `src/config/routes/routesConfig.ts` and consumed via `useRoutes(routerConfig)`.

```tsx
import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { BrowserRouter, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Footer } from './components/layout/Footer/Footer'
import { Navbar } from './components/layout/Navbar/Navbar'
import { CookieConsent } from './components/ui/CookieConsent/CookieConsent'
import { ErrorBoundary } from './components/ui/ErrorBoundary/ErrorBoundary'
import { BackToTop } from './components/ui/BackToTop/BackToTop'
import { PageLoader } from './components/ui/PageLoader/PageLoader'
import { TooltipProvider } from './components/ui/Tooltip/Tooltip'
import { routerConfig } from './config/routes/routesConfig'

function TrailingSlashNormalizer() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname !== '/' && !pathname.endsWith('/') && !pathname.includes('.')) {
      navigate(pathname + '/', { replace: true })
    }
  }, [pathname, navigate])

  return null
}

function AppRoutes(): ReactNode {
  return useRoutes(routerConfig)
}

const ShortcutsModal = lazy(() =>
  import('./components/features/ShortcutsModal/ShortcutsModal').then((m) => ({
    default: m.ShortcutsModal,
  })),
)

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <TooltipProvider delayDuration={250}>
            <Navbar />
            <Suspense fallback={null}>
              <ShortcutsModal />
            </Suspense>
            <CookieConsent />
            <div className="flex flex-1 flex-col min-h-[calc(100vh-60px)]">
              <Suspense fallback={<PageLoader />}>
                <TrailingSlashNormalizer />
                <AppRoutes />
              </Suspense>
            </div>
            <Footer />
            <BackToTop />
          </TooltipProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
```

#### Lazy-loaded Feature Panels (within `TableMakerContent`)

Heavy sidepanel components are lazy-loaded on mount so the core table
grid is interactive immediately:

```tsx
import { lazy, Suspense } from 'react';
import { PanelLoader } from '@/components/ui/PanelLoader';

const ExportPanel = lazy(() => import('@/components/features/ExportPanel'));
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
The config also includes three custom build plugins and named chunks for readable bundle analysis:

```ts
// vite.config.ts
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import Critters from 'critters'

// Custom plugins:
// prerenderPlugin    — copies prerendered/ directory into dist/ at closeBundle
// crittersPlugin     — inlines critical CSS in index.html (SPA) and
//                      prerendered pages (full inline, no external CSS)
// modulepreloadPlugin — adds <link rel="modulepreload"> for TableMakerPage
//                       chunk so it begins loading before the JS parser reaches it

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'Tablesmit', short_name: 'Tablesmit',
        description: 'A minimalist table builder for analytical writing.',
        theme_color: '#ffffff', background_color: '#ffffff',
        display: 'standalone', scope: '/', start_url: '/',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        globIgnores: ['**/exceljs.min-*.js', '**/jspdf.es.min-*.js',
                       '**/html2canvas-*.js', '**/papaparse.min-*.js', '**/purify.es-*.js'],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5242880,
        runtimeCaching: [{
          urlPattern: /\/assets\/(exceljs\.min|jspdf\.es\.min|html2canvas)-.*\.js$/,
          handler: 'CacheFirst',
          options: { cacheName: 'tablesmit-export-chunks',
                     expiration: { maxEntries: 6, maxAgeSeconds: 60 * 60 * 24 * 30 } },
        }],
      },
    }),
    prerenderPlugin(),
    crittersPlugin(),
    modulepreloadPlugin(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (isPackage(id, 'react') || isPackage(id, 'react-dom'))          return 'vendor-react'
          if (isPackage(id, 'react-router-dom') || isPackage(id, 'scheduler')) return 'vendor-router'
          if (isPackage(id, 'i18next') || isPackage(id, 'react-i18next') ||
              isPackage(id, 'i18next-browser-languagedetector'))               return 'vendor-i18n'
          if (isPackage(id, '@sentry/react'))                                 return 'vendor-sentry'
          if (isPackage(id, 'lucide-react') || isPackage(id, 'class-variance-authority') ||
              isPackage(id, 'clsx') || isPackage(id, 'sonner'))               return 'vendor-ui'
          return undefined
        },
      },
    },
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter(d => !d.includes('jspdf.es.min') &&
                                !d.includes('html2canvas') &&
                                !d.includes('exceljs.min'))
      },
    },
  },
})
```

**Lazy loading rules:**
- `Suspense` must always have a meaningful `fallback` — never `fallback={null}` for page-level routes
- Exception: `ShortcutsModal` (a non-page lazy component, rendered outside routes) uses `fallback={null}` intentionally — it is keyboard-triggered and not visible on first paint, so no loader is needed
- Every `lazy()` import must be wrapped in `Suspense` in the nearest parent that makes UX sense
- Do not lazy-load components that are always visible on first paint (Navbar, Footer)
- Do not lazy-load components smaller than ~10KB — the network overhead isn't worth it

---

### `src/styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url(/fonts/inter-latin-400-normal.woff2) format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-display: swap;
  font-weight: 500;
  src: url(/fonts/inter-latin-500-normal.woff2) format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-display: swap;
  font-weight: 600;
  src: url(/fonts/inter-latin-600-normal.woff2) format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src: url(/fonts/inter-latin-700-normal.woff2) format('woff2');
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url(/fonts/jetbrains-mono-latin-400-normal.woff2) format('woff2');
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-display: swap;
  font-weight: 500;
  src: url(/fonts/jetbrains-mono-latin-500-normal.woff2) format('woff2');
}

@layer base {
  :root {
    --color-text-primary: 17 24 39;
    --color-text-secondary: 107 114 128;
    --color-text-muted: 102 117 136;
  }
  .dark {
    --color-text-primary: 241 245 249;
    --color-text-secondary: 148 163 184;
    --color-text-muted: 156 163 175;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { @apply h-full; }
  body {
    @apply m-0 min-w-[320px] bg-white font-sans text-text-primary antialiased dark:bg-slate-900 dark:text-slate-100;
  }
  #root { @apply flex min-h-dvh flex-col; }
  h1, h2, h3, p { @apply mt-0; }
  button, input, select, textarea { letter-spacing: 0; }
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}

@layer utilities {
  .dark .bg-white { @apply bg-slate-900; }
  .dark .bg-surface { @apply bg-slate-800; }
  .dark .border-border { @apply border-slate-700; }
}

@media print {
  nav, header, footer,
  [data-toolbar], [data-sidebar-left], [data-sidebar-right],
  [data-print-hide],
  .floating-action-buttons, .mobile-sheet-overlay {
    display: none !important;
  }

  [data-table-container] {
    overflow: visible !important;
    width: 100% !important;
    height: auto !important;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11pt;
  }

  td, th {
    border: 1px solid #E5E7EB !important;
    padding: 6pt 8pt !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  th, [data-header-row] td {
    background-color: #F1F5F9 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  tr { break-inside: avoid; }

  [data-table-caption] {
    font-size: 10pt;
    font-style: italic;
    color: #6B7280;
    margin-bottom: 6pt;
  }

  @page {
    margin: 2cm;
    size: A4 landscape;
  }
}
```

> Note: Resize handle classes are now inlined directly in the `ResizeHandle` component.

---

## 10. Engineering Principles

### 10A. SOLID

**S — Single Responsibility**
Each file has exactly one reason to change.
```
✅ TableCell.tsx       → renders one cell only
✅ useMergeCells.ts    → merge logic only
✅ export/index.ts     → export orchestration only
✅ pdfExporter.ts      → PDF export only
✅ csvExporter.ts      → CSV export only
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

// ✅ Export: new format = new class; the factory needs one new case
interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>;
}
class PDFExporter     implements ExportStrategy { /* ... */ }
class ImageExporter   implements ExportStrategy { /* ... */ }  // PNG/JPEG via mime param
class ExcelExporter   implements ExportStrategy { /* ... */ }
class CSVExporter     implements ExportStrategy { /* ... */ }
class LatexExporter   implements ExportStrategy { /* ... */ }
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
<SectionLabel>Grid Size</SectionLabel>
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

| Principle         | Application in Tablesmit                                              |
|-------------------|----------------------------------------------------------------------|
| Information Expert| `useMergeCells` owns merge ranges → calculates mergeability          |
| Creator           | `TableContext` creates `TableState`; `useExport` creates strategies  |
| Controller        | `TableContext` receives all UI events, delegates to hooks             |
| Low Coupling      | Components never import each other — only context, hooks, types      |
| High Cohesion     | `TableCell/` contains only cell concerns; `ExportPanel/` export only |
| Pure Fabrication  | `exportService/index.ts`, all `utils/` — exist to reduce coupling          |

---

## 11. TypeScript Conventions

### File Organization

Types live in `*.types.ts` files co-located with their owner:

| Owner | Type file path |
|---|---|
| Table data types | `src/types/table/cell.types.ts`, `merge.types.ts`, `table-state.types.ts`, `preset.types.ts` (barrel: `src/types/table/index.ts`) |
| Context / state | `src/context/TableState/TableState.types.ts` |
| Reducer actions | `src/context/TableReducer/TableReducer.types.ts` |
| Provider API | `src/context/TableProvider/TableProvider.types.ts` |
| Export service | `src/services/exportService/export.types.ts` |
| Import service | `src/services/importService/import.types.ts` |
| Hook props/return | `src/hooks/useExport/useExport.types.ts`, `useImport/`, `useTheme/`, etc. |
| Component props | Co-located at `src/components/ui/Button/Button.types.ts`, etc. |
| Config schemas | `src/config/colorPalette/colorPalette.types.ts`, `changelog/changelog.types.ts`, etc. |
| i18n augmentation | `src/i18n/types.d.ts` |

**Rule:** Every module that exports types gets a co-located `.types.ts` file. Top-level `src/types/` contains only generic table data types that are shared across the app. Per-service, per-hook, and per-component types live beside their implementation.

### Core Table Types

```ts
// src/types/table/cell.types.ts
export interface CellData {
  id: string           // "R{row}C{col}" e.g. "R0C2"
  value: string
  colSpan: number      // Default: 1
  rowSpan: number      // Default: 1
  isMerged: boolean    // True for anchor cell of a merge
  isHidden: boolean    // True for cells absorbed by a merge
  format?: ColumnFormat
}

export type ColumnFormat = 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'sum' | 'auto-number'
```

```ts
// src/types/table/merge.types.ts
export interface MergeRange {
  key: string          // "R{r1}C{c1}:R{r2}C{c2}"
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

export interface SelectionRange {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}
```

```ts
// src/types/table/table-state.types.ts
export type HeaderStyle  = 'none' | 'first-row' | 'first-column' | 'both'
export type BorderStyle  = 'none' | 'solid' | 'dotted' | 'dashed' | 'double'
export type TextAlign    = 'left' | 'center' | 'right'
export type TableTheme   = 'default' | 'minimal' | 'dark-header' | 'striped' | 'academic' | 'monochrome'
```

```ts
// src/types/table/preset.types.ts
import type { HeaderStyle } from './table-state.types'

export interface PresetDefinition {
  id: string
  label: string
  caption?: string
  rows: number
  cols: number
  headerStyle: HeaderStyle
  headers: string[]
  data?: string[][]
  mergedRanges?: Array<{ startRow: number; startCol: number; endRow: number; endCol: number }>
}
```

```ts
// src/types/table/index.ts — barrel re-export
export type { CellData, ColumnFormat } from './cell.types'
export type { MergeRange, SelectionRange } from './merge.types'
export type { HeaderStyle, BorderStyle, TextAlign, TableTheme } from './table-state.types'
export type { PresetDefinition } from './preset.types'
```

### State Types

```ts
// src/context/TableState/TableState.types.ts
export type CaptionAlignment = 'left' | 'center' | 'right'

export interface TableState {
  cells: CellData[][]
  columnWidths: number[]
  rowHeights: number[]
  mergedRanges: MergeRange[]
  headerStyle: HeaderStyle
  headerColor: string
  contentColor: string
  theme: TableTheme
  borderStyle: BorderStyle
  borderColor: string
  contentBgColor: string
  rowColors: string[]
  columnColors: string[]
  columnTextAlign: TextAlign[]
  cellColors: Record<string, string>
  cellTextColors: Record<string, string>
  rowTextColors: Record<number, string>
  cellTextAlign: Record<string, string>
  selectedRange: SelectionRange | null
  rows: number
  cols: number
  freezeRow: boolean
  freezeCol: boolean
  caption: string
  captionAlignment: CaptionAlignment
  captionTextColor: string
  captionBgColor: string
  captionItalic: boolean
}
```

### Context Types

```ts
// src/context/TableProvider/TableProvider.types.ts
// TableStateFields (subset of TableState without methods) + TableActions interface
// Combined as: type TableContextValue = TableStateFields & TableActions

export interface TableStateFields {
  rows: number; cols: number; columnWidths: number[]; rowHeights: number[];
  mergedRanges: MergeRange[];
  headerStyle: HeaderStyle; headerColor: string; contentColor: string;
  theme: TableTheme; borderStyle: BorderStyle; borderColor: string;
  contentBgColor: string; rowColors: string[]; columnColors: string[];
  columnTextAlign: TextAlign[]; cellColors: Record<string, string>;
  cellTextColors: Record<string, string>; rowTextColors: Record<number, string>;
  cellTextAlign: Record<string, string>;
  freezeRow: boolean; freezeCol: boolean;
  caption: string; captionAlignment: CaptionAlignment;
  captionTextColor: string; captionBgColor: string; captionItalic: boolean;
}

export interface TableActions {
  updateCell: (cellId: string, value: string) => void
  addRow: () => void; removeRow: () => void; addColumn: () => void; removeColumn: () => void
  insertRowAt: (index: number) => void; deleteRowAt: (index: number) => void
  insertColAt: (index: number) => void; deleteColAt: (index: number) => void
  mergeSelection: () => void; unmergeSelection: () => void
  setHeaderStyle: (style: HeaderStyle) => void; setHeaderColor: (color: string) => void
  setContentColor: (color: string) => void; setContentBgColor: (color: string) => void
  setColumnWidth: (col: number, width: number) => void
  setRowHeight: (row: number, height: number) => void
  setColumnFormat: (col: number, format: ColumnFormat) => void
  setBorderStyle: (style: BorderStyle) => void; setBorderColor: (color: string) => void
  setRowColor: (row: number, color: string) => void
  setColumnColor: (col: number, color: string) => void
  setCellColor: (cellId: string, color: string) => void
  setCellTextColor: (cellId: string, color: string) => void
  setRowTextColor: (row: number, color: string) => void
  setColumnTextAlign: (col: number, align: TextAlign) => void
  setCellTextAlign: (cellId: string, align: TextAlign) => void
  setFreezeRow: (freeze: boolean) => void; setFreezeCol: (freeze: boolean) => void
  setTheme: (theme: TableTheme) => void
  applyPreset: (preset: PresetDefinition) => void
  selectRange: (range: SelectionRange) => void
  generateTable: (rows: number, cols: number) => void
  clearAll: () => void; undo: () => void
  canUndo: boolean; historyDepth: number
  setCaption: (caption: string) => void
  setCaptionAlignment: (alignment: CaptionAlignment) => void
  setCaptionTextColor: (color: string) => void
  setCaptionBgColor: (color: string) => void
  setCaptionItalic: (italic: boolean) => void
}
```

```ts
// src/context/TableReducer/TableReducer.types.ts — discriminated union of 43 action types
export type TableAction =
  | { type: 'generate'; rows: number; cols: number }
  | { type: 'setCells'; cells: CellData[][] }
  | { type: 'updateCell'; cellId: string; value: string }
  | { type: 'addRow' | 'removeRow' | 'addColumn' | 'removeColumn' | 'clearAll' }
  | { type: 'insertRowAt' | 'deleteRowAt'; index: number }
  | { type: 'insertColAt' | 'deleteColAt'; index: number }
  | { type: 'setHeaderStyle'; headerStyle: HeaderStyle }
  | { type: 'setHeaderColor' | 'setContentColor' | 'setContentBgColor' | 'setBorderColor'; color: string }
  | { type: 'selectRange'; range: SelectionRange }
  | { type: 'mergeSelection' | 'unmergeSelection' }
  | { type: 'setColumnWidth'; col: number; width: number }
  | { type: 'setRowHeight'; row: number; height: number }
  | { type: 'setColumnFormat'; col: number; format: ColumnFormat }
  | { type: 'setBorderStyle'; borderStyle: BorderStyle }
  | { type: 'setRowColor'; row: number; color: string }
  | { type: 'setColumnColor'; col: number; color: string }
  | { type: 'setCellColor'; cellId: string; color: string }
  | { type: 'setCellTextColor'; cellId: string; color: string }
  | { type: 'setRowTextColor'; row: number; color: string }
  | { type: 'setColumnTextAlign'; col: number; align: TextAlign }
  | { type: 'setCellTextAlign'; cellId: string; align: TextAlign }
  | { type: 'setFreezeRow'; freeze: boolean }
  | { type: 'setFreezeCol'; freeze: boolean }
  | { type: 'setTheme'; theme: TableTheme }
  | { type: 'applyPreset'; preset: PresetDefinition }
  | { type: 'UNDO'; state: TableState }
  | { type: 'setCaption'; caption: string }
  | { type: 'setCaptionAlignment'; alignment: CaptionAlignment }
  | { type: 'setCaptionTextColor' | 'setCaptionBgColor'; color: string }
  | { type: 'setCaptionItalic'; italic: boolean }
```

### Export Service Types

```ts
// src/services/exportService/export.types.ts
export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'excel' | 'csv' | 'latex'

export interface ExportOptions {
  format: ExportFormat
  filename?: string
  quality?: number                    // JPEG only: 0–1
  caption?: string
  captionTextColor?: string
  captionBgColor?: string
  captionAlignment?: 'left' | 'center' | 'right'
  cells?: CellData[][]
  headerStyle?: HeaderStyle
  mergedRanges?: MergeRange[]
  styles?: ExportStyleOptions
}

export interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>
}
```

### Button Types (Derived from CVA)

Button variant and size types are not defined as standalone named types. They are
derived from the `cva()` call via `VariantProps<typeof buttonVariants>`:

```ts
// src/components/ui/Button/Button.types.ts
import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonVariants } from './Button'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  children: ReactNode
}
```

The `cva()` keys define the allowed values: `variant: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger'` and `size: 'sm' | 'md' | 'lg'`.

### Color Swatch Types

```ts
// src/config/colorPalette/colorPalette.types.ts
export interface ColorSwatch {
  label: string
  value: string
}
```

### TypeScript Rules
- `"strict": true` in `tsconfig.json` — always
- No `any` without an inline comment explaining unavoidability
- All exported functions/hooks must have explicit return types
- Prefer `interface` for object shapes; `type` for unions and aliases
- Types live beside their implementation (`*.types.ts`), except shared table data types which live in `src/types/table/`
- Barrel re-exports via `index.ts` — never import types from deep paths outside the owner module

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
    render(<Button variant="primary">Create Table</Button>);
    expect(screen.getByRole('button', { name: /create table/i })).toBeInTheDocument();
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
    ['pdf', 'png', 'jpeg', 'excel', 'latex'].forEach(fmt =>
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

### Test Isolation Rules

Every test must clean up its side effects. No test should leave state that
contaminates other tests.

```
✅ afterEach cleanup for:
  - DOM event listeners (document-level mousemove/mouseup)
  - Fake timers (vi.useRealTimers())
  - document.body cursor/userSelect (reset to '')
  - Generated files (mock fs or use vi.mock for paths)
  - DOM element removal (if test creates/manages DOM nodes)

✅ No file-writing side effects
  Export services that write files (SheetJS XLSX) must be mocked or
  the triggering test must be excluded from CI runs.
  tablesmit-table.* added to .gitignore as a safety net.

✅ No co-located test files
  All tests live in src/test/ mirroring source structure:
    src/utils/tableUtils/tableUtils.ts       → src/test/utils/tableUtils.test.ts
    src/hooks/useColumnResize/useColumnResize.ts → src/test/hooks/useColumnResize.test.ts
    src/components/ui/Button/Button.tsx → src/test/components/ui/Button/Button.test.tsx

❌ NO co-located .test.ts/x files next to source components
❌ NO afterEach that doesn't restore fake timers
❌ NO test that writes files to CWD without cleanup or mocking
```

### Coverage Targets

| Layer                  | Target |
|------------------------|--------|
| `utils/`               | 95%    |
| `services/`            | 90%    |
| `hooks/`               | 90%    |
| `components/ui/`       | 85%    |
| `components/features/` | 80%    |
| `pages/`               | 75%    |

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

Tablesmit must be fully functional and visually correct on every screen size.
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
    - Drawer contains: all nav links stacked vertically
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

  {/* No CTA in Navbar — CTA lives in hero section */}

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
    <Button variant="accent" size="lg">→ Create a Table</Button>
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
    © 2025 Tablesmit. All rights reserved.
  </p>
</footer>
```

---

### Table Toolbar — Responsive Behavior

```
Mobile:
  - Overflow-x: toolbar scrolls horizontally — do NOT wrap buttons
  - Export group: collapse PDF/PNG/JPEG/Excel/LaTeX into a single "Export ▾" DropdownMenu
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
    {/* individual PDF PNG JPEG Excel CSV LaTeX buttons */}
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

### Responsive Verification

The following responsive behaviors are all implemented and verified:

- Navbar: hamburger + slide-in drawer on mobile, full nav on md+
- Drawer/sheet opens and closes with overlay + ESC key
- Table maker sidebars hidden on mobile, shown progressively on md+ and lg+
- Bottom sheet panels on mobile with drag handle
- Floating action buttons appear on mobile only
- Table grid is horizontally scrollable on all screen sizes
- Toolbar scrolls horizontally on mobile without wrapping
- Export buttons collapse to export dropdown on mobile
- All touch targets meet 44×44px minimum on mobile
- Hero headline scales correctly across all breakpoints
- Footer: grid-cols-1 → grid-cols-2 → grid-cols-4
- No horizontal overflow on any page at 320px viewport width
- Verified at: 375px (iPhone SE/14), 768px (iPad), 1024px (iPad Pro), 1280px (laptop), 1440px+ (desktop)

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
- ❌ No reference to "competing tools" in product UI copy (blog content that names competitors for comparison purposes is fine)
- ❌ No `Suspense` with `fallback={null}` on page-level routes — always show a loader (exception: `ShortcutsModal`, a non-page lazy component, uses `fallback={null}` intentionally — it is keyboard-triggered and not visible on first paint)
- ❌ No fixed pixel widths on layout containers — use `max-w-*` + `mx-auto` + responsive padding
- ❌ No tap targets smaller than 44×44px on mobile screens
- ❌ No hard-coded single font size for text that appears across breakpoints
- ❌ No desktop-only layout assumptions — every view must be designed mobile-first
- ❌ No em dashes in UI copy — use periods or colons instead
- ❌ No `Github` icon from lucide-react — does not exist; use `GitHubLogoIcon` from `@radix-ui/react-icons` or `ExternalLink` from lucide-react
- ❌ No `coverage/` or `tablesmit-table.*` in repository — always gitignored
- ❌ No hardcoded hrefs in navigation — always reference `routes.*` from `src/config/routes/routesConfig.ts` by key
- ❌ No co-located `.test.tsx` files with source — all tests in `src/test/` mirroring source structure
- ❌ No presets copied from other table generators (tabley.online, etc.) — `src/config/table/presets/` must contain only original Tablesmit templates: Research Notes, Feature Matrix, Content Tracker, Budget Summary, Q1 Performance

---

## 18. Installation Sequence

Run in this exact order:

```bash
# 1. Create Vite project
npm create vite@latest tablesmit -- --template react-ts
cd tablesmit

# 2. Core dependencies
npm install react-router-dom lucide-react class-variance-authority clsx tailwind-merge

# 3. Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. shadcn/ui + sonner (follow prompts: TypeScript, Tailwind, src/components/ui)
npx shadcn@latest init
npx shadcn@latest add button select tooltip dropdown-menu separator badge dialog context-menu
npm install sonner

# 5. Table resize/drag
npm install @dnd-kit/core @dnd-kit/utilities

# 6. Export libraries
npm install jspdf html2canvas exceljs

# 7. Import libraries
npm install papaparse exceljs
npm install -D @types/papaparse

# 8. Internationalization
npm install i18next react-i18next i18next-browser-languagedetector

# 9. Blog and content rendering
npm install react-markdown remark-gfm react-helmet-async sonner
npm install -D @tailwindcss/typography

# 10. Error monitoring
npm install @sentry/react

# 11. Testing
npm install -D vitest @testing-library/react @testing-library/user-event
npm install -D @testing-library/jest-dom @vitejs/plugin-react jsdom

# 12. Tailwind typography plugin
npm install -D @tailwindcss/typography

# 13. PWA, bundle analysis, and build tooling
npm install -D vite-plugin-pwa rollup-plugin-visualizer critters

# 14. E2E testing
npm install -D @playwright/test
npx playwright install

# 15. Dev tooling
npm install -D @types/react @types/react-dom esbuild
npm install -D husky lint-staged
npm install -D @eslint/js globals typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D lighthouse sass
npx husky init
```

---

## 19. Implementation Details

The following sections document the present-state implementation of every major feature, subsystem, and architectural decision in Tablesmit. All are live and tested.

### Brand & Positioning

Brand and visual identity implemented per the specification in Sections 0–6. Logo SVGs (full + icon mark) in Navbar and favicon. Tailwind design tokens configured in `tailwind.config.ts`. Self-hosted Inter + JetBrains Mono via raw `@font-face` in `globals.css`. Nav includes Home, Features, Open Source, About links plus GitHub ghost button. HeroBanner matches the hero copy spec with an added feature bullet row (custom headers, column types, merge cells, export formats). No eyebrow badge. Minimal. Open Source section includes MIT license note. About section includes "What Tablesmit Is Not" quiet list. 404 page built with back-to-home CTA. Dynamic copyright year via `getCurrentYear()` in `src/utils/dateUtils.ts`. No em dashes in UI copy — periods or colons used instead.

### Routing

`/` serves `TableMakerPage`. `/about` serves `AboutPage`. All route paths reference `routes.*` from `src/config/routes/routesConfig.ts` — no hardcoded hrefs. `BrowserRouter` future flags configured (`v7_startTransition`, `v7_relativeSplatPath`). NotFoundPage with animated SVG 404 component (`NotFoundAnimation.tsx`). OpenSourcePage route added to routes.

### UI Principles

All UI elements follow the enforcement rules: no `rounded-lg` or larger (max `rounded-md`/8px). No `shadow-md` or `shadow-lg` on any card, panel, or sidebar. No glass effects (`backdrop-blur`, opacity layering). No decorative dividers, gradients, or background texture patterns. Every hover state reviewed for calm confidence.

### Architecture

Source follows the exact folder structure from Section 9. `App.tsx` contains routing + lazy imports only — zero business logic. Pages in `src/pages/` (lazy-loaded). Primitives in `src/components/ui/`. Features in `src/components/features/`. Hooks in `src/hooks/`. Types in `src/types/`. Config in `src/config/`. `TableContext.tsx` is the single global state provider. Export directory with per-class exporter files implements the strategy pattern. `globals.css` contains Tailwind directives only.

### Lazy Loading

Every page lazy-loaded via `React.lazy()` + `Suspense` with `<PageLoader />` fallback. Sidebar/feature panels (`ExportPanel`, etc.) lazy-loaded inside `TableMakerPage`. `vite.config.ts` `manualChunks` split vendor-react, vendor-ui, vendor-pdf, vendor-canvas, vendor-excel. `PageLoader` and `PanelLoader` components built with icon-mark SVG. No `Suspense fallback={null}` on any page-level route (`ShortcutsModal` is the exception — a keyboard-triggered lazy component, not a page-level route).

### Drag-to-Resize

`useColumnResize` and `useRowResize` use `requestAnimationFrame` — zero React state updates during drag. Ghost vertical line indicator rendered during column drag, hidden on mouseup. Column/row widths committed in single `setState` call on `mouseup` only. `document.body` cursor and `userSelect` set on dragstart, cleaned on mouseup. Column width clamped 60–600px. Row height clamped 32–300px. Resize handle touch target: 8px desktop, 12px mobile. AutoFit on double-click for both column width and row height.

### Undo History

`useTableHistory` hook with snapshot-based undo stack (max 100 entries). Snapshots captured before each action in `TableContext` dispatch wrapper via `dispatchWithHistory`. Undo restores full cell/width/height/merge state from previous snapshot. Undo button in toolbar (lucide `Undo2` icon), disabled when `canUndo` is false. Tooltip shows action count.

### Import

Toolbar `Import ▾` dropdown with CSV, Excel, and LaTeX options. Hidden `<input type="file">` triggered via ref. CSV uses papaparse with `{ header: true, skipEmptyLines: true }`. Excel uses exceljs `Workbook.xlsx.readBuffer()` — reads `worksheet.eachRow` then processes caption (first row detected when merged across all columns), trimmed leading empty columns, and normalises via `normaliseRows()`. Merge detection reads `worksheet.model.merges` after `eachRow`, parses each range with `excelColToNum`/`parseExcelAddress`, converts to data-space coordinates (accounting for caption skip and column trim), clamps merges spanning caption+data rows, and applies them via `applyMergesToCells()`. Caption styling (bgColor, textColor, italic, alignment) is captured from the caption cell before the row is skipped. Helper functions `excelColToNum` and `parseExcelAddress` parse cell references without modifying the worksheet model. LaTeX import uses `parseLatexTabularWithMerges` — reads `\rowcolor`, `\columncolor`, `\textcolor`, `\cellcolor`, `\colorbox` commands and normalises cells (strips formatting commands so values are clean). All import paths normalise to `CellData[][]` with `mergedRanges`, then dispatch to `TableContext`. Files >5MB rejected before parsing. Parse errors show toast. `useImport` hook destructures `setCaptionTextColor`/`setCaptionBgColor` from context. Full test coverage including merged cells, caption styling, and LaTeX round-trip.

### Accessibility

ARIA grid pattern: `role="grid"`, `role="row"`, `role="gridcell"`, `aria-rowindex`/`colindex` on table elements. Keyboard navigation: Arrow keys, Tab/Shift+Tab between cells. Color swatches use `aria-pressed`, `ring-2 ring-primary`, and `<Check>` icon for selected state (color-blind safe). Merge cells panel uses `aria-live="polite"` for selection display, `aria-live="assertive"` for merge/unmerge announcements. `MobileSheet`: `aria-label` on sheet and overlay, `<h2>` heading, ESC to close. RTL support for Arabic via `document.documentElement.dir`.

### Font Self-Hosting

Fonts self-hosted via raw `@font-face` blocks in `globals.css` (weights 400–700 for Inter, 400–500 for JetBrains Mono) — no external network requests. CSP updated accordingly.

### Export

Export via strategy pattern in `src/services/exportService/`: PDF (html2canvas + jsPDF), PNG, JPEG (html2canvas), Excel (exceljs), CSV (papaparse unparse), LaTeX (tabular generator). LaTeX export preserves row colors (`\rowcolor`), column colors (`\columncolor`), header colors, header text colors (`\textcolor`), and column text alignment. Copy to clipboard: Excel Data (TSV), CSV, Markdown, LaTeX, HTML, Image (via html2canvas). Copy-as-LaTeX also supports colors and column alignment via `cellsToLatex` `LatexOptions`. Export filename uses table caption when present; falls back to `tablesmit-table`.

### Button System

`Button` component uses `cva()` from `class-variance-authority`. Five variants: primary, accent, secondary, ghost, danger. Three sizes: sm, md, lg. Four states per variant: default, hover, active (`scale-[0.97]`), disabled. `motion-reduce:transition-none` on all buttons. Icon buttons: `w-11 h-11` mobile, `w-8 h-8` desktop. `React.forwardRef` for DropdownMenu/Tooltip `asChild` compatibility.

### Responsive Design

Mobile-first base with `sm:`, `md:`, `lg:` overrides throughout. Navbar: hamburger + slide-in drawer on mobile, full nav on md+, ESC to close, overlay backdrop. Table maker: bottom sheets on mobile, left sidebar on md+, right sidebar on lg+. Floating Settings + Presets buttons visible on mobile only. Table grid: `overflow-auto` container, `min-w-max` table. Toolbar: `overflow-x-auto` on mobile. Hero scales `text-3xl` → `text-4xl` → `text-5xl`. Footer: `grid-cols-1` → `grid-cols-2` → `grid-cols-4`. Icon buttons: 44×44px touch target on mobile. Zero horizontal overflow at 320px viewport. Verified at 375px, 768px, 1024px, 1280px.

### Libraries

shadcn/ui: Select, Tooltip, Dialog, DropdownMenu, Separator installed. Lucide React only icon library. `@dnd-kit` for all drag and resize. jsPDF + html2canvas for PDF and image export. exceljs for Excel import + export. papaparse (imported as `Papa`) + `@types/papaparse` for CSV import. `cva` + `clsx` for variant class composition.

### TypeScript

`"strict": true` in `tsconfig.json`. All types organized per Section 11 in `src/types/`. Explicit `minify: 'esbuild'` + `cssMinify: 'esbuild'` in vite.config.ts. Zero `any` without explanatory inline comment.

### Testing

Test suite: Vitest + React Testing Library + user-event, 1,530 tests across 143 files, 0 failures. Coverage thresholds: utils 95%+, services 90%+, hooks 90%+, UI components 85%+, features 80%+, pages 75%+. Tests in `src/test/` mirroring source structure — no co-located `.test` files. `vitest.config.ts` configured with jsdom environment, jest-dom setup. Key test files cover: `useImport` (valid/invalid CSV/Excel, file size limits, merged cells detection, caption styling capture), `useColumnResize`/`useRowResize` (mousedown→mousemove→mouseup cycle, clamping, ghost line, cleanup), `useExport` (success/error/null element), `tableUtils` (all CRUD operations, sorting), `toast` (all methods including warning), `useClipboardPaste` (CSV with quoted commas, HTML table parsing, LaTeX, Markdown, TSV/CSV fallback), `ErrorBoundary`, `FindReplace`, `MergeCellsPanel`, `formatUtils`, `TableToolbar`, `scripts/md-to-blog-post` (`parseFrontmatter` — valid/missing/empty/edge-case frontmatter), `scripts/sitemap/generate-sitemap` (`generateXml` — XML structure, static/blog/feature entries via dependency-injected callbacks). No file-writing side effects — SheetJS `writeFile` tests excluded, `tablesmit-table.*` gitignored.

### Engineering Principles

SOLID, DRY, KISS applied throughout. Single Responsibility: no file has more than one concern. Open/Closed: `Button` uses `cva`, `ExportService` uses strategy pattern. Interface Segregation: no component receives props it doesn't use. Dependency Inversion: components depend on hooks/context, not services directly. DRY: no Tailwind class string repeated 3+ times without component extraction. KISS: no abstraction created before second confirmed use case.

### Context Menu

Right-click context menu on cells and column headers (shadcn/ui ContextMenu). Row/column insert/delete at position via `tableUtils.ts` (`insertRowAt`, `deleteRowAt`, `insertColAt`, `deleteColAt` with cell ID rebasing). Action types in `TableContext` reducer (undo-compatible). TableCtxMenu receives props for insert, delete, sort operations. Cell menu: auto-fit → background → column type → text align → insert rows/cols → paste → row color → clear cell → delete row → delete column. Column menu: auto-fit → sort asc/desc → background → column type → text align → insert cols → delete column.

### Toast Notifications

Sonner-based toast wrapper in `src/utils/toast.ts` with `TOAST` const for all messages. Custom Lucide icons per type (`CheckCircle2` for success, `Info` for info, `AlertTriangle` for warning, `XCircle` for error) configured in `<Toaster icons={{...}}>`. Per-type background colors via Tailwind (`bg-success-light`, `bg-danger-light`, `bg-info-light`, amber tint for warning) applied through `toastOptions.classNames`. Toasts for export success/error, import success/error, copy/clear actions, undo-empty (Ctrl+Z). No toasts for actions with immediate visual feedback (add/remove rows, type, select, color, resize, sort, merge).

### Column Sorting

`sortRows()` in `tableUtils.ts` — numeric-aware sort with empty cells always last. `sortAsc`/`sortDesc` callbacks in `TableGrid.tsx` with memoized `sortedRows`. Context menu items for sort ascending/descending. Sorting disabled when merged ranges present.

### Performance

`React.memo` with 28-field custom comparator on `TableCell`, 5-field comparator on `TableHeaderCell`. All handlers `useCallback`'d. All derived values `useMemo`'d (`sortRows()`, `sumColumn()`, `mergedRanges`). rAF resize pattern prevents layout thrashing. Lazy-loaded pages and panels. Lazy-loaded export libraries (jsPDF, html2canvas, exceljs imported on first export click). `@sentry/react` dynamically imported — saves ~34 kB gzip from initial bundle. `manualChunks` splitting vendor-react, vendor-ui, vendor-i18n, vendor-sentry. Self-hosted fonts eliminate Google CDN round trip. Initial JS bundle ~150 kB gzipped.

### 404 Page Animation

`NotFoundAnimation.tsx` — animated SVG with grid-line draw, cell fade-in, "404" digits with pulse animation. Respects `prefers-reduced-motion`. NotFoundPage uses the animation component.

### Open Source / Sponsor Page

Route: `/open-source`. Hero: "Built in the open. Sustained by the community." Sponsor section with cards (currently all disabled due to regional unavailability). Contributors and Contribute sections. MIT licensed footer note.

### AI Features (Scaffolded)

`AiFeaturesPanel.tsx` with "Coming soon" badge, feature list, Join Waitlist button. All labels sourced from per-domain config files (brand, labels, copy). Join Waitlist shows info toast + mailto link. UI-only scaffolding — no backend, no API calls.

### Changelog Page

Route: `/changelog`. Data-driven from `src/config/changelog/changelog.ts` typed array. Version numbers, dates, color-coded change-type badges.

### Table Caption

`TableCaption.tsx` — placeholder, click-to-edit, Enter/Escape handling. Right-click context menu for alignment. Wrapped with `React.memo`.

### Freeze Panes

`freezeRow`/`freezeCol` in `TableState` type. Sticky CSS in `TableCell.tsx` with proper z-index stacking. Checkboxes in HeaderOptionsPanel.

### Find & Replace

`FindReplace.tsx` — Ctrl+F / Ctrl+H panel with live highlight, previous/next navigation, Replace All as single undo entry. Match counter: "X of Y matches". Wrapped with `React.memo`.

### Table Themes

6 themes: Default, Minimal, Dark Header, Striped, Academic, Monochrome. `TABLE_THEMES` config in `src/config/table/tableThemes.ts`. ThemePicker component with thumbnail cards. Theme dropdown in toolbar. Full test coverage.

### Feature Landing Pages

30 feature JSON files in `src/content/features/`. `FeaturesListPage` card grid with icon, description, category. `FeatureDetailPage` with hero + conditional sections (benefits, use cases, steps, CTA, related). Routes: `/features` and `/features/:slug` lazy-loaded. `featureService.ts` — `import.meta.glob` auto-discovery. `FeatureSections/` — 6 reusable section components.

### Blog System

Blog posts as `.ts` modules in `src/content/blog/` — auto-discovered via `import.meta.glob`. `BlogListPage` with card grid, tags, dates, featured badge (paginated at 6 per page via `ITEMS_PER_PAGE`). `BlogPostPage` with ReactMarkdown + remark-gfm, Helmet meta tags, JSON-LD structured data. 36 posts live. `scripts/md-to-blog-post.ts` helper. Blog section in README.

### Security

### Performance (Section 38C)
- [x] Lighthouse: Performance **99**, LCP **0.9s**, FCP **0.7s**, CLS **0**, TBT **0ms** — all targets met
- [x] Self-hosted fonts via raw `@font-face` blocks in `globals.css`
- [x] rAF resize pattern for column/row drag — no layout thrashing
- [x] `React.memo` on `TableCell`, split contexts (`TableDataContext` + `TableSelectionContext`)
- [x] Lazy-loaded export libraries (jsPDF, html2canvas in separate vendor chunks)
- [x] `manualChunks` in `vite.config.ts` splitting react, ui, pdf, canvas, excel
- [x] Initial bundle ~150 KB gzipped (target < 150 KB) — met by deferring Sentry (458 kB / 156 kB gzip) + react-markdown (113 kB / 35 kB gzip) + export libraries
- [x] `react-markdown` lazily imported in BlogPostPage — 113 kB (35 kB gzip) deferred from route chunk to content-render path
- [x] JetBrains Mono 400/500 loaded lazily via `@font-face font-display: swap` only — preload removed from `index.html` since `font-mono` is optional (monospace column type)
- [x] Ahrefs analytics preconnected via `<link rel="preconnect">` in `index.html` — removes DNS + TCP round trip
- [x] `TableSkeleton` component at `src/components/ui/TableSkeleton/TableSkeleton.tsx` — gradient-shimmer pulsing grid covering the table during initial ~350ms render window; fades via opacity transition (zero CLS); header row uses primary-colored shimmer
- [ ] TTFB depends on Netlify edge — outside client control

### Error Monitoring (Section 46)
- [x] `@sentry/react` lazy-loaded via `src/lib/sentry.ts` — never eagerly imported, only loaded in production with DSN configured
- [x] `beforeSend` scrubs `event.extra.cells` — table content never reaches Sentry
- [x] `ErrorBoundary.componentDidCatch` wires `Sentry.captureException` with component stack
- [x] `.env.example` has `VITE_SENTRY_DSN` placeholder

`@sentry/react` lazy-loaded via `src/lib/sentry.ts` — never eagerly imported, only loaded in production with DSN configured. `beforeSend` scrubs `event.extra.cells` — table content never reaches Sentry. `ErrorBoundary.componentDidCatch` wires `captureException` with component stack. `.env.example` has `VITE_SENTRY_DSN` placeholder.

### Infrastructure & Compliance

Netlify: `netlify.toml` with full CSP via HTTP headers (stronger than meta tag), security headers (X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy, Cross-Origin-Opener-Policy), cache policies (assets/locales/favicon: 1-year immutable; index.html/webmanifest/version.json: no-cache), and SPA redirect (`/*` → `/index.html` 200). PWA via `vite-plugin-pwa` — auto-updating service worker with `SKIP_WAITING` + `controllerchange` auto-reload, plus `version.json` polling (60s interval) as a parallel safety net for non-PWA users and long-lived tabs. `dist/version.json` written at build time by `scripts/version.cjs`. `CookieConsent` component — lightweight banner, stores consent in localStorage, loads GA4 only on Accept + production.

### Developer Experience

GitHub issue templates (`bug_report.md`, `feature_request.md`). `pull_request_template.md` with summary, testing checklist, screenshot section. `ShortcutsModal` — `?` key or `Ctrl+/` opens modal listing all 13 keyboard shortcuts. Status bar shows keyboard icon + "Ctrl+/ for shortcuts" hint. GitHub Actions CI/CD — lint, test, build all pass before merge.

### Internationalization

8 languages: English, Arabic, French, Spanish, Portuguese, Japanese, German, Norwegian. English bundled at build time (`src/i18n/locales/en.json` — zero network requests). Other locales served from `public/locales/{code}/common.json` as static assets. Only the detected language is fetched eagerly on init; all others are fetched lazily on language switch. `hasResourceBundle()` guards against re-fetching already-loaded locales. RTL for Arabic via `document.documentElement.dir = 'rtl'`. Language picker in Navbar. Brand name never translated. All toast messages use `useTranslation` with interpolation variables. All aria-labels translated. `useSuspense: false` — manual fetch pattern handles loading asynchronously.

### Content — v8.0 Targets
- [x] Blog posts committed to `src/content/blog/` (Section 58 — 36 posts live)
- [x] Feature landing pages — system built + 30 JSON files live in `src/content/features/` (Section 59)
- [ ] Real testimonials — min 3 collected and added to TESTIMONIALS array (Section 60)
  - [x] Google Search Console — verified + sitemap submitted (Section 38G)
  - [x] Netlify env vars — `VITE_GA4_MEASUREMENT_ID` and `VITE_SENTRY_DSN` set in dashboard (Section 53)
- [x] Sitemap updated with blog post and feature page URLs

Main branch protected — direct push returns 403. PR required for all merges. Required status checks: lint + test + build must all pass. Force pushes blocked. Branch naming convention: `feat/`, `fix/`, `docs/`, `chore/`, `test/`, `refactor/`, `content/`, `i18n/`. `.github/workflows/deploy-netlify.yml` — single job with lint, test, build steps as required checks.

## 20. Security

### Content Security Policy

A CSP `<meta>` tag is set in `index.html` with the following directives:

| Directive       | Value                                                              |
|-----------------|--------------------------------------------------------------------|
| `default-src`   | `'self'`                                                           |
| `script-src`    | `'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com` |
| `style-src`     | `'self' 'unsafe-inline'`                                           |
| `font-src`      | `'self' data:`                                                     |
| `img-src`       | `'self' data:`                                                     |
| `connect-src`   | `'self' ws: https://www.googletagmanager.com https://www.google-analytics.com` |
| `frame-src`     | `'none'`                                                           |
| `object-src`    | `'none'`                                                           |
| `base-uri`      | `'self'`                                                           |

`'unsafe-inline'` for scripts and styles is required by:
- Vite HMR (dev mode) — injects inline scripts for hot module reloading
- Tailwind CSS — generates inline style blocks
- `contentEditable` cells — user-typed content flows through React's textContent, but the editing surface itself needs inline style application

The full CSP is enforced via HTTP headers in `netlify.toml`, which adds:
- `blob:` in `img-src` (html2canvas export capture)
- `wss:` in `connect-src` (Vite HMR websocket in dev)
- `region1.google-analytics.com` and `*.ingest.sentry.io` in `connect-src`
- `frame-src 'self'` (iframe playback of user exports)
- `form-action 'self'`
- `frame-ancestors 'none'` (meta tag cannot set this — HTTP header required)

The meta tag exists as a development fallback for local dev where `netlify.toml` is not applied.

### CSV Injection (Formula Injection)

When exporting to CSV, cell values starting with `=`, `+`, `-`, `@`, or `\t` are prefixed with a single quote (`'`). This is the standard mitigation that tells spreadsheet software (Excel, Google Sheets, LibreOffice Calc) to treat the value as text rather than executing it as a formula.

```ts
// src/services/export/csvExporter.ts
function sanitizeCsvValue(value: string): string {
  if (/^[=+\-@\t]/.test(value)) {
    return `'${value}`
  }
  return value
}
```

This only affects CSV export. Excel export (SheetJS) handles this differently — values are written as cell data, not as formula strings.

### Import Safety

| Measure                  | Location                          | Threshold                              |
|--------------------------|-----------------------------------|----------------------------------------|
| File size limit          | `importService/utils.ts:assertFileSize` → `MAX_IMPORT_FILE_SIZE` in `tableDefaults.ts` | 5MB |
| Row clamp                | `importService/utils.ts:normaliseRows`  | `MAX_ROWS` (50)                        |
| Column clamp             | `importService/utils.ts:normaliseRows`  | `MAX_COLS` (20)                        |
| XLSX cell count limit    | `importService/impl/excelImporter.ts:importExcel`    | 100,000 cells                          |
| Worksheet dimensions preservation | `importService/utils.ts:normaliseRows` accepts `minRows`/`minCols` | Preserves empty styled Excel worksheets |
| Secondary row/col clamp  | `TableContext.tsx` reducer        | `MAX_ROWS` (50) / `MAX_COLS` (20)      |

The XLSX cell count limit (`MAX_XLSX_CELLS = 100_000`) is enforced before the full parse to prevent zip-bomb-style denial of service. Merge ranges are read from `worksheet.model.merges` after `eachRow` — no cell-by-cell merge traversal needed.

### External Resources

Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) are loaded from CDN with `crossorigin` attribute on all `<link>` tags. Full Subresource Integrity (SRI) is not feasible because the CSS content varies by user-agent. For strongest security and privacy, self-host the font files and serve from the same origin — see the Inter and JetBrains Mono font files in the `public/fonts/` directory if self-hosting has been set up.

### Dependency Auditing

Run `npm run audit` before each release. The `xlsx` (SheetJS) package has a known high-severity vulnerability (GHSA-4r6h-8v6p-xvw6, GHSA-5pgg-2g8v-p4x9) with no fix available in the community edition. Current mitigations:
- 5MB file size limit
- 100K cell count limit
- Client-side only — no server processing

If the risk profile changes, migrate to a maintained fork (`@sheetjs/sheetjs` or `exceljs`).

> **Update:** This project has migrated from `xlsx@0.18.5` to `exceljs@^4.4.0` for Excel import and export — resolves the two high-severity CVEs found in earlier `xlsx` dependency. `npm audit` now reports 0 vulnerabilities.

---


---

## 22. AutoFit Column Width and Row Height

Trigger: **Double-click** on a column resize handle (right edge of column header)
or a row resize handle (bottom edge of row header).

This mirrors Excel's AutoFit behavior exactly.

### How It Works

```
1. On double-click of a column resize handle:
   a. Measure the bounding box of every rendered cell in that column
      using getBoundingClientRect() on each contentEditable div
   b. Find the maximum measured content width (naturalWidth)
   c. Add horizontal padding (16px each side = 32px total)
   d. Clamp: max(60, min(naturalWidth + 32, 600))
   e. Set columnWidths[colIndex] = clampedWidth in a single setState call

2. On double-click of a row resize handle:
   a. Measure the bounding box height of every rendered cell in that row
   b. Find the maximum measured content height
   c. Add vertical padding (8px each side = 16px total)
   d. Clamp: max(32, min(naturalHeight + 16, 300))
   e. Set rowHeights[rowIndex] = clampedHeight in a single setState call
```

### Implementation — `useColumnResize` hook addition

```ts
const autoFitColumn = useCallback((colIndex: number) => {
  const tableEl = tableRef.current;
  if (!tableEl) return;

  // Read all cell widths for this column in one pass (no layout thrashing)
  const cells = tableEl.querySelectorAll<HTMLElement>(
    `[data-col="${colIndex}"] .cell-content`
  );

  let maxWidth = 60;
  cells.forEach(cell => {
    // scrollWidth gives natural content width without overflow clipping
    maxWidth = Math.max(maxWidth, cell.scrollWidth);
  });

  const paddedWidth = Math.min(maxWidth + 32, 600);

  setColumnWidths(prev => {
    const next = [...prev];
    next[colIndex] = paddedWidth;
    return next;
  });
}, [tableRef, setColumnWidths]);
```

### UI Trigger

```tsx
// On the column resize handle (ResizeHandle component):
<div
  className="resize-handle-col"
  onMouseDown={e => onMouseDown(e, colIndex, columnWidths[colIndex])}
  onDoubleClick={() => autoFitColumn(colIndex)}
  aria-label={`Resize column ${colIndex + 1}. Double-click to auto-fit.`}
/>
```

### Context Menu Entry

"Auto-fit column width" in the right-click context menu (Section 25)
calls the same `autoFitColumn(colIndex)` function.

### Tests Required

```ts
describe('autoFitColumn', () => {
  it('sets column width to scrollWidth + 32px padding')
  it('clamps to minimum 60px when content is very short')
  it('clamps to maximum 600px when content is very long')
  it('handles columns with no content — falls back to 60px')
  it('does not mutate other column widths')
})
```

---

## 23. Undo Stack (Replace Reset with Undo)

### Change

Remove the **Reset** button from the toolbar.
Replace it with an **Undo** button (Lucide icon: `Undo2`).

Rationale: "Reset" clears everything — destructive and irreversible.
"Undo" respects the user's work and gives them confidence to experiment.

### Implementation — `useTableHistory` hook

```ts
// src/hooks/useTableHistory/useTableHistory.ts
// Manages a stack of TableState snapshots. Max 100 entries (configurable).

const MAX_HISTORY = 50;

export function useTableHistory() {
  const [history, setHistory]   = useState<TableState[]>([]);
  const [pointer, setPointer]   = useState(-1);           // current position in stack

  const push = useCallback((state: TableState) => {
    setHistory(prev => {
      // Discard any "future" entries above the current pointer
      const trimmed = prev.slice(0, pointer + 1);
      const next = [...trimmed, structuredClone(state)];
      // Enforce max
      return next.length > MAX_HISTORY ? next.slice(1) : next;
    });
    setPointer(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [pointer]);

  const undo = useCallback(() => {
    if (pointer <= 0) return null;          // nothing to undo
    const prevState = history[pointer - 1];
    setPointer(p => p - 1);
    return prevState;
  }, [history, pointer]);

  const canUndo = pointer > 0;

  return { push, undo, canUndo };
}
```

### Wiring into TableContext

```ts
// Every state-mutating action (updateCell, addRow, mergeCells, etc.)
// calls history.push(currentState) BEFORE applying the change.
// On undo(), the returned snapshot is dispatched as the new state.

dispatch({ type: 'RESTORE_STATE', payload: previousSnapshot });
```

### Toolbar Change

```
BEFORE: [...] | Clear All · Reset |
AFTER:  [...] | Clear All · Undo  |

Undo button:
  - Icon: Undo2 (Lucide)
  - Disabled state: when canUndo === false (opacity-50, pointer-events-none)
  - Tooltip: "Undo last action (Ctrl+Z)"
  - Keyboard: Ctrl+Z / Cmd+Z globally — add keydown listener in TableMakerPage
```

### Tests Required

```ts
describe('useTableHistory', () => {
  it('push() adds state to history')
  it('undo() returns the previous state')
  it('undo() returns null when nothing to undo')
  it('canUndo is false at initial state')
  it('canUndo is true after at least one push')
  it('does not exceed MAX_HISTORY entries')
  it('push() after undo discards future history')
  it('Ctrl+Z keyboard shortcut triggers undo')
})
```

---

## 24. Border Styles

Provide a border style picker that covers all common Microsoft Word table border options.

### Border Types to Support

```
No Border          — removes all borders from selected cells / table
All Borders        — applies border to every cell edge
Outside Borders    — border on table outer edge only
Inside Borders     — border between cells only (no outer edge)
Inside Horizontal  — horizontal dividers between rows only
Inside Vertical    — vertical dividers between columns only
Top Border         — top edge of selection only
Bottom Border      — bottom edge of selection only
Left Border        — left edge of selection only
Right Border       — right edge of selection only
Thick Box Border   — heavier weight outer border
Double Border      — double-line outer border
Dashed Border      — dashed stroke
Dotted Border      — dotted stroke
```

### Data Model Addition

```ts
// src/types/table/cell.types.ts — add to CellData
export type BorderStyle =
  | 'none' | 'solid' | 'dashed' | 'dotted' | 'double';

export type BorderWeight = 'thin' | 'medium' | 'thick';

export interface CellBorders {
  top:    { style: BorderStyle; weight: BorderWeight; color: string } | null;
  right:  { style: BorderStyle; weight: BorderWeight; color: string } | null;
  bottom: { style: BorderStyle; weight: BorderWeight; color: string } | null;
  left:   { style: BorderStyle; weight: BorderWeight; color: string } | null;
}

// Add to CellData:
borders?: CellBorders;
```

### UI — Border Picker Panel

Location: Right sidebar, below Column Type panel.
Component: `BorderPanel` at `src/components/features/BorderPanel/`

```
Layout: 2×7 grid of icon buttons, each showing a border pattern preview
Uses: Lucide border icons where available; custom inline SVG for Word-specific patterns
Apply to: current cell selection (selectedRange from TableContext)
```

### CSS Application

```ts
// Utility (conceptual — border styles computed inline in TableGrid)
export function getBorderStyles(borders: CellBorders): React.CSSProperties {
  const toCSS = (b: CellBorders['top']) =>
    b ? `${b.weight === 'thin' ? 1 : b.weight === 'medium' ? 2 : 3}px ${b.style} ${b.color}` : 'none';
  return {
    borderTop:    toCSS(borders.top),
    borderRight:  toCSS(borders.right),
    borderBottom: toCSS(borders.bottom),
    borderLeft:   toCSS(borders.left),
  };
}
```

### Tests Required

```ts
describe('borderUtils', () => {
  it('getBorderStyles returns correct CSS for solid thin border')
  it('getBorderStyles returns "none" for null border')
  it('applyBorderPreset("all") sets all four edges on every cell in range')
  it('applyBorderPreset("none") clears all borders in range')
  it('applyBorderPreset("outside") only affects outer edges of selection')
})
```

---

## 25. Right-Click Context Menu

On right-click of any **cell** or **column header**, show a context menu with
contextually relevant actions.

### Library

Use shadcn/ui `ContextMenu` (wraps Radix UI `ContextMenu`) — do not build custom.

```bash
npx shadcn@latest add context-menu
```

### Menu Items

#### On Cell Right-Click

```
Auto-fit column width          → autoFitColumn(colIndex)
Auto-fit row height            → autoFitRow(rowIndex)
─────────────────────────────
Change cell background color   → opens ColorPicker popover
Change text color              → opens ColorPicker popover
─────────────────────────────
Change column type             → opens inline Select (Text/Number/Currency/etc.)
─────────────────────────────
Insert row above               → insertRow(rowIndex)
Insert row below               → insertRow(rowIndex + 1)
Insert column left             → insertCol(colIndex)
Insert column right            → insertCol(colIndex + 1)
─────────────────────────────
Cut                            → window.document.execCommand('cut')  [or Clipboard API]
Copy                           → navigator.clipboard.writeText(cell.value)  — copies raw cell value to clipboard
Paste                          → navigator.clipboard.readText() + updateCell(cellId, text)
─────────────────────────────
Clear cell                     → updateCell(cellId, '')
Delete row                     → removeRow(rowIndex)
Delete column                  → removeColumn(colIndex)
```

#### On Column Header Right-Click

```
Auto-fit column width          → autoFitColumn(colIndex)
Sort ascending                 → sortColumn(colIndex, 'asc')
Sort descending                → sortColumn(colIndex, 'desc')
─────────────────────────────
Change column type             → inline Select
Change background color        → ColorPicker popover (applies to entire column)
─────────────────────────────
Insert column left             → insertCol(colIndex)
Insert column right            → insertCol(colIndex + 1)
Delete column                  → removeColumn(colIndex)
```

### Implementation

```tsx
// Wrap TableCell and TableHeaderCell with ContextMenu
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '@/components/ui/context-menu';

<ContextMenu>
  <ContextMenuTrigger asChild>
    <td ...>...</td>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem onClick={() => autoFitColumn(colIndex)}>
      Auto-fit column width
    </ContextMenuItem>
    <ContextMenuSeparator />
    {/* ... */}
  </ContextMenuContent>
</ContextMenu>
```

### Tests Required

```ts
describe('ContextMenu', () => {
  it('opens on right-click of a cell')
  it('shows "Auto-fit column width" option')
  it('calls autoFitColumn on menu item click')
  it('shows "Sort ascending" on column header right-click')
  it('does not appear when table has no data')
})
```

---

## 26. Smart Clipboard Paste

When the user pastes (Ctrl+V / Cmd+V) into the table — or into an empty state —
detect if the clipboard contains a structured table (from Excel, Word, CSV,
LaTeX tabular, or Markdown) and automatically generate or populate the table.

### Architecture

The paste system has **two entry points** that converge on a shared parser:

1. **Global Ctrl+V listener** (`useClipboardPaste` hook) — `document.addEventListener('paste', ...)`
2. **Toolbar Paste button** (`handlePaste` in `TableToolbar.tsx`) — reads clipboard via `navigator.clipboard.read()`

Both call `handlePasteData(text, html, setCells)`, which delegates to `parseClipboardContent(text, html)`.

### Detection Priority (`parseClipboardContent` — `src/hooks/useClipboardPaste/useClipboardPaste.ts`)

```
1. HTML table (from Excel/Word — richest data)
   → DOMParser parses <table>, reads inline styles (bg, text color, align,
   borders, colspan/rowspan), data-* attributes (header color, themes, caption
   colors), <caption> element, and merged ranges from colspan/rowspan.
   → Caption row detection: <tr data-caption-row="true"> is filtered out so
   it does not appear in pasted row data. This attribute is set by
   buildExcelHtml() to prevent the caption row from being re-imported as
   data during internal copy/paste round-trips.

2. LaTeX tabular (\begin{tabular} ... \end{tabular})
   → Detected via text.includes('\\begin{tabular}')
   → Parsed by parseLatexTabular() — strips \hline, \textbf, column specifiers,
   and LaTeX escapes (\%, \$, \_, etc.)

3. Markdown pipe table (| Header | Header | / | --- | --- | / | Cell | Cell |)
   → Detected via text.includes('|') + pipe-separator row detection
   → Parsed by parseMarkdownTable() — finds separator row with dashes,
   extracts header + body rows, normalises column count, trims whitespace

4. TSV (tab-separated — Excel default plain text format)
   → Detected via includes('\t'), split on tabs

5. CSV (comma-separated)
   → Parsed via papaparse with { header: false, skipEmptyLines: true }
   → Correctly handles quoted values containing commas (e.g. "$10,000")

6. Plain text — returns null, no action taken (only HTML-textable cases
   with multiple rows/columns produce a PasteResult)
```

### Guard Conditions

The global paste listener (`useClipboardPaste` hook) skips interception in these cases:

```
- Target is inside <textarea> or <input> — native paste wins
- Target is inside [contenteditable] AND clipboard has no text/html —
  lets the cell's native handler deal with plain text
- All other cases: event.preventDefault(), reads clipboard, calls
  handlePasteData
```

### ContentEditable Cell Paste

When the user is editing a cell (contentEditable) and pastes:
- **With HTML table data** (e.g., from Excel): intercepted, auto-detected, table replaced
- **With plain text only**: native paste inserts raw text into the cell — this is by design

### Copy Buffer (Internal Round-Trip)

For internal copy/paste (Copy as Excel Data → Paste), `handlePasteData` checks a
`getCopyBuffer()` for matching TSV content. If found, it merges the stored styles
(cell colors, merged ranges, column widths) with any styles parsed from the HTML.
This preserves formatting during internal round-trips. `clearCopyBuffer()` is called
after each paste to prevent stale data from a previous paste affecting future ones.

### Caption Handling in Excel Round-Trip

When copying as "Excel Data" (TSV), the table renders via `buildExcelHtml()` which
includes the caption as a `<tr data-caption-row="true"><td colspan="N">caption</td></tr>`
for Excel compatibility. On paste:
- **Excel** ignores the `data-caption-row` attribute and renders the caption row normally
- **Tablesmit's parser** (`parseClipboardContent`) filters out `<tr data-caption-row="true">`
  before mapping remaining rows as cell data, preventing caption duplication
- The caption text is preserved via the `<table data-caption="...">` attribute

### UX

```
If table currently has no data (empty state):
  → Generate new table from clipboard dimensions + content

If table has existing data and user pastes:
  → Replace entire table with pasted content (including caption, styles, merged cells)
  → Expand table if clipboard content exceeds current dimensions

Show a non-blocking toast on success:
  "Table pasted. 5 rows, 3 columns."

Show toast on failure:
  "Could not read clipboard data. Try importing a file instead."
```

### Tests Required

```ts
describe('useClipboardPaste (hook)', () => {
  it('returns pasting false initially')
  it('adds and removes paste event listener on mount/unmount')
  it('ignores paste inside contenteditable when clipboard has no HTML')
  it('processes HTML table paste inside contenteditable')
  it('ignores paste inside textarea')
  it('ignores paste inside input')
  it('parses LaTeX tabular from plain text clipboard')
  it('parses LaTeX tabular with \textbf headers')
  it('parses a Markdown table from plain text clipboard')
  it('parses Markdown table with alignment colons')
  it('falls through to TSV/CSV when Markdown has no pipe-separator line')
  it('falls through to TSV/CSV when LaTeX is not tabular')
  it('handles CSV with quoted values containing commas')
  it('clamps large clipboard tables before setting cells')
})

describe('parseClipboardContent — HTML parsing (inline styles + data-*)', () => {
  it('reads cell background-color from inline style')
  it('reads cell color and text-align from inline style')
  it('reads caption from <caption> element')
  it('reads caption text color/italic/bg/alignment from <caption> inline style')
  it('reads header-color/header-style from data-* attributes')
  it('reads border-style/border-color from data-* attributes')
  it('reads theme/content-color/content-bg-color from data-* attributes')
  it('reads data-caption as fallback when no <caption> element')
  it('reads data-caption-* style attributes')
  it('skips <tr> with data-caption-row="true" attribute')
})

describe('Round-trip: buildHtmlTable → parseClipboardContent', () => {
  it('preserves cell values, background colors, header color and style')
  it('preserves border style and color')
  it('preserves content color and bg')
  it('preserves caption text and caption styles')
  it('preserves all styles in a full round-trip')
})

describe('Round-trip: buildExcelHtml → parseClipboardContent (caption dedup)', () => {
  it('marks caption <tr> with data-caption-row="true" in generated HTML')
  it('does not include caption <tr> data in pasted rows')
  it('preserves caption and all data rows after round-trip')
  it('does not leak caption text into the row data')
})
```

---

## 27. Copy Table Button

A **Copy** button in the toolbar with a dropdown arrow revealing six modes.

### UI

```

Toolbar right side (before export group):

[Copy ▾]    ← secondary button with ChevronDown icon

Dropdown:
  Copy as Excel Data      → TSV string to clipboard (pastes into Excel as table)
  Copy as CSV             → comma-separated string to clipboard
  Copy as Markdown        → generates pipe-table to clipboard
  Copy as LaTeX           → generates \begin{tabular} to clipboard
  Copy as HTML            → generates an HTML <table> string to clipboard
  Copy as Image           → renders table to canvas via html2canvas, copies to clipboard as PNG
```

### Implementation

```ts
// Copy Excel Data (TSV)
const copyAsExcelData = async () => {
  const tsv = cells
    .map(row => row.filter(c => !c.isHidden).map(c => c.value).join('\t'))
    .join('\n');
  await navigator.clipboard.writeText(tsv);
  toast('Table data copied. Paste into Excel or Google Sheets.');
};

// Copy as CSV
const copyAsCsv = async () => {
  const rows = cells.map(row =>
    row.map(cell => {
      let value = cell.value;
      if (/[,"\n]/.test(value)) value = `"${value.replace(/"/g, '""')}"`;
      return value;
    }).join(',')
  );
  await navigator.clipboard.writeText(rows.join('\n'));
  toast('Table data copied as CSV.');
};

// Copy as Markdown
const copyAsMarkdown = async () => {
  const colCount = cells[0]!.length;
  const header = `| ${cells[0]!.map((_c, i) => ` C${i + 1} `).join('|')} |`;
  const separator = `| ${Array.from({ length: colCount }, () => ' --- ').join('|')} |`;
  const body = cells.map(row =>
    `| ${row.map(cell => ` ${cell.value || ' '} `).join('|')} |`
  ).join('\n');
  await navigator.clipboard.writeText(`${header}\n${separator}\n${body}`);
  toast('Table copied as Markdown.');
};

// Copy as LaTeX
const copyAsLatex = async (headerStyle?: string) => {
  const { cellsToLatex } = await import('../../utils/latexUtils');
  const latex = cellsToLatex(cells, headerStyle);
  await navigator.clipboard.writeText(latex);
  toast('Table copied as LaTeX.');
};

// Copy as HTML
const copyAsHtml = async () => {
  const { buildHtmlTable } = await import('../../hooks/useCopyTable/useCopyTable');
  const html = buildHtmlTable(cells, caption, headerColor, headerStyle, contentColor, contentBgColor, borderStyle, borderColor, theme);
  await navigator.clipboard.write([
    new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }) }),
  ]);
  toast('Table copied as HTML.');
};

// Copy as Image
const copyAsImage = async () => {
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2, useCORS: true });
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!blob) return;
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  toast('Table copied as image.');
};
```

### Tests Required

```ts
describe('copyTable', () => {
  it('copyAsExcelData produces correct TSV string')
  it('copyAsExcelData skips hidden (merged) cells')
  it('copyAsCsv produces correctly quoted CSV')
  it('copyAsMarkdown generates valid pipe-table')
  it('copyAsLatex generates valid LaTeX tabular')
  it('copyAsHtml generates HTML table string with data-* attributes')
  it('copyAsImage calls html2canvas and navigator.clipboard.write')
  it('shows correct toast message on success')
  it('shows error toast if clipboard write fails')
})
```

---

## 28. Auto-Sum and Auto-Numbering

### Auto-Sum

For columns with type **Number**, **Currency**, or **Percentage**:
add a toggle "Show sum row" in Column Type panel.

When enabled:
```
- A non-editable footer row is appended below the table
- The footer cell for that column displays the sum of all non-empty numeric cells
- Footer row styled: bg-surface, text-text-secondary, text-sm font-semibold
- Other columns in the footer row are empty
- Footer row is excluded from exports (or optionally included — user choice)
```

```ts
// src/utils/tableUtils/tableUtils.ts
export function sumColumn(cells: CellData[][], colIndex: number): number {
  return cells.reduce((sum, row) => {
    const val = parseFloat(row[colIndex]?.value ?? '');
    return isNaN(val) ? sum : sum + val;
  }, 0);
}
```

### Auto-Numbering

For columns with type **Number** and a toggle "Auto-number":
```
- Column cells are filled with sequential integers: 1, 2, 3...
- Numbers are read-only while auto-number is active
- Inserting a row re-sequences all auto-number columns
- Visible in UI as a lock icon on the cell
```

### Tests Required

```ts
describe('sumColumn', () => {
  it('returns correct sum for numeric column')
  it('ignores non-numeric (NaN) cell values')
  it('returns 0 for empty column')
  it('handles negative numbers correctly')
  it('handles currency-formatted strings stripped of symbols')
})

describe('autoNumbering', () => {
  it('fills column with sequential integers starting at 1')
  it('re-sequences after row insertion')
  it('re-sequences after row deletion')
})
```

---

## 29. Column Sorting

### UI

```
Sort controls appear:
  1. In the column header (small asc/desc toggle icon — Lucide ArrowUpDown)
  2. In the right-click context menu (Section 25)

Visual state:
  Active sort: column header shows ArrowUp (asc) or ArrowDown (desc) in primary color
  No sort: shows ArrowUpDown in text-muted
```

### Sort Behavior

```
- Sort is non-destructive — it reorders rows in the view only
- A "sort key" is stored in TableContext: { colIndex, direction }
- Clearing sort restores original row order (original order always preserved in state)
- Numeric columns sort numerically (parseFloat), not lexicographically
- Empty cells always sort to the bottom regardless of direction
- Merged cells: sorting is disabled when any merged range exists —
  show tooltip "Clear merged cells to enable sorting"
```

### Implementation

```ts
// src/utils/tableUtils/tableUtils.ts
export function sortRows(
  rows: CellData[][],
  colIndex: number,
  direction: 'asc' | 'desc'
): CellData[][] {
  return [...rows].sort((a, b) => {
    const aVal = a[colIndex]?.value ?? '';
    const bVal = b[colIndex]?.value ?? '';
    if (aVal === '') return 1;   // empty to bottom
    if (bVal === '') return -1;

    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);
    const isNumeric = !isNaN(aNum) && !isNaN(bNum);

    const compared = isNumeric ? aNum - bNum : aVal.localeCompare(bVal);
    return direction === 'asc' ? compared : -compared;
  });
}
```

### Tests Required

```ts
describe('sortRows', () => {
  it('sorts string column ascending alphabetically')
  it('sorts string column descending alphabetically')
  it('sorts numeric column numerically, not lexicographically')
  it('always places empty cells at the bottom regardless of direction')
  it('does not mutate the original rows array')
  it('handles mixed numeric and string values gracefully')
})
```

---

## 30. Performance: Memoization Strategy

All components that re-render unnecessarily must be wrapped or optimized.
This is a **mandatory** refactor — not optional.

### Rules

```
React.memo()    → wrap every feature component that receives non-primitive props
                  (TableCell, TableHeaderCell, ResizeHandle, SidebarPanel, etc.)

useMemo()       → for expensive derived values computed from state
                  (sorted rows, summed columns, visible cell count)

useCallback()   → for ALL function props passed to child components
                  (onSelect, onChange, onResize, onMerge, etc.)
                  If a function is defined inside a component and passed as a prop,
                  it MUST be wrapped in useCallback.

useEffect()     → strict discipline:
                  - Every effect must have a complete dependency array
                  - Never use [] (empty deps) unless the effect truly runs once
                  - Never fetch data in useEffect — use event handlers
                  - Every effect that adds an event listener must remove it in cleanup
                  - Avoid effects that just sync state to state — use derived values
```

### Priority Targets for Memoization

```
TableCell        → React.memo (renders for every cell — highest impact)
TableHeaderCell  → React.memo
ResizeHandle     → React.memo
FeatureCard      → React.memo (landing page)
SectionLabel     → React.memo (renders many times in sidebars)

sortRows()       → useMemo([cells, sortKey])
sumColumn()      → useMemo([cells, colIndex])
mergedRanges     → useMemo([cells]) — derived, not stored state

onSelect         → useCallback([dispatch])
onChange         → useCallback([dispatch])
onResize         → useCallback([setColumnWidths])
autoFitColumn    → useCallback([tableRef, setColumnWidths])
exportAs         → useCallback([exportService])  # import from barrel exportService.ts
```

### useEffect Anti-Patterns to Fix

```ts
// ❌ Effect that syncs state to state — remove the effect
useEffect(() => {
  setFilteredRows(sortRows(cells, sortKey));
}, [cells, sortKey]);
// ✅ Replace with useMemo
const filteredRows = useMemo(() => sortRows(cells, sortKey), [cells, sortKey]);

// ❌ Missing cleanup for event listener
useEffect(() => {
  document.addEventListener('keydown', handler);
}, []); // leak!
// ✅ Always clean up
useEffect(() => {
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [handler]);

// ❌ Fetching in useEffect
useEffect(() => { fetchData().then(setData); }, []);
// ✅ Move to event handler or use a library (SWR, TanStack Query) when needed
```

### Profiling Requirement

Before marking performance work done:
1. Open React DevTools Profiler
2. Record a 5-second session of normal table editing
3. Confirm: no component re-renders more than once per user action
4. Confirm: TableCell does not re-render when an unrelated cell is edited

---

## 31. 404 Page SVG Animation

Replace the static 404 page with an animated SVG illustration.

### Concept

A table grid slowly assembles itself — columns slide in from the left,
rows drop in from the top — then one cell shows a "?" and the whole grid
gently pulses. Calm. On-brand. Not distracting.

### Implementation

```tsx
// src/pages/NotFoundPage/NotFoundPage.tsx

export const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-8 px-4">

    {/* Animated SVG */}
    <svg width="240" height="180" viewBox="0 0 240 180"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{`
        .grid-line {
          stroke: #E5E7EB;
          stroke-width: 1.5;
          stroke-linecap: round;
        }
        .col { animation: slideInLeft 0.4s ease-out both; }
        .col:nth-child(2) { animation-delay: 0.1s; }
        .col:nth-child(3) { animation-delay: 0.2s; }
        .row { animation: dropIn 0.4s ease-out both; }
        .row:nth-child(2) { animation-delay: 0.15s; }
        .row:nth-child(3) { animation-delay: 0.25s; }
        .row:nth-child(4) { animation-delay: 0.35s; }
        .question-mark {
          animation: fadeIn 0.3s ease-out 0.6s both, pulse 2s ease-in-out 1s infinite;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .col, .row, .question-mark { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Table outline */}
      <rect x="20" y="20" width="200" height="140" rx="6"
            stroke="#E5E7EB" strokeWidth="1.5" fill="none"/>
      {/* Column lines */}
      <g className="col"><line x1="87" y1="20" x2="87" y2="160" className="grid-line"/></g>
      <g className="col"><line x1="153" y1="20" x2="153" y2="160" className="grid-line"/></g>
      {/* Row lines */}
      <g className="row"><line x1="20" y1="55" x2="220" y2="55" className="grid-line"/></g>
      <g className="row"><line x1="20" y1="90" x2="220" y2="90" className="grid-line"/></g>
      <g className="row"><line x1="20" y1="125" x2="220" y2="125" className="grid-line"/></g>
      {/* Header fill */}
      <rect x="21" y="21" width="198" height="33" rx="4" fill="#EFF6FF" opacity="0.8"/>
      {/* Question mark in center cell */}
      <text x="120" y="115" textAnchor="middle"
            fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700"
            fill="#9CA3AF" className="question-mark">?</text>
    </svg>

    <div className="text-center space-y-3">
      <h1 className="text-2xl font-bold text-text-primary">Page not found.</h1>
      <p className="text-base text-text-secondary max-w-sm">
        That URL does not exist. Let us get you back to building.
      </p>
    </div>
    <Button variant="primary" onClick={() => navigate('/')}>
      Back to Home
    </Button>
  </div>
);
```

---

## 32. Open Source and Sponsor Page

### Route: `/open-source`

### Page Structure

```
HEADING:   Built in the open. Sustained by the community.

BODY:
  Tablesmit is free, open source, and MIT licensed.
  The code is on GitHub — read it, fork it, or build on top of it.

  Open source tools survive because people invest in them.
  If Tablesmit saves you time, consider supporting its development.

SPONSOR SECTION:

  HEADING:   Support this project

  OPTIONS (rendered as clean cards, border border-border rounded-md p-6):

    [GitHub Sponsors]     "Sponsor monthly on GitHub"   → github.com/sponsors/Olayiwola72
    [Buy Me a Coffee]     "One-time contribution"       → buymeacoffee.com/Olayiwola72
    [Open Collective]     "For teams and organizations" → opencollective.com/tablesmit

  Each card: icon + platform name + one-line description + CTA button (secondary)

CONTRIBUTORS SECTION:

  HEADING:   Contributors
  BODY:      "Tablesmit exists because of open source contributors.
              Every bug report, pull request, and suggestion matters."
  CTA:       [View Contributors on GitHub ↗]

CONTRIBUTE SECTION:

  HEADING:   How to contribute
  BODY:      "Read CONTRIBUTION.md in the repository for guidelines on
              reporting bugs, suggesting features, and submitting pull requests."
  CTA:       [Read CONTRIBUTION.md ↗]

FOOTER NOTE (text-xs text-text-muted text-center):
  "MIT licensed. No warranties. Built with care."
```

---

## 33. README.md Specification

The README is the product's front door on GitHub. It must be clear,
minimal, and make someone want to use or contribute within 30 seconds.

```markdown
# Tablesmit

> A minimalist table builder for analytical writing.

Build clean, structured tables with full control over headers, formatting,
and export. No bloat. No account required. Free and open source.

**[→ Open Tablesmit](https://tablesmit.com)**

---

## Features

- Drag-to-resize columns and rows
- Merge and unmerge cells
- Custom header colors and styles
- Word-style border controls
- Column types: Text, Number, Currency, Percentage, Date
- Auto-sum for numeric columns
- Column sorting
- Smart clipboard paste from Excel, Word, or CSV
- Export: PDF, PNG, JPEG, Excel, CSV, LaTeX (.tex)
- Import: CSV, Excel
- Dark mode
- Keyboard navigation

## Getting Started

\`\`\`bash
git clone https://github.com/Olayiwola72/tablesmit.git
cd tablesmit
npm install
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173)

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Vitest

## Configuration

Product decisions — brand name, routes, nav links, export formats, color palettes,
and presets — live in per-domain config files under \`src/config/\`. Each domain owns
its own file; consumers import exactly what they need.

| Domain | File |
|---|---|
| Brand name, tagline, URLs | \`src/config/brand/brandConfig.ts\` |
| Route paths + nav links | \`src/config/routes/routesConfig.ts\` |
| Page copy (hero, about, etc.) | \`src/config/copy/copyConfig.ts\` |
| Export formats | \`src/config/export/exportConfig.ts\` |
| Import limits | \`src/config/import/importConfig.ts\` |

See \`src/config/\` for the complete list. Check there before changing component logic.

---

## Writing a Blog Post

The blog is JSON-driven. Adding a new post requires **one action only:**
create a JSON file in `src/content/blog/`.

No code change. No registry to update. The post appears automatically.

### 1. Create the file

Name the file using the post's target keyword in kebab-case.
The filename becomes the URL slug.

\`\`\`
src/content/blog/how-to-make-a-table-in-markdown.json
\`\`\`

→ Published at: `https://tablesmit.com/blog/how-to-make-a-table-in-markdown`

### 2. Fill in the JSON

\`\`\`json
{
  "title":       "How to Make a Table in Markdown",
  "date":        "2026-04-10",
  "description": "A practical guide to Markdown tables — with examples you can build in Tablesmit and paste anywhere.",
  "author":      "Olayiwola Akinnagbe",
  "tags":        ["markdown", "tutorial", "tables"],
  "readTime":    4,
  "featured":    false,
  "content":     "## Introduction\n\nMarkdown tables look complex but follow a simple pattern..."
}
\`\`\`

### Fields

| Field         | Required | Notes                                          |
|---------------|----------|------------------------------------------------|
| `title`       | Yes      | H1 of the post. Max 60 chars.                  |
| `date`        | Yes      | `YYYY-MM-DD` format.                           |
| `description` | Yes      | Summary shown on cards and in meta. Max 160 chars. |
| `author`      | Yes      | Author display name.                           |
| `tags`        | Yes      | 1–4 tags, lowercase.                           |
| `readTime`    | Yes      | Estimated minutes to read.                     |
| `featured`    | No       | `true` pins post to top. Default: `false`.     |
| `content`     | Yes      | Full post body in Markdown. Use `\n` for newlines. |

### 3. Using the helper script (optional)

Write the post in a `.md` file, then convert it:

\`\`\`bash
npm run new-post my-draft.md
\`\`\`

This creates `src/content/blog/my-draft.json` with the content pre-filled.
Edit the JSON to add `title`, `description`, and `tags`.

### 4. Commit and push

\`\`\`bash
git add src/content/blog/your-post.json
git commit -m "content: add blog post — your post title"
git push
\`\`\`

GitHub Actions will lint, test, build, and deploy to Netlify automatically.
The post is live within minutes of merging.

### Content tips

- Write content as standard Markdown — headings, lists, code blocks, tables all work
- Avoid `# Heading 1` in content — the post title is already the H1
- Start with `## Heading 2` for sections
- Link to `/` at least once per post — internal links improve SEO
- Target one primary keyword per post — use it in the title, description, and naturally in the content
- Update `public/sitemap.xml` after publishing a post

---

## Contributing

See [CONTRIBUTION.md](./CONTRIBUTION.md) for guidelines.

## License

MIT — see [LICENSE](./LICENSE)

---

Built with care. Sponsored by the community.
[Support this project →](https://tablesmit.com/open-source)
```

---

## 34. CONTRIBUTION.md Specification

```markdown
# Contributing to Tablesmit

Thank you for your interest in contributing.
This document explains how to report bugs, suggest features, and submit code.

---

## Before You Start

- Check [existing issues](https://github.com/Olayiwola72/tablesmit/issues)
  to avoid duplicates.
- For large changes, open an issue first to discuss the approach.
- All contributions must follow the engineering principles in `agents.md`.

---

## Reporting Bugs

Use the GitHub issue tracker.
Include:
- Steps to reproduce (be specific)
- Expected behavior
- Actual behavior
- Browser + OS version
- A screenshot or screen recording if relevant

---

## Suggesting Features

Open a GitHub Discussion, not an issue.
Explain:
- What you are trying to do
- Why the current tool does not meet your need
- What the feature would look like from a user's perspective

---

## Submitting a Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Write tests — no PR without tests will be reviewed
5. Run the full suite: `npm run test` — all must pass
6. Run lint: `npm run lint` — zero errors
7. Open a PR against `main` with a clear description

### PR Description Template

\`\`\`
## What does this PR do?
[Short description]

## Why?
[Context / motivation]

## Testing
[What tests were added or changed]

## Screenshots (if UI change)
\`\`\`

---

## Code Standards

- Follow SOLID, DRY, KISS as defined in agents.md
- No `any` types without a comment explaining why
- No hardcoded hex colors — use Tailwind tokens
- No component receives props it does not use
- All new hooks must have test coverage

---

## Commit Message Format

\`\`\`
feat: add column sorting
fix: correct autoFit clamp on empty column
docs: update CONTRIBUTION.md
test: add sortRows edge case for empty cells
refactor: extract borderUtils from TableGrid
\`\`\`

---

## Code of Conduct

Be respectful. Be specific. Be patient.
We are all building something we care about.
```

---

## 35. Em-Dash and Punctuation Rules for UI Copy

### The Rule

Em-dashes (—) are a **writing tool**, not a **UI decoration**.
In product copy they create cognitive load — they interrupt the reading flow
and force the eye to pause at an unexpected beat.

```
Avoid em-dashes in:
   - Button labels
   - Tooltip text
   - Toast messages
   - Error messages
   - Form labels or placeholders
   - Navigation items
   - Feature card headings

Em-dashes are generally acceptable in:
   - Long-form About page body copy (max one per paragraph)
   - README.md or CONTRIBUTION.md documentation
   - This agents.md file (it is a specification document, not UI)
   - Blog post content (where natural for prose)
```

### Replacements

| Instead of                                      | Write                                        |
|-------------------------------------------------|----------------------------------------------|
| "Export — PDF, PNG, JPEG, LaTeX"              | "Export to PDF, PNG, JPEG, or LaTeX"                |
| "Tables, your way — built for writers"          | "Tables, your way. Built for writers."       |
| "Resize columns — like Excel"                   | "Resize columns like Excel."                 |
| "No account — no paywall — no nonsense"         | "No account. No paywall. No nonsense."       |

### Style Note

This is a style guideline, not an enforced rule. Em-dashes in UI copy should be
used thoughtfully — they work well in prose and blog content but can feel formal
in concise UI labels. Use judgement. The project has no lint rule or CI check
for em-dash usage.

---

## 36. AI Features (Scaffolded — No Backend)

AI features are **scaffolded in the UI only** — no backend, no API calls.
The purpose is to validate UX placement before building the actual AI layer.

### Features

```
"Generate table from text"
  → User pastes a paragraph. AI structures it as a table.
  → UI only — a textarea + disabled "Generate" button with "Coming soon" badge

"Summarize this table"
  → AI reads the table and produces a 2-3 sentence plain-English summary.
  → UI only — a "Summarize" button in the toolbar (disabled, "Coming soon")

"Clean messy data"
  → AI normalises inconsistent formatting, trims whitespace, standardises dates.
  → UI only — a "Clean" option in the Import dropdown (disabled, "Coming soon")

"Convert paragraph to structured table"
  → Identical to "Generate from text" but triggered from clipboard paste flow.
  → No UI — purely a future note for the paste handler
```

### Placement

```
Toolbar (right side, before Copy button):
  [AI ✦]  ← ghost button with Sparkles icon, opens a panel

AI Panel (right sidebar bottom section):
  HEADING: AI Features (Beta)
  BADGE:   "Coming soon"
  LIST:    Generate from text · Summarize · Clean data
  NOTE:    "AI features are in development. Join the waitlist."
  CTA:     [Join Waitlist] → opens mailto or external form
```

### Technical Note for When AI Is Implemented

```
Model:      claude-sonnet (Anthropic API) or GPT-4o (OpenAI)
Transport:  HTTPS POST to a serverless function (Vercel/Netlify edge function)
            — never call AI APIs directly from the browser (exposes keys)
Input:      Serialised CellData[][] as JSON
Output:     Structured JSON matching CellData[][] schema
Rate limit: 10 AI requests/user/hour (implemented server-side)
Auth:       Required before AI features are enabled — use GitHub OAuth
```

---



---

## 37. State Management Architecture

### Verdict: No External Library

Do not install Redux, Zustand, Jotai, or any state management library.
React Context + hooks is sufficient for this application's scope and complexity.
The goal is correct architecture, not more dependencies.

### The Problem to Solve

A naive single Context holding all table state causes cascade re-renders:
when one cell value changes, all 1,000 cells re-render because all are consumers
of the same context value. `React.memo` helps only if props references are stable.

### Solution: Three Contexts + Provider

State is split across three isolated contexts. Components subscribe only
to what they need. Unrelated state changes do not trigger re-renders.

```
┌──────────────────────────────────────────────────────────────┐
│  TableCellsContext (src/context/TableDataContext/)            │
│  cells[][] only                                                │
│  Hook: useTableData() → { cells: CellData[][] }               │
│  Changes: when cell content or structure changes              │
│  Consumers: TableCell (via own cellId lookup), ExportPanel    │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  TableSelectionCtx (src/context/TableSelectionContext/)       │
│  selectedRange only (SelectionRange | null)                   │
│  Hook: useSelectedRange() → SelectionRange | null             │
│  Changes: on every mouse move / click                        │
│  Consumers: TableCell (selection highlight only)              │
│  WHY SEPARATE: mouse moves must NOT re-render cell data       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  TableContext (src/context/TableProvider/)                    │
│  Hook: useTableContext() → TableContextValue                  │
│  = TableStateFields & TableActions                            │
│  Provides all non-cell state + dispatch actions:              │
│  rows, cols, columnWidths, rowHeights, mergedRanges,         │
│  headerStyle, headerColor, contentColor, contentBgColor,     │
│  borderStyle, borderColor, theme, rowColors, columnColors,   │
│  columnTextAlign, cellColors, cellTextAlign, freezeRow,      │
│  freezeCol, caption, captionAlignment, captionTextColor,     │
│  captionBgColor + generateTable, updateCell, addRow,         │
│  removeRow, addColumn, removeColumn, insertRowAt,            │
│  deleteRowAt, insertColAt, deleteColAt, mergeSelection,      │
│  unmergeSelection, setHeaderStyle/Color, setContentColor,    │
│  setContentBgColor, setColumnWidth/Height, setColumnFormat,  │
│  setBorderStyle/Color, setRowColor, setColumnColor,          │
│  setCellColor, setColumnTextAlign, setCellTextAlign,         │
│  setFreezeRow/Col, setTheme, applyPreset, selectRange,       │
│  setCaption, setCaptionAlignment, setCaptionTextColor,       │
│  setCaptionBgColor, undo, canUndo, historyDepth              │
│  Changes: when user changes sidebar/toolbar controls         │
│  Consumers: toolbar, sidebar panels, TableHeaderCell,        │
│  TableGrid layout, TableCtxMenu                              │
└──────────────────────────────────────────────────────────────┘
```

### Provider Nesting Order (matters for re-renders)

```
<TableCellsContext.Provider value={{ cells: state.cells }}>
  <TableSelectionCtx.Provider value={state.selectedRange}>
    <TableContext.Provider value={mainValue}>
      {children}
    </TableContext.Provider>
  </TableSelectionCtx.Provider>
</TableCellsContext.Provider>
```

Components consuming `TableContext` will also re-render when cells or
selection change (because they are descendants of both inner providers).
This is acceptable because `useMemo` on `mainValue` prevents re-creating
the context value when only `state.cells` or `state.selectedRange` change.

### Cell Selection — Context Usage

Each `TableCell` pulls only what it needs from each context:

```tsx
// TableCell reads its own cell data from TableCellsContext
const { cells } = useTableData()
const cell = cells[row][col]

// Selection state comes from a separate context — no re-render on data change
const selectedRange = useSelectedRange()
const isSelected = selectedRange && (
  row >= selectedRange.startRow && row <= selectedRange.endRow &&
  col >= selectedRange.startCol && col <= selectedRange.endCol
)
```

This means: typing in `R0C0` re-renders ONLY `R0C0` (via its `React.memo`
check). All other 999 cells stay frozen because `TableCellsContext` value
changes but their individual `memo` comparison on `cellId` prevents update.

### Key Implementation Details

**dispatchWithHistory pattern:**
Every action except `selectRange`, `setCaption`, `setCaptionAlignment`,
`setCaptionTextColor`, and `setCaptionBgColor` is intercepted by
`dispatchWithHistory` which calls `recordSnapshot(stateRef.current)` before
dispatching. This gives undo coverage for structural changes while keeping
high-frequency actions (selection, caption typing) out of the history stack.

**stateRef:**
A `useRef(state)` captures the current reducer state. This is passed to
`recordSnapshot` inside `dispatchWithHistory`'s closure, ensuring the
snapshot always captures the pre-action state even if the reducer is busy.

**Persistence:**
State is saved to `localStorage` with a 400ms debounce after every change.
On first load (per session), old localStorage data is cleared via
`sessionStorage` flag — this prevents stale data from a previous session
from reappearing. Corrupt data silently falls back to `initialState`.

### Context File Structure

```
src/context/
  TableDataContext/       — creates TableCellsContext — cells[][] only
    TableDataContext.tsx
    TableDataContext.types.ts
  TableSelectionContext/  — creates TableSelectionCtx — selectedRange only
    TableSelectionContext.tsx
  TableProvider/          — creates TableContext — all non-cell state + actions
    TableProvider.tsx
    TableProvider.types.ts
  TableReducer/           — pure reducer function + action type union + helpers
    TableReducer.ts
    TableReducer.types.ts
    helpers/
      reducerHelpers.ts
  TableState/             — initialState + persistence keys
    TableState.ts
    TableState.types.ts
  TableContext.tsx         — barrel re-export (no index.ts — imported directly)
```

### Hooks Reference

| Hook | Context consumed | Returns | Purpose |
|---|---|---|---|
| `useTableData()` | `TableCellsContext` | `{ cells: CellData[][] }` | Cell content only |
| `useSelectedRange()` | `TableSelectionCtx` | `SelectionRange \| null` | Selection state |
| `useTableContext()` | `TableContext` | `TableStateFields & TableActions` | Everything else |

All three are re-exported from `src/context/TableContext.tsx`:
```tsx
export { TableProvider, useTableContext, useTableData, useSelectedRange } from './TableProvider/TableProvider'
```

### Upgrade Path (if profiling reveals a genuine bottleneck)

If React DevTools Profiler shows cascade re-renders after the split:
migrate `cells[][]` to **Zustand** only (not the whole state).
Zustand's store allows `useStore(state => state.cells[row][col])` subscriptions
that update only the affected cell. This is a 1-day migration.

Trigger for migration: any cell re-renders more than once per user keystroke
after full memoisation is applied and contexts are split.

Do not migrate preemptively.

### When to Reconsider

```
Consider Zustand if:
  [ ] 50-row × 20-col table lags on input after split + memo
  [ ] React Profiler shows >3 unexpected re-renders per keystroke
  [ ] History (undo) snapshots cause noticeable freeze on large tables

Do NOT add a library because:
  [ ] "It would be cleaner"
  [ ] "Everyone uses it"
  [ ] The architecture feels complex (fix the architecture, not the dependency list)
```

---

## 38. SEO Strategy

### Target: First Page on Google

Your competition (TableConvert, Tables Generator) has weak Core Web Vitals,
thin content, and zero link-building strategy. A fast, open-source tool with a
structured content plan can outrank them within 3 to 6 months.

---

### 38A. Keyword Strategy

#### Primary Keywords (high intent, reachable)
These are what people type when they need exactly what Tablesmit does.

| Keyword                         | Monthly Volume | Difficulty | Priority |
|---------------------------------|---------------|------------|----------|
| web table maker                 | ~2,400        | Low        | P1       |
| online table generator          | ~8,100        | Medium     | P1       |
| table maker free                | ~6,600        | Medium     | P1       |
| table builder online            | ~3,600        | Low        | P1       |
| html table generator            | ~4,400        | Medium     | P2       |
| markdown table generator        | ~2,900        | Low        | P1       |
| csv to table                    | ~1,600        | Low        | P1       |
| copy table from excel to word   | ~1,200        | Low        | P1       |
| table maker export pdf          | ~880          | Low        | P1       |
| table generator for writers     | ~390          | Very Low   | P1       |

#### Long-Tail Keywords (easy wins, high conversion)

```
"free online table maker no signup"        — zero friction, matches product
"table maker export to excel free"         — feature-specific
"copy excel table to web"                  — clipboard paste feature
"merge cells online table"                 — specific feature keyword
"how to make a table in markdown"          — informational, high volume
"best table generator for researchers"     — audience-specific
"tablesmit"                               — brand (own this fast)
"tablesmith online"                        — brand misspelling coverage
"tablesmit table maker"                    — brand + category
```

#### Brand SEO (cover the spelling gap)

```html
<!-- In <head> of every page -->
<meta name="description"
  content="Tablesmit (also searched as Tablesmith) — a free, minimalist
  table maker for writers and analysts. Build clean tables with full control
  over headers, formatting, and export. No signup required.">

<!-- In the About page body copy (natural language): -->
"Tablesmit — sometimes spelled Tablesmith — is a minimalist table builder..."
```

This single technique captures both spellings in Google's index.

---

### 38B. Technical SEO — Implementation

Every item below must be implemented before launch. These are table stakes.

#### `index.html` — Meta Tags

```html
<head>
  <!-- Primary -->
  <title>Tablesmit — Free Online Table Maker for Writers and Analysts</title>
  <meta name="description"
    content="Build clean, structured tables with full control over headers,
    formatting, and export. Free. No signup. Export to PDF, Excel, CSV, or PNG.">
  <link rel="canonical" href="https://tablesmit.com/">

  <!-- Open Graph (Facebook, LinkedIn previews) -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="https://tablesmit.com/">
  <meta property="og:title"       content="Tablesmit — Free Table Maker for Analytical Writing">
  <meta property="og:description" content="Build clean tables with drag-to-resize,
    merge cells, custom headers, and export to PDF, Excel, or CSV. Free and open source.">
  <meta property="og:image"       content="https://tablesmit.com/og-image.png">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="Tablesmit — Free Table Maker">
  <meta name="twitter:description" content="Minimalist table builder for writers
    and analysts. Drag-to-resize, merge cells, export anywhere. Free.">
  <meta name="twitter:image"       content="https://tablesmit.com/og-image.png">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tablesmit",
    "alternateName": "Tablesmith",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web",
    "url": "https://tablesmit.com",
    "description": "A free, minimalist table builder for analytical writing.
      Build clean structured tables with full control over headers, formatting,
      and export. No signup required.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Drag-to-resize columns and rows",
      "Merge and unmerge cells",
      "Custom header styles",
      "Export to PDF, Excel, PNG, CSV",
      "Import from CSV and Excel",
      "Smart clipboard paste from Excel"
    ],
    "screenshot": "https://tablesmit.com/screenshot.png",
    "softwareVersion": "1.0.0",
    "author": {
      "@type": "Organization",
      "name": "Tablesmit"
    }
  }
  </script>
</head>
```

#### OG Image Specification

File: `public/og-image.png` — 1200×630px

```
Content:
  Left 60%: Screenshot of Tablesmit with a clean, populated table
  Right 40%: White background
    - Tablesmit logo (icon + wordmark)
    - Tagline: "Tables, your way."
    - Three feature bullets in text-sm:
        ✓ Free. No signup.
        ✓ Export to PDF, Excel, CSV
        ✓ Open source

Background: white (#FFFFFF)
Font: Inter Bold for headline, Inter Regular for bullets
This image appears in every link preview — it is your first impression.
```

#### `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tablesmit.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/open-source</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://tablesmit.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

#### `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://tablesmit.com/sitemap.xml
```

---

### 38C. Core Web Vitals Targets

Google uses Core Web Vitals as a direct ranking factor. These are non-negotiable.

| Metric                              | Target      | What it measures                      |
|-------------------------------------|-------------|---------------------------------------|
| LCP (Largest Contentful Paint)      | < 2.5s      | How fast the main content loads       |
| INP (Interaction to Next Paint)     | < 200ms     | How fast the app responds to input    |
| CLS (Cumulative Layout Shift)       | < 0.1       | Whether layout jumps during load      |
| FCP (First Contentful Paint)        | < 1.8s      | How fast anything appears             |
| TTFB (Time to First Byte)           | < 600ms     | How fast the server responds          |

#### How to Hit These Targets

```
LCP:
  - Preload hero image/screenshot: <link rel="preload" as="image" href="/screenshot.webp">
  - Convert all images to WebP
  - Self-host fonts via raw `@font-face` in `globals.css` — eliminates CDN round trip
  - Use Vite's manualChunks to keep initial bundle under 150KB gzipped

INP (most critical for a table editor):
  - The rAF resize pattern (already implemented) is critical
  - React.memo on TableCell eliminates cascade re-renders
  - Split contexts (Section 37) prevents selection from re-rendering data
  - useCallback on all handlers — stable references prevent re-renders

CLS:
  - Define explicit width/height on all images and the logo SVG
  - Reserve space for the table grid before it renders (skeleton placeholder)
  - Avoid injecting DOM elements that push layout down

Bundle Size Targets:
  vendor-react:   < 50KB gzipped
  vendor-ui:      < 40KB gzipped
  vendor-export:  < 80KB gzipped (jsPDF + html2canvas are heavy — lazy load them)
  app code:       < 60KB gzipped
  Total initial:  < 150KB gzipped
```

#### Lazy-load export libraries

```ts
// Individual exporter files — defer heavy libraries until first export click
const exportToPDF = async (element: HTMLElement) => {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);
  // ...
};
```

This keeps the initial bundle lean and only loads jsPDF when the user
actually clicks an export button.

---

### 38D. Content Strategy (Ranks You Without Paid Ads)

Content is what gets you to page 1 organically. Tools that publish useful
content rank above tools that don't — even when the tool is worse.

#### Blog Section: `/blog`

Create a `/blog` route. Publish one article per week for the first 3 months.
Each article targets one long-tail keyword.

**Priority articles:**

```
1. "How to make a table in Markdown"
   → Target: "markdown table generator" (2,900/mo)
   → Content: Tutorial + embed Tablesmit for live generation
   → Word count: 800

2. "How to copy a table from Excel to the web"
   → Target: "copy excel table to web" (1,200/mo)
   → Content: Problem statement + Tablesmit clipboard paste walkthrough
   → Word count: 600

3. "5 free online table makers compared"
   → Target: "free table maker online" (6,600/mo)
   → Content: Honest comparison including competitors
   → Note: Tablesmit listed last — let the comparison speak for itself
   → Word count: 1,200

4. "How to export a table to PDF from your browser"
   → Target: "table maker export pdf" (880/mo)
   → Content: Tutorial + Tablesmit PDF export walkthrough
   → Word count: 500

5. "The best table tool for researchers and analysts"
   → Target: "table generator for researchers" (390/mo)
   → Content: Audience-specific pain points + Tablesmit solution
   → Word count: 900

6. "How to merge cells in an online table"
   → Target: "merge cells online table" (specific feature)
   → Content: Short tutorial with Tablesmit embedded
   → Word count: 400
```

**Blog post template rules:**
```
- H1: exact keyword phrase
- First 100 words: answer the question directly (Google reads this for featured snippets)
- One embedded live Tablesmit demo or screenshot per article
- Internal link to /app from every article CTA
- External links to 2-3 credible sources (signals topical authority)
- No keyword stuffing — write for humans, Google follows
- Publish date visible — Google favors fresh content
```

#### Feature Landing Pages

Create individual pages for high-intent feature keywords:

```
/features/excel-export          → "export table to excel online"
/features/pdf-export            → "export table to pdf free"
/features/csv-import            → "csv to table online"
/features/merge-cells           → "merge cells table online"
/features/markdown-table        → "markdown table generator"
/features/column-resize         → "resize table columns online"
```

Each page: 400-600 words explaining the feature, one screenshot, one CTA to /.
These are thin pages that rank for specific queries without competing with your homepage.

---

### 38E. Link Building Strategy

Links from other websites are the single biggest ranking signal.
You need links from credible, relevant sources.

#### High-Priority (do these at launch)

```
1. GitHub Repository
   → Link from README back to tablesmit.com
   → A popular GitHub repo is itself a high-DA link source
   → Star count matters for credibility signals

2. Product Hunt Launch
   → Submit on a Tuesday or Wednesday (highest traffic days)
   → Prepare: 60-word description, 3 screenshots, demo GIF
   → A top-5 product of the day = hundreds of backlinks from coverage
   → Link: producthunt.com → tablesmit.com

3. Hacker News "Show HN"
   → Title: "Show HN: Tablesmit — open source table maker for analytical writing"
   → Post between 9-11am ET on a weekday
   → Link to the app, not the homepage
   → Respond to every comment within the first 2 hours

4. DEV.to / Hashnode article
   → "I built a free open-source table maker — here is what I learned"
   → Honest build log, not a product pitch
   → Link naturally to tablesmit.com in context

5. Reddit
   → r/webdev, r/sideprojects, r/opensource, r/writing, r/analytics
   → Soft launch in relevant threads — answer questions, mention the tool
   → Never post "check out my product" — add value first
```

#### Medium-Priority (weeks 2-8)

```
6. Alternatives.to listing
   → Free submission
   → tablesmit.com listed as alternative to Tables Generator, TableConvert, etc.
   → Users searching competitors find you

7. Open Source directories
   → opensourcealternative.to
   → alternativeto.net
   → toolify.ai
   → free submissions, credible backlinks

8. Twitter/X thread
   → "I built a table tool because I kept hitting walls with existing ones.
      Here is what it does differently: [thread]"
   → Show the product, don't pitch it
   → End with link

9. Reach out to 5 writers/analysts with newsletters
   → "I built this for people like your readers — would you try it?"
   → One genuine newsletter mention = hundreds of targeted visitors
```

---

### 38F. On-Page SEO Rules (Enforced in Code)

These must be implemented in the React app, not added later.

```tsx
// Use react-helmet-async for dynamic meta per page

// URL structure — clean, keyword-rich, no query strings
/                        ✅
/about                   ✅
/open-source             ✅
/blog/markdown-table-generator  ✅
/features/pdf-export     ✅
/?tool=table&v=2         ❌

// Page load speed — the #1 silent ranking factor
// Every page must score 90+ on PageSpeed Insights before deployment
```

---

### 38G. SEO Monitoring

Set these up at launch and check weekly:

```
Google Search Console (free)
  → Submit sitemap.xml
  → Monitor which queries you rank for
  → Track click-through rate per query
  → Watch for crawl errors

Google Analytics 4 (free)
  → Track /app conversions (users who reach the table builder)
  → Track which landing pages drive app opens
  → Set up event: "Table exported" as a conversion

Ahrefs Webmaster Tools (free tier)
  → Monitor backlink acquisition
  → Track keyword position changes weekly

Uptime monitor (UptimeRobot, free)
  → Google deranks sites with downtime history
  → Set up email alert for any downtime > 1 minute
```

---

### 38H. Realistic Timeline

```
Month 1 (launch):
  Week 1:  Technical SEO complete (meta, OG, structured data, sitemap, robots)
  Week 2:  Product Hunt + Hacker News launch
  Week 3:  First 3 blog posts published
  Week 4:  DEV.to article + Reddit soft launch
  Result:  Indexed, brand keywords ranking, early long-tail traction

Month 2-3:
  Weekly blog posts on target keywords
  Alternatives.to + OSS directory listings
  5 long-tail keywords on page 1 or 2
  Result: 200-500 organic visitors/month

Month 3-6:
  Feature pages live
  2-3 newsletter mentions from outreach
  GitHub stars creating organic link signal
  Milestone: 20 stars → submit to Made in Nigeria OSS (see below)
  Result: Primary keywords ("table maker free") reaching page 1-2
  Target: 1,000-3,000 organic visitors/month

Month 6+:
  If Product Hunt or HN launch lands well: spike of 5,000+ visitors,
  dozens of backlinks, domain authority boost that compounds for all keywords.
```

---

### 38I. Made in Nigeria OSS Listing

**Source:** [https://x.com/MadeinNGOSS](https://x.com/MadeinNGOSS)

This is a curated directory of open source projects built by Nigerian developers
for global use. A listing here is a credible backlink, a community signal, and
a statement of identity. Submit when the repo crosses **20 GitHub stars**.

#### Eligibility Checklist (verify before submitting PR)

```
[x] Repo is public on GitHub
[ ] Star count ≥ 20
[x] Tablesmit solves a general problem — not Nigeria-specific ✅
[x] Source code is open source (MIT licensed) ✅
[x] Author is Nigerian ✅
[x] Has a social/personal link outside GitHub (Twitter/X preferred)
[x] Repo has not been archived or deprecated
```

#### How to Submit

```
1. Fork the Made in Nigeria OSS repository
   → github.com/MadeinNGOSS (find the repo from the X account)

2. Open:  data/projects.json

3. Add the entry below anywhere in the array
   (it will be sorted alphabetically on merge — position does not matter)

4. Run:  npm run build
   → Check for errors before opening the PR

5. Open a Pull Request
   → Make the PR description clear and specific (see template below)
   → Remove all console.log statements from any code touched
   → For UI changes: include screenshot or short recording
```

#### Pre-filled JSON Entry (copy exactly — update placeholders only)

```json
{
  "name": "Tablesmit",
  "repoUrl": "https://github.com/Olayiwola72/tablesmit",
  "description": "A minimalist, open source table builder for analytical writing. Build clean structured tables with full control over headers, column types, and formatting. Supports drag-to-resize, merge cells, smart clipboard paste from Excel, and export to PDF, Excel, CSV, and PNG. No signup required.",
  "authors": [
    {
      "name": "@OlayiwolaAkinn1",
      "link": "https://x.com/OlayiwolaAkinn1"
    }
  ]
}
```

**Placeholders to replace:**

| Placeholder              | Replace with                                      |
|--------------------------|---------------------------------------------------|
| `Olayiwola72`     | Your actual GitHub username                       |
| `OlayiwolaAkinn1`    | Your actual Twitter/X handle (preferred over GitHub for author link) |

**Do not change:**
- The `name` field — "Tablesmit" is the brand name, exact spelling
- The `description` — already written to max character guidance and covers key features
- The structure of the JSON — any deviation will fail the automated validator

#### PR Description Template (paste into GitHub PR body)

```markdown
## Adding Tablesmit to Made in Nigeria OSS

**Project:** Tablesmit
**Repo:** https://github.com/Olayiwola72/tablesmit
**Live URL:** https://tablesmit.com

**What it does:**
Tablesmit is a minimalist, open source table builder for analytical writing.
It lets writers, analysts, and researchers build clean structured tables with
full control over headers, column formatting, and export — all in the browser,
no signup required.

**Why it qualifies:**
- Built and maintained by a Nigerian developer
- MIT licensed, fully open source
- Solves a general problem for a global audience (not Nigeria-specific)
- ★ [INSERT STAR COUNT] GitHub stars at time of submission

**Checklist:**
- [x] Entry added to data/projects.json
- [x] npm run build passes with no errors
- [x] No console.log statements
- [x] Social link provided (Twitter/X — outside GitHub)
```

#### After the PR Merges

```
The automated pipeline will:
  1. Validate the entry format
  2. Fetch live GitHub data on the next weekly Monday run:
     - Star count
     - Last push date
     - Primary language (TypeScript)
  3. Regenerate README.MD automatically

Status will be computed automatically:
  Active push in last 6 months → "active"
  No action needed on your part after merge.

Follow @MadeinNGOSS on X for confirmation of listing.
```

#### Why This Matters for SEO

```
Domain authority of the Made in Nigeria OSS site → passes link equity to tablesmit.com
Nigerian developer community → organic shares, stars, word of mouth
Backlink from a curated OSS directory → trusted source in Google's eyes
Story angle: "Nigerian-built open source tool for global writers" →
  press coverage opportunity (TechCabal, Techpoint.Africa, DEV.to Nigeria)
```

---


---

## 39. Privacy Policy and Terms of Use

### Routes
```
/privacy    — Privacy Policy
/terms      — Terms of Use
```

Both pages are required before launch. GA4 analytics, clipboard API access,
and file imports all constitute data handling that requires disclosure.

---

### 39A. Privacy Policy — Full Copy

```
HEADING: Privacy Policy
LAST UPDATED: [Date of first publish]

BODY:

Tablesmit is a browser-based tool. We do not require an account,
and we do not store your table data on any server.

What we collect
  We use Google Analytics 4 (GA4) to understand how people use Tablesmit.
  GA4 collects anonymised usage data including pages visited, time on page,
  and general geographic region (country level). We do not collect names,
  email addresses, or any personally identifiable information.

  We use cookies only to support analytics. No advertising cookies are used.

What we do not collect
  Your table content never leaves your browser.
  We do not transmit, store, or process your table data.
  We do not sell data to third parties.

File imports
  When you import a CSV or Excel file, it is read locally in your browser.
  The file is never uploaded to any server.

Clipboard access
  When you paste content from your clipboard, it is read locally.
  We do not transmit clipboard data.

Third-party services
  Google Analytics 4 — analytics.google.com/about/privacy
  GitHub (for open source contributions) — docs.github.com/en/site-policy

Your rights
  If you are in the EU or UK, you have rights under GDPR/UK GDPR including
  the right to access, correct, or delete data held about you.
  Contact: hello@tablesmit.com

Changes to this policy
  We will update this page when our practices change.
  The "last updated" date at the top reflects the most recent revision.
```

---

### 39B. Terms of Use — Full Copy

```
HEADING: Terms of Use
LAST UPDATED: [Date of first publish]

BODY:

By using Tablesmit you agree to these terms.

The service
  Tablesmit is provided free of charge, as-is, with no guarantees of uptime,
  accuracy, or fitness for any particular purpose.

Your content
  You retain full ownership of any content you create with Tablesmit.
  We claim no rights over your tables, data, or exports.

Open source
  Tablesmit's source code is available under the MIT license.
  You are free to fork, modify, and distribute it under those terms.

Acceptable use
  You may not use Tablesmit to create, store, or distribute content that is
  illegal, harmful, or violates the rights of others.

Limitation of liability
  Tablesmit is provided without warranty. We are not liable for data loss,
  inaccurate exports, or any damage arising from use of the tool.

Contact
  hello@tablesmit.com
```

---

### 39C. Implementation

```tsx
// src/pages/PrivacyPage/PrivacyPage.tsx
// src/pages/TermsPage/TermsPage.tsx

// Both pages: simple prose layout, max-w-narrow mx-auto, py-16 px-4
// No sidebar, no table editor — just clean readable text
// Typography: text-base leading-relaxed text-text-secondary
// Headings: text-xl font-semibold text-text-primary mb-3 mt-8

// Add routes in App.tsx:
<Route path="/privacy" element={<PrivacyPage />} />
<Route path="/terms"   element={<TermsPage />} />

// Footer links already reference /privacy and /terms — no footer change needed
```

---

## 40. Error Boundaries

Every major UI region must be wrapped in an Error Boundary.
A single component crash must never take down the entire application.

### Which regions need boundaries

```
AppErrorBoundary       — wraps the entire app (catches routing-level errors)
TableErrorBoundary     — wraps TableGrid (most complex component, highest risk)
SidebarErrorBoundary   — wraps left and right sidebars
PageErrorBoundary      — wraps each lazy-loaded page inside Suspense
```

### Implementation

```tsx
// src/components/ui/ErrorBoundary/ErrorBoundary.tsx
// React Error Boundaries must be class components — no hook equivalent exists.

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;        // optional custom fallback UI
  onError?: (error: Error, info: ErrorInfo) => void;  // optional error callback
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Forward to error monitoring (Sentry) when integrated
    this.props.onError?.(error, info);
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Default fallback — minimal, calm, on-brand
const DefaultErrorFallback = ({ error }: { error: Error | null }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center gap-4">
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="10" rx="4" fill="#DC2626" opacity="0.15"/>
      <rect x="2" y="15" width="12" height="15" rx="3" fill="#DC2626" opacity="0.1"/>
      <rect x="18" y="15" width="12" height="15" rx="3" fill="#DC2626" opacity="0.06"/>
    </svg>
    <p className="text-base font-semibold text-text-primary">Something went wrong.</p>
    <p className="text-sm text-text-secondary max-w-xs">
      {error?.message ?? 'An unexpected error occurred.'}
    </p>
    <button
      className="text-sm text-primary underline underline-offset-2"
      onClick={() => window.location.reload()}
    >
      Reload the page
    </button>
  </div>
);
```

### Usage in App.tsx

```tsx
// Wrap each major region:
<AppErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={
        <TableErrorBoundary>
          <TableMakerPage />
        </TableErrorBoundary>
      } />
    </Routes>
  </Suspense>
</AppErrorBoundary>
```

### Tests Required

```ts
describe('ErrorBoundary', () => {
  it('renders children when no error occurs')
  it('renders fallback UI when a child throws')
  it('calls onError callback with the error and component stack')
  it('shows the default fallback when no custom fallback is provided')
  it('reload button triggers window.location.reload')
})
```

---

## 41. Toast Notification System

**Library: Sonner**
Install: `npm install sonner`

Sonner is the current standard for Vite + React projects.
Accessible, animated, lightweight (~3KB), zero configuration.

### Setup

The `Toaster` is rendered in `src/main.tsx` (see the Main.tsx Setup section below). It is configured once at the app root.

For reference, the relevant part of `src/main.tsx`:

```tsx
import { Toaster } from 'sonner'
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      icons={{
        success: <CheckCircle2 size={18} className="text-success" />,
        info: <Info size={18} className="text-info" />,
        warning: <AlertTriangle size={18} className="text-amber-500" />,
        error: <XCircle size={18} className="text-danger" />,
      }}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: 'font-sans text-sm',
          success: 'border-l-4 border-success bg-success-light',
          error: 'border-l-4 border-danger bg-danger-light',
          info: 'border-l-4 border-info bg-info-light',
          warning: 'border-l-4 border-[#F59E0B] bg-[#FFFBEB]',
        },
      }}
    />
  </StrictMode>,
)
```

### Usage — standardised toast calls

```ts
// src/utils/toast/toast.ts
// Thin wrapper — ensures consistent messages across the app.
// Import from here, never directly from 'sonner', so messages stay in one place.

import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (msg: string) => sonnerToast.success(msg),
  error:   (msg: string) => sonnerToast.error(msg),
  info:    (msg: string) => sonnerToast.info(msg),
  warning: (msg: string) => sonnerToast.warning(msg),
};

// Export messages as constants — no magic strings in components
export const TOAST = {
  EXPORT_SUCCESS:   (fmt: string) => `Table exported as ${fmt}.`,
  EXPORT_ERROR:     'Export failed. Try reducing the table size.',
  IMPORT_SUCCESS:   (rows: number, cols: number) => `Table imported. ${rows} rows, ${cols} columns.`,
  IMPORT_ERROR:     'Could not read file. Check the format and try again.',
  IMPORT_TOO_LARGE: 'File too large. Maximum size is 5MB.',
  COPY_IMAGE:       'Table copied as image.',
  COPY_DATA:        'Table data copied. Paste into Excel or Google Sheets.',
  PASTE_SUCCESS:    (rows: number, cols: number) => `Table pasted. ${rows} rows, ${cols} columns.`,
  PASTE_ERROR:      'Could not read clipboard. Try importing a file instead.',
  UNDO_EMPTY:       'Nothing left to undo.',
  CELL_CLEARED:     'Table cleared.',
} as const;
```

### Rules
```
- All toasts use the wrapper above — never call sonnerToast directly in components
- Success: 3 seconds (default)
- Error: 5 seconds (user needs more time to read and act)
- No toast for actions the user explicitly triggered with immediate visual feedback
  (e.g. adding a row — the table visually updates, no toast needed)
- Toast copy follows Section 13 (micro-copy rules): confirm the action, not the system state
```

---

## 42. Husky + Lint-Staged

Pre-commit hooks prevent bad code from entering the repo.
Lint errors and failing tests are caught before they become history.

### Installation

```bash
npm install -D husky lint-staged
npx husky init
```

### `.husky/pre-commit`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged
```

### `package.json` additions

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix --max-warnings=0"
    ]
  },
  "scripts": {
    "prepare": "husky"
  }
}
```

### What this enforces on every commit

```
1. ESLint runs on all staged .ts/.tsx files
   → --max-warnings=0 means zero tolerance — warnings are errors
   → --fix auto-corrects fixable issues (imports, formatting)

2. If lint fails: commit is aborted, errors shown in terminal
   → Developer fixes before committing — not after pushing
```

### ESLint Configuration

ESLint uses the `typescript-eslint` flat config format with recommended presets only — no custom rules. The config extends `js.configs.recommended`, `tseslint.configs.recommended`, and `reactHooks.configs.flat.recommended`. `no-console` and `no-debugger` are not set as errors since Vite and dev tooling generate legitimate console output.

---

## 43. Dark Mode

### Design Decisions

```
Toggle location:  Navbar — far right, before any CTA button
Icon:             Sun (light mode active) / Moon (dark mode active) — Lucide icons
Persistence:      localStorage key: "tablesmit-theme"
Default:          System preference via prefers-color-scheme media query
Scope:            class="dark" on <html> element — Tailwind dark mode class strategy
```

### Tailwind Config Update

```ts
// tailwind.config.ts — add darkMode
const config: Config = {
  darkMode: 'class',   // ← add this line
  // ...rest of config
};
```

### Dark Colour Palette

```css
/* src/styles/globals.css — add dark mode overrides */
@layer base {
  .dark {
    --color-background:     #0F172A;   /* page background      */
    --color-surface:        #1E293B;   /* sidebar, toolbar     */
    --color-surface-hover:  #334155;
    --color-border:         #334155;
    --color-border-focus:   #60A5FA;
    --color-text-primary:   #F1F5F9;
    --color-text-secondary: #94A3B8;
    --color-text-muted:     #64748B;
    --color-primary:        #3B82F6;   /* slightly lighter in dark */
    --color-primary-hover:  #60A5FA;
    --color-primary-light:  #1E3A5F;
    --color-accent:         #F59E0B;   /* unchanged — amber works on dark */
    --color-accent-hover:   #D97706;
  }
}
```

### `useTheme` Hook

```ts
// src/hooks/useTheme/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('tablesmit-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('tablesmit-theme', theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    []
  );

  return { theme, toggle };
}
```

### Navbar Toggle Button

```tsx
// In Navbar.tsx
const { theme, toggle } = useTheme();

<IconButton onClick={toggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
</IconButton>
```

### Logo — Dark Mode

The single T-form Logo component (Section 2E) accepts a `theme` prop to
automatically switch between light and dark fill colors — no separate image files.

```tsx
<Logo variant="full" theme={theme} />
```

### Dark Mode Rules

```
- Every new component must be verified in dark mode before marking done
- Never use hardcoded hex colours in JSX — use Tailwind tokens only
- Table cell content: bg-white → dark:bg-surface
- Modals and sheets: bg-white border-border → dark:bg-surface dark:border-border
- Merged cell highlight: bg-primary-light → dark:bg-primary-light (token handles it)
- Export functions (html2canvas): set backgroundColor option to match current theme
```

### Tests Required

```ts
describe('useTheme', () => {
  it('defaults to system preference when no stored value')
  it('defaults to stored value over system preference')
  it('toggle() switches from light to dark')
  it('toggle() switches from dark to light')
  it('persists theme to localStorage on change')
  it('adds .dark class to <html> when theme is dark')
  it('removes .dark class from <html> when theme is light')
})
```

---

## 44. ARIA Grid Pattern (Table Accessibility)

The table editor must implement the WAI-ARIA grid pattern so screen readers
can navigate it correctly. Without this, the table is unstructured noise.

### Required ARIA Roles

```tsx
// TableGrid.tsx — role="grid" on the <table> element
<table
  role="grid"
  aria-label="Table editor"
  aria-rowcount={cells.length}
  aria-colcount={cells[0]?.length ?? 0}
>

// TableHeaderCell — role="columnheader"
<th
  role="columnheader"
  aria-colindex={colIndex + 1}
  scope="col"
>

// Each row — role="row"
<tr role="row" aria-rowindex={rowIndex + 1}>

// Each cell — role="gridcell"
<td
  role="gridcell"
  aria-colindex={colIndex + 1}
  aria-selected={isSelected}
  aria-readonly={isAutoNumber}
  tabIndex={isFocused ? 0 : -1}
>

// Merged cell — add aria-colspan and aria-rowspan
<td
  role="gridcell"
  aria-colspan={colSpan}
  aria-rowspan={rowSpan}
  colSpan={colSpan}
  rowSpan={rowSpan}
>
```

### Keyboard Navigation Inside the Grid

```ts
// Arrow keys must navigate between cells — not scroll the page
// Implement onKeyDown on the grid container:

const handleGridKeyDown = (e: KeyboardEvent) => {
  const moves: Record<string, [number, number]> = {
    ArrowUp:    [-1,  0],
    ArrowDown:  [ 1,  0],
    ArrowLeft:  [ 0, -1],
    ArrowRight: [ 0,  1],
  };

  if (e.key in moves && !e.target.isContentEditable) {
    e.preventDefault();          // prevent page scroll
    const [dr, dc] = moves[e.key];
    moveFocus(activeRow + dr, activeCol + dc);
  }

  // Tab / Shift+Tab — move to next/prev cell (already implemented, verify)
  // Enter — enter edit mode on focused cell
  // Escape — exit edit mode, return focus to cell
};
```

### Screen Reader Announcements

```tsx
// Live region for cell value changes and structural announcements
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {announcement}  {/* "Row added. 6 rows total." / "Cells merged." */}
</div>
```

### Announcement Messages

```ts
// Conceptual — announcements are defined inline in component files
export const ANNOUNCE = {
  ROW_ADDED:     (total: number) => `Row added. ${total} rows total.`,
  ROW_REMOVED:   (total: number) => `Row removed. ${total} rows total.`,
  COL_ADDED:     (total: number) => `Column added. ${total} columns total.`,
  COL_REMOVED:   (total: number) => `Column removed. ${total} columns total.`,
  CELLS_MERGED:  'Cells merged.',
  CELLS_UNMERGED:'Cells unmerged.',
  TABLE_CLEARED: 'Table cleared.',
  SORT_APPLIED:  (col: string, dir: string) => `Column ${col} sorted ${dir}.`,
};
```

---

## 45. Print Styles

Research users and writers print tables. Without print CSS,
the browser prints the full app chrome (navbar, sidebars, toolbar).

### Implementation

```css
/* src/styles/globals.css — add to existing file */

@media print {
  /* Hide everything except the table */
  nav, header, footer,
  [data-toolbar], [data-sidebar-left], [data-sidebar-right],
  .floating-action-buttons, .mobile-sheet-overlay {
    display: none !important;
  }

  /* Table container fills the page */
  [data-table-container] {
    overflow: visible !important;
    width: 100% !important;
    height: auto !important;
  }

  /* Table itself */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11pt;
  }

  /* Preserve cell borders in print. Suppress focus rings. */
  td, th {
    border: 1px solid #E5E7EB !important;
    padding: 6pt 8pt !important;
    box-shadow: none !important;
    outline: none !important;
  }

  /* Header row prints in light grey (saves ink vs full blue) */
  th, [data-header-row] td {
    background-color: #F1F5F9 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Avoid page breaks inside rows */
  tr {
    break-inside: avoid;
  }

  /* Table caption */
  [data-table-caption] {
    font-size: 10pt;
    font-style: italic;
    color: #6B7280;
    margin-bottom: 6pt;
  }

  /* Page setup */
  @page {
    margin: 2cm;
    size: A4 landscape;   /* landscape is better for wide tables */
  }
}
```

### Data Attributes Required

Add `data-*` attributes to layout elements so print CSS can target them
without coupling to Tailwind class names (which may change):

```tsx
<div data-toolbar>          {/* TableToolbar wrapper */}
<aside data-sidebar-left>   {/* Left sidebar */}
<aside data-sidebar-right>  {/* Right sidebar */}
<main data-table-container> {/* Table scroll container */}
<p data-table-caption>      {/* Caption element — Section 48 */}
```

### Ctrl+P Hook — `usePrintTable`

A custom hook intercepts `Ctrl+P` / `Cmd+P` globally to print only the table
content (not the app chrome). It accepts an optional `onBeforePrint` callback
to defocus active UI state (e.g. clear the table cell focus ring) before
cloning the DOM.

```ts
// src/hooks/usePrintTable/usePrintTable.ts
// Intercepts Ctrl+P, creates a hidden <iframe>, clones the table + caption
// into it, copies all CSS rules, and triggers window.print() on the iframe.

export function usePrintTable(tableRef: RefObject<HTMLDivElement>, onBeforePrint?: () => void): void {
  const onBeforePrintRef = useRef(onBeforePrint)
  onBeforePrintRef.current = onBeforePrint

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      const isCtrl = e.ctrlKey || e.metaKey
      if (!isCtrl || e.key !== 'p') return

      const target = e.target as HTMLElement
      if (target.closest('[contenteditable]')) return

      e.preventDefault()

      ;(document.activeElement as HTMLElement | null)?.blur()
      onBeforePrintRef.current?.()

      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.right = '-9999px'
      iframe.style.bottom = '-9999px'
      iframe.style.width = '0'
      iframe.style.height = '0'
      document.body.appendChild(iframe)

      const win = iframe.contentWindow
      if (!win) { document.body.removeChild(iframe); return }

      const caption = document.querySelector<HTMLElement>('[data-table-caption]')
      const container = tableRef.current
      let bodyHTML = ''
      if (caption) {
        const clone = caption.cloneNode(true) as HTMLElement
        clone.querySelectorAll('[data-print-hide]').forEach(el => el.remove())
        sanitizePrintableClone(clone)
        bodyHTML += clone.outerHTML
      }
      if (container) {
        const clone = container.cloneNode(true) as HTMLElement
        clone.querySelectorAll('[data-print-hide]').forEach(el => el.remove())
        sanitizePrintableClone(clone)
        bodyHTML += clone.outerHTML
      }

      const cssRules: string[] = []
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSMediaRule && /print/i.test(rule.media.mediaText)) continue
            cssRules.push(rule.cssText)
          }
        } catch { /* cross-origin sheet — skip */ }
      }

      const printCSS = `@media print {
  @page { margin:2cm; size:A4 landscape; }
  [data-table-container] { display:block !important; }
  table { border-collapse:collapse; margin:0 auto; }
  td, th { print-color-adjust:exact; -webkit-print-color-adjust:exact; position:static !important; box-shadow:none !important; outline:none !important; }
  [data-table-caption] { display:flex; justify-content:center !important; }
  [data-print-hide] { display:none !important; }
}`

      const doc = win.document
      doc.open()
      doc.write(`<!DOCTYPE html>
<html>
<head>
  <style>${cssRules.join('\n')}</style>
  <style>${printCSS}</style>
</head>
<body>${bodyHTML}</body>
</html>`)
      doc.close()

      win.addEventListener('load', () => {
        setTimeout(() => { win.print(); document.body.removeChild(iframe) }, 300)
      })
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [tableRef])
}
```

Behaviour:
- Skips Ctrl+P when focus is inside a `[contenteditable]` cell (user editing)
- Calls `document.activeElement?.blur()` + `onBeforePrint` callback before cloning,
  so React state can defocus UI elements (e.g. selection rings) before the DOM snapshot
- Uses `useRef` for the callback — the effect never re-registers the listener,
  stable even when `onBeforePrint` changes on every render
- Sanitizes cloned DOM: removes scripts, iframes, event handler attributes,
  `contenteditable`, and `spellcheck`
- Copies all CSS rules (skipping `@media print` rules to avoid double-application)
- Injects print-specific CSS: `@page A4 landscape`, `box-shadow:none` / `outline:none`
  on cells (safety net for focus rings), center-aligned table container
- Removes `[data-print-hide]` elements from the output
- Waits 300ms after iframe load before calling `win.print()` to allow style
  application

### Defocus-on-Print Wiring

`TableGrid` exposes a `blurTableRef?: MutableRefObject<(() => void) | null>` prop
in `TableGridProps` (defined in `TableGrid.types.ts`). On mount, `TableGrid` sets
`blurTableRef.current = () => setIsTableFocused(false)`, clearing the focus-ring
class from the table. On unmount, it sets `.current = null`.

`TableMakerContent` creates the ref and wires both ends:

```tsx
const blurTableRef = useRef<(() => void) | null>(null)
usePrintTable(tableRef, () => blurTableRef.current?.())
// ...
<TableGrid tableRef={tableRef} blurTableRef={blurTableRef} ... />
```

This keeps the defocus logic fully internal to the table — no global state or
context changes are needed.

---

## 46. Error Monitoring (Sentry)

**Free tier:** 5,000 errors/month — sufficient for launch and early growth.

### Installation

```bash
npm install @sentry/react
```

### Setup (Deferred — No Eager Import)

Sentry is **never eagerly imported**. It is loaded only when the first error occurs, via a lazy-init module at `src/lib/sentry.ts`:

```ts
// src/lib/sentry.ts
type SentryExports = typeof import('@sentry/react')

let lazySentry: SentryExports | null = null
let initPromise: Promise<void> | null = null

async function ensureLoaded(): Promise<SentryExports | null> {
  if (lazySentry) return lazySentry
  if (initPromise) { await initPromise; return lazySentry }
  if (!import.meta.env.PROD) return null
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined
  if (!dsn) return null
  initPromise = (async () => {
    const Sentry = await import('@sentry/react')
    Sentry.init({
      dsn, environment: 'production', tracesSampleRate: 0.1,
      integrations: [Sentry.browserTracingIntegration()],
      beforeSend(event) { if (event.extra?.cells) delete event.extra.cells; return event },
    })
    lazySentry = Sentry
  })()
  await initPromise; return lazySentry
}

export function captureException(error: Error, context?: Record<string, unknown>): void {
  if (!import.meta.env.PROD) { console.error('[ErrorBoundary]', error, context); return }
  ensureLoaded().then((Sentry) => {
    if (Sentry) Sentry.captureException(error, context ? { contexts: { react: context } } : undefined)
  })
}
```

### Wire to Error Boundary

```tsx
// src/components/ui/ErrorBoundary/ErrorBoundary.tsx
import { captureException } from '../../../lib/sentry'

componentDidCatch(error: Error, info: ErrorInfo) {
  captureException(error, { componentStack: info.componentStack })
  this.props.onError?.(error, info)
}
```

### Privacy Rule (critical)

```
NEVER send table cell content to Sentry.
The beforeSend hook above deletes `cells` from event.extra.
Extend this to scrub any state that may contain user-entered data.
This is a data privacy requirement — not optional.
```

### Environment Variable

```
VITE_SENTRY_DSN=https://[key]@o[org].ingest.sentry.io/[project]
```

Add to `.env.example` (Section 53).

---

## 47. Changelog Page

### Route: `/changelog`

A changelog builds trust. It tells users and contributors the project is alive.
Keep it simple — version number, date, bullet list of changes.

### Format

```tsx
// src/pages/ChangelogPage/ChangelogPage.tsx
// Data-driven: read from a static array, newest first.
// No CMS, no database — just a typed array in src/config/changelog/changelog.ts

export interface ChangelogEntry {
  version: string;       // "1.2.0"
  date:    string;       // "2026-04-01"
  changes: {
    type:        'added' | 'fixed' | 'improved' | 'removed';
    description: string;
  }[];
}
```

### `src/config/changelog/changelog.ts` — starter entries

```ts
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.1.0',
    date:    '2026-[month]-[day]',
    changes: [
      { type: 'added',    description: 'Dark mode with system preference detection' },
      { type: 'added',    description: 'Table caption and title field' },
      { type: 'added',    description: 'Word-style border picker' },
      { type: 'added',    description: 'Right-click context menu on cells and columns' },
      { type: 'added',    description: 'Smart clipboard paste from Excel, Word, and CSV' },
      { type: 'added',    description: 'Copy table as image or Excel data' },
      { type: 'added',    description: 'Auto-sum and auto-numbering column types' },
      { type: 'added',    description: 'AutoFit column width and row height on double-click' },
      { type: 'added',    description: 'Undo stack (Ctrl+Z)' },
      { type: 'improved', description: 'Smooth drag-to-resize using requestAnimationFrame' },
    ],
  },
  {
    version: '1.0.0',
    date:    '2026-[month]-[day]',
    changes: [
      { type: 'added', description: 'Initial release' },
      { type: 'added', description: 'CSV and Excel import and export' },
      { type: 'added', description: 'Merge and unmerge cells' },
      { type: 'added', description: 'Custom header styles and colors' },
      { type: 'added', description: 'Responsive design — works on all screen sizes' },
    ],
  },
];
```

### Visual Style

```
Each version block:
  Version number:  text-lg font-semibold text-text-primary
  Date:            text-sm text-text-muted ml-3
  Change type tag: small pill badge — Added (green) / Fixed (blue) / Improved (amber) / Removed (red)
  Description:     text-sm text-text-secondary

Layout: stacked vertically, newest at top
Separator: border-b border-border between versions
Max width: max-w-narrow mx-auto (readable prose width)
```

---

## 48. Table Caption and Title Field

Your core audience (researchers, analysts, writers) publishes tables in documents
and reports where a caption is expected. No competitor offers this.

### UI

```
Location: above the table, below the toolbar
Component: src/components/features/TableCaption/TableCaption.tsx

Default state:
  A subtle placeholder: "Add a table title or caption (optional)"
  Styled as: text-sm text-text-muted italic
  Click to edit: becomes a plain text input, no border, no box

Active (editing) state:
  Borderless input, font: text-sm font-medium text-text-primary
  Placeholder disappears
  Press Enter or click away to confirm

Rendered (has content):
  text-sm font-medium text-text-primary
  Sits flush above the table — no extra padding

Right-click context menu:
  Opened via onContextMenu handler on all three display states
  Shows: alignment options (Left/Center/Right) · Paste button (reads clipboard
  via navigator.clipboard.readText() and calls onChange + enters edit mode) ·
  text color picker · background color picker
```

### Data Model Addition

```ts
// src/types/table/table-state.types.ts — add to TableState
export interface TableState {
  // ...existing fields
  caption: string;   // "" when empty
}
```

### Export Behaviour

```
PDF export:    Caption renders as italic text above the table
Excel export:  Caption goes in row 1, merged across all columns, italic
PNG export:    Caption renders visually above the table in the canvas
CSV export:    Caption goes in the first row as a comment: # [caption]
               (papaparse handles # as a comment prefix)
Print:         Renders via [data-table-caption] — print CSS already handles it
```

### Tests Required

```ts
describe('TableCaption', () => {
  it('renders placeholder when caption is empty')
  it('enters edit mode on click')
  it('confirms on Enter key')
  it('confirms on blur')
  it('updates TableState.caption via context dispatch')
  it('renders nothing in the DOM when caption is empty and not focused')
  it('shows Paste button in context menu')
  it('calls onChange with clipboard text when paste button is clicked')
})
```

---

## 49. Freeze / Pin First Row and Column

For tables with more than 10 rows, the header scrolls out of view.
This is the single most common complaint about web table editors.

### Behaviour

```
Toggle: "Freeze header row" checkbox in Header Definitions panel (left sidebar)
        "Freeze first column" checkbox in Header Definitions panel

When frozen:
  - First row / first column stays visible during scroll
  - Rest of table scrolls normally beneath / beside it
  - Frozen area has a subtle border-right / border-bottom in primary color
    to indicate the freeze boundary (matches Excel visual convention)

When not frozen (default):
  - Table scrolls normally — no change to current behaviour
```

### Implementation

```tsx
// CSS approach — position: sticky on th/td elements
// This is pure CSS — no JS required for the sticky behaviour itself.

// Freeze header row:
// Apply to all <th> elements in the first row:
<th
  className={cn(
    'bg-surface',   // must have a background — sticky without bg shows content beneath
    freezeRow && 'sticky top-0 z-10'
  )}
>

// Freeze first column:
// Apply to first <td> and <th> of every row:
<td
  className={cn(
    'bg-white dark:bg-surface',
    freezeCol && 'sticky left-0 z-10'
  )}
>

// Both frozen (top-left cell needs highest z-index):
<th
  className={cn(
    'bg-surface',
    freezeRow && freezeCol && colIndex === 0 && 'sticky top-0 left-0 z-20'
  )}
>
```

### Data Model Addition

```ts
// src/types/table/table-state.types.ts — add to TableState
export interface TableState {
  // ...existing fields
  freezeRow: boolean;   // default: false
  freezeCol: boolean;   // default: false
}
```

### Visual Freeze Indicator

```tsx
// Frozen boundary line — right edge of frozen column, bottom edge of frozen row
// Applied via Tailwind:
freezeRow && 'border-b-2 border-primary'   // on frozen <th> row
freezeCol && 'border-r-2 border-primary'   // on frozen first column cells
```

### Tests Required

```ts
describe('freeze pane', () => {
  it('applies sticky top-0 to header row when freezeRow is true')
  it('does not apply sticky when freezeRow is false')
  it('applies sticky left-0 to first column when freezeCol is true')
  it('top-left cell gets z-20 when both freezeRow and freezeCol are true')
  it('toggling freezeRow updates TableState correctly')
})
```

---

## 50. Find and Replace

`Ctrl+F` in most browsers opens the browser's native find bar.
For a table editor, this is useless — it cannot navigate between cells.
Intercept it and provide a table-aware find and replace.

### UI

```
Trigger:     Ctrl+F (find only) or Ctrl+H (find + replace)
Location:    Floating panel — top-right of table area, not a modal
             (user needs to see the table while searching)
Component:   src/components/features/FindReplace/FindReplace.tsx
Dismiss:     Escape key or X button

Find panel layout:
  [Search input         ] [▲ prev] [▽ next] [X]
  "3 of 12 matches"

Replace panel (Ctrl+H):
  [Search input         ]
  [Replace input        ] [Replace] [Replace all]
  "3 of 12 matches"
```

### Behaviour

```
- Search is case-insensitive by default; toggle for case-sensitive
- Matches highlighted: bg-accent-light on matching cells
- Active match: ring-2 ring-accent on the currently focused match
- Replace: updates cell value via updateCell() dispatch
- Replace all: batch-updates all matching cells in one dispatch
- Searching across: cell values only (not column types, header colors, etc.)
```

### Implementation

```ts
// src/hooks/useFindReplace/useFindReplace.ts
export function useFindReplace(cells: CellData[][]) {
  const [query, setQuery]       = useState('');
  const [isOpen, setIsOpen]     = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const found: Array<{ row: number; col: number }> = [];
    cells.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell.value.toLowerCase().includes(q)) found.push({ row: r, col: c });
      })
    );
    return found;
  }, [cells, query]);

  const currentMatch = matches[matchIndex] ?? null;

  const next = useCallback(() =>
    setMatchIndex(i => (i + 1) % matches.length), [matches.length]);

  const prev = useCallback(() =>
    setMatchIndex(i => (i - 1 + matches.length) % matches.length), [matches.length]);

  // Listen for Ctrl+F / Ctrl+H globally
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'h')) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return { query, setQuery, matches, currentMatch, matchIndex, next, prev, isOpen, setIsOpen };
}
```

### Tests Required

```ts
describe('useFindReplace', () => {
  it('finds all cells matching the query (case-insensitive)')
  it('returns empty array when query is empty')
  it('next() advances to the next match, wrapping at end')
  it('prev() goes to previous match, wrapping at start')
  it('match count updates when cells change')
  it('Ctrl+F opens the panel')
  it('Escape closes the panel')
  it('Replace all updates all matching cells in one dispatch')
})
```

---

## 51. Table Themes

A small set of named visual themes applied in one click.
Eliminates the per-cell colour decisions that slow users down.

### Available Themes

```
Default     — white cells, primary blue header, standard border
Minimal     — no header colour, hairline borders, clean for embedding
Dark Header — deep navy header (#1E293B), white text, light grey rows
Striped     — alternating row background (#F9FAFB / white), subtle header
Academic    — grey header, double top border, no inner vertical borders
Monochrome  — greyscale only, no colour accents — for print-first tables
```

### Data Model Addition

```ts
// src/types/table/table-state.types.ts — add to TableState
export type TableTheme =
  | 'default' | 'minimal' | 'dark-header'
  | 'striped' | 'academic' | 'monochrome';

export interface TableState {
  // ...existing fields
  theme: TableTheme;   // default: 'default'
}
```

### Theme Definitions

```ts
// src/config/table/tableThemes.ts
export interface ThemeDefinition {
  id:          TableTheme;
  label:       string;
  headerBg:    string;
  headerText:  string;
  rowBg:       string;
  altRowBg:    string;   // for striped
  borderStyle: string;
  borderColor: string;
}

export const TABLE_THEMES: ThemeDefinition[] = [
  {
    id: 'default', label: 'Default',
    headerBg: '#1E40AF', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#FFFFFF',
    borderStyle: 'solid', borderColor: '#E5E7EB',
  },
  {
    id: 'minimal', label: 'Minimal',
    headerBg: '#FFFFFF', headerText: '#111827',
    rowBg: '#FFFFFF', altRowBg: '#FFFFFF',
    borderStyle: 'solid', borderColor: '#F3F4F6',
  },
  {
    id: 'dark-header', label: 'Dark header',
    headerBg: '#1E293B', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#F9FAFB',
    borderStyle: 'solid', borderColor: '#E5E7EB',
  },
  {
    id: 'striped', label: 'Striped',
    headerBg: '#1E40AF', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#F9FAFB',
    borderStyle: 'solid', borderColor: '#E5E7EB',
  },
  {
    id: 'academic', label: 'Academic',
    headerBg: '#F3F4F6', headerText: '#111827',
    rowBg: '#FFFFFF', altRowBg: '#FFFFFF',
    borderStyle: 'solid', borderColor: '#D1D5DB',
  },
  {
    id: 'monochrome', label: 'Monochrome',
    headerBg: '#374151', headerText: '#FFFFFF',
    rowBg: '#FFFFFF', altRowBg: '#F9FAFB',
    borderStyle: 'solid', borderColor: '#9CA3AF',
  },
];
```

### UI — Theme Picker

```
Location: Templates panel (right sidebar) — below preset templates
Component: src/components/features/ThemePicker/ThemePicker.tsx

Render: 6 small thumbnail cards in a 3×2 grid
Each card: a tiny SVG preview of the theme (3 rows, coloured header)
Selected: ring-2 ring-primary on the card
Click: dispatches SET_THEME action to TableContext
```

### Tests Required

```ts
describe('tableThemes', () => {
  it('applyTheme sets headerBg on all header cells')
  it('applyTheme(striped) alternates row backgrounds correctly')
  it('applyTheme does not affect merged cell content')
  it('theme persists across undo operations')
  it('switching theme is undoable')
})
```

---

## 52. Undo History Indicator

The user cannot currently tell how deep the undo stack is or when it runs out.
A subtle indicator closes this UX gap.

### Implementation

```tsx
// In TableToolbar.tsx — update the Undo button

const { canUndo, historyDepth } = useTableHistory();

<Tooltip content={canUndo ? `Undo (${historyDepth} action${historyDepth === 1 ? '' : 's'})` : 'Nothing to undo'}>
  <IconButton
    aria-label={`Undo. ${historyDepth} actions available.`}
    onClick={undo}
    isDisabled={!canUndo}
  >
    <Undo2 size={16} />
  </IconButton>
</Tooltip>
```

### `useTableHistory` — add `historyDepth`

```ts
// src/hooks/useTableHistory/useTableHistory.ts — add this to the return value
const historyDepth = pointer;   // number of undoable actions available

return { push, undo, canUndo, historyDepth };
```

### Visual Rules

```
canUndo === false:
  Button: opacity-50, cursor-not-allowed
  Tooltip: "Nothing to undo"

canUndo === true:
  Button: fully visible, normal cursor
  Tooltip: "Undo (3 actions)" — count shown only in tooltip, not on button
           Keeps the toolbar clean — count is discoverable on hover, not always visible

At MAX_HISTORY (50):
  No special UI — the oldest entry is silently dropped
  No toast — it would be disruptive during rapid editing
```

### Tests Required

```ts
describe('undo indicator', () => {
  it('historyDepth is 0 at initial state')
  it('historyDepth increments with each push')
  it('historyDepth decrements after undo')
  it('undo button is disabled when canUndo is false')
  it('tooltip shows correct action count')
  it('historyDepth never exceeds MAX_HISTORY')
})
```

---

## 53. Environment Variables (.env.example)

A committed `.env.example` documents every environment variable the project
uses, with placeholder values. It is the contract between the codebase and anyone
who clones it.

### `/.env.example` — committed to the repo

```bash
# Tablesmit — Environment Variables
# Copy this file to .env and fill in the values.
# Never commit .env — it is in .gitignore.

# ─── Analytics ───────────────────────────────────────────
# Google Analytics 4 measurement ID
# Get from: analytics.google.com → Admin → Data Streams
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# ─── Error Monitoring ────────────────────────────────────
# Sentry DSN for error tracking (production only)
# Get from: sentry.io → Project → Settings → Client Keys
VITE_SENTRY_DSN=https://xxxxx@o000000.ingest.sentry.io/0000000

# ─── App ─────────────────────────────────────────────────
# Public URL — used for sitemap and og:url generation
VITE_APP_URL=https://tablesmit.com

# ─── Future: AI Features ─────────────────────────────────
# Uncomment when AI features are implemented (Section 36)
# Never set this in the browser — use a serverless function
# VITE_AI_ENDPOINT=https://your-edge-function.vercel.app/api/ai
```

### `/.gitignore` — verify these lines exist

```
.env
.env.local
.env.*.local
```

### `/.env` — local development (not committed)

```bash
VITE_GA4_MEASUREMENT_ID=   # leave blank in dev — no analytics locally
VITE_SENTRY_DSN=           # leave blank in dev — errors go to console only
VITE_APP_URL=http://localhost:5173
```

### GA4 Integration

```ts
// src/utils/analytics/analytics.ts
const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID || import.meta.env.DEV) return;   // no-op in dev
  window.gtag?.('event', name, params);
}

// Usage throughout the app:
trackEvent('table_exported', { format: 'pdf' });
tackEvent('table_exported', { format: 'latex' });
trackEvent('table_imported', { source: 'csv', rows: 10 });
trackEvent('theme_applied',  { theme: 'striped' });
```

---


---

## 54. GitHub Repository Hygiene

The repo at https://github.com/Olayiwola72/tablesmit is currently missing
description, website URL, and topics. These are indexed by GitHub search,
Google, and OSS directories. Fix them in **Settings → General** on GitHub.

### Required Settings (update immediately)

```
Description:  A minimalist, open source table builder for analytical writing.
              Build clean structured tables with full header control,
              formatting, and export. Free. No signup.

Website:      https://tablesmit.com

Topics (add all of these — one click each):
  table-maker
  table-generator
  open-source
  typescript
  react
  vite
  tailwindcss
  analytical-writing
  csv-export
  excel-export
  made-in-nigeria
```

Topics make the repo discoverable in GitHub search and OSS directories.
"made-in-nigeria" specifically helps with the MadeinNGOSS listing and
community discovery within the Nigerian developer ecosystem.

---

### Social Preview Image

GitHub shows an og-image when the repo is shared on social media.
Go to **Settings → Social preview → Upload an image**.

Use the same `og-image.png` from `public/` (1200×630px).
This ensures consistent branding whether someone shares the website
or the GitHub repo.

---

## 55. Feature Branch Workflow

### Rules

```
- No direct commits to main or master — ever.
- Every change must go through a feature branch + pull request.
- Branch naming: feat/description, fix/description, refactor/description, test/description, docs/description.
- Squash-merge pull requests into main (keeps history clean).
- Delete the feature branch after merge.
```

### Local Protection

A `pre-push` git hook (`.husky/pre-push`) blocks any `git push` that targets
`main` or `master`, regardless of which branch you're on. It checks the
remote ref — so even `git push origin feat/foo:main` is rejected.

The hook is installed automatically when you run `npm install` (via `husky`).
To bypass temporarily: `git push --no-verify origin main`.

### GitHub Branch Protection (Required — Set Up Once)

The local hook is a convenience. The real enforcement is on GitHub.

1. Go to **Settings → Branches → Add branch protection rule**
2. In **Branch name pattern**: enter `main`
3. Enable:
   - ✅ **Require a pull request before merging**
   - ✅ Require approvals (1 is enough)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ **Do not allow bypassing the above settings**
4. Click **Create**

Repeat for `master` if it exists.

Once set: even force-push to main is blocked.

### PR Template

A pull request template exists at `.github/pull_request_template.md`.
Every PR must include:
- What this PR does
- Why (context/motivation)
- What tests were added or changed
- Screenshots if UI change

---

### Config Files — Per-Domain Configuration

The codebase has no single `siteConfig.ts`. Each domain owns its own config file
under `src/config/`. Consumers import directly from the specific module they need.

**Any agent reading this document should check the relevant config file under
`src/config/` before searching for brand references in components.**

| File | Exports | Purpose |
|---|---|---|
| `src/config/brand/brandConfig.ts` | `brand` | Name, tagline, description, URLs, social links |
| `src/config/routes/routesConfig.ts` | `routes`, `nav` | All route paths + nav link definitions |
| `src/config/analytics/analyticsConfig.ts` | `ANALYTICS_CONFIG` | GA4 script ID, env var, commands |
| `src/config/pagination/paginationConfig.ts` | `ITEMS_PER_PAGE` | Pagination page size |
| `src/config/date/dateConfig.ts` | `dateOptions` | `Intl.DateTimeFormatOptions` |
| `src/config/copy/copyConfig.ts` | `copy` | All page copy (hero, about, open source, etc.) |
| `src/config/labels/labelsConfig.ts` | `labels` | UI section labels (namespace, key, label) |
| `src/config/export/exportConfig.ts` | `exportFormats`, `EXPORT_OPTIONS`, `exportFileBaseName` | Supported export formats + options + default filename |
| `src/config/import/importConfig.ts` | `importConfig`, `KB`, `MB` | File size, row/col limits, unit labels |
| `src/config/colors/colorsConfig.ts` | `colorsConfig` | UI color tokens |
| `src/config/columnFormats/columnFormatsConfig.ts` | `columnFormats` | Column format type definitions |
| `src/config/messages/messagesConfig.ts` | `messages` | Constraint/fallback messages |
| `src/config/sponsors/sponsorsConfig.ts` | `SPONSORS` | Sponsor platform links |
| `src/config/sentry/sentryConfig.ts` | `SENTRY_OPTIONS` | Sentry init options |
| `src/config/locale/localeConfig.ts` | `localeConfig` | Copyright date helpers |
| `src/config/table/tableDefaults.ts` | `initialState`, `MAX_ROWS`, etc. | Default table dimensions and limits |
| `src/config/table/tableThemes.ts` | `TABLE_THEMES` | Theme definitions |
| `src/config/table/presets/` | 5 preset modules | Preset table templates |
| `src/config/changelog/changelog.ts` | `CHANGELOG` | Changelog entries |
| `src/config/colorPalette/` | color arrays | Header + content color swatches |
| `src/config/testimonials/testimonials.ts` | `TESTIMONIALS` | Testimonial type + data |

**Rule:** Each consumer imports the exact config it needs. No barrel index file
re-exports everything. This keeps import graphs minimal and prevents unnecessary
rebundling when a single config changes.

---

### GitHub Actions CI/CD — Already Implemented

CI/CD pipeline via GitHub Actions → Netlify is confirmed live.
The `.github/workflows/` directory is present in the repo.

Verify the workflow file does the following on every push to `main`:
```yaml
# .github/workflows/deploy.yml — confirm these steps exist:
steps:
  - name: Install dependencies
    run: npm ci

  - name: Run lint
    run: npm run lint                  # must pass — zero warnings

  - name: Run tests
    run: npm test -- --run             # all tests must pass

  - name: Build
    run: npm run build                 # must succeed

  - name: Deploy to Netlify
    # ... netlify deploy step
```

If lint or tests fail, the deploy must not proceed.
This is the automated quality gate that replaces manual enforcement.

---

### Made in Nigeria OSS — Pre-filled PR (ready when stars ≥ 20)

Current star count: **0** — need 20 before submitting.
The JSON below is ready. Replace nothing — handles are already filled in.

```json
{
  "name": "Tablesmit",
  "repoUrl": "https://github.com/Olayiwola72/tablesmit",
  "description": "A minimalist, open source table builder for analytical writing. Build clean structured tables with full control over headers, column types, and formatting. Supports drag-to-resize, merge cells, smart clipboard paste from Excel, and export to PDF, Excel, CSV, and PNG. No signup required.",
  "authors": [
    {
      "name": "@OlayiwolaAkinn1",
      "link": "https://x.com/OlayiwolaAkinn1"
    }
  ]
}
```

Submit to: https://github.com/MadeinNGOSS (find repo from https://x.com/MadeinNGOSS)
File to edit: `data/projects.json`
Full PR instructions: Section 38I

---


---

## 56. Blog System — TypeScript-Driven

### Design Principle

Creating a new blog post requires exactly one action:
**drop a `.ts` file into `src/content/blog/`.**

No registry to update. No index file to maintain. No code change.
Vite's `import.meta.glob` discovers every file in that directory automatically.
The post appears on the blog list and gets its own URL on the next build.

---

### Directory Structure

```
src/
  content/
    blog/
      best-table-tool-for-researchers.ts
      copy-excel-table-to-web.ts
      free-online-table-makers-compared.ts
      how-to-export-table-to-pdf.ts
      how-to-make-a-table-in-markdown.ts
      how-to-merge-cells-in-online-table.ts
```

The filename (without extension) becomes the URL slug:
`how-to-make-a-table-in-markdown.ts` → `/blog/how-to-make-a-table-in-markdown`

**Filename rules:**
```
- Lowercase only
- Hyphens between words (kebab-case)
- No spaces, underscores, or special characters
- Match the primary keyword for SEO (the URL IS the slug)
- Max 60 characters
```

---

### Post Format (TypeScript module)

Blog posts are `.ts` files that export a typed `BlogPost` object as the default export:

```ts
// src/content/blog/how-to-make-a-table-in-markdown.ts
import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug:        'how-to-make-a-table-in-markdown',   // optional — derived from filename if absent
  title:       'How to Make a Table in Markdown',
  date:        '2026-04-10',
  description: 'A practical guide to creating clean tables in Markdown — with examples you can generate in Tablesmit and paste directly.',
  author:      'Olayiwola Akinnagbe',
  tags:        ['markdown', 'tutorial', 'tables'],
  readTime:    4,
  featured:    false,
  content:     `## Introduction

Markdown tables are simpler than they look...`,
}

export default post
```

**Field reference:**

| Field         | Type       | Required | Notes                                                       |
|---------------|------------|----------|-------------------------------------------------------------|
| `slug`        | string     | No       | URL slug. Auto-derived from filename if omitted.            |
| `title`       | string     | Yes      | H1 of the post and `<title>` tag. Max 60 chars for SEO.    |
| `date`        | string     | Yes      | ISO 8601 format: `YYYY-MM-DD`. Used for sorting and display.|
| `description` | string     | Yes      | Meta description. Max 160 chars. Used for SEO and card text.|
| `author`      | string     | Yes      | Display name. Use "Olayiwola Akinnagbe" for posts by the author. |
| `tags`        | string[]   | Yes      | 1-4 tags. Lowercase. Used for filtering and related posts.  |
| `readTime`    | number     | Yes      | Estimated minutes to read. Rough guide: 200 words/minute.   |
| `featured`    | boolean    | No       | `true` pins the post to the top of the blog list. Default: `false`. |
| `content`     | string     | Yes      | Full post body in Markdown. Use a template literal for readability. |

---

### Content — Markdown in template literals

Content is written as a Markdown string inside the JSON `content` field.

**Supported Markdown:**
```markdown
# Heading 1 (avoid — H1 is the post title)
## Heading 2
### Heading 3

Regular paragraph text.

**Bold**, *italic*, `inline code`

- Bullet list
- Item two

1. Numbered list
2. Item two

[Link text](https://tablesmit.com)

\`\`\`ts
// Code block with syntax highlighting
const table = generateEmptyTable(3, 4);
\`\`\`

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell     | Cell     | Cell     |

> Blockquote for callouts or quotes

---   (horizontal rule / section break)
```

**In JSON, escape newlines as `\n`:**
```json
"content": "## Introduction\n\nThis is a paragraph.\n\n## Next Section\n\nAnother paragraph."
```

**Tip:** Write the Markdown in a separate `.md` file first, then convert newlines.
A helper script in `scripts/` can automate this — see Section 55F.

---

### 55A. Type Definition

```ts
// src/services/blogService/blogService.types.ts

export interface BlogPost {
  slug:        string;       // derived from filename — not in the JSON itself
  title:       string;
  date:        string;       // "YYYY-MM-DD"
  description: string;
  author:      string;
  tags:        string[];
  readTime:    number;
  featured:    boolean;
  content:     string;       // Markdown string
}
```

---

### 55B. Blog Service — Auto-Discovery via import.meta.glob

```ts
// src/services/blogService/blogService.ts
// Discovers and loads all blog posts from src/content/blog/*.ts
// Zero config — adding a .ts file is all that is needed.

import type { BlogPost } from './blogService.types';

// Vite glob import — eager: true loads all modules at build time
const postModules = import.meta.glob<{ default: BlogPost }>(
  '../../content/blog/*.ts',
  { eager: false }
);

let cache: BlogPost[] | null = null;

async function ensureLoaded(): Promise<BlogPost[]> {
  if (cache) return cache;
  const entries = Object.entries(postModules);
  const loaded = await Promise.all(
    entries.map(async ([path, load]) => {
      const slugFromPath = path.split('/').pop()?.replace(/\.(json|ts)$/, '') ?? '';
      const mod = await load();
      const post = mod.default;
      if (typeof post.slug !== 'string' || post.slug === '') {
        post.slug = slugFromPath;
      }
      return post;
    })
  );
  cache = loaded.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return  1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return cache;
}

// All posts — sorted newest first, featured posts at top
export async function getPostsPage(
  page: number,
  perPage: number
): Promise<{ posts: BlogPost[]; total: number }> {
  const all = await ensureLoaded();
  const start = (page - 1) * perPage;
  return {
    posts: all.slice(start, start + perPage),
    total: all.length,
  };
}

// Get a single post by slug
export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const all = await ensureLoaded();
  return all.find(p => p.slug === slug);
}

// Get all unique tags across all posts
export async function getAllTags(): Promise<string[]> {
  const all = await ensureLoaded();
  return [...new Set(all.flatMap(p => p.tags))].sort();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return ensureLoaded();
}
```

---

### 55C. Pages and Components

#### Routes (add to App.tsx)

```tsx
const BlogListPage = lazy(() => import('@/pages/BlogListPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));

<Route path="/blog"        element={<BlogListPage />} />
<Route path="/blog/:slug"  element={<BlogPostPage />} />
```

#### BlogListPage (`src/pages/BlogListPage/BlogListPage.tsx`)

```tsx
import { getAllPosts, getAllTags } from '@/services/blogService';

// Layout:
// - Page heading: "Writing about tables, structure, and analytical thinking."
// - Tag filter bar (optional v1: show all tags as clickable pills)
// - Post cards grid: 1 col mobile, 2 col lg
// - Each card: title, date, description, tags, read time, author

// Post card:
<article className="border border-border rounded-md p-6 hover:border-primary transition-colors duration-150">
  {post.featured && (
    <span className="text-xs font-semibold text-accent uppercase tracking-widest">Featured</span>
  )}
  <time className="text-xs text-text-muted">{formatDate(post.date)}</time>
  <h2 className="text-xl font-semibold text-text-primary mt-2 mb-2">
    <Link to={`/blog/${post.slug}`} className="hover:text-primary">
      {post.title}
    </Link>
  </h2>
  <p className="text-sm text-text-secondary leading-relaxed mb-4">{post.description}</p>
  <div className="flex items-center gap-3 text-xs text-text-muted">
    <span>{post.readTime} min read</span>
    <span>·</span>
    <span>{post.author}</span>
    <span>·</span>
    {post.tags.map(tag => (
      <span key={tag} className="bg-surface px-2 py-0.5 rounded-sm">{tag}</span>
    ))}
  </div>
</article>
```

#### BlogPostPage (`src/pages/BlogPostPage/BlogPostPage.tsx`)

**Note:** `react-markdown` (113 kB / 35 kB gzip) is dynamically imported only when post content renders — it is not in the static route chunk. The page shows the title, date, and meta immediately while a content-area spinner displays until the markdown libraries arrive.

```tsx
import { useState, useEffect, type FC, type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import remarkGfm from 'remark-gfm'
import type { BlogPost } from '@/services/blogService/blogService.types'
import { getPostBySlug } from '@/services/blogService'

type MdComponent = FC<{ remarkPlugins: unknown[]; components: Record<string, unknown>; children: string }>

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)
  const [Md, setMd] = useState<MdComponent | null>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    getPostBySlug(slug).then(result => { if (!cancelled) setPost(result ?? null) })
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    if (!post) return
    let cancelled = false
    import('react-markdown').then(mod => {
      if (cancelled) return
      setMd(() => (mod as { default: MdComponent }).default)
    })
    return () => { cancelled = true }
  }, [post])

  if (post === undefined) return <PanelLoader />
  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <Helmet>
        <title>{post.title} — Tablesmit</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://tablesmit.com/blog/${post.slug}`} />
        <link rel="canonical" href={`https://tablesmit.com/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title, description: post.description,
          datePublished: post.date,
          author: { "@type": "Person", "name": post.author },
          url: `https://tablesmit.com/blog/${post.slug}`,
        })}</script>
      </Helmet>

      <article className="max-w-narrow mx-auto px-4 py-16">
        <Link to="/blog" className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
          &larr; Back to blog
        </Link>
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-4xl font-bold text-text-primary leading-tight mb-4">{post.title}</h1>
          <p className="text-lg text-text-secondary leading-relaxed">{post.description}</p>
          <div className="flex gap-2 mt-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-surface border border-border px-2 py-1 rounded-sm text-text-muted">{tag}</span>
            ))}
          </div>
        </header>
        <hr className="border-border mb-10" />

        <div className="prose prose-slate max-w-none">
          {Md ? (
            <Md remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content}</Md>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
            </div>
          )}
        </div>

        <div className="mt-16 p-6 bg-surface border border-border rounded-md text-center">
          <p className="text-sm text-text-secondary mb-3">Try Tablesmit — free, no signup required.</p>
          <Link to="/" className="text-sm font-semibold text-primary hover:underline">Open Tablesmit</Link>
        </div>
      </article>
    </>
  )
}
```

#### Prose Styles (Tailwind Typography Plugin)

```bash
npm install -D @tailwindcss/typography
```

```ts
// tailwind.config.ts — add to plugins
plugins: [
  require('@tailwindcss/typography'),
],
```

```css
/* The prose class handles all Markdown rendering styles:
   headings, paragraphs, lists, code blocks, blockquotes, tables.
   Use prose-slate for the dark neutral tone that matches the brand. */

/* Override table styles inside prose to match Tablesmit's table aesthetic */
.prose table { @apply border-collapse text-sm; }
.prose th    { @apply bg-primary text-white font-semibold px-3 py-2 text-left; }
.prose td    { @apply border border-border px-3 py-2; }
.prose tr:nth-child(even) td { @apply bg-surface; }
```

---

### 55D. Utility — Date Formatting

```ts
// src/utils/formatDate/formatDate.ts
import i18n from 'i18next'

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(i18n.language, {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  }).format(new Date(iso))
  // "15 September 2025" (English) · "15 septembre 2025" (French)
}
```

The locale-aware implementation uses the current `i18n.language` from react-i18next
so dates render in the user's chosen language.

---

### 55E. Sitemap — Auto-include Blog Posts

```ts
// Update public/sitemap.xml generation to include all blog slugs.
// Since the sitemap is static for this setup, regenerate it when new posts are added.
// A build script can automate this — see 55F.

// Add one <url> block per post:
// <url>
//   <loc>https://tablesmit.com/blog/how-to-make-a-table-in-markdown</loc>
//   <changefreq>monthly</changefreq>
//   <priority>0.8</priority>
//   <lastmod>2026-04-10</lastmod>
// </url>
```

---

### 55F. Helper Script — Markdown to Post

Writing long Markdown in a template literal string is inconvenient.
This script converts a `.md` file into a blog post `.ts` file with the content pre-filled.

```ts
// scripts/md-to-blog-post.ts
// Usage: npx ts-node scripts/md-to-blog-post.ts my-post.md

import fs from 'fs';
import path from 'path';

const mdFile  = process.argv[2];
const content = fs.readFileSync(mdFile, 'utf-8');
const slug    = path.basename(mdFile, '.md');

const ts = `import type { BlogPost } from '../../services/blogService/blogService.types'

const post: BlogPost = {
  slug:        '${slug}',
  title:       'FILL IN',
  date:        '${new Date().toISOString().split('T')[0]}',
  description: 'FILL IN — max 160 chars',
  author:      'Olayiwola Akinnagbe',
  tags:        ['FILL IN'],
  readTime:    ${Math.ceil(content.split(' ').length / 200)},
  featured:    false,
  content:     \`${content.replace(/`/g, '\\`')}\`,
}

export default post
`;

const outPath = `src/content/blog/${slug}.ts`;
fs.writeFileSync(outPath, ts);
console.log(`Created: ${outPath}`);
console.log(`Fill in: title, description, and tags`);
```

Add to package.json:
```json
"scripts": {
  "new-post": "ts-node scripts/md-to-blog-post.ts"
}
```

Usage:
```bash
npm run new-post my-draft.md
# Creates src/content/blog/my-draft.ts
# Edit the .ts file to fill in title, description, and tags
```

---

### 55G. Required Dependencies

```bash
npm install react-markdown remark-gfm react-helmet-async
npm install -D @tailwindcss/typography
```

| Package                    | Purpose                                      |
|----------------------------|----------------------------------------------|
| `react-markdown`           | Renders Markdown `content` string as HTML    |
| `remark-gfm`               | GitHub Flavored Markdown (tables, strikethrough, etc.) |
| `react-helmet-async`       | Per-post `<title>`, meta tags, og tags, JSON-LD |
| `@tailwindcss/typography`  | `prose` class — styles all Markdown output   |

**Also add to `App.tsx` — wrap the router:**
```tsx
import { HelmetProvider } from 'react-helmet-async';
<HelmetProvider>
  <BrowserRouter>
    {/* ...routes */}
  </BrowserRouter>
</HelmetProvider>
```

---

### 55H. Navbar Update

Add Blog to the navigation:

routes: {
  // ...existing
  blog:     '/blog',
}

```

---

### 55I. Tests Required

```ts
// src/services/blogService.test.ts
describe('blogService', () => {
  it('loads all JSON files from src/content/blog/')
  it('derives slug from filename correctly')
  it('sorts posts newest first by default')
  it('puts featured posts before non-featured posts')
  it('getPostBySlug returns correct post for valid slug')
  it('getPostBySlug returns undefined for unknown slug')
  it('getAllTags returns unique sorted tags across all posts')
  it('parsePost handles missing optional fields gracefully')
  it('readTime defaults to 1 when field is missing')
})

// src/pages/BlogListPage/BlogListPage.test.tsx
describe('BlogListPage', () => {
  it('renders a card for every blog post')
  it('shows featured badge on featured posts')
  it('links each card to the correct /blog/:slug route')
  it('displays date, read time, author, and tags on each card')
})

// src/pages/BlogPostPage/BlogPostPage.test.tsx
describe('BlogPostPage', () => {
  it('renders the post title as H1')
  it('renders the post content as Markdown')
  it('redirects to /blog for unknown slugs')
  it('sets correct <title> via Helmet')
  it('renders JSON-LD structured data with correct fields')
  it('shows tags as pill badges')
  it('includes CTA link to /app at the bottom')
})
```

---

### 55J. Implementation

Blog system setup, tests, and routing all live and verified. Dependencies installed: `remark-gfm`, `react-helmet-async`, `@tailwindcss/typography`. `blogService.ts` with `import.meta.glob` auto-discovery. `BlogListPage` and `BlogPostPage` lazy-loaded. `react-markdown` (113 kB / 35 kB gzip) dynamically imported inside `BlogPostPage` — not in the static route chunk. Blog route in `nav` config (`src/config/routes/routesConfig.ts`). `scripts/md-to-blog-post.ts` helper and `npm run new-post` script. 36 blog posts live. Sitemap and README updated.

---

## 57. Testimonials Page

### Route: `/testimonials`

A simple JSON-driven testimonials page that renders user quotes in a card grid.
When the testimonials array is empty, it shows a "No testimonials yet" empty state
with a link to the contact page.

### Data Source

```ts
// src/config/testimonials/testimonials.ts
export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  quote: string
  source?: string
  sourceUrl?: string
}

export const TESTIMONIALS: Testimonial[] = []  // empty until collected
```

### Implementation

The page (`src/pages/TestimonialsPage/TestimonialsPage.tsx`) reads `TESTIMONIALS` from
the config and renders either:
- An empty state with a dashed border box, "No testimonials yet" heading, and links
  to the contact page and the brand's Twitter/X account
- A 1/2/3-column responsive grid of testimonial cards (each with quote, name,
  role, initials avatar, and optional source link)

### Integration

- Route: `/testimonials` → lazy-loaded via `React.lazy()` in `App.tsx`
- Nav link: "Testimonials" after "Changelog" in `src/config/routes/routesConfig.ts`
- Footer link: "Testimonials" after "Contact" in the Company links section
- Route referenced as `routes.testimonials` from `src/config/routes/routesConfig.ts` — no hardcoded hrefs

### Tests

Seven tests in `src/test/pages/TestimonialsPage/TestimonialsPage.test.tsx`:
```
- Renders the page heading
- Shows empty state when no testimonials exist
- Links to the contact page from empty state
- Renders testimonial cards when data exists (via vi.spyOn mock)
- Shows initials fallback for avatar
- Renders source link when provided
- Does not render source link when source is absent
```

### Implementation

Testimonials page live at `/testimonials` with empty state (dashed border box, "No testimonials yet" heading, contact + X links). `TESTIMONIALS` array in `src/config/testimonials/` accepts `{id, name, role, avatar, quote, source?, sourceUrl?}` objects. Page renders responsive 1/2/3-column card grid when populated. Seven tests cover empty state and card rendering.

---

## Internationalization (i18n)

### Libraries

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### Architecture Overview

The i18n system uses a **12-namespace parallel-fetch** architecture:

- **12 namespaces** (`common`, `home`, `about`, `openSource`, `blog`, `contact`, `legal`, `table`, `features`, `testimonials`, `changelog`, `notFound`) split by UI domain
- **English is bundled at build time** — 12 separate JSON files in `src/i18n/locales/en/` are `import`ed directly as JS modules, registered statically. Zero network requests for English users.
- **Non-English locales are fetched lazily** from `public/locales/{lng}/{ns}.json` — all 12 namespaces for the detected language are fetched in parallel on first init. Switching languages triggers a fresh parallel fetch for that locale.
- **Manual `fetch()` + `addResourceBundle()`** instead of `i18next-http-backend` — avoids the extra dependency and allows bundling English at build time.
- **`loadNamespace()`** exists for individual namespace loading when a component needs a single namespace on demand.
- **`loadedNamespaces` Set** tracks which `{lng}:{ns}` pairs have been fetched to avoid duplicate network requests.
- **`react: { nsMode: 'fallback' }`** — when a key is missing in the active namespace, i18next falls back through namespaces before falling back to the fallback language.
- **`defaultVariables: { name: brand.name }`** exposes the brand name as `{{name}}` in all interpolation calls.

### Supported Languages

| Code | Display name | Direction |
|------|-------------|-----------|
| `en` | English     | LTR       |
| `ar` | Arabic      | RTL       |
| `fr` | Français    | LTR       |
| `es` | Español     | LTR       |
| `pt` | Português   | LTR       |
| `ja` | Japanese    | LTR       |
| `de` | Deutsch     | LTR       |
| `no` | Norsk       | LTR       |

### File Structure

```
/public
  /locales
    /ar/       ← 12 JSON files per locale (common.json, home.json, etc.)
    /de/
    /es/
    /fr/
    /ja/
    /no/
    /pt/
    (English is never fetched — bundled at build time)

/src
  /config
    /locale
      localesConfig.ts       ← LOCALES array + i18nConfig (localeBasePath, storageKey, etc.)
      localesConfig.types.ts ← LocaleConfig interface
  /i18n
    i18n.ts                  ← i18next init, loadLocale(), loadNamespace(), NS[], Namespace type
    types.d.ts               ← TypeScript augmentation for type-safe t()
    locales/
      en/                    ← 12 JSON namespace files, imported as JS modules
        common.json
        home.json
        about.json
        openSource.json
        blog.json
        contact.json
        legal.json
        table.json
        features.json
        testimonials.json
        changelog.json
        notFound.json
```

### Why This Architecture

```
✅ 12 namespaces = smaller per-file bundles, parallel fetch
   Each namespace is fetched independently and in parallel. A user who
   visits only the home page never fetches the blog or changelog namespace.

✅ Manual fetch (no i18next-http-backend)
   English is bundled directly into the JS build — zero network overhead
   for English users. Non-English locales are fetched lazily.

✅ Parallel fetch on init
   All 12 namespaces for the detected language are fetched at once via
   Promise.all(). Then only individually loaded namespaces (via
   loadNamespace()) are fetched on demand after init.

✅ Type safety — 12 typed namespaces
   types.d.ts maps every namespace to its English JSON type. Mistyped
   keys are caught at compile time. t('common:some.key') is checked
   against common.json; t('blog:some.key') against blog.json.

✅ loadedNamespaces Set guards against re-fetching
   Each {lng}:{ns} pair is tracked. hasResourceBundle() is checked for
   statically-bundled English, loadedNamespaces for previously-fetched
   non-English namespaces.

✅ nsMode: 'fallback'
   Components can call t('common:key') or just t('key') with common as
   defaultNS. If a key is missing in the active namespace, i18next
   falls back through other namespaces, then to the fallback language.

✅ {{name}} interpolation variable
   brand.name ("Tablesmit") is available as {{name}} in all
   translations without passing it explicitly every time.
```

### `src/config/locale/localesConfig.ts`

The locale configuration lives in `src/config/locale/localesConfig.ts` — not in `src/i18n/`. The `i18nConfig` object controls base path, file extension, storage key, and fallback language. The `LOCALES` array defines all supported languages.

```ts
// src/config/locale/localesConfig.ts
import type { LocaleConfig } from './localesConfig.types'

export const i18nConfig = {
  fallbackLng: 'en' as const,
  storageKey: 'tablesmit-locale' as const,
  localeBasePath: '/locales',
  fileExtension: '.json' as const,
} as const

export const LOCALES: LocaleConfig[] = [
  { code: 'en', name: 'English',   dir: 'ltr' },
  { code: 'ar', name: 'العربية',   dir: 'rtl' },
  { code: 'fr', name: 'Français',  dir: 'ltr' },
  { code: 'es', name: 'Español',   dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'ja', name: '日本語',    dir: 'ltr' },
  { code: 'de', name: 'Deutsch',   dir: 'ltr' },
  { code: 'no', name: 'Norsk',     dir: 'ltr' },
]
```

### `/src/i18n/i18n.ts`

```ts
import i18n from 'i18next'
import { initReactI18next, setDefaults } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { brand } from '../config/brand/brandConfig'
import { LOCALES, i18nConfig } from '../config/locale/localesConfig'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enAbout from './locales/en/about.json'
import enOpenSource from './locales/en/openSource.json'
import enBlog from './locales/en/blog.json'
import enContact from './locales/en/contact.json'
import enLegal from './locales/en/legal.json'
import enTable from './locales/en/table.json'
import enFeatures from './locales/en/features.json'
import enTestimonials from './locales/en/testimonials.json'
import enChangelog from './locales/en/changelog.json'
import enNotFound from './locales/en/notFound.json'

setDefaults({ useSuspense: false })

export const NS = [
  'common', 'home', 'about', 'openSource', 'blog', 'contact',
  'legal', 'table', 'features', 'testimonials', 'changelog', 'notFound',
] as const

export type Namespace = (typeof NS)[number]

const loadedNamespaces = new Set<string>()

async function fetchLocale(lng: string, ns: string): Promise<Record<string, unknown> | null> {
  const url = `${i18nConfig.localeBasePath}/${lng}/${ns}${i18nConfig.fileExtension}`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      if (import.meta.env.DEV) {
        console.error(`[${brand.name}] load error ${lng}/${ns}: ${res.status}`)
      }
      return null
    }
    return (await res.json()) as Record<string, unknown>
  } catch (err) {
    if (import.meta.env.DEV) {
        console.error(`[${brand.name}] load error ${lng}/${ns}:`, err)
    }
    return null
  }
}

export async function loadNamespace(lng: string, ns: string): Promise<void> {
  if (lng === 'en') return
  const key = `${lng}:${ns}`
  if (loadedNamespaces.has(key)) return
  if (i18n.hasResourceBundle(lng, ns)) {
    loadedNamespaces.add(key)
    return
  }
  const data = await fetchLocale(lng, ns)
  if (data) {
    i18n.addResourceBundle(lng, ns, data, true, true)
    loadedNamespaces.add(key)
  }
}

export async function loadLocale(lng: string): Promise<void> {
  if (lng === 'en') return
  const toFetch = NS.filter((ns) => !i18n.hasResourceBundle(lng, ns))
  if (toFetch.length === 0) return
  const results = await Promise.all(
    toFetch.map((ns) => fetchLocale(lng, ns).then((data) => ({ ns, data }))),
  )
  for (const { ns, data } of results) {
    if (data) {
      i18n.addResourceBundle(lng, ns, data, true, true)
      loadedNamespaces.add(`${lng}:${ns}`)
    }
  }
}

const enResources: Record<string, Record<string, unknown>> = {
  common: enCommon as Record<string, unknown>,
  home: enHome as Record<string, unknown>,
  about: enAbout as Record<string, unknown>,
  openSource: enOpenSource as Record<string, unknown>,
  blog: enBlog as Record<string, unknown>,
  contact: enContact as Record<string, unknown>,
  legal: enLegal as Record<string, unknown>,
  table: enTable as Record<string, unknown>,
  features: enFeatures as Record<string, unknown>,
  testimonials: enTestimonials as Record<string, unknown>,
  changelog: enChangelog as Record<string, unknown>,
  notFound: enNotFound as Record<string, unknown>,
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: i18nConfig.fallbackLng,
      supportedLngs: LOCALES.map((l) => l.code),
      ns: ['common'],
      defaultNS: 'common',
      react: { nsMode: 'fallback' },
      resources: { en: enResources },
      interpolation: {
        defaultVariables: { name: brand.name },
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: i18nConfig.storageKey,
      },
    })
    .then(() => {
      const currentLang = i18n.language?.split('-')[0] ?? i18nConfig.fallbackLng
      loadLocale(currentLang)
    })
}

i18n.on('languageChanged', (lng) => {
  const locale = LOCALES.find((l) => l.code === lng)
  if (locale) {
    document.documentElement.dir = locale.dir
    document.documentElement.lang = lng
  }
  loadLocale(lng)
})

export default i18n
```

### `/src/i18n/types.d.ts` — TypeSafe translations

All 12 namespaces are typed from their English JSON source files. Every call to `t('ns:key')` is checked at compile time.

```ts
import 'react-i18next'
import type enCommon from './locales/en/common.json'
import type enHome from './locales/en/home.json'
import type enAbout from './locales/en/about.json'
import type enOpenSource from './locales/en/openSource.json'
import type enBlog from './locales/en/blog.json'
import type enContact from './locales/en/contact.json'
import type enLegal from './locales/en/legal.json'
import type enTable from './locales/en/table.json'
import type enFeatures from './locales/en/features.json'
import type enTestimonials from './locales/en/testimonials.json'
import type enChangelog from './locales/en/changelog.json'
import type enNotFound from './locales/en/notFound.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof enCommon
      home: typeof enAbout
      about: typeof enAbout
      openSource: typeof enOpenSource
      blog: typeof enBlog
      contact: typeof enContact
      legal: typeof enLegal
      table: typeof enTable
      features: typeof enFeatures
      testimonials: typeof enTestimonials
      changelog: typeof enChangelog
      notFound: typeof enNotFound
    }
  }
}
```

### Locale Namespace Files

English is the source of truth — 12 files in `src/i18n/locales/en/`. Non-English locale files in `public/locales/{lng}/` follow the same 12-file structure. Missing keys in any namespace fall back to English automatically (`fallbackLng: 'en'`).

**Namespace reference:**

| Namespace    | File                       | Contents                                      |
|--------------|----------------------------|-----------------------------------------------|
| `common`     | `en/common.json`           | Brand, nav, hero, footer, toolbar, table grid, panels, context menu, themes, presets, shortcuts, error messages, toast, meta, aria labels, cookie consent, pagination, changelog description |
| `home`       | `en/home.json`             | Home/landing page copy                        |
| `about`      | `en/about.json`            | About page copy                               |
| `openSource` | `en/openSource.json`       | Open Source page copy                         |
| `blog`       | `en/blog.json`             | Blog listing + post page copy                 |
| `contact`    | `en/contact.json`          | Contact page copy                             |
| `legal`      | `en/legal.json`            | Privacy Policy + Terms of Use copy            |
| `table`      | `en/table.json`            | Table-specific UI strings                     |
| `features`   | `en/features.json`         | Features list + detail page copy              |
| `testimonials` | `en/testimonials.json`   | Testimonials page copy                        |
| `changelog`  | `en/changelog.json`        | Changelog page copy                           |
| `notFound`   | `en/notFound.json`         | 404 page copy                                 |

**Key rules for all locale JSON files:**
- `brand.name` is always `"Tablesmit"` in every language — never translate the brand name
- Interpolation variables (`{{format}}`, `{{rows}}`, `{{name}}`) must be preserved exactly — only the surrounding text is translated
- Keys within each namespace must match the English source exactly — no extra keys, no missing keys
- `{{name}}` is a globally available interpolation variable (via `defaultVariables` in i18n init) that resolves to the brand name

### Usage in Components

Import `useTranslation` from `react-i18next`. Specify the namespace as the first argument:

```tsx
import { useTranslation } from 'react-i18next'

const MyComponent: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <button aria-label={t('aria.mergeButton')}>
      {t('toolbar.merge')}
    </button>
  )
}
```

To access a different namespace:

```tsx
const { t } = useTranslation('blog')
// or multiple:
const { t } = useTranslation(['common', 'blog'])
```

For toast messages with interpolation:

```ts
import { useTranslation } from 'react-i18next'
const { t } = useTranslation('common')
toast.success(t('toast.exportSuccess', { format: 'PDF' }))
// → "Table exported as PDF."
```

The `{{name}}` variable is available globally without passing it:

```ts
t('brand.tagline')  // resolves to "Tables, your way." — {{name}} is auto-injected
```

### RTL Support (Arabic)

RTL handling is built into `src/i18n/i18n.ts` — the `languageChanged` listener sets `document.documentElement.dir` and `lang` automatically. No changes needed in App.tsx.

### Language Picker (Navbar)

```tsx
import { Check, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LOCALES } from '../config/locale/localesConfig'
import { loadLocale } from '../i18n/i18n'
import { Button } from '../Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu/DropdownMenu'

export function LanguagePicker({ align = 'end', onSelect }: LanguagePickerProps) {
  const { t, i18n } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={t('aria.languageSelect')}>
          <Globe size={16} />
          {LOCALES.find((l) => l.code === i18n.language)?.name ?? i18n.language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={async () => {
              if (locale.code !== i18n.language) {
                await loadLocale(locale.code)
                i18n.changeLanguage(locale.code)
              }
              onSelect?.()
            }}
          >
            {locale.name}
            {i18n.language === locale.code && <Check size={14} className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Adding a New Language

```
1. Create /public/locales/{code}/ directory
   Create 12 JSON files matching the namespace structure:
     common.json, home.json, about.json, openSource.json, blog.json,
     contact.json, legal.json, table.json, features.json, testimonials.json,
     changelog.json, notFound.json
   Copy from src/i18n/locales/en/ — translate every value, preserve all keys
   and interpolation variables exactly.

2. Add a LocaleConfig entry to LOCALES in src/config/locale/localesConfig.ts
   (supportedLngs in i18n.ts is derived automatically from LOCALES.map(l => l.code))

3. The language picker renders it automatically on next build.
   No component changes required.
```

### What Is Translated

```
Pages:     Home, About, Open Source, Contact, 404, Testimonials, Blog list + posts
UI:        Navbar, Footer, all sidebar panels, toolbar buttons and tooltips
Table:     Context menu, column type labels, theme names, preset labels
Messages:  All toast messages, error states, empty states, aria-labels
Meta:      Page titles and meta descriptions per language
```

### What Is Never Translated

```
- Brand name: "Tablesmit" — always the same in every language
- Export format names: "PDF", "PNG", "JPEG", "Excel", "CSV", "LaTeX"
- Code, technical identifiers, URLs
- Blog post content (posts are authored in English only — translation optional in future)
```

### Main.tsx Setup

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react'
import './index.scss'
import './i18n/i18n'
import App from './App.tsx'
import { registerPWA } from './pwa.ts'

registerPWA()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      icons={{
        success: <CheckCircle2 size={18} className="text-success" />,
        info: <Info size={18} className="text-info" />,
        warning: <AlertTriangle size={18} className="text-amber-500" />,
        error: <XCircle size={18} className="text-danger" />,
      }}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: 'font-sans text-sm',
          success: 'border-l-4 border-success bg-success-light',
          error: 'border-l-4 border-danger bg-danger-light',
          info: 'border-l-4 border-info bg-info-light',
          warning: 'border-l-4 border-[#F59E0B] bg-[#FFFBEB]',
        },
      }}
    />
  </StrictMode>,
)
```

No `Suspense` wrapper at root level — the manual fetch pattern handles loading
asynchronously (via `useSuspense: false`). The English locale is always available
on first render (zero network requests).

---

---

### Growth & Community

**Live:** Tablesmit is live at tablesmit.com, indexed in Google Search Console, and tracked via GA4 (consent-gated) and Sentry (lazy-loaded, production-only).

**Content:** 36 blog posts and 30 feature landing pages published. Sitemap updated with all URLs.

```
CONTENT — must ship before any promotion:
[x] Blog posts — 36 posts committed to src/content/blog/ (see Section 58 for slugs and specs)
[x] Feature landing pages — system built + 30 JSON files live (Section 59)
[x] Google Search Console — verified, sitemap submitted, homepage indexed (Section 38G)
[x] Netlify env vars — VITE_GA4_MEASUREMENT_ID and VITE_SENTRY_DSN set in dashboard (Section 53)
```

**Testimonials:** Empty — not yet collected. The page at `/testimonials` renders an empty state with a CTA to share feedback. 3+ real quotes needed before including in promotional materials.

**Made in Nigeria OSS:** Pre-qualified (MIT license, Nigerian author, general-purpose tool). Submission requires 20 GitHub stars (currently 0). Entry JSON prepared.

**Product Hunt & Hacker News:** Launch assets not yet prepared. Require: demo GIF, 3 screenshots (1270×760), 60-word description.

---

---

## 58. Blog Posts — Content Specification

36 posts live in `src/content/blog/`. All follow the TypeScript `BlogPost` format described in Section 56.

### All Posts (newest first)

| Date | Slug | Featured |
|---|---|---|
| 2026-06-02 | `how-to-export-colored-tables-to-latex` | |
| 2026-06-02 | `how-to-edit-latex-tables-online` | |
| 2026-06-01 | `how-to-add-table-borders-online` | |
| 2026-05-31 | `how-to-use-right-click-table-editor` | |
| 2026-05-30 | `how-to-customize-table-headers-online` | |
| 2026-05-29 | `how-to-import-excel-files-online-table` | |
| 2026-05-28 | `how-to-add-caption-to-table` | |
| 2026-05-27 | `how-to-apply-table-themes` | |
| 2026-05-26 | `how-to-undo-table-editing-online` | |
| 2026-05-25 | `how-to-auto-sum-columns-table` | |
| 2026-05-24 | `how-to-resize-table-columns-rows` | |
| 2026-05-23 | `how-to-export-table-as-image` | |
| 2026-05-23 | `how-to-make-a-pricing-table` | |
| 2026-05-22 | `table-column-formatting-guide` | |
| 2026-05-22 | `table-builder-keyboard-shortcuts-guide` | ✅ |
| 2026-05-21 | `offline-table-builder` | |
| 2026-05-21 | `ai-table-generator-features` | |
| 2026-05-20 | `markdown-table-generator-online` | |
| 2026-05-15 | `how-to-merge-cells-in-online-table` | |
| 2026-05-14 | `best-table-tool-for-researchers` | ✅ |
| 2026-05-11 | `how-to-freeze-header-row-in-table` | |
| 2026-05-06 | `how-to-make-a-comparison-table` | |
| 2026-05-05 | `free-online-table-makers-compared` | |
| 2026-04-30 | `how-to-use-dark-mode-in-table-builder` | |
| 2026-04-29 | `how-to-export-table-to-latex` | |
| 2026-04-24 | `how-to-sort-table-columns` | |
| 2026-04-22 | `how-to-make-a-schedule-table` | |
| 2026-04-19 | `how-to-export-table-to-pdf` | |
| 2026-04-18 | `how-to-find-and-replace-in-table` | |
| 2026-04-13 | `how-to-import-csv-into-online-table` | |
| 2026-04-10 | `how-to-make-a-table-in-markdown` | |
| 2026-04-08 | `how-to-copy-table-as-image` | |
| 2026-04-05 | `how-to-create-tables-for-academic-papers` | |
| 2026-04-01 | `copy-excel-table-to-web` | |
| 2026-03-30 | `how-to-use-table-templates` | |
| 2026-03-27 | `web-table-accessibility-guide` | |

### Content rules

```
- File is a .ts module: import type { BlogPost }, const post: BlogPost, export default post
- slug matches the filename exactly (no .ts extension)
- date format: YYYY-MM-DD
- author: 'Olayiwola Akinnagbe'
- content is a template literal with standard Markdown
- All internal CTAs link to / (not /app — the homepage IS the app)
- No em-dashes in headings or bullet text — only in prose sentences where natural
- Every post ends with a CTA linking to /
- readTime: calculated at ~200 words/minute
```

---

## 59. Feature Landing Pages — Content Specification

30 JSON files cover every visible UI feature. All files live at `src/content/features/`.
The system architecture (auto-discovery via `import.meta.glob`) mirrors the blog system in Section 56.

### Complete Feature Pages List

| Filename | Route | Target keyword | Status |
|---|---|---|---|---|
| `academic-tables.json` | /features/academic-tables | academic table maker for research | ✅ Ready |
| `accessible-tables.json` | /features/accessible-tables | accessible online table builder | ✅ Ready |
| `ai-features.json` | /features/ai-features | ai table generator | ✅ Ready |
| `auto-sum.json` | /features/auto-sum | auto sum table column online | ✅ Ready |
| `border-styles.json` | /features/border-styles | table border styles online | ✅ Ready |
| `column-sorting.json` | /features/column-sorting | sort table columns online | ✅ Ready |
| `column-types.json` | /features/column-types | table column formatting online | ✅ Ready |
| `context-menu.json` | /features/context-menu | right click table context menu | ✅ Ready |
| `copy-table.json` | /features/copy-table | copy table as image | ✅ Ready |
| `csv-export.json` | /features/csv-export | export table to csv online | ✅ Ready |
| `csv-import.json` | /features/csv-import | import csv to table online | ✅ Ready |
| `custom-headers.json` | /features/custom-headers | custom table headers online | ✅ Ready |
| `dark-mode.json` | /features/dark-mode | dark mode table builder | ✅ Ready |
| `drag-to-resize.json` | /features/drag-to-resize | resize table columns online | ✅ Ready |
| `excel-export.json` | /features/excel-export | export table to excel online | ✅ Ready |
| `excel-import.json` | /features/excel-import | import excel to table online | ✅ Ready |
| `find-replace.json` | /features/find-replace | find and replace in table | ✅ Ready |
| `freeze-panes.json` | /features/freeze-panes | freeze header row online | ✅ Ready |
| `image-export.json` | /features/image-export | export table as image png | ✅ Ready |
| `keyboard-shortcuts.json` | /features/keyboard-shortcuts | table builder keyboard shortcuts | ✅ Ready |
| `latex-export.json` | /features/latex-export | export table to latex | ✅ Ready |
| `markdown-table.json` | /features/markdown-table | markdown table generator online | ✅ Ready |
| `merge-cells.json` | /features/merge-cells | merge cells online table | ✅ Ready |
| `offline.json` | /features/offline | offline table builder | ✅ Ready |
| `pdf-export.json` | /features/pdf-export | export table to pdf online | ✅ Ready |
| `smart-paste.json` | /features/smart-paste | smart paste from excel | ✅ Ready |
| `table-caption.json` | /features/table-caption | table title caption field | ✅ Ready |
| `table-themes.json` | /features/table-themes | table styles online | ✅ Ready |
| `templates.json` | /features/templates | table templates online free | ✅ Ready |
| `border-styles.json` | /features/border-styles | table border styles online | ✅ Ready |
| `freeze-panes.json` | /features/freeze-panes | freeze header row online | ✅ Ready |
| `copy-table.json` | /features/copy-table | copy table as image | ✅ Ready |
| `find-replace.json` | /features/find-replace | find and replace in table | ✅ Ready |
| `column-types.json` | /features/column-types | table column formatting online | ✅ Ready |
| `table-caption.json` | /features/table-caption | table title caption field | ✅ Ready |
| `column-sorting.json` | /features/column-sorting | sort table columns online | ✅ Ready |
| `ai-features.json` | /features/ai-features | ai table generator | ✅ Ready |
| `dark-mode.json` | /features/dark-mode | dark mode table builder | ✅ Ready |
| `auto-sum.json` | /features/auto-sum | auto sum table column online | ✅ Ready |
| `context-menu.json` | /features/context-menu | right click table context menu | ✅ Ready |
| `excel-import.json` | /features/excel-import | import excel to table online | ✅ Ready |
| `latex-export.json` | /features/latex-export | export table to latex | ✅ Ready |
| `offline.json` | /features/offline | offline table builder | ✅ Ready |
| `smart-paste.json` | /features/smart-paste | smart paste from excel | ✅ Ready |
| `undo.json` | /features/undo | undo table editing online | ✅ Ready |

### Schema Extensions Required

Some pages use additional JSON fields beyond the base `FeaturePage` type.
These are **runtime-only** — the `FeaturePage` type in `featureService.types.ts` does not include them. The `parseFeature()` function casts via `Record<string, unknown>`, so extra fields are accessed through direct property access or `as any` casts. When rendering these in `FeatureDetailPage`, check for the field's existence and render conditionally.

| Page | Additional field | Rendering |
|---|---|---|
| `keyboard-shortcuts` | `shortcuts[]` — `{category, description, items[]}` | ShortcutsTable component |
| `table-themes` | `themes[]` — `{id, name, description, bestFor}` | ThemePreviewGrid component |
| `templates` | `templates[]` — TemplateCard[] | TemplateCardGrid component |
| `border-styles` | `borderTypes[]`, `borderStyles[]` | Two reference grids |
| `copy-table` | `copyModes[]` — `{id, name, shortcut, status, description, bestFor}` | Two side-by-side mode cards |
| `column-types` | `columnTypes[]` — `{id, name, icon, description, example}` | Type reference grid |
| `image-export` | `comparison{}` — `{heading, rows[]}` | PNG vs JPEG comparison table |
| `ai-features` | `aiFeatures[]`, `cta{}`, `status` | Feature cards + CTA block |
| `context-menu` | `menuItems{}` — `{cell[], columnHeader[]}` | Two reference panels |

### Implementation

All 30 feature JSON files committed to `src/content/features/`. `featureService.ts` with `import.meta.glob` auto-discovery and slug derivation. `FeaturesListPage` renders responsive card grid. `FeatureDetailPage` handles hero + conditional sections (benefits, use cases, steps, CTA, related). Routes `/features` and `/features/:slug` lazy-loaded. Each page sets `metaTitle`, `metaDescription`, `og:url`, and JSON-LD via `react-helmet-async`. Special pages handled: `ai-features` shows amber 'In development' banner, `keyboard-shortcuts` renders ShortcutsTable, `image-export` shows PNG vs JPEG comparison table, `copy-table` shows 'Coming soon' badge on image mode card, `context-menu` renders two reference panels. All 6 section components (`Hero`, `Benefits`, `UseCases`, `Steps`, `Cta`, `Related`) reusable across pages. Sitemap updated. Tests cover auto-discovery, slug derivation, not-found, and page rendering.

---

## 60. Testimonials — Full Specification

### Current state

The page exists at `/testimonials`. The `TESTIMONIALS` array in
`src/config/testimonials/testimonials.ts` is empty. The empty state renders correctly.

### Collecting testimonials

Before the array can be populated, testimonials must be collected.
The recommended approach:

```
1. Share Tablesmit with 10-20 people directly — writers, analysts, researchers.
   Ask for one honest sentence about what they found most useful.

2. Monitor mentions on X/Twitter (@OlayiwolaAkinn1) — if someone tweets
   positively about Tablesmit, ask if you may use the quote.

3. Add a "Leave a testimonial" link in the empty state → mailto or a short
   Tally/Typeform form with three questions:
     - Your name and role
     - How do you use Tablesmit?
     - One sentence we can use as a quote

4. GitHub stars and issues often contain positive feedback — check there.
```

### Adding a testimonial

```ts
// src/config/testimonials/testimonials.ts — add one object to the array

export const TESTIMONIALS: Testimonial[] = [
  {
    id:        'unique-id-001',
    name:      'Person Name',
    role:      'Data Analyst, Company Name',    // or "Independent Researcher"
    avatar:    '',                               // leave empty — initials render as fallback
    quote:     'One to three sentences. Their exact words. Do not paraphrase.',
    source:    'Twitter',                        // optional: platform name
    sourceUrl: 'https://x.com/...',             // optional: link to original post
  },
]
```

### Testimonial quality rules

```
- Use real quotes only — no paraphrasing, no invented quotes
- Name and role must be verifiable — do not publish anonymous quotes
- Quote length: 1-4 sentences. Edit only for spelling, not substance.
- Prefer quotes that mention a specific feature or use case, not generic praise
- Get written permission before publishing — a reply "yes you can use this" counts
- Never list the person's employer unless they specifically included it
```

### Display rules (card grid)

```
Grid: 1 col mobile → 2 col tablet → 3 col desktop
Card: white bg, border border-border, rounded-md, p-6
      No shadow (UI principle — shadow-sm max)

Card structure (top to bottom):
  Quote icon (large, --color-primary-light)
  Quote text: text-base leading-relaxed text-text-secondary italic
  Divider: mt-4 border-t border-border pt-4
  Name: text-sm font-semibold text-text-primary
  Role: text-xs text-text-muted
  Source link (if exists): text-xs text-primary hover:underline
  Avatar: initials circle, 32×32, bg-primary-light, text-primary, text-sm font-semibold

Card hover: border-color transitions to --color-primary (150ms ease)
```

### Empty state (while array is empty)

```
Centred, max-w-sm, gap-4
Dashed border box: border-2 border-dashed border-border rounded-md p-10
  Heading:  text-lg font-semibold text-text-primary "No testimonials yet"
  Subtext:  text-sm text-text-secondary
            "We are collecting feedback from early users.
             If you have used Tablesmit, we would love to hear from you."
  CTA:      [Share your experience →] → /contact
  Secondary: "or mention us on X @OlayiwolaAkinn1"
```

### Target: 3 testimonials

The page should not go live in marketing materials while it is empty.
Collect at least 3 real testimonials before including `/testimonials` in
any Product Hunt or Hacker News launch materials.

---

## 61. Blog & Feature Search

Search across blog posts and feature pages with live filtering and category/boost-field ranking.

### Components

#### SearchBar (`src/components/features/SearchBar/`)

A reusable search input with: debounced input (200ms), clear button, search icon, and
optional placeholder text. Renders `SearchBar.types.ts` props interface:
- `query: string` — current search value
- `onQueryChange: (q: string) => void` — debounced callback
- `placeholder?: string` — custom placeholder
- `resultsCount?: number` — displayed as "N results" badge

### Hooks

#### `useBlogSearch` (`src/hooks/useBlogSearch/`)

Filters the blog post list client-side:
- `searchQuery` + `setSearchQuery` state
- `filteredPosts` — `useMemo` that filters `getAllPosts()` by title, description, tags, and content
- Match count returned as `resultsCount`
- Case-insensitive, trims query, returns full array when query is empty

#### `useFeatureSearch` (`src/hooks/useFeatureSearch/`)

Filters feature pages client-side:
- Same API as `useBlogSearch` but operates on `getAllFeatures()`
- Searches title, description, and slug fields
- Boost-field ranking: title matches rank higher than description matches, which rank higher than slug matches
- Uses `searchItems()` from `src/utils/searchUtils/` for the ranking

### Utility

#### `searchUtils` (`src/utils/searchUtils/`)

Generic search utility with boost-field ranking:
```ts
function searchItems<T>(
  items: T[],
  query: string,
  fields: { field: keyof T; weight: number }[]
): T[]
```
- `fields` array specifies which fields to search and their relative weight
- `weight: 3` = title (highest), `weight: 2` = description, `weight: 1` = slug/tags
- Case-insensitive substring matching
- Returns items sorted by cumulative score (highest first)
- Items with zero score are excluded from results

### Integration

- `BlogListPage` uses `useBlogSearch` to filter posts as user types in `SearchBar`
- `FeaturesListPage` uses `useFeatureSearch` similarly
- `SearchBar` placed above the card grid on both pages
- Empty search shows all items (no filter applied)
- When query is non-empty and results are empty: "No results found" empty state

### Tests Required (8 test files)
```ts
// src/test/hooks/useBlogSearch.test.ts
describe('useBlogSearch', () => {
  it('returns all posts when query is empty')
  it('filters by title match')
  it('filters by description match')
  it('filters by tag match')
  it('filters by content match')
  it('is case-insensitive')
  it('trim whitespace from query')
  it('match count is zero when no results')
})

// src/test/hooks/useFeatureSearch.test.ts
describe('useFeatureSearch', () => {
  it('returns all features when query is empty')
  it('filters by title match')
  it('filters by description match')
  it('title matches rank higher than description matches')
  it('description matches rank higher than slug matches')
})

// src/test/utils/searchUtils.test.ts
describe('searchItems', () => {
  it('returns all items for empty query')
  it('filters items matching any field')
  it('scores title matches higher than other fields')
  it('returns empty array when no matches')
  it('handles case-insensitive matching')
  it('handles query with leading/trailing whitespace')
  it('returns items sorted by score descending')
})

// src/test/components/features/SearchBar/SearchBar.test.tsx
describe('SearchBar', () => {
  it('renders with placeholder text')
  it('calls onQueryChange on user input')
  it('debounces input by 200ms')
  it('shows clear button when query is non-empty')
  it('clears input on clear button click')
  it('shows results count badge')
  it('calls onQueryChange with empty string on clear')
})
```

---

## 62. Branch Protection Rules

No direct pushes to `main`. Every change — from a typo fix to a new feature —
goes through a pull request. This is enforced at the GitHub repository level,
not just by convention.

### GitHub Settings (set once, enforced automatically)

Go to: **GitHub → Repository → Settings → Branches → Add branch protection rule**

```
Branch name pattern: main

Rules to enable:
  [x] Require a pull request before merging
        → Required approvals: 0 (solo project — PR is still required, just no reviewer)
        → Dismiss stale PR reviews when new commits are pushed

  [x] Require status checks to pass before merging
        → Required checks:
            lint     (GitHub Actions job name)
            test     (GitHub Actions job name)
            build    (GitHub Actions job name)
        → Require branches to be up to date before merging

  [x] Do not allow bypassing the above settings
  [x] Do not allow force pushes
  [x] Do not allow deletions
```

With this in place:
- `git push origin main` fails with a 403 — protected branch
- The CI pipeline (lint + tests + build) must pass before the merge button activates
- Force-pushing history rewrites is blocked

---

### Branch Naming Convention

```
feat/short-description        new feature
fix/short-description         bug fix
docs/short-description        documentation only
chore/short-description       config, deps, tooling
test/short-description        test-only changes
refactor/short-description    code reorganisation, no behaviour change
content/short-description     blog posts, feature pages, locale strings
i18n/short-description        translation additions or corrections
```

**Rules:**
- Kebab-case only — no spaces, no uppercase
- Description must be meaningful — `fix/crash` is not acceptable, `fix/table-clear-undo` is
- Maximum 40 characters total including the prefix
- Delete branch after merging — keep the remote clean

---

### Workflow (every change)

```bash
# 1. Make sure you are on main and up to date
git checkout main
git pull origin main

# 2. Create your branch
git checkout -b feat/your-feature-name

# 3. Make changes, commit as you go
git add .
git commit -m "feat: describe what you did"

# 4. Push the branch
git push origin feat/your-feature-name

# 5. Open a PR on GitHub
#    - Title: short description
#    - Body: use the PR template (.github/pull_request_template.md)
#    - Wait for CI to pass (lint + tests + build)

# 6. Merge via GitHub UI (squash or merge commit — your choice)

# 7. Delete the branch after merge
git branch -d feat/your-feature-name
git push origin --delete feat/your-feature-name

# 8. Pull main again
git checkout main
git pull origin main
```

---

### Commit Message Format

Follow the Conventional Commits standard. The CI pipeline lints commit messages.

```
feat:     add find and replace
fix:      correct auto-sum with negative numbers
docs:     update README blog post section
chore:    bump vite to 5.4.1
test:     add useMergeCells edge cases
refactor: extract borderUtils from TableGrid
content:  add blog post — how to merge cells
i18n:     add missing toolbar keys to Arabic locale
```

**Rules:**
- Lowercase type prefix followed by colon and space
- Imperative mood: "add" not "adds" or "added"
- Max 72 characters on the first line
- No period at the end
- Breaking changes: add `BREAKING CHANGE:` in the commit body

---

### Why No Direct Pushes to Main

```
1. CI is the quality gate. Without branch protection, a push that breaks
   tests or fails lint goes directly to production via Netlify.

2. Every change has a reviewable unit. PRs create a permanent record
   of what changed, why, and when — essential for an open source project.

3. Collaboration safety. If contributors join, they cannot accidentally
   push to main. The PR flow is the same for everyone.

4. Rollback is clean. If a merged PR causes a regression, reverting
   a single squash commit on main is straightforward.
```

---

### `.github/workflows/deploy-netlify.yml` — Verify Steps

The pipeline runs all gates in a single `build-and-deploy` job. Required
checks (`lint`, `test`, `build`) map to steps within that job:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [24.x]
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: ${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run prepare         # husky install
      - run: npm run test
      - run: npm run audit
      - run: npm run build
      - if: github.ref == 'refs/heads/main'
        run: curl "$deploy_url"
        env:
          deploy_url: ${{ secrets.NETLIFY_DEPLOY_HOOK_URL }}
```

All three gates (`lint`, `test`, `build` steps) must be required checks
in the branch protection settings above.

---

## 64. Build Chain

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run generate-sitemap && vite build && node scripts/version.cjs",
    "generate-sitemap": "npx tsx scripts/sitemap/generate-sitemap.ts",
    "prerender": "npx tsx scripts/prerender.ts --out-dir $npm_package_config_prerenderDir",
    "preview": "vite preview",
    "test": "vitest run",
    "lint": "eslint .",
    "audit": "npm audit",
    "analyze": "ANALYZE=true npm run build",
    "test:e2e": "playwright test",
    "new-post": "npx tsx scripts/md-to-blog-post.ts",
    "prepare": "husky"
  }
}
```

### Build Sequence

1. **`generate-sitemap`** — Discovers all routes from static list, blog filenames (`src/content/blog/*.ts`), and feature page slugs (`src/content/features/*.json`). Writes `public/sitemap.xml`.

2. **`vite build`** — Compiles the app via esbuild (not tsc). Vite's rolldown bundler generates code-split chunks per route, per vendor library, and per locale. `manualChunks` splits vendor-react, vendor-ui, vendor-i18n, vendor-sentry, vendor-pdf, vendor-canvas, vendor-excel. Output to `dist/`.

3. **`node scripts/version.cjs`** — Writes `dist/version.json` with the deploy ID or current timestamp. Used at runtime by the PWA version polling system to detect stale clients and trigger auto-reload after a deploy.

### Why `tsc -b` Is Not in the Build Chain

`tsc -b` is excluded because TypeScript 6.x cannot parse the newer syntax in `@types/node@24` (parse errors in `node_modules/@types/node/https.d.ts`). These are parse-time errors, not type errors — `skipLibCheck: true` does not help. `vite build` (esbuild) handles transpilation without issue. Type checking is performed separately via the `lint` CI step (eslint) and IDE-level TypeScript checking. If `@types/node` and TypeScript become version-compatible in the future, `tsc -b` can be re-added as a pre-build gate.

### Prerender Output Verification

After a successful build, verify with:

```bash
# Check prerendered route files exist (not counting homepage)
find dist -name "index.html" -not -path "dist/index.html" | wc -l
# Should output N (static - 1 + blog + feature pages)

# Check content is real HTML (not SPA shell)
head -3 dist/about/index.html
# Should show <!DOCTYPE html> with prerendered content

# Check homepage is still SPA
head -3 dist/index.html
# Should contain <script> — not prerendered
```

### Netlify SPA Fallback

Prerendered files are served directly by Netlify (since the file exists at the exact URL path). For routes not prerendered (e.g. query parameters, future routes), the `/* → /index.html 200` redirect in `netlify.toml` falls back to the SPA, which resolves the route client-side.

---

## 65. Prerender Architecture

### Purpose

Generate static HTML for content pages at build time. Improves SEO (search engines receive fully rendered HTML instantly), Lighthouse LCP (no JS waterfall to render content), and social previews (Open Graph tags are present in the initial HTML).

The homepage (`/`) is **never prerendered** — it is a heavy interactive SPA (TableMakerPage) and prerendering would cause hydration flicker with `localStorage`-driven state (theme, locale, saved tables).

### Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Library | **Playwright** (already in devDependencies) | Avoids adding Puppeteer (~300 MB). Playwright is already installed for E2E tests. |
| Timing | **Pre-commit, not CI** | Playwright needs browsers (~150 MB installed). CI does not download them. Prerendered HTML is committed to git. |
| Output dir | Read from `package.json#config.prerenderDir` (default `prerendered/`) | Single source of truth; `npm run prerender` and `.husky/pre-commit` both resolve it from `package.json`. |
| Route discovery | **Filesystem scan** (DI-injectable for tests) | Blog slugs derived from `src/content/blog/*.ts` filenames. Feature slugs from `src/content/features/*.json`. Static routes defined in array. |
| Server | **`vite preview`** (spawned as child process, URL parsed from stdout) | Serves the exact production build. No separate server config or middleware needed. |

### Architecture

```
Pre-commit (when content changes):
  git add src/content/...
  hook: npm run lint && npm run test -- --run && npm run build
  hook: npx tsx scripts/prerender.ts --out-dir prerendered
          → checks dist/ exists (skips if not built)
          → checks Playwright browsers installed (skips gracefully if missing)
          → starts vite preview (spawn, parse URL from stdout)
          → visits all content routes in headless Chromium
          → saves HTML to prerendered/{route}/index.html
  hook: git add prerendered/
  → commit includes source + prerendered HTML

CI (every push):
  npm run build
    → generate-sitemap (route discovery, writes public/sitemap.xml)
    → vite build (app bundle to dist/)
    → deploy dist/ to Netlify (prerendered/ lives in git, already present at dist/ but unused during dev)

scripts/prerender.ts:
  CONST:
    PRERENDER_OUT_DIR       → from package.json#config.prerenderDir or 'prerendered'
    PORT = 4173
    CONTENT_DIR             → path.resolve(ROOT, 'src/content')
    VITE_BIN                → node_modules/.bin/vite

  1. parseArgs(argv)        → reads --out-dir (default: PRERENDER_OUT_DIR, resolved to ROOT)
  2. isPlaywrightAvailable()→ chromium.launch/close, returns bool; skips if not installed
  3. Check dist/index.html  → skips if build not found
  4. getAllRoutes()         → STATIC_ROUTES + getBlogRoutes() + getFeatureRoutes()
       Uses DI callbacks: exists(path), readDir(path), readFile(path)
       Blog:   readDir(CONTENT_DIR/blog) → filter .ts → /blog/{slug}
       Feat:   readDir(CONTENT_DIR/features) → filter .json → JSON.parse → /features/{slug}
  5. startServer()          → spawn vite preview --port 4173
       Resolves on stdout match /Local:\s+(https?:\/\/[^\s]+)/
       Rejects after 90s timeout or non-zero exit code
  6. For each route:
     a. browser.newPage({ viewport: 1280×720 })
     b. page.goto(url, { waitUntil: 'networkidle', timeout: 30s })
     c. page.waitForSelector('#root', { timeout: 10s })
     d. page.waitForTimeout(500)
     e. page.content() → HTML string
     f. fs.writeFileSync(outDir/{route_no_slash}/index.html, html)
     g. page.close() in finally block
  7. browser.close() + stopServer()
  8. Log succeeded/failed counts; process.exit(1) if any failures

  CLI guard: only runs when process.env.VITEST is not set
```

### Route Categories

| Category | Count | Discovery method |
|---|---|---|
| Static (content) | 9 | `STATIC_ROUTES` array in `scripts/prerender.ts` (homepage excluded) |
| Blog posts | 34 | `import.meta.glob` + filename → slug in `blogService.ts`; prerender uses `fs.readdirSync(CONTENT_DIR/blog/*.ts)` |
| Feature pages | 30 | `JSON.parse(slug field from CONTENT_DIR/features/*.json)` → falls back to filename minus `.json` |

### Local Workflow

```bash
# Normal development
npm run dev

# After adding or editing content (blog posts, feature pages, etc.):
npm run prerender          # runs npx tsx scripts/prerender.ts --out-dir $npm_package_config_prerenderDir
git add prerendered/       # commit prerendered content alongside source changes
git commit -m "content: add new blog post"
git push
```

### Pre-commit Hook

The `.husky/pre-commit` hook auto-runs the prerender when content or the prerender script itself changes, then runs lint + test + build as quality gates:

```sh
if git diff --cached --name-only | grep -qE "^src/content/|^scripts/prerender\.ts"; then
  PRERENDER_DIR=$(node -e "console.log(require('./package.json').config.prerenderDir)")
  echo "Content or prerender script changed — regenerating prerendered pages..."
  npx tsx scripts/prerender.ts --out-dir "$PRERENDER_DIR"
  git add "$PRERENDER_DIR/"
fi

npm run lint && npm run test -- --run && npm run build
```

Triggers on changes to `src/content/` **or** `scripts/prerender.ts`. Reads the output directory from `package.json` config — no hardcoded path. If Playwright browsers are not installed (fresh clone), the prerender step logs a warning and exits gracefully — the hook still runs lint + test + build.

### Adding a New Route

**Static route:** Add the path to the `STATIC_ROUTES` array in `scripts/prerender.ts` **and** to `STATIC_PAGES` in `scripts/sitemap/generate-sitemap.ts` (do NOT add `/` — homepage is never prerendered).

**Blog post:** Create a `.ts` file in `src/content/blog/`. The filename becomes the slug automatically — no prerender script or sitemap change needed (both auto-discover).

**Feature page:** Create a `.json` file in `src/content/features/` with a `slug` field (or omit `slug` to use the filename). No prerender or sitemap change needed (both auto-discover).

### Error Handling

- Routes that fail to render (timeout, browser crash) are logged with the error message; the script continues to the next route.
- After all routes are attempted, the script exits with code 1 if any failures occurred.
- The `vite preview` server is killed via the `stopServer` callback in all cases (success, failure, or exception).
- Playwright availability and build existence are checked upfront — missing either logs a warning and returns early (exit 0), so the pre-commit hook continues to lint/test/build.

### Tests

Route discovery and CLI parsing are pure functions tested in `src/test/scripts/prerender/prerender.test.ts` (15 tests over 163 lines). Sitemap generation is tested in `src/test/scripts/sitemap/generate-sitemap.test.ts` (10 tests). Both use dependency-injected callbacks — no Playwright, no real filesystem I/O.

Build verification (run locally after `npm run build`):

```bash
# Check: prerendered content pages exist at expected paths
ls -d prerendered/*/index.html | wc -l

# Sample: check prerendered content is real HTML (not SPA shell)
head -3 prerendered/about/index.html
# Should show <!DOCTYPE html> with prerendered content

# Sample: homepage is never prerendered
ls prerendered/index.html 2>/dev/null && echo "EXISTS (BAD)" || echo "MISSING (GOOD)"
```

---

*End of Brand Identity & Engineering Implementation Guide — Tablesmit*
*Single source of truth. Any deviation requires explicit sign-off.*
