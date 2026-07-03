import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Opportunity } from './opportunities.types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const LAUNCH_DIR = path.join(ROOT, 'public/launch')

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'robert-shaw-weekly',
    author: '@robert_shaw',
    url: 'https://x.com/robert_shaw/status/2048613184811188721',
    date: '2026-06-02',
    prompt: 'What are you building currently?',
    views: 12_000,
    replies: 284,
    status: 'replied',
    repliedAt: '2026-07-02T12:00:00.000Z',
    replyDraft:
      'Building Tablesmit — a free, open source table builder for writers and analysts.\n' +
      'Drag-to-resize columns, merge cells, paste from Excel, export to PDF/Excel/CSV.\n' +
      'No signup. Just a clean table tool.\n' +
      'tablesmit.com',
    imagePath: path.join(LAUNCH_DIR, 'ph-light-mode.png'),
  },
  {
    id: 'tanzila-saas',
    author: '@TanzilaSha9574',
    url: 'https://x.com/TanzilaSha9574/status/2053127442819420402',
    date: '2026-05-09',
    prompt: 'SaaS founders & indie hackers — what are you building?',
    views: 1_800,
    replies: 18,
    status: 'replied',
    repliedAt: '2026-07-02T12:00:00.000Z',
    replyDraft:
      'Building Tablesmit — a minimalist table builder for analytical writing.\n' +
      'Drag-to-resize, merge cells, paste from Excel, export to PDF/Excel/CSV.\n' +
      'Free, open source, no account needed.\n' +
      'tablesmit.com',
    imagePath: path.join(LAUNCH_DIR, 'ph-light-mode.png'),
  },
  {
    id: 'peter-mick-weekend',
    author: '@ThePeterMick',
    url: 'https://x.com/ThePeterMick/status/2048613184811188721',
    date: '2026-06-01',
    prompt: 'Working on your startup this weekend? Pitch it to us',
    views: 25_000,
    replies: 106,
    status: 'replied',
    repliedAt: '2026-07-02T12:00:00.000Z',
    replyDraft:
      'Building Tablesmit — a table builder for people who write.\n' +
      'Drag-to-resize columns, merge cells, paste from Excel, export to PDF/CSV/Excel.\n' +
      'Free, open source, made for researchers and writers.\n' +
      'tablesmit.com',
    imagePath: path.join(LAUNCH_DIR, 'tablesmit-drag-comparison.png'),
  },
  {
    id: 'startup-asap',
    author: '@StartupASAP',
    url: 'https://x.com/StartupASAP/status/2048613184811188721',
    date: '2026-05-30',
    prompt: "Startups: what's your best feature? Share links",
    views: 10_000,
    replies: 40,
    status: 'replied',
    repliedAt: '2026-07-02T12:00:00.000Z',
    replyDraft:
      'Building Tablesmit — a clean, free table builder for analytical writing.\n' +
      'Drag-to-resize, merge cells, paste from Excel, export to PDF/Excel/CSV.\n' +
      'No signup, open source.\n' +
      'tablesmit.com',
    imagePath: path.join(LAUNCH_DIR, 'ph-light-mode.png'),
  },
  {
    id: 'peter-mick-eyes',
    author: '@ThePeterMick',
    url: 'https://x.com/ThePeterMick/status/2048613184811188721',
    date: '2026-05-28',
    prompt: 'Want more eyes on your startup? Drop your pitch & URL',
    views: 20_000,
    replies: 91,
    status: 'replied',
    repliedAt: '2026-07-02T12:00:00.000Z',
    replyDraft:
      'Tablesmit — free, open source table builder.\n' +
      'Drag-to-resize columns, merge cells, paste from Excel, export to PDF/CSV.\n' +
      'Designed for writers, researchers, and analysts who need clean tables fast.\n' +
      'tablesmit.com',
    imagePath: path.join(LAUNCH_DIR, 'ph-light-mode.png'),
  },
]
