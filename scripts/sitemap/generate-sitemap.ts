import fs from 'node:fs'
import path from 'node:path'
import type { UrlEntry } from './sitemap.types'

const SITE_URL = 'https://tablesmit.com'

function slash(url: string): string {
  return url === '/' ? url : `${url}/`
}

export const STATIC_PAGES: UrlEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: slash('/about'), changefreq: 'monthly', priority: '0.7' },
  { loc: slash('/open-source'), changefreq: 'monthly', priority: '0.7' },
  { loc: slash('/blog'), changefreq: 'weekly', priority: '0.8' },
  { loc: slash('/features'), changefreq: 'weekly', priority: '0.8' },
  { loc: slash('/contact'), changefreq: 'monthly', priority: '0.6' },
  { loc: slash('/privacy'), changefreq: 'yearly', priority: '0.4' },
  { loc: slash('/terms'), changefreq: 'yearly', priority: '0.4' },
  { loc: slash('/changelog'), changefreq: 'monthly', priority: '0.6' },
  { loc: slash('/testimonials'), changefreq: 'monthly', priority: '0.6' },
]

export function getBlogPosts(contentDir: string, readFile: (p: string) => string, exists: (p: string) => boolean, readDir: (p: string) => string[]): UrlEntry[] {
  const blogDir = path.join(contentDir, 'blog')
  if (!exists(blogDir)) return []

  const files = readDir(blogDir).filter(f => f.endsWith('.ts'))
  return files.map((file) => {
    const slug = file.replace(/\.ts$/, '')
    const filePath = path.join(blogDir, file)
    const content = readFile(filePath)

    // Extract date field from the TS module
    const dateMatch = content.match(/^\s*date:\s*['"](.+?)['"]/m)
    const lastmod = dateMatch?.[1]

    return {
      loc: `/blog/${slug}/`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod,
    }
  })
}

export function getFeaturePages(contentDir: string, readFile: (p: string) => string, exists: (p: string) => boolean, readDir: (p: string) => string[]): UrlEntry[] {
  const featuresDir = path.join(contentDir, 'features')
  if (!exists(featuresDir)) return []

  const files = readDir(featuresDir).filter(f => f.endsWith('.json'))
  return files.map((file) => {
    const filePath = path.join(featuresDir, file)
    const raw = JSON.parse(readFile(filePath)) as Record<string, unknown>
    return {
      loc: `/features/${String(raw.slug ?? file.replace(/\.json$/, ''))}/`,
      changefreq: 'monthly',
      priority: '0.7',
    }
  })
}

export function getAllEntries(
  contentDir: string,
  readFile: (p: string) => string,
  exists: (p: string) => boolean,
  readDir: (p: string) => string[],
): UrlEntry[] {
  return [
    ...STATIC_PAGES,
    ...getBlogPosts(contentDir, readFile, exists, readDir),
    ...getFeaturePages(contentDir, readFile, exists, readDir),
  ]
}

export function generateXml(entries: UrlEntry[]): string {
  const urls = entries
    .map((entry) => {
      const parts = [
        `    <loc>${SITE_URL}${entry.loc}</loc>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
      ]
      if (entry.lastmod) {
        parts.splice(1, 0, `    <lastmod>${entry.lastmod}</lastmod>`)
      }
      return `  <url>\n${parts.join('\n')}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

// ── CLI entry ──
if (!process.env.VITEST) {
  const PUBLIC_DIR = path.resolve(import.meta.dirname, '../../public')
  const CONTENT_DIR = path.resolve(import.meta.dirname, '../../src/content')

  const entries = getAllEntries(CONTENT_DIR, (p) => fs.readFileSync(p, 'utf-8'), (p) => fs.existsSync(p), (p) => fs.readdirSync(p))
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml')
  fs.writeFileSync(sitemapPath, generateXml(entries), 'utf-8')
  console.log(`Sitemap generated: ${sitemapPath} (${entries.length} URLs)`)
}
