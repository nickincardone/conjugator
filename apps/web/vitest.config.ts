import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
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
}) 