export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  author: string
  tags: string[]
  readTime: number
  featured: boolean
  content: string
}
