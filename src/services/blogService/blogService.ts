import type { BlogPost } from './blogService.types'

const postModules = import.meta.glob<{ default: BlogPost }>(
  '../../content/blog/*.ts',
  { eager: false }
)

let cache: BlogPost[] | null = null

async function ensureLoaded(): Promise<BlogPost[]> {
  if (cache) return cache
  const entries = Object.entries(postModules)
  const loaded = await Promise.all(
    entries.map(async ([path, load]) => {
      const slugFromPath = path.split('/').pop()?.replace(/\.(json|ts)$/, '') ?? ''
      const mod = await load()
      const post = mod.default
      if (typeof post.slug !== 'string' || post.slug === '') {
        post.slug = slugFromPath
      }
      return post
    })
  )
  cache = loaded.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  return cache
}

export async function getPostsPage(
  page: number,
  perPage: number
): Promise<{ posts: BlogPost[]; total: number }> {
  const all = await ensureLoaded()
  const start = (page - 1) * perPage
  return {
    posts: all.slice(start, start + perPage),
    total: all.length,
  }
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const all = await ensureLoaded()
  return all.find(p => p.slug === slug)
}

export async function getAllTags(): Promise<string[]> {
  const all = await ensureLoaded()
  return [...new Set(all.flatMap(p => p.tags))].sort()
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return ensureLoaded()
}
