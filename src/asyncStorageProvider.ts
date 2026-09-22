import AsyncStorage from '@react-native-async-storage/async-storage'
import type { IStorageProvider } from 'unleash-proxy-client'

export class AsyncStorageProvider implements IStorageProvider {
  private prefix: string

  constructor(name = 'unleash:repository') {
    this.prefix = name
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is used to match the IStorageProvider interface
  public async save(name: string, data: any) {
    try {
      const repo = JSON.stringify(data)
      const key = `${this.prefix}:${name}`
      await AsyncStorage.setItem(key, repo)
    } catch (e) {
      console.error(e)
    }
  }

  public async get(name: string) {
    try {
      const key = `${this.prefix}:${name}`
      const data = await AsyncStorage.getItem(key)
      return data ? JSON.parse(data) : undefined
    } catch (e) {
      console.error(e)
    }
  }
}
