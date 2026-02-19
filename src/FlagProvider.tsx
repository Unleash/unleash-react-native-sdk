import React, { type PropsWithChildren } from 'react'
import {
  FlagProvider as BaseFlagProvider,
  type IFlagProvider
} from '@unleash/proxy-client-react'
import { AsyncStorageProvider } from './asyncStorageProvider'

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
        config.storageProvider ?? new AsyncStorageProvider(config.appName)
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
