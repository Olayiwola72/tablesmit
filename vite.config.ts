import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

function isPackage(id: string, packageName: string): boolean {
  return id.replaceAll('\\', '/').includes(`/node_modules/${packageName}/`)
}

const isAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
  plugins: [
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
          '**/vendor-excel-*.js',
          '**/vendor-canvas-*.js',
          '**/jspdf.es.min-*.js',
        ],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5242880,
        runtimeCaching: [
          {
            urlPattern: /\/assets\/(vendor-excel|vendor-canvas|jspdf\.es\.min)-.*\.js$/,
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
          if (isPackage(id, 'react') || isPackage(id, 'react-dom') || isPackage(id, 'react-router-dom') || isPackage(id, 'scheduler')) {
            return 'vendor-react'
          }
          if (isPackage(id, 'i18next') || isPackage(id, 'react-i18next') || isPackage(id, 'i18next-browser-languagedetector')) {
            return 'vendor-i18n'
          }
          if (isPackage(id, '@sentry/react')) return 'vendor-sentry'
          if (isPackage(id, 'lucide-react') || isPackage(id, 'class-variance-authority') || isPackage(id, 'clsx') || isPackage(id, 'sonner')) {
            return 'vendor-ui'
          }
          if (isPackage(id, 'html2canvas')) return 'vendor-canvas'
          if (isPackage(id, 'jspdf')) return 'vendor-pdf'
          if (isPackage(id, 'exceljs')) return 'vendor-excel'
          if (isPackage(id, 'papaparse')) return 'vendor-csv'
          if (isPackage(id, 'react-markdown') || isPackage(id, 'remark-gfm')) return 'vendor-blog'
          return undefined
        },
      },
    },
  },
})
