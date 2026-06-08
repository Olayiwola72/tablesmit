import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BLUEPRINT_PATH = path.join(ROOT, 'public/launch/tablesmit-devto-complete.md')
const TRACKING_PATH = path.join(__dirname, '.crossposted.json')
const CSV_REPORT_PATH = path.join(__dirname, '.crossposted-report.csv')
const INDEXING_DIR = path.join(ROOT, 'indexing')
const DEVTO_API_BASE = 'https://dev.to/api'
const RATE_LIMIT_MS = 3_000

// ── Load .env manually (no dotenv dep needed) ──

function loadEnv(): void {
  const envPath = path.join(ROOT, '.env')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

// ── Cover images ──

const COVER_BASE_URL = 'https://tablesmit.com/launch'

const COVER_MAP: Record<string, string> = {
  // ph-light-mode.png — general how-to & feature guides
  'ai-table-generator-features': 'ph-light-mode.png',
  'how-to-add-table-borders-online': 'ph-light-mode.png',
  'how-to-auto-sum-columns-table': 'ph-light-mode.png',
  'how-to-customize-table-headers-online': 'ph-light-mode.png',
  'how-to-find-and-replace-in-table': 'ph-light-mode.png',
  'how-to-freeze-header-row-in-table': 'ph-light-mode.png',
  'how-to-import-csv-into-online-table': 'ph-light-mode.png',
  'how-to-make-a-data-table-without-excel': 'ph-light-mode.png',
  'how-to-make-a-table-in-html': 'ph-light-mode.png',
  'how-to-make-a-table-in-markdown': 'ph-light-mode.png',
  'how-to-undo-table-editing-online': 'ph-light-mode.png',
  'how-to-use-right-click-table-editor': 'ph-light-mode.png',
  'how-to-use-table-templates': 'ph-light-mode.png',
  'markdown-table-generator-online': 'ph-light-mode.png',
  'offline-table-builder': 'ph-light-mode.png',
  'table-builder-keyboard-shortcuts-guide': 'ph-light-mode.png',
  'table-column-formatting-guide': 'ph-light-mode.png',

  // ph-export-demo.png — export-related posts
  'how-to-copy-table-as-image': 'ph-export-demo.png',
  'how-to-export-colored-tables-to-latex': 'ph-export-demo.png',
  'how-to-export-table-as-image': 'ph-export-demo.png',
  'how-to-export-table-to-latex': 'ph-export-demo.png',
  'how-to-export-table-to-pdf': 'ph-export-demo.png',

  // ph-dark-mode.png — dark mode
  'how-to-use-dark-mode-in-table-builder': 'ph-dark-mode.png',

  // table-caption.png — caption, academic, accessibility
  'how-to-add-caption-to-table': 'table-caption.png',
  'how-to-create-tables-for-academic-papers': 'table-caption.png',
  'web-table-accessibility-guide': 'table-caption.png',

  // tablesmit-drag-comparison.png — comparison, layout, interactive
  'how-to-make-a-comparison-table': 'tablesmit-drag-comparison.png',
  'how-to-make-a-pricing-table': 'tablesmit-drag-comparison.png',
  'how-to-make-a-schedule-table': 'tablesmit-drag-comparison.png',
  'how-to-merge-cells-in-online-table': 'tablesmit-drag-comparison.png',
  'how-to-resize-table-columns-rows': 'tablesmit-drag-comparison.png',
  'how-to-sort-table-columns': 'tablesmit-drag-comparison.png',

  // tablesmit-dark-image.jpeg — developer/research focused
  'best-table-tool-for-researchers': 'tablesmit-dark-image.jpeg',
  'copy-excel-table-to-web': 'tablesmit-dark-image.jpeg',
  'free-online-table-makers-compared': 'tablesmit-dark-image.jpeg',
  'how-to-add-table-to-medium-post': 'tablesmit-dark-image.jpeg',
  'how-to-apply-table-themes': 'tablesmit-dark-image.jpeg',
  'how-to-edit-latex-tables-online': 'tablesmit-dark-image.jpeg',
  'how-to-import-excel-files-online-table': 'tablesmit-dark-image.jpeg',
}

// ── Types ──

interface CrossPost {
  number: number
  title: string
  tags: string[]
  canonicalUrl: string
  slug: string
  body: string
  scheduleDate: Date
}

interface TrackingData {
  crossposted: Record<
    string,
    {
      devtoId: number
      devtoSlug: string
      devtoUrl: string
      scheduledDate: string
      crosspostedAt: string
    }
  >
  indexingHash?: string
}

interface CliFlags {
  dryRun: boolean
  slug?: string
  repost: boolean
  report: boolean
  cover: boolean
  rescheduleIndexed: boolean
}

interface DevtoArticle {
  id: number
  slug: string
  url: string
  canonical_url: string
}

// ── Schedule ──

function getScheduleDate(postNumber: number): Date {
  const start = new Date()
  start.setUTCDate(start.getUTCDate() + 21)
  start.setUTCHours(8, 0, 0, 0)
  start.setUTCMinutes(0, 0, 0)
  const date = new Date(start)
  date.setUTCDate(start.getUTCDate() + (postNumber - 1))
  return date
}

// ── Blueprint parsing ──

function parseBlueprint(): CrossPost[] {
  const raw = fs.readFileSync(BLUEPRINT_PATH, 'utf-8')
  const posts: CrossPost[] = []

  const sections = raw.split(/(?=^## POST )/m)

  for (const section of sections) {
    const numMatch = section.match(/^## POST (\d+)/m)
    if (!numMatch) continue
    const number = parseInt(numMatch[1]!, 10)

    const titleMatch = section.match(/^Title: (.+)$/m)
    if (!titleMatch) continue

    const tagsMatch = section.match(/^Tags: (.+)$/m)
    if (!tagsMatch) continue

    const canonicalMatch = section.match(/^Canonical: (.+)$/m)
    if (!canonicalMatch) continue

    const bodyMatch = section.match(/```\n([\s\S]*?)\n```/)
    if (!bodyMatch) continue

    const canonicalUrl = canonicalMatch[1]!.trim()
    const slug = canonicalUrl.replace(/\/+$/, '').split('/').pop() ?? ''

    const tags = tagsMatch[1]!.split(',').map((t) => t.trim()).slice(0, 4)

    posts.push({
      number,
      title: titleMatch[1]!.trim(),
      tags,
      canonicalUrl,
      slug,
      body: bodyMatch[1]!.trim(),
      scheduleDate: getScheduleDate(number),
    })
  }

  return posts.sort((a, b) => a.number - b.number)
}

// ── Working day helpers ──

function addWorkingDays(from: Date, count: number): Date {
  const result = new Date(from)
  for (let i = 0; i < count; ) {
    result.setUTCDate(result.getUTCDate() + 1)
    const dow = result.getUTCDay()
    if (dow !== 0 && dow !== 6) i++
  }
  return result
}

// ── Indexing coverage ──

function loadIndexedSlugs(): Set<string> {
  const slugs = new Set<string>()

  if (!fs.existsSync(INDEXING_DIR)) return slugs

  const files = fs.readdirSync(INDEXING_DIR)

  for (const file of files) {
    const filePath = path.join(INDEXING_DIR, file)
    let csvContent: string | null = null

    if (file.endsWith('.csv')) {
      csvContent = fs.readFileSync(filePath, 'utf-8')
    } else if (file.endsWith('.zip')) {
      try {
        csvContent = execSync(`unzip -p "${filePath}" Table.csv`, {
          encoding: 'utf-8',
        })
      } catch {
        continue
      }
    }

    if (!csvContent) continue

    const lines = csvContent.split('\n').filter((line) => line.trim())
    const header = lines[0]
    const urlColIdx = header
      .split(',')
      .findIndex((col: string) => col.trim() === 'URL')
    if (urlColIdx === -1) continue

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',')
      const url = cols[urlColIdx]?.trim()
      if (!url) continue

      const match = url.match(/\/blog\/([^/]+)/)
      if (match) slugs.add(match[1])
    }
  }

  return slugs
}

function computeIndexingHash(): string {
  if (!fs.existsSync(INDEXING_DIR)) return ''
  const files = fs.readdirSync(INDEXING_DIR).sort()
  const hash = createHash('md5')
  for (const f of files) {
    const content = fs.readFileSync(path.join(INDEXING_DIR, f))
    hash.update(content)
  }
  return hash.digest('hex')
}

// ── Tracking ──

function loadTracking(): TrackingData {
  try {
    if (fs.existsSync(TRACKING_PATH)) {
      return JSON.parse(fs.readFileSync(TRACKING_PATH, 'utf-8')) as TrackingData
    }
  } catch {
    // corrupt file — start fresh
  }
  return { crossposted: {} }
}

function saveTracking(data: TrackingData): void {
  fs.mkdirSync(path.dirname(TRACKING_PATH), { recursive: true })
  fs.writeFileSync(TRACKING_PATH, JSON.stringify(data, null, 2) + '\n')
}

// ── CLI args ──

function parseArgs(): CliFlags {
  const args = process.argv.slice(2)
  let slug: string | undefined
  const slugIdx = args.indexOf('--slug')
  if (slugIdx !== -1 && slugIdx + 1 < args.length) {
    slug = args[slugIdx + 1]
  }
  return {
    dryRun: args.includes('--dry-run'),
    slug,
    repost: args.includes('--repost'),
    report: args.includes('--report'),
    cover: args.includes('--cover'),
    rescheduleIndexed: args.includes('--reschedule-indexed'),
  }
}

// ── CSV Report ──

function escapeCsv(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

function generateReport(
  allPosts: CrossPost[],
  tracking: TrackingData,
  results: Map<string, 'success' | 'failed' | 'skipped'>,
): string {
  const rows: string[] = [
    'Post Number,Title,Slug,Tags,Scheduled Date (UTC),Status,Dev.to ID,Dev.to URL,Canonical URL',
  ]

  for (const post of allPosts) {
    const tracked = tracking.crossposted[post.slug]
    const status = results.get(post.slug) ?? (tracked ? 'done (previous run)' : 'pending')
    const scheduled = post.scheduleDate.toISOString().replace('T', ' ').replace(/\.\d+Z/, '')
    rows.push(
      [
        String(post.number),
        escapeCsv(post.title),
        post.slug,
        escapeCsv(post.tags.join(', ')),
        scheduled,
        status,
        tracked?.devtoId ?? '',
        tracked?.devtoUrl ?? '',
        post.canonicalUrl,
      ].join(','),
    )
  }

  return rows.join('\n') + '\n'
}

function writeCsvReport(
  allPosts: CrossPost[],
  tracking: TrackingData,
  results: Map<string, 'success' | 'failed' | 'skipped'>,
): void {
  const csv = generateReport(allPosts, tracking, results)
  fs.mkdirSync(path.dirname(CSV_REPORT_PATH), { recursive: true })
  fs.writeFileSync(CSV_REPORT_PATH, csv, 'utf-8')
  console.log(`\nCSV report: ${CSV_REPORT_PATH}`)
}

// ── Footer ──

function buildFooter(slug: string): string {
  const url = `https://tablesmit.com/blog/${slug}/`
  return [
    '',
    '---',
    '',
    `*This post originally appeared on the Tablesmit Blog at [tablesmit.com/blog/${slug}](${url}). Tablesmit is a free, open source table builder. Export to PDF, Excel, LaTeX, CSV, PNG. No account required. Try it at [tablesmit.com](https://tablesmit.com).*`,
  ].join('\n')
}

// ── Dev.to API ──

async function devtoFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const apiKey = process.env.VITE_DEVTO_API_KEY
  if (!apiKey) {
    console.error('VITE_DEVTO_API_KEY environment variable is required')
    process.exit(1)
  }

  const url = `${DEVTO_API_BASE}${path}`
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
  })
}

let lastRequestTime = 0

async function rateLimitedFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const now = Date.now()
  const elapsed = now - lastRequestTime
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS - elapsed))
  }
  lastRequestTime = Date.now()
  return devtoFetch(path, options)
}

async function fetchExistingArticles(): Promise<Map<string, DevtoArticle>> {
  const map = new Map<string, DevtoArticle>()
  let page = 1
  let hasMore = true

  while (hasMore) {
    const res = await rateLimitedFetch(
      `/articles/me/all?per_page=100&page=${page}`,
    )

    if (!res.ok) {
      const txt = await res.text()
      console.error(
        `Failed to fetch articles (page ${page}): ${res.status} ${txt}`,
      )
      process.exit(1)
    }

    const data = (await res.json()) as DevtoArticle[]
    if (data.length === 0) break

    for (const article of data) {
      if (article.canonical_url) {
        const normalised = article.canonical_url.replace(/\/+$/, '')
        map.set(normalised, article)
      }
    }

    hasMore = data.length >= 100
    page++
  }

  return map
}

function getCoverImage(slug: string): string | undefined {
  const filename = COVER_MAP[slug]
  return filename ? `${COVER_BASE_URL}/${filename}` : undefined
}

async function createArticle(
  post: CrossPost,
  cover?: boolean,
): Promise<DevtoArticle> {
  const bodyMarkdown = `${post.body}\n${buildFooter(post.slug)}`
  const mainImage = cover ? getCoverImage(post.slug) : undefined
  const articleData: Record<string, unknown> = {
    article: {
      title: post.title,
      body_markdown: bodyMarkdown,
      canonical_url: post.canonicalUrl,
      tags: post.tags,
      published: true,
      published_at: post.scheduleDate.toISOString(),
      series: 'Tablesmit',
    },
  }
  if (mainImage) {
    ;(articleData.article as Record<string, unknown>).main_image = mainImage
  }

  const res = await rateLimitedFetch('/articles', {
    method: 'POST',
    body: JSON.stringify(articleData),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`POST /articles failed (${res.status}): ${errText}`)
  }

  return (await res.json()) as DevtoArticle
}

async function updateArticle(
  post: CrossPost,
  articleId: number,
  cover?: boolean,
): Promise<DevtoArticle> {
  const bodyMarkdown = `${post.body}\n${buildFooter(post.slug)}`
  const mainImage = cover ? getCoverImage(post.slug) : undefined
  const articleData: Record<string, unknown> = {
    article: {
      title: post.title,
      body_markdown: bodyMarkdown,
      canonical_url: post.canonicalUrl,
      tags: post.tags,
      published: true,
      published_at: post.scheduleDate.toISOString(),
      series: 'Tablesmit',
    },
  }
  if (mainImage) {
    ;(articleData.article as Record<string, unknown>).main_image = mainImage
  }

  const res = await rateLimitedFetch(`/articles/${articleId}`, {
    method: 'PUT',
    body: JSON.stringify(articleData),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(
      `PUT /articles/${articleId} failed (${res.status}): ${errText}`,
    )
  }

  return (await res.json()) as DevtoArticle
}

// ── Main ──

async function main(): Promise<void> {
  loadEnv()
  const flags = parseArgs()
  const tracking = loadTracking()
  const allPosts = parseBlueprint()

  console.log(`Parsed ${allPosts.length} posts from blueprint`)
  if (flags.dryRun) console.log('DRY RUN — no API calls will be made')

  // ── Report mode: generate CSV from existing tracking ──
  if (flags.report) {
    writeCsvReport(allPosts, tracking, new Map())
    return
  }

  // Filter by slug if --slug provided
  let postsToProcess: CrossPost[]
  if (flags.slug) {
    const found = allPosts.find((p) => p.slug === flags.slug)
    if (!found) {
      console.error(`Post with slug "${flags.slug}" not found in blueprint`)
      process.exit(1)
    }
    postsToProcess = [found]
  } else {
    postsToProcess = allPosts
  }

  // ── Reschedule-indexed mode: find indexed posts and schedule them next working day ──
  if (flags.rescheduleIndexed) {
    const indexingHash = computeIndexingHash()
    const indexingChanged =
      indexingHash && indexingHash !== tracking.indexingHash

    if (!indexingChanged) {
      console.log('Indexing data unchanged — nothing to reschedule.')
      return
    }

    const indexedSlugs = loadIndexedSlugs()
    if (indexedSlugs.size === 0) {
      console.log('No indexed blog post slugs found — nothing to reschedule.')
      return
    }
    console.log(
      `Found ${indexedSlugs.size} indexed blog post(s) in GSC coverage data`,
    )

    // Only consider already-crossposted posts that are now indexed
    postsToProcess = allPosts.filter(
      (p) => tracking.crossposted[p.slug] && indexedSlugs.has(p.slug),
    )

    if (postsToProcess.length === 0) {
      console.log(
        'None of the indexed blog posts have been crossposted yet — nothing to reschedule.',
      )
      return
    }
    console.log(
      `${postsToProcess.length} indexed post(s) found in crossposted data — will reschedule`,
    )

    // Reschedule each to next working day at 2-3pm WAT
    let indexedPostCounter = 0
    for (const post of postsToProcess) {
      const adjustedDate = addWorkingDays(new Date(), indexedPostCounter + 1)
      const randomMinute = Math.floor(Math.random() * 60)
      adjustedDate.setUTCHours(13, randomMinute, 0, 0)
      post.scheduleDate = adjustedDate
      indexedPostCounter++
    }

    // Persist hash so next run skips
    tracking.indexingHash = indexingHash

    // Check dev.to API: skip posts already rescheduled (published_at already
    // differs from the stale scheduledDate in committed tracking data)
    if (!flags.dryRun && postsToProcess.length > 0) {
      const stillNeeded: CrossPost[] = []
      for (const post of postsToProcess) {
        const tracked = tracking.crossposted[post.slug]
        if (!tracked) { stillNeeded.push(post); continue }

        try {
          const res = await rateLimitedFetch(`/articles/${tracked.devtoId}`)
          if (res.ok) {
            const article = (await res.json()) as { published_at: string }
            if (article.published_at !== tracked.scheduledDate) {
              console.log(`  "${post.title}" already rescheduled — skipping (dev.to: ${article.published_at})`)
              continue
            }
          }
        } catch {
          // fetch failed — proceed to update as safety net
        }
        stillNeeded.push(post)
      }
      const skipped = postsToProcess.length - stillNeeded.length
      if (skipped > 0) {
        console.log(`Skipped ${skipped} already-rescheduled post(s) via dev.to API`)
      }
      postsToProcess = stillNeeded

      if (postsToProcess.length === 0) {
        console.log('All reschedule candidates already handled — nothing to do.')
        return
      }
    }
  }

  // Filter out already-crossposted posts (unless --repost or --reschedule-indexed)
  if (!flags.repost && !flags.rescheduleIndexed) {
    const pending = postsToProcess.filter(
      (p) => !tracking.crossposted[p.slug],
    )
    const skipped = postsToProcess.length - pending.length
    if (skipped > 0) {
      console.log(
        `Skipping ${skipped} already-crossposted post(s). Use --repost to force.`,
      )
    }
    postsToProcess = pending
  }

  if (postsToProcess.length === 0) {
    console.log('Nothing to crosspost.')
    return
  }

  // Fetch existing dev.to articles to find matches for posts 1-5 (or any post
  // that was previously created as a draft)
  console.log('Fetching existing dev.to articles…')
  let existingArticles: Map<string, DevtoArticle> | undefined
  if (!flags.dryRun) {
    existingArticles = await fetchExistingArticles()
    console.log(`Found ${existingArticles.size} existing articles`)
  }

  // Check if indexing coverage data has changed; adjust schedules (skip in --reschedule-indexed)
  if (!flags.rescheduleIndexed) {
    const indexingHash = computeIndexingHash()
    const indexingChanged =
      indexingHash && indexingHash !== tracking.indexingHash
    let indexedSlugs = new Set<string>()
    let indexedPostCounter = 0

    if (indexingChanged) {
      indexedSlugs = loadIndexedSlugs()
      if (indexedSlugs.size > 0) {
        console.log(
          `Found ${indexedSlugs.size} indexed blog post(s) in GSC coverage data`,
        )
      } else {
        console.log('Indexing data changed but no blog slugs found')
      }
    }

    if (indexingChanged) {
      tracking.indexingHash = indexingHash
    }

    for (const post of postsToProcess) {
      if (indexedSlugs.has(post.slug)) {
        const adjustedDate = addWorkingDays(new Date(), indexedPostCounter + 1)
        const randomMinute = Math.floor(Math.random() * 60)
        adjustedDate.setUTCHours(13, randomMinute, 0, 0)
        post.scheduleDate = adjustedDate
        indexedPostCounter++
      }
    }
  }

  // Process each post
  let successCount = 0
  let failCount = 0
  const results = new Map<string, 'success' | 'failed' | 'skipped'>()

  for (const post of postsToProcess) {
    const normalisedCanonical = post.canonicalUrl.replace(/\/+$/, '')
    const existing = existingArticles?.get(normalisedCanonical)
    const existingId = existing?.id

    const scheduledDateStr =
      post.scheduleDate.toISOString().slice(0, 19).replace('T', ' ') + ' UTC'
    const action = existingId ? 'UPDATE' : 'CREATE'
    const status = tracking.crossposted[post.slug] ? 'REPOST' : ''

    console.log(
      `\n[${action}]${status ? ' ' + status : ''} POST ${post.number}: "${post.title}"`,
    )
    console.log(`  Slug:        ${post.slug}`)
    console.log(`  Tags:        ${post.tags.join(', ')}`)
    console.log(`  Canonical:   ${post.canonicalUrl}`)
    if (flags.cover) {
      const img = getCoverImage(post.slug)
      console.log(`  Cover:       ${img ?? '(none)'}`)
    }
    console.log(`  Scheduled:   ${scheduledDateStr}`)
    if (existingId) {
      console.log(`  Existing ID: ${existingId}`)
    }
    console.log(`  Body:        ${post.body.split('\n').length} lines`)

    if (flags.dryRun) {
      results.set(post.slug, 'skipped (dry-run)')
      console.log('  → [DRY RUN] skipped')
      continue
    }

    try {
      let result: DevtoArticle
      if (existingId) {
        result = await updateArticle(post, existingId, flags.cover)
      } else {
        result = await createArticle(post, flags.cover)
      }

      tracking.crossposted[post.slug] = {
        devtoId: result.id,
        devtoSlug: result.slug,
        devtoUrl: result.url,
        scheduledDate: post.scheduleDate.toISOString(),
        crosspostedAt: new Date().toISOString(),
      }
      saveTracking(tracking)

      results.set(post.slug, 'success')
      console.log(`  → OK (ID: ${result.id}, URL: ${result.url})`)
      successCount++
    } catch (err) {
      results.set(post.slug, 'failed')
      console.error(`  → FAILED: ${(err as Error).message}`)
      failCount++
    }
  }

  // Summary
  const skipped = postsToProcess.length - successCount - failCount
  console.log(`\nDone. ${successCount} succeeded, ${failCount} failed, ${skipped} skipped.`)

  const totalCrossposted = Object.keys(tracking.crossposted).length
  const totalScheduled = allPosts.length

  if (!flags.dryRun) {
    console.log(`Tracking: ${totalCrossposted}/${totalScheduled} posts crossposted.`)
    writeCsvReport(allPosts, tracking, results)
  }

  if (failCount > 0) process.exit(1)
}

// ── CLI entry ──

if (!process.env.VITEST) {
  main().catch((err) => {
    console.error('Unhandled error:', err)
    process.exit(1)
  })
}
