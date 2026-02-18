import { beforeEach, describe, expect, test, vi } from 'vitest'

const baseClient = vi.hoisted(() => ({
  BaseUnleashClient: vi.fn()
}))

vi.mock('unleash-proxy-client', () => ({
  UnleashClient: baseClient.BaseUnleashClient
}))

vi.mock('./asyncStorageProvider', () => ({
  AsyncStorageProvider: vi.fn().mockImplementation(appName => ({
    appName,
    get: vi.fn(),
    save: vi.fn()
  }))
}))

// Import after mocks so the module uses mocked dependencies
import { UnleashClient } from './unleashClient'
import { AsyncStorageProvider } from './asyncStorageProvider'

describe('UnleashClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('adds AsyncStorageProvider when config.storageProvider is missing', () => {
    const config = {
      appName: 'my-app',
      clientKey: 'my-secret',
      url: 'https://my-unleash-proxy'
    }

    new UnleashClient(config as any)

    expect(AsyncStorageProvider).toHaveBeenCalledWith('my-app')
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

    expect(AsyncStorageProvider).not.toHaveBeenCalled()
    expect(baseClient.BaseUnleashClient).toHaveBeenCalledWith(
      expect.objectContaining({
        ...config,
        storageProvider: customStorageProvider
      })
    )
  })
})
