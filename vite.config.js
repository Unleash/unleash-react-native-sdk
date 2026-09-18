import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

const externalDependencies = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {})
]

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'unleash-react-native'
    },
    rollupOptions: {
      external: id =>
        externalDependencies.some(
          dependency => id === dependency || id.startsWith(`${dependency}/`)
        )
    }
  },
  plugins: [dts()],
  test: {
    globals: true,
    environment: 'node'
  }
})
