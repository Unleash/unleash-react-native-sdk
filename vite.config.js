import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
      name: 'UnleashReactNative',
      fileName: 'unleash-react-native'
    },
    rollupOptions: {
      external: ['react', 'unleash-proxy-client'],
      output: {
        exports: 'named',
        globals: {
          react: 'react'
        }
      }
    }
  },
  plugins: [dts()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testSetup.js'
  }
})
