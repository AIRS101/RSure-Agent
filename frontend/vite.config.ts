import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: '/RSure-Agent/',
  build: {
    rollupOptions: {
      input: {
        paper: fileURLToPath(new URL('./index.html', import.meta.url)),
        demos: fileURLToPath(new URL('./demo/index.html', import.meta.url))
      }
    }
  }
})
