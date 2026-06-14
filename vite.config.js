import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split large, rarely-changing vendors into their own long-cache chunks
        // so they download in parallel and survive app-code deploys.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/.test(id))
            return 'react'
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion'))
            return 'motion'
        },
      },
    },
  },
})
