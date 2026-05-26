# Contributing to Tablesmit

Thanks for your interest in contributing. Tablesmit is MIT licensed and contributions are welcome.

Read `AGENTS.md` in the repository root for brand, architecture, and testing standards before you start.

## Before You Start

- Check [existing issues](https://github.com/Olayiwola72/tablesmit/issues) to avoid duplicates.
- For large changes, open an issue first to discuss the approach.
- No direct pushes to `main` — all changes go through pull requests (enforced by pre-push hook and GitHub branch protection).

## Reporting Bugs

Open a [bug report](https://github.com/Olayiwola72/tablesmit/issues/new?labels=bug&template=bug_report.md). Include:

- Steps to reproduce (be specific)
- Expected behaviour
- Actual behaviour
- Browser and OS version
- A screenshot or screen recording if relevant

## Suggesting Features

Open a [feature request](https://github.com/Olayiwola72/tablesmit/issues/new?labels=enhancement&template=feature_request.md). Explain what you are trying to do, why the current tool does not meet your need, and how the feature stays true to Tablesmit's vision as a minimalist table builder — not a spreadsheet or database.

## Branch Naming

Branch names must match `feature/`, `fix/`, `docs/`, `chore/`, `test/`, `refactor/`, `content/`, or `i18n/` followed by a kebab-case description.

```
feature/column-sorting       ✅
fix/undo-crash               ✅
docs/update-contributing     ✅
feat/new-feature             ❌  (use `feature/`)
bugfix/crash                 ❌  (use `fix/`)
```

CI validates branch names on every pull request — a mismatch fails the check.

## Submitting a Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write tests — no PR without tests will be reviewed
5. Run the full suite: `npm run test` — all must pass
6. Run lint: `npm run lint` — zero errors
7. Build: `npm run build` — must succeed
8. Open a PR against `main` using the PR template

### PR Template

Every pull request must include:

```
## Summary
One sentence — what does this PR do?

## Related issue
Closes #123, or "N/A" if no issue

## Changes
- Bullet list of changes

## Testing
- [ ] Tests pass: npm test
- [ ] Lint passes: npm run lint
- [ ] Build passes: npm run build

## Screenshots
If UI change, add screenshots.
```

## Git Hooks

Husky runs automatically after `npm install` (via the `prepare` script).

### Pre-commit

Runs on every commit:
1. **lint-staged** — ESLint with `--fix --max-warnings=0` on staged `.ts`/`.tsx` files
2. **Full check** — `npm ci && npm run lint && npm run test -- --run && npm run build`

If any step fails, the commit is aborted. Fix the issue and try again.

### Pre-push

Blocks direct pushes to `main` or `master`. Use a feature branch and open a pull request instead.

To bypass in an emergency: `git push --no-verify origin main`

## CI Pipeline

GitHub Actions runs on every push and pull request:

1. **validate-branch-name** — checks PR branch names match the allowed prefixes
2. **lint** — `npm run lint`
3. **test** — `npm run test`
4. **audit** — `npm run audit` (checks for dependency vulnerabilities)
5. **build** — `npm run build` (generates sitemap, bundles with Vite, copies prerendered content pages into the bundle)
6. **deploy** — (main pushes only) triggers Netlify deploy

All checks must pass before a PR can be merged. Branch protection is enforced at the GitHub level.

## Commit Message Format

```
type: short description
```

Allowed types: `feature`, `fix`, `docs`, `test`, `refactor`, `chore`, `content`, `i18n`

```
feature: add column sorting
fix: correct autoFit clamp on empty column
docs: update CONTRIBUTING.md
test: add useMergeCells edge cases
refactor: extract borderUtils from TableGrid
content: add blog post — how to merge cells
i18n: add missing toolbar keys to Arabic locale
```

Rules:
- Lowercase type, colon, space, then the message
- Imperative mood: "add" not "adds" or "added"
- Max 72 characters on the first line
- No period at the end

## Code Standards

- Follow SOLID, DRY, and KISS as defined in `AGENTS.md`
- No `any` types without a comment explaining why
- No hardcoded hex colours — use Tailwind tokens
- All new hooks must have test coverage
- Tests live in `src/test/` mirroring source structure — no co-located `.test` files
- All exports must have explicit return types
- Types live beside their implementation (`*.types.ts`), except shared table types in `src/types/`

## Quick Reference

```bash
npm test                    # Run all tests
npx vitest run --coverage   # Run tests with coverage report
npm run lint                # ESLint — zero tolerance for warnings
npm run build               # Full production build
npm run audit               # Dependency vulnerability check
```
