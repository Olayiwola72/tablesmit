export interface Opportunity {
  id: string
  author: string
  url: string
  date: string
  prompt: string
  views: number
  replies: number
  status: 'new' | 'replied' | 'skipped'
  replyDraft: string
  imagePath: string
  repliedAt?: string
  repliedTweetId?: string
}
