# Contributing to Structra

Thanks for your interest in contributing. Structra is MIT licensed and contributions are welcome.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

See `AGENTS.md` for the full architecture guide. Key directories:

- `src/config/` — product decisions, routes, presets, colors
- `src/components/ui/` — reusable primitives (Button, IconButton, etc.)
- `src/components/layout/` — shell components (Navbar, Footer)
- `src/components/features/` — domain-specific components (TableGrid, ExportPanel, etc.)
- `src/hooks/` — custom React hooks
- `src/utils/` — pure functions, zero React dependencies
- `src/pages/` — route-level page components

## Development Workflow

1. Create a branch: `git checkout -b feat/your-feature`
2. Make changes. Keep components small and focused.
3. Run tests: `npm test`
4. Run lint: `npm run lint`
5. Run build: `npm run build`
6. Open a pull request.

## Code Conventions

- **TypeScript** — `strict: true`. No `any` without an inline comment.
- **Styling** — Tailwind classes only. No `style={}`.
- **Components** — one component per file, one directory per component.
- **Exports** — named export + `export default` for `lazy()` loading.
- **Routes** — never hardcode path strings. Use `siteConfig.routes.*`.
- **Imports** — no direct cross-feature imports. Use context/hooks.

## Testing

Tests are written with Vitest + React Testing Library.

```bash
npm test                 # run all tests
npx vitest --coverage    # with coverage report
npx vitest --watch       # watch mode
```

- `utils/` — target 95% coverage
- `hooks/` — target 90% coverage
- `components/` — target 80% coverage

Don't write implementation code before a failing test exists.

## Pull Request Guidelines

- Keep PRs focused on a single concern.
- Write a clear title and description.
- Make sure all tests pass and the build succeeds.
- No PR is too small. Typos and docs fixes are appreciated.
