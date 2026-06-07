import fs from 'node:fs'
import path from 'node:path'
import { TWEETS } from './tweet-content'
import { postTweet, uploadMedia } from './client'

const LOG_PATH = path.resolve('scripts/scheduler/tweet-log.json')
const MEDIA_DIR = path.resolve('scripts/scheduler/media')

function getEstDayAndHour(): { day: number; hour: number } {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  })
  const parts = formatter.formatToParts(now)

  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }

  let day = -1
  let hour = -1

  for (const part of parts) {
    if (part.type === 'weekday') day = dayMap[part.value] ?? -1
    if (part.type === 'hour') hour = Number.parseInt(part.value, 10)
  }

  return { day, hour }
}

function readLog(): string[] {
  try {
    if (!fs.existsSync(LOG_PATH)) return []
    const raw = fs.readFileSync(LOG_PATH, 'utf-8')
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
}

function writeLog(ids: string[]): void {
  fs.writeFileSync(LOG_PATH, JSON.stringify(ids, null, 2) + '\n')
}

async function main(): Promise<void> {
  const { day, hour } = getEstDayAndHour()

  const tweet = TWEETS.find((t) => t.day === day && t.hour === hour)

  if (!tweet) {
    console.log(`No tweet scheduled for day ${day} at hour ${hour} EST.`)
    return
  }

  const posted = readLog()

  if (posted.includes(tweet.id)) {
    console.log(`Tweet ${tweet.id} already posted. Skipping.`)
    return
  }

  console.log(`Posting tweet ${tweet.id} (day ${tweet.day}, ${tweet.hour}00 EST)...`)
  console.log(`---\n${tweet.text}\n---`)

  try {
    let mediaIds: string[] | undefined

    if (tweet.media) {
      const mediaPath = path.join(MEDIA_DIR, tweet.media)
      if (fs.existsSync(mediaPath)) {
        console.log(`Uploading media: ${tweet.media}`)
        const mediaId = await uploadMedia(mediaPath)
        mediaIds = [mediaId]
        console.log(`Media uploaded. ID: ${mediaId}`)
      } else {
        console.log(`Media file not found: ${mediaPath}. Posting without image.`)
      }
    }

    const tweetId = await postTweet(tweet.text, mediaIds)
    posted.push(tweet.id)
    writeLog(posted)
    console.log(`Posted successfully. ID: ${tweetId}`)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`Failed to post tweet ${tweet.id}: ${message}`)
    process.exit(1)
  }
}

main()
