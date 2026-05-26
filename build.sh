#!/usr/bin/env bash
set -e

# Install dependencies from lockfile (exact versions)
npm ci

# Lint: zero warnings enforced
npm run lint

# Install git hooks (husky)
npm run prepare

# Security audit
npm run audit

# Run full test suite
npm run test

# Generate sitemap
npm run generate-sitemap

# Build production bundle
npm run build
