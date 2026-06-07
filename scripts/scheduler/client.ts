import fs from 'node:fs'
import { TwitterApi } from 'twitter-api-v2'

const API_KEY = process.env.TWITTER_API_KEY
const API_SECRET = process.env.TWITTER_API_SECRET
const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET

function getClient(): TwitterApi {
  if (!API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_SECRET) {
    console.error('Missing Twitter API credentials. Set TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_SECRET.')
    process.exit(1)
  }

  return new TwitterApi({
    appKey: API_KEY,
    appSecret: API_SECRET,
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_SECRET,
  })
}

export async function uploadMedia(filePath: string): Promise<string> {
  const client = getClient()
  const buffer = fs.readFileSync(filePath)
  const mediaId = await client.v1.uploadMedia(buffer, { mimeType: 'image/png' })
  return mediaId
}

export async function postTweet(text: string, mediaIds?: string[]): Promise<string> {
  const client = getClient()
  const { data } = await client.v2.tweet(text, mediaIds ? { media: { media_ids: mediaIds } } : undefined)
  return data.id
}
