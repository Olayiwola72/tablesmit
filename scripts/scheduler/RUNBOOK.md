# Scheduler Runbook

## Capture screenshots

Run when: after any visual change to the app (redesign, new feature, layout change).

```bash
npm run capture-screenshots
```

This starts the Vite dev server, navigates 5 pages in headless Chromium, and saves 2x Retina PNGs to `scripts/scheduler/media/`.

After it finishes, commit the new screenshots:

```bash
git add scripts/scheduler/media/
git commit -m "tweet: refresh screenshots"
```

## Post a tweet immediately (test or manual send)

```bash
npm run tweet:now
```

This reads the current day/hour in EST, looks for a matching tweet in `scripts/scheduler/tweet-content.ts`, uploads any attached media, and posts to Twitter.

- If the day/time matches a scheduled slot, it posts the tweet and logs the ID to `tweet-log.json`.
- If no tweet is scheduled for right now, it prints "No tweet scheduled" and exits.
- If the tweet was already posted (logged in `tweet-log.json`), it skips.

## Schedule

Tweets go out automatically via GitHub Actions on this schedule (EST/EDT):

| Day | Time | Type |
|---|---|---|
| Tuesday | 10:00 | Build in public |
| Wednesday | 12:00 | User education |
| Thursday | 10:00 | Build in public |

The workflow runs at both UTC offsets for each slot to handle daylight saving time. The scheduler script checks the actual EST hour and only posts if it matches.

## Files

| File | Purpose |
|---|---|
| `scheduler.ts` | Entry point — EST check, dedup, post |
| `client.ts` | Twitter API v2 OAuth 1.0a client |
| `tweet-content.ts` | All 18 tweet drafts |
| `tweet-log.json` | IDs of already-posted tweets (committed to repo) |
| `capture-screenshots.ts` | Playwright-based screenshot capture |
| `media/` | Screenshot PNGs referenced by tweets |
| `RUNBOOK.md` | This file |
