import { chromium } from '@playwright/test'
import { spawn, type ChildProcess } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const DEV_URL = 'http://localhost:5173'
const MEDIA_DIR = path.resolve('scripts/scheduler/media')

interface Shot {
  name: string
  path: string
  url: string
  dark?: boolean
}

const SHOTS: Shot[] = [
  { name: 'home.png',  path: '/',              url: `${DEV_URL}/` },
  { name: '404.png',   path: '/does-not-exist', url: `${DEV_URL}/does-not-exist` },
  { name: 'dark.png',  path: '/',              url: `${DEV_URL}/`, dark: true },
  { name: 'about.png', path: '/about',         url: `${DEV_URL}/about` },
  { name: 'open-source.png', path: '/open-source', url: `${DEV_URL}/open-source` },
]

async function startServer(): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', '--port', '5173', '--host'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    const timeout = setTimeout(() => {
      reject(new Error('Dev server failed to start within 30s'))
    }, 30000)

    proc.stdout?.on('data', (data: Buffer) => {
      const text = data.toString()
      if (text.includes('Local:') || text.includes('localhost:5173')) {
        clearTimeout(timeout)
        resolve(proc)
      }
    })

    proc.stderr?.on('data', (data: Buffer) => {
      const text = data.toString()
      if (text.includes('Local:') || text.includes('localhost:5173')) {
        clearTimeout(timeout)
        resolve(proc)
      }
    })

    proc.on('error', (err) => { clearTimeout(timeout); reject(err) })
    proc.on('exit', (code) => { clearTimeout(timeout); reject(new Error(`Server exited with code ${code}`)) })
  })
}

function stopServer(proc: ChildProcess): void {
  proc.kill('SIGTERM')
}

async function capture(): Promise<void> {
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true })
  }

  console.log('Starting Vite dev server...')
  let server: ChildProcess | null = null

  try {
    server = await startServer()
    console.log('Dev server ready.')

    const browser = await chromium.launch({ headless: true })

    try {
      for (const shot of SHOTS) {
        console.log(`Capturing ${shot.name} (${shot.url})...`)
        const context = await browser.newContext({
          viewport: { width: 1280, height: 800 },
          deviceScaleFactor: 2,
        })

        try {
          if (shot.dark) {
            await context.addInitScript(() => {
              localStorage.setItem('tablesmit-theme', 'dark')
            })
          } else {
            await context.addInitScript(() => {
              localStorage.setItem('tablesmit-theme', 'light')
            })
          }

          const page = await context.newPage()
          await page.goto(shot.url, { waitUntil: 'networkidle', timeout: 20000 })
          await page.waitForTimeout(1500)

          const outPath = path.join(MEDIA_DIR, shot.name)
          await page.screenshot({ path: outPath, fullPage: true })
          const size = fs.statSync(outPath).size
          console.log(`  Saved: ${outPath} (${(size / 1024).toFixed(1)} KB)`)
        } finally {
          await context.close()
        }
      }
    } finally {
      await browser.close()
    }

    console.log('\nAll screenshots captured.')
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`Capture failed: ${message}`)
    process.exit(1)
  } finally {
    if (server) stopServer(server)
  }
}

capture()
