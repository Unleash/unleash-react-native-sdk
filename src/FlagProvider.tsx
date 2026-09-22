import {
  FlagProvider as BaseFlagProvider,
  type IFlagProvider
} from '@unleash/proxy-client-react'
import type { PropsWithChildren } from 'react'
import { createDefaultStorageProvider } from './defaultStorageProvider'

export const FlagProvider = ({
  config,
  startTransition = fn => fn(),
  ...props
}: PropsWithChildren<IFlagProvider>) => {
  let reactNativeConfig = config
  if (config) {
    reactNativeConfig = {
      ...config,
      storageProvider:
        config.storageProvider ?? createDefaultStorageProvider(config.appName)
    }
  }

  return (
    <BaseFlagProvider
      {...props}
      config={reactNativeConfig}
      startTransition={startTransition}
    />
  )
}

export default FlagProvider
