import { beforeEach, describe, expect, test, vi } from 'vitest'

const baseClient = vi.hoisted(() => ({
  BaseUnleashClient: vi.fn()
}))

const storage = vi.hoisted(() => ({
  createDefaultStorageProvider: vi.fn(() => ({ get: vi.fn(), save: vi.fn() }))
}))

vi.mock('unleash-proxy-client', () => ({
  UnleashClient: baseClient.BaseUnleashClient
}))

vi.mock('./defaultStorageProvider', () => ({
  createDefaultStorageProvider: storage.createDefaultStorageProvider
}))

// Import after mocks so the module uses mocked dependencies
import { UnleashClient } from './unleashClient'

describe('UnleashClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('adds the default storage provider when none is configured', () => {
    const config = {
      appName: 'my-app',
      clientKey: 'my-secret',
      url: 'https://my-unleash-proxy'
    }

    new UnleashClient(config as any)

    expect(storage.createDefaultStorageProvider).toHaveBeenCalledWith('my-app')
    expect(baseClient.BaseUnleashClient).toHaveBeenCalledWith(
      expect.objectContaining({
        ...config,
        storageProvider: expect.any(Object)
      })
    )
  })

  test('preserves provided storageProvider', () => {
    const customStorageProvider = { get: vi.fn(), save: vi.fn() }
    const config = {
      appName: 'my-app',
      clientKey: 'my-secret',
      url: 'https://my-unleash-proxy',
      storageProvider: customStorageProvider
    }

    new UnleashClient(config as any)

    expect(storage.createDefaultStorageProvider).not.toHaveBeenCalled()
    expect(baseClient.BaseUnleashClient).toHaveBeenCalledWith(
      expect.objectContaining({
        ...config,
        storageProvider: customStorageProvider
      })
    )
  })
})
