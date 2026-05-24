#!/usr/bin/env bash
set -e

# Install dependencies from lockfile (exact versions)
npm ci

# Lint: zero warnings enforced
npm run lint

# Install git hooks (husky)
npm run prepare

# Run full test suite
npm run test

# Security audit
npm run audit

# Production build
npm run build --if-present
