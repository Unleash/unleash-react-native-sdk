import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'UnleashReactNative',
      fileName: 'unleash-react-native'
    },
    rollupOptions: {
      external: [
        'react',
        'react-native',
        '@react-native-async-storage/async-storage',
        '@unleash/proxy-client-react',
        'react-native-get-random-values',
        'unleash-proxy-client'
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-native': 'ReactNative'
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
