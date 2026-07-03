import fs from 'node:fs'
import { TwitterApi } from 'twitter-api-v2'

function getClient(): TwitterApi {
  const apiKey = process.env.TWITTER_API_KEY
  const apiSecret = process.env.TWITTER_API_SECRET
  const accessToken = process.env.TWITTER_ACCESS_TOKEN
  const accessSecret = process.env.TWITTER_ACCESS_SECRET

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    console.error('Missing Twitter API credentials. Set TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_SECRET.')
    process.exit(1)
  }

  return new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken,
    accessSecret,
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

export async function replyToTweet(
  tweetId: string,
  text: string,
  mediaPath?: string,
): Promise<string> {
  const client = getClient()
  let mediaIds: string[] | undefined
  if (mediaPath) {
    const mediaId = await uploadMedia(mediaPath)
    mediaIds = [mediaId]
  }
  const params: Record<string, unknown> = {
    reply: { in_reply_to_tweet_id: tweetId },
  }
  if (mediaIds) {
    params.media = { media_ids: mediaIds }
  }
  const { data } = await client.v2.tweet(text, params)
  return data.id
}
