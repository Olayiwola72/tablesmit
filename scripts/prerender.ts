import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`
const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.resolve(ROOT, 'dist')
const CONTENT_DIR = path.resolve(ROOT, 'src/content')
const VITE_BIN = path.resolve(ROOT, 'node_modules', '.bin', 'vite')

// ── Route discovery ──

const STATIC_ROUTES: string[] = [
  '/',
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

function getBlogRoutes(): string[] {
  const blogDir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(blogDir)) return []
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => `/blog/${f.replace(/\.ts$/, '')}`)
}

function getFeatureRoutes(): string[] {
  const featuresDir = path.join(CONTENT_DIR, 'features')
  if (!fs.existsSync(featuresDir)) return []
  return fs
    .readdirSync(featuresDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const filePath = path.join(featuresDir, f)
      try {
        const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Record<string, unknown>
        const slug = typeof raw.slug === 'string' ? raw.slug : f.replace(/\.json$/, '')
        return `/features/${slug}`
      } catch {
        return `/features/${f.replace(/\.json$/, '')}`
      }
    })
}

function getAllRoutes(): string[] {
  return [...STATIC_ROUTES, ...getBlogRoutes(), ...getFeatureRoutes()]
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
      reject(new Error('Server failed to start within 30 seconds'))
    }, 30000)

    server.stdout.on('data', (data: Buffer) => {
      const text = data.toString()
      if (text.includes('Local:')) {
        clearTimeout(timeout)
        resolve(() => {
          server.kill()
        })
      }
    })

    server.stderr.on('data', (data: Buffer) => {
      const text = data.toString()
      if (text.includes('Local:')) {
        clearTimeout(timeout)
        resolve(() => {
          server.kill()
        })
      }
    })

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
  const indexPath = path.join(DIST, 'index.html')
  if (!fs.existsSync(indexPath)) {
    console.error('Build not found. Run `npm run build` first.')
    process.exit(1)
  }

  const routes = getAllRoutes()
  console.log(`Prerendering ${routes.length} routes with Chromium…`)

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
          ? path.join(DIST, 'index.html')
          : path.join(DIST, route.slice(1), 'index.html')

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

prerender()
