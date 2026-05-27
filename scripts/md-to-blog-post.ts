import fs from 'fs'
import path from 'path'
import { brand } from '../src/config/brand/brandConfig'
import { CONTENT_DIRS, CONTENT_PREFIX } from '../src/config/content/contentConfig'

export function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, content: raw }

  const frontmatter: Record<string, string> = {}
  for (const line of match[1]!.split('\n')) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    const key = line.slice(0, sep).trim()
    const val = line.slice(sep + 1).trim().replace(/^['"]|['"]$/g, '')
    if (key) frontmatter[key] = val
  }

  return { frontmatter, content: match[2]!.trimStart() }
}

if (process.env.VITEST) {
  // exit early when imported by tests
} else {
  const mdFile = process.argv[2]
  if (!mdFile) {
    console.error('Usage: npm run new-post my-post.md')
    process.exit(1)
  }

  const raw = fs.readFileSync(mdFile, 'utf-8')
  const { frontmatter, content } = parseFrontmatter(raw)
  const slug = path.basename(mdFile, '.md')

  const post = {
    title: frontmatter.title ?? 'FILL IN',
    date: frontmatter.date ?? new Date().toISOString().split('T')[0],
    description: frontmatter.description ?? 'FILL IN — max 160 chars',
    author: frontmatter.author ?? brand.defaultAuthor,
    tags: frontmatter.tags ? frontmatter.tags.split(',').map((t) => t.trim()) : ['FILL IN'],
    readTime: Math.ceil(content.split(' ').length / 200),
    featured: frontmatter.featured === 'true',
    content,
  }

  const outPath = `${CONTENT_PREFIX}/${CONTENT_DIRS.BLOG}/${slug}.json`
  fs.writeFileSync(outPath, JSON.stringify(post, null, 2))
  console.log(`Created: ${outPath}`)
  if (!frontmatter.title || !frontmatter.author) {
    console.log('Tip: add frontmatter to your .md file for auto-fill.')
    console.log('  ---')
    console.log('  title: My Post Title')
    console.log('  author: Your Name')
    console.log('  date: 2025-01-01')
    console.log('  tags: tag1, tag2')
    console.log('  description: A short summary')
    console.log('  featured: false')
    console.log('  ---')
  }
}
