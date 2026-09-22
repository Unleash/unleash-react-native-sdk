import { beforeEach, describe, expect, test, vi } from 'vitest'

const asyncStorage = vi.hoisted(() => ({
  getItem: vi.fn(),
  setItem: vi.fn()
}))

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: asyncStorage
}))

import { AsyncStorageProvider } from './asyncStorageProvider'

describe('AsyncStorageProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('serializes values using an app-specific key', async () => {
    const provider = new AsyncStorageProvider('app')

    await provider.save('flags', { enabled: true })

    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      'app:flags',
      '{"enabled":true}'
    )
  })

  test('deserializes stored values', async () => {
    asyncStorage.getItem.mockResolvedValue('{"enabled":true}')
    const provider = new AsyncStorageProvider('app')

    const value = await provider.get('flags')

    expect(asyncStorage.getItem).toHaveBeenCalledWith('app:flags')
    expect(value).toEqual({ enabled: true })
  })
})
