import { Platform } from 'react-native'
import {
  InMemoryStorageProvider,
  type IStorageProvider
} from 'unleash-proxy-client'
import { AsyncStorageProvider } from './asyncStorageProvider'

const isServerRendering = () =>
  Platform.OS === 'web' && typeof window === 'undefined'

export const createDefaultStorageProvider = (
  name: string
): IStorageProvider =>
  isServerRendering()
    ? new InMemoryStorageProvider()
    : new AsyncStorageProvider(name)
