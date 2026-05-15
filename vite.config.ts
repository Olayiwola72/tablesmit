import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id): string | undefined {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/class-variance-authority') || id.includes('node_modules/clsx')) {
            return 'vendor-ui'
          }
          if (id.includes('node_modules/jspdf') || id.includes('node_modules/html2canvas') || id.includes('node_modules/xlsx')) {
            return 'vendor-export'
          }
          return undefined
        },
      },
    },
  },
})
