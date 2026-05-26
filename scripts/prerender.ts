import fs from 'node:fs'
import path from 'node:path'
import { spawn, execSync } from 'node:child_process'
import { chromium } from 'playwright'

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
const BASE_URL = `http://localhost:${PORT}`
const ROOT = path.resolve(import.meta.dirname, '..')
const CONTENT_DIR = path.resolve(ROOT, 'src/content')
const VITE_BIN = path.resolve(ROOT, 'node_modules', '.bin', 'vite')
const SERVER_TIMEOUT = 90_000

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
  '/about',
  '/open-source',
  '/blog',
  '/features',
  '/contact',
  '/privacy',
  '/terms',
  '/changelog',
  '/testimonials',
]

export function getBlogRoutes(
  contentDir: string,
  exists: (p: string) => boolean,
  readDir: (p: string) => string[],
): string[] {
  const blogDir = path.join(contentDir, 'blog')
  if (!exists(blogDir)) return []
  return readDir(blogDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => `/blog/${f.replace(/\.ts$/, '')}`)
}

export function getFeatureRoutes(
  contentDir: string,
  exists: (p: string) => boolean,
  readDir: (p: string) => string[],
  readFile: (p: string) => string,
): string[] {
  const featuresDir = path.join(contentDir, 'features')
  if (!exists(featuresDir)) return []
  return readDir(featuresDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const filePath = path.join(featuresDir, f)
      try {
        const raw = JSON.parse(readFile(filePath)) as Record<string, unknown>
        const slug = typeof raw.slug === 'string' ? raw.slug : f.replace(/\.json$/, '')
        return `/features/${slug}`
      } catch {
        return `/features/${f.replace(/\.json$/, '')}`
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

function isPlaywrightAvailable(): boolean {
  try {
    execSync('npx playwright install --dry-run', {
      stdio: 'ignore',
      timeout: 10_000,
    })
    return true
  } catch {
    return false
  }
}

// ── Playwright check ──

function isPlaywrightAvailable(): boolean {
  try {
    execSync('npx playwright install --dry-run', {
      stdio: 'ignore',
      timeout: 10_000,
    })
    return true
  } catch {
    return false
  }
}

// ── Server ──

function startServer(): Promise<() => void> {
  return new Promise((resolve, reject) => {
    const server = spawn(VITE_BIN, ['preview', '--port', String(PORT), '--strictPort'], {
      cwd: ROOT,
      stdio: 'pipe',
      env: { ...process.env, BROWSER: 'none' },
    })

    const timeout = setTimeout(() => {
      server.kill()
      reject(new Error('Server failed to start within 90 seconds'))
    }, SERVER_TIMEOUT)

    function onData(data: Buffer) {
      const text = data.toString()
      if (text.includes('Local:')) {
        clearTimeout(timeout)
        resolve(() => {
          server.kill()
        })
      }
    }

    server.stdout.on('data', onData)
    server.stderr.on('data', onData)

    server.on('error', (err: Error) => {
      clearTimeout(timeout)
      reject(err)
    })

    server.on('exit', (code: number | null) => {
      clearTimeout(timeout)
      if (code !== 0) {
        reject(new Error(`Server exited with code ${code}`))
      }
    })
  })
}

// ── Prerender ──

async function prerender(): Promise<void> {
  if (!isPlaywrightAvailable()) {
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

  console.log('Starting vite preview server…')
  const stopServer = await startServer()
  console.log(`Server ready at ${BASE_URL}`)

  const browser = await chromium.launch({ headless: true })
  let successCount = 0
  let failCount = 0

  for (const route of routes) {
    const url = `${BASE_URL}${route}`
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

  console.log(`\nDone — ${successCount} succeeded, ${failCount} failed`)
  if (failCount > 0) process.exit(1)
}

// ── CLI entry ──
if (!process.env.VITEST) {
  prerender().catch((err: Error) => {
    console.warn(`⚠ Prerender skipped: ${err.message}`)
  })
}
