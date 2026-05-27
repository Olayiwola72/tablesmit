import fs from 'node:fs'
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import Critters from 'critters'

function prerenderPlugin(): Plugin {
  const prerenderDir = process.env.npm_package_config_prerenderDir ?? 'prerendered'
  return {
    name: 'copy-prerendered',
    closeBundle() {
      const src = prerenderDir
      const dest = 'dist'
      if (!fs.existsSync(src)) {
        console.warn(`[prerender] Source directory "${src}" not found — skipping`)
        return
      }
      fs.cpSync(src, dest, { recursive: true, dereference: true })
      console.log(`[prerender] Copied "${src}" → "${dest}"`)
    },
  }
}

function isPackage(id: string, packageName: string): boolean {
  return id.replaceAll('\\', '/').includes(`/node_modules/${packageName}/`)
}

function actualCssFile(): string | null {
  const assets = readdirSync(path.resolve('dist/assets'))
  const css = assets.find(f => f.startsWith('index-') && f.endsWith('.css'))
  return css ? `/assets/${css}` : null
}

function crittersPlugin(): Plugin {
  return {
    name: 'critters',
    closeBundle: async () => {
        const distIndex = path.resolve('dist/index.html')
        if (!fs.existsSync(distIndex)) {
          console.warn('[critters] dist/index.html not found — skipping')
          return
        }

        // 1. Process main index.html (SPA shell) — inline above-fold CSS
        const critter = new Critters({
          path: 'dist',
          reduceInlineStyles: true,
          pruneSource: true,
          logLevel: 'warn',
        })
        let html = readFileSync(distIndex, 'utf-8')
        html = await critter.process(html)
        writeFileSync(distIndex, html)
        console.log('[critters] Inlined critical CSS in index.html')

        // 2. Process prerendered HTML files — use the actual CSS file
        const actualCss = actualCssFile()
        if (!actualCss) {
          console.warn('[critters] No CSS file found in dist/assets — skipping prerendered pages')
          return
        }

        const htmlFiles: string[] = []
        function collect(dir: string) {
          const entries = readdirSync(dir, { withFileTypes: true })
          for (const e of entries) {
            const full = path.join(dir, e.name)
            if (e.isDirectory()) collect(full)
            else if (e.name === 'index.html') htmlFiles.push(full)
          }
        }
        collect('dist')

        let processedCount = 0
        for (const file of htmlFiles) {
          if (file === distIndex) continue
          let content = readFileSync(file, 'utf-8')

          // Fix up stale CSS reference to match current build hash
          content = content.replace(
            /href="\/assets\/index-[^"]+\.css"/,
            `href="${actualCss}"`
          )

          // Fix up stale preload CSS reference too
          content = content.replace(
            /href="\/assets\/index-[^"]+\.css" as="style"/,
            `href="${actualCss}" as="style"`
          )

          const result = await critter.process(content)
          // For prerendered static pages, strip the external CSS link
          // since all used CSS is already inlined by critters
          const cleaned = result.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, '')
          // Also strip any stray preload+stylesheet link combos left by critters
          writeFileSync(file, cleaned)
          processedCount++
        }
        console.log(`[critters] Inlined CSS in ${processedCount} prerendered pages`)
    },
  }
}

function modulepreloadPlugin(): Plugin {
  return {
    name: 'modulepreload-table-maker',
    closeBundle: () => {
        const assetsDir = path.resolve('dist/assets')
        if (!fs.existsSync(assetsDir)) return
        const files = readdirSync(assetsDir)
        const tableMaker = files.find(f => f.startsWith('TableMakerPage-') && f.endsWith('.js'))
        if (!tableMaker) {
          console.warn('[modulepreload] TableMakerPage chunk not found — skipping')
          return
        }
        const indexPath = path.resolve('dist/index.html')
        let html = readFileSync(indexPath, 'utf-8')
        const href = `/assets/${tableMaker}`
        if (html.includes(href)) {
          // Already has a modulepreload or script tag referencing it — skip
          return
        }
        html = html.replace('</head>', `  <link rel="modulepreload" href="${href}">\n</head>`)
        writeFileSync(indexPath, html)
        console.log(`[modulepreload] Added preload for ${tableMaker}`)
    },
  }
}

const isAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
  plugins: [
    prerenderPlugin(),
    crittersPlugin(),
    modulepreloadPlugin(),
    react(),
    ...(isAnalyze
      ? [visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        })]
      : []),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'Tablesmit',
        short_name: 'Tablesmit',
        description: 'A minimalist table builder for analytical writing.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        globIgnores: [
          '**/exceljs.min-*.js',
          '**/jspdf.es.min-*.js',
          '**/html2canvas-*.js',
          '**/papaparse.min-*.js',
          '**/purify.es-*.js',
        ],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5242880,
        runtimeCaching: [
          {
            urlPattern: /\/assets\/(exceljs\.min|jspdf\.es\.min|html2canvas)-.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tablesmit-export-chunks',
              expiration: {
                maxEntries: 6,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id): string | undefined {
          if (isPackage(id, 'react') || isPackage(id, 'react-dom')) {
            return 'vendor-react'
          }
          if (isPackage(id, 'react-router-dom') || isPackage(id, 'scheduler')) {
            return 'vendor-router'
          }
          if (isPackage(id, 'i18next') || isPackage(id, 'react-i18next') || isPackage(id, 'i18next-browser-languagedetector')) {
            return 'vendor-i18n'
          }
          if (isPackage(id, '@sentry/react')) return 'vendor-sentry'
          if (isPackage(id, 'lucide-react') || isPackage(id, 'class-variance-authority') || isPackage(id, 'clsx') || isPackage(id, 'sonner')) {
            return 'vendor-ui'
          }
          return undefined
        },
      },
    },
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter(
          (dep) =>
            !dep.includes('jspdf.es.min') &&
            !dep.includes('html2canvas') &&
            !dep.includes('exceljs.min'),
        )
      },
    },
  },
})
