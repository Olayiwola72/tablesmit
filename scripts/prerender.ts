import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import Critters from 'critters'
import { chromium } from 'playwright'
import { CONTENT_DIRS } from '../src/config/content/contentConfig'

function readPackageConfig(): { prerenderDir: string } {
  try {
    const pkgPath = path.resolve(import.meta.dirname, '..', 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    return { prerenderDir: pkg.config?.prerenderDir ?? 'prerendered' }
  } catch {
    return { prerenderDir: 'prerendered' }
  }
}

export const PRERENDER_OUT_DIR = readPackageConfig().prerenderDir

const PORT = 4173
const ROOT = path.resolve(import.meta.dirname, '..')
const CONTENT_DIR = path.resolve(ROOT, 'src/content')

// ── CLI arg parsing ──

export function parseArgs(argv: string[]): { outDir: string } {
  const idx = argv.indexOf('--out-dir')
  if (idx !== -1 && idx + 1 < argv.length) {
    return { outDir: path.resolve(ROOT, argv[idx + 1]) }
  }
  return { outDir: path.resolve(ROOT, PRERENDER_OUT_DIR) }
}

// ── Route discovery ──

export const STATIC_ROUTES: string[] = [
  '/about/',
  '/open-source/',
  '/blog/',
  '/features/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/changelog/',
  '/testimonials/',
]

// Config paths (relative to project root) that drive content on prerendered pages.
// When any file under these paths changes, the pre-commit hook should re-prerender.
export const CONFIG_WATCH_PATHS: Record<string, string[]> = {
  'src/content':               ['/blog/', '/features/'],
  'src/config/changelog':      ['/changelog/'],
  'src/config/testimonials':    ['/testimonials/'],
  'src/config/sponsors':       ['/open-source/'],
  'src/config/brand':          ['/about/', '/open-source/', '/contact/', '/privacy/', '/terms/', '/testimonials/'],
}

export function getConfigWatchPaths(): string[] {
  return Object.keys(CONFIG_WATCH_PATHS)
}

export function getBlogRoutes(
  contentDir: string,
  exists: (p: string) => boolean,
  readDir: (p: string) => string[],
): string[] {
  const blogDir = path.join(contentDir, CONTENT_DIRS.BLOG)
  if (!exists(blogDir)) return []
  return readDir(blogDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => `/blog/${f.replace(/\.ts$/, '')}/`)
}

export function getFeatureRoutes(
  contentDir: string,
  exists: (p: string) => boolean,
  readDir: (p: string) => string[],
  readFile: (p: string) => string,
): string[] {
  const featuresDir = path.join(contentDir, CONTENT_DIRS.FEATURES)
  if (!exists(featuresDir)) return []
  return readDir(featuresDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const filePath = path.join(featuresDir, f)
      try {
        const raw = JSON.parse(readFile(filePath)) as Record<string, unknown>
        const slug = typeof raw.slug === 'string' ? raw.slug : f.replace(/\.json$/, '')
        return `/features/${slug}/`
      } catch {
        return `/features/${f.replace(/\.json$/, '')}/`
      }
    })
}

export function getAllRoutes(
  contentDir: string,
  exists: (p: string) => boolean,
  readDir: (p: string) => string[],
  readFile: (p: string) => string,
): string[] {
  return [
    ...STATIC_ROUTES,
    ...getBlogRoutes(contentDir, exists, readDir),
    ...getFeatureRoutes(contentDir, exists, readDir, readFile),
  ]
}

// ── Playwright check ──

async function isPlaywrightAvailable(): Promise<boolean> {
  try {
    const browser = await chromium.launch({ headless: true })
    await browser.close()
    return true
  } catch {
    return false
  }
}

// ── Tiny static server (replaces `vite preview` — starts instantly) ──

const MIME: Record<string, string> = {
  '.js':    'text/javascript',
  '.css':   'text/css',
  '.html':  'text/html',
  '.svg':   'image/svg+xml',
  '.png':   'image/png',
  '.json':  'application/json',
  '.woff2': 'font/woff2',
}

function startServer(buildDir: string, port: number): Promise<{ baseUrl: string; stop: () => void }> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url ?? '/'
      if (urlPath.includes('..')) { res.writeHead(403); res.end(); return }

      // SPA fallback: serve index.html for any non-file route
      let filePath = path.join(buildDir, urlPath === '/' ? 'index.html' : urlPath)
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(buildDir, 'index.html')
      }

      const ext = path.extname(filePath)
      const contentType = MIME[ext] ?? 'application/octet-stream'
      const content = fs.readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content)
    })

    server.listen(port, '127.0.0.1')
    resolve({
      baseUrl: `http://127.0.0.1:${port}`,
      stop: () => { server.close() },
    })
  })
}

// ── Critters post-processing ──

async function inlineCssInDir(outDir: string, buildDir: string): Promise<void> {
  const cssFile = fs.readdirSync(path.join(buildDir, 'assets'))
    .find((f) => f.startsWith('index-') && f.endsWith('.css'))
  if (!cssFile) {
    console.warn('⚠ No CSS file found in dist/assets — skipping Critters inlining')
    return
  }

  const htmlFiles: string[] = []
  function collect(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) collect(full)
      else if (e.name === 'index.html') htmlFiles.push(full)
    }
  }
  collect(outDir)

  if (htmlFiles.length === 0) return

  const critter = new Critters({
    path: 'dist',
    reduceInlineStyles: true,
    pruneSource: true,
    logLevel: 'warn',
  })

  let processedCount = 0
  const absBuildIndex = path.resolve(buildDir, 'index.html')
  for (const file of htmlFiles) {
    if (path.resolve(file) === absBuildIndex) continue

    let content = fs.readFileSync(file, 'utf-8')

    // Fix up stale CSS reference to match current build hash
    content = content.replace(
      /href="\/assets\/index-[^"]+\.css"/,
      `href="/assets/${cssFile}"`
    )
    content = content.replace(
      /href="\/assets\/index-[^"]+\.css" as="style"/,
      `href="/assets/${cssFile}" as="style"`
    )

    content = await critter.process(content)
    content = content.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, '')
    fs.writeFileSync(file, content, 'utf-8')
    processedCount++
  }

  console.log(`  Inlined CSS in ${processedCount} prerendered pages via Critters`)
}

// ── Prerender ──

async function prerender(): Promise<void> {
  if (!(await isPlaywrightAvailable())) {
    console.warn('⚠ Playwright browsers not installed. Skipping prerender.')
    console.warn('  Install with: npx playwright install chromium')
    return
  }

  const { outDir } = parseArgs(process.argv)
  const buildDir = path.resolve(ROOT, 'dist')
  const indexPath = path.join(buildDir, 'index.html')

  if (!fs.existsSync(indexPath)) {
    console.warn('⚠ Build not found. Skipping prerender.')
    console.warn('  Run `npm run build` first or ensure dist/ exists.')
    return
  }

  const routes = getAllRoutes(CONTENT_DIR, (p) => fs.existsSync(p), (p) => fs.readdirSync(p), (p) => fs.readFileSync(p, 'utf-8'))
  console.log(`Prerendering ${routes.length} routes to ${outDir}…`)

  console.log('Starting static server…')
  const { baseUrl, stop: stopServer } = await startServer(buildDir, PORT)
  console.log(`Server ready at ${baseUrl}`)

  const browser = await chromium.launch({ headless: true })
  let successCount = 0
  let failCount = 0

  for (const route of routes) {
    const url = `${baseUrl}${route}`
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForSelector('#root', { timeout: 10000 })
      await page.waitForTimeout(500)

      const html = await page.content()

      const outputPath =
        route === '/'
          ? path.join(outDir, 'index.html')
          : path.join(outDir, route.slice(1), 'index.html')

      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.writeFileSync(outputPath, html, 'utf-8')

      console.log(`  ✓ ${route}`)
      successCount++
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`  ✗ ${route}: ${message}`)
      failCount++
    } finally {
      await page.close()
    }
  }

  await browser.close()
  stopServer()

  await inlineCssInDir(outDir, buildDir)

  if (buildDir !== outDir) {
    const assetsSrc = path.join(buildDir, 'assets')
    const assetsDst = path.join(outDir, 'assets')
    if (fs.existsSync(assetsSrc)) {
      fs.cpSync(assetsSrc, assetsDst, { recursive: true })
      console.log('  Copied assets directory')
    }
  }

  console.log(`\nDone — ${successCount} succeeded, ${failCount} failed`)
  if (failCount > 0) process.exit(1)
}

// ── CLI entry ──
if (!process.env.VITEST) {
  prerender().catch((err: Error) => {
    console.error(`✗ Prerender failed: ${err.message}`)
    process.exit(1)
  })
}
