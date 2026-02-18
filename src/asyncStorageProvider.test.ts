import { beforeEach, describe, expect, test, vi } from 'vitest'

const storage = vi.hoisted(() => ({
  getItem: vi.fn<
    Parameters<(key: string) => Promise<string | null>>,
    Promise<string | null>
  >(),
  setItem: vi.fn<
    Parameters<(key: string, value: string) => Promise<void>>,
    Promise<void>
  >()
}))

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: storage.getItem,
    setItem: storage.setItem
  }
}))

import { AsyncStorageProvider } from './asyncStorageProvider'

describe('AsyncStorageProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('save() writes JSON to the expected key', async () => {
    storage.setItem.mockResolvedValue(undefined)

    const provider = new AsyncStorageProvider('my-prefix')
    await provider.save('repo', { a: 1 })

    expect(storage.setItem).toHaveBeenCalledWith('my-prefix:repo', '{"a":1}')
  })

  test('get() reads JSON and parses it', async () => {
    storage.getItem.mockResolvedValue('{"b":2}')

    const provider = new AsyncStorageProvider('my-prefix')
    const result = await provider.get('repo')

    expect(storage.getItem).toHaveBeenCalledWith('my-prefix:repo')
    expect(result).toEqual({ b: 2 })
  })

  test('get() returns undefined when storage is empty', async () => {
    storage.getItem.mockResolvedValue(null)

    const provider = new AsyncStorageProvider('my-prefix')
    const result = await provider.get('repo')

    expect(result).toBeUndefined()
  })

  test('save() catches errors and logs them', async () => {
    const err = new Error('boom')
    storage.setItem.mockRejectedValue(err)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const provider = new AsyncStorageProvider('my-prefix')
    await provider.save('repo', { a: 1 })

    expect(consoleSpy).toHaveBeenCalledWith(err)
    consoleSpy.mockRestore()
  })

  test('get() catches errors, logs them, and returns undefined', async () => {
    const err = new Error('boom')
    storage.getItem.mockRejectedValue(err)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const provider = new AsyncStorageProvider('my-prefix')
    const result = await provider.get('repo')

    expect(consoleSpy).toHaveBeenCalledWith(err)
    expect(result).toBeUndefined()
    consoleSpy.mockRestore()
  })
})
