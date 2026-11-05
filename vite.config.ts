import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const BELOW_FOLD_ASSET_RE = /[\\/](sec2|sec4|sec5|sec6|sec7|faq|cta|footer)[\\/]/

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    // Keep critical Hero/Dashboard icons inlined for zero-waterfall first paint,
    // while serving larger below-the-fold SVGs as cached static assets instead of bloating index.js.
    assetsInlineLimit(filePath, content) {
      if (BELOW_FOLD_ASSET_RE.test(filePath) && content.byteLength > 512) {
        return false
      }
      return undefined
    },
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.endsWith('.css')) return undefined
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          if (/node_modules[\\/](gsap|lenis)[\\/]/.test(id)) return 'motion'
        },
      },
    },
  },
})
