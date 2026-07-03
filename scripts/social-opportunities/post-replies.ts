import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { replyToTweet } from '../scheduler/client'
import { OPPORTUNITIES } from './opportunities.data'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const LOG_PATH = path.join(__dirname, 'reply-log.json')

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

// ── Reply log ──

interface LogEntry {
  opportunityId: string
  tweetId: string
  repliedAt: string
}

function readLog(): LogEntry[] {
  try {
    if (!fs.existsSync(LOG_PATH)) return []
    return JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8')) as LogEntry[]
  } catch {
    return []
  }
}

function writeLog(entries: LogEntry[]): void {
  fs.writeFileSync(LOG_PATH, JSON.stringify(entries, null, 2) + '\n')
}

// ── Verify image exists ──

function verifyImage(imagePath: string): boolean {
  if (!fs.existsSync(imagePath)) {
    console.error(`  ✗ Image not found: ${imagePath}`)
    return false
  }
  return true
}

// ── Main ──

async function main(): Promise<void> {
  loadEnv()

  const log = readLog()
  const repliedIds = new Set(log.map((e) => e.opportunityId))

  const pending = OPPORTUNITIES.filter(
    (o) => o.status === 'new' && !repliedIds.has(o.id),
  )

  if (pending.length === 0) {
    console.log('No pending opportunities to reply to.')
    return
  }

  console.log(`Found ${pending.length} opportunity(ies) to reply to.\n`)

  let successCount = 0
  let failCount = 0

  for (const opp of pending) {
    console.log(`[${opp.id}] Replying to ${opp.author}...`)
    console.log(`  URL: ${opp.url}`)
    console.log(`  Views: ${(opp.views / 1000).toFixed(1)}K · Replies: ${opp.replies}`)
    console.log(`  Image: ${path.basename(opp.imagePath)}`)

    if (!verifyImage(opp.imagePath)) {
      failCount++
      continue
    }

    try {
      const tweetId = await replyToTweet(opp.url.split('/status/')[1]!.split('?')[0]!, opp.replyDraft, opp.imagePath)
      log.push({
        opportunityId: opp.id,
        tweetId,
        repliedAt: new Date().toISOString(),
      })
      writeLog(log)
      console.log(`  ✓ Replied! Tweet ID: ${tweetId}`)
      successCount++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ✗ Failed: ${msg}`)
      failCount++
    }

    console.log('')
  }

  console.log(`Done. ${successCount} succeeded, ${failCount} failed.`)

  if (failCount > 0) process.exit(1)
}

if (!process.env.VITEST) {
  main().catch((err) => {
    console.error('Unhandled error:', err)
    process.exit(1)
  })
}
