import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@poropara/shared': path.resolve(__dirname, '../../packages/shared'),
      'components': path.resolve(__dirname, 'src/components'),
      'features': path.resolve(__dirname, 'src/features'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'assets': path.resolve(__dirname, 'src/assets'),
    },
    preserveSymlinks: true
  },
  optimizeDeps: {
    include: ['@poropara/shared']
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