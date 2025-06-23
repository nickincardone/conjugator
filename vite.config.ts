import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'data': resolve(__dirname, 'src/data'),
      'types': resolve(__dirname, 'src/types'),
      'components': resolve(__dirname, 'src/components'),
      'utils': resolve(__dirname, 'src/utils'),
      'features': resolve(__dirname, 'src/features'),
      'structures': resolve(__dirname, 'src/structures'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Additional SCSS options can be added here if needed
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build',
    sourcemap: true
  }
}) 