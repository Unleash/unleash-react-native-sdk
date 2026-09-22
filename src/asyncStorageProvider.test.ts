import { beforeEach, describe, expect, test, vi } from 'vitest'

const asyncStorage = vi.hoisted(() => ({
  getItem: vi.fn(),
  setItem: vi.fn()
}))

const platform = vi.hoisted(() => ({ OS: 'web' }))

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: asyncStorage
}))

vi.mock('react-native', () => ({
  Platform: platform
}))

import { AsyncStorageProvider } from './asyncStorageProvider'

describe('AsyncStorageProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
    platform.OS = 'web'
  })

  test('does not access Async Storage during server rendering', async () => {
    const provider = new AsyncStorageProvider('app')

    await provider.save('flags', { enabled: true })
    const value = await provider.get('flags')

    expect(asyncStorage.setItem).not.toHaveBeenCalled()
    expect(asyncStorage.getItem).not.toHaveBeenCalled()
    expect(value).toBeUndefined()
  })

  test('uses Async Storage when window is available', async () => {
    vi.stubGlobal('window', {})
    asyncStorage.getItem.mockResolvedValue('{"enabled":true}')
    const provider = new AsyncStorageProvider('app')

    await provider.save('flags', { enabled: true })
    const value = await provider.get('flags')

    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      'app:flags',
      '{"enabled":true}'
    )
    expect(asyncStorage.getItem).toHaveBeenCalledWith('app:flags')
    expect(value).toEqual({ enabled: true })
  })

  test('uses Async Storage on native when window is unavailable', async () => {
    platform.OS = 'ios'
    const provider = new AsyncStorageProvider('app')

    await provider.save('flags', { enabled: true })

    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      'app:flags',
      '{"enabled":true}'
    )
  })
})
