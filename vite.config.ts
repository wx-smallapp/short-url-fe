import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // /api/gen => https://meumfj-sqgvog-3000.preview.myide.io/gen
      // '/api': {
      //   target: 'https://meumfj-sqgvog-3000.preview.myide.io',
      //   changeOrigin: true,
      //   secure: false,
      //   headers: {
      //     Referer: 'https://meumfj-sqgvog-3000.preview.myide.io'
      //   },
      //   rewrite: (path) => {
      //     console.log(path, path.replace(/^\/api/, ''))
      //     return path.replace(/^\/api/, '')
      //   }
      // },
    },
    // cors: true
  }
})
