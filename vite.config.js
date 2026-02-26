import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'unleash-react-native'
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
        ...Object.keys(pkg.dependencies || {})
      ]
    }
  },
  plugins: [dts()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testSetup.js'
  }
})
