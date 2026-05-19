import fs from 'fs'
import path from 'path'

const mdFile = process.argv[2]
if (!mdFile) {
  console.error('Usage: npm run new-post my-post.md')
  process.exit(1)
}

const content = fs.readFileSync(mdFile, 'utf-8')
const slug = path.basename(mdFile, '.md')

const post = {
  title: 'FILL IN',
  date: new Date().toISOString().split('T')[0],
  description: 'FILL IN — max 160 chars',
  author: 'Olayiwola Akinnagbe',
  tags: ['FILL IN'],
  readTime: Math.ceil(content.split(' ').length / 200),
  featured: false,
  content: content,
}

const outPath = `src/content/blog/${slug}.json`
fs.writeFileSync(outPath, JSON.stringify(post, null, 2))
console.log(`Created: ${outPath}`)
console.log('Fill in: title, description, tags')
