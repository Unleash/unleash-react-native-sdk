import { beforeEach, describe, expect, test, vi } from 'vitest'
import { InMemoryStorageProvider } from 'unleash-proxy-client'

const platform = vi.hoisted(() => ({ OS: 'web' }))

vi.mock('react-native', () => ({
  Platform: platform
}))

import { AsyncStorageProvider } from './asyncStorageProvider'
import { createDefaultStorageProvider } from './defaultStorageProvider'

describe('createDefaultStorageProvider', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
    platform.OS = 'web'
  })

  test('uses in-memory storage during web server rendering', () => {
    expect(createDefaultStorageProvider('app')).toBeInstanceOf(
      InMemoryStorageProvider
    )
  })

  test('uses Async Storage in the browser', () => {
    vi.stubGlobal('window', {})

    expect(createDefaultStorageProvider('app')).toBeInstanceOf(
      AsyncStorageProvider
    )
  })

  test('uses Async Storage on native when window is unavailable', () => {
    platform.OS = 'ios'

    expect(createDefaultStorageProvider('app')).toBeInstanceOf(
      AsyncStorageProvider
    )
  })
})
