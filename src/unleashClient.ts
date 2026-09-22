import {
  UnleashClient as BaseUnleashClient,
  type IConfig
} from 'unleash-proxy-client'
import { createDefaultStorageProvider } from './defaultStorageProvider'

export class UnleashClient extends BaseUnleashClient {
  constructor(config: IConfig) {
    const reactNativeConfig = {
      ...config,
      storageProvider:
        config.storageProvider ?? createDefaultStorageProvider(config.appName)
    }

    super(reactNativeConfig)
  }
}
