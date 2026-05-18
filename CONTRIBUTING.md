# Contributing to Tablesmit

Thanks for your interest in contributing. Tablesmit is MIT licensed and contributions are welcome.

Read `agents.md` in the repository root for brand, architecture, and testing standards before you start.

## Before You Start

- Check [existing issues](https://github.com/Olayiwola72/tablesmit/issues) to avoid duplicates.
- For large changes, open an issue first to discuss the approach.

## Reporting Bugs

Use the GitHub issue tracker. Include:

- Steps to reproduce (be specific)
- Expected behavior
- Actual behavior
- Browser and OS version
- A screenshot or screen recording if relevant

## Suggesting Features

Open a GitHub Discussion, not an issue. Explain what you are trying to do, why the current tool does not meet your need, and what the feature would look like from a user's perspective.

## Submitting a Pull Request

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Write tests — no PR without tests will be reviewed
5. Run the full suite: `npm run test` — all must pass
6. Run lint: `npm run lint` — zero errors
7. Open a PR against `main` with a clear description

## Code Standards

- Follow SOLID, DRY, and KISS as defined in `agents.md`
- No `any` types without a comment explaining why
- No hardcoded hex colors — use Tailwind tokens
- All new hooks must have test coverage

## Commit Message Format

```
feat: add column sorting
fix: correct autoFit clamp on empty column
docs: update CONTRIBUTING.md
test: add sortRows edge case for empty cells
```
