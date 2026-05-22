import fs from 'node:fs'
import path from 'node:path'
import type { UrlEntry } from './sitemap.types'

const SITE_URL = 'https://tablesmit.com'
const PUBLIC_DIR = path.resolve(import.meta.dirname, '../../public')
const CONTENT_DIR = path.resolve(import.meta.dirname, '../../src/content')

// ── Static pages from siteConfig ──
const staticPages: UrlEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/open-source', changefreq: 'monthly', priority: '0.7' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/features', changefreq: 'weekly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.4' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.4' },
  { loc: '/changelog', changefreq: 'monthly', priority: '0.6' },
  { loc: '/testimonials', changefreq: 'monthly', priority: '0.6' },
]

// ── Blog posts ──
function getBlogPosts(): UrlEntry[] {
  const blogDir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(blogDir)) return []

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.ts'))
  return files.map((file) => {
    const slug = file.replace(/\.ts$/, '')
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    // Extract date field from the TS module
    const dateMatch = content.match(/^\s*date:\s*['"](.+?)['"]/m)
    const lastmod = dateMatch?.[1]

    return {
      loc: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod,
    }
  })
}

// ── Feature pages ──
function getFeaturePages(): UrlEntry[] {
  const featuresDir = path.join(CONTENT_DIR, 'features')
  if (!fs.existsSync(featuresDir)) return []

  const files = fs.readdirSync(featuresDir).filter(f => f.endsWith('.json'))
  return files.map((file) => {
    const filePath = path.join(featuresDir, file)
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Record<string, unknown>
    return {
      loc: `/features/${String(raw.slug ?? file.replace(/\.json$/, ''))}`,
      changefreq: 'monthly',
      priority: '0.7',
    }
  })
}

// ── Gather all entries ──
function getAllEntries(): UrlEntry[] {
  return [
    ...staticPages,
    ...getBlogPosts(),
    ...getFeaturePages(),
  ]
}

// ── Generate XML ──
function generateXml(entries: UrlEntry[]): string {
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

// ── Write file ──
const entries = getAllEntries()
const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml')
fs.writeFileSync(sitemapPath, generateXml(entries), 'utf-8')
console.log(`Sitemap generated: ${sitemapPath} (${entries.length} URLs)`)
