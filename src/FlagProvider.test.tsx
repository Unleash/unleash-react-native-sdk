import React from 'react'
import { render, screen } from '@testing-library/react'
import type { IFlagProvider } from '@unleash/proxy-client-react'
import FlagProvider from './FlagProvider'
import { AsyncStorageProvider } from './asyncStorageProvider'
import '@testing-library/jest-dom'

const givenConfig = {
  appName: 'my-app',
  clientKey: 'my-secret',
  url: 'https://my-unleash-proxy'
}

const baseProvider = vi.hoisted(() => ({
  BaseFlagProvider: vi.fn((props: React.PropsWithChildren<IFlagProvider>) => (
    <>{props.children}</>
  ))
}))

vi.mock('@unleash/proxy-client-react', () => ({
  FlagProvider: baseProvider.BaseFlagProvider
}))

vi.mock('./asyncStorageProvider', () => ({
  AsyncStorageProvider: vi.fn().mockImplementation(function (
    this: any,
    appName: string
  ) {
    this.appName = appName
    this.get = vi.fn()
    this.save = vi.fn()
  })
}))

beforeEach(() => {
  vi.clearAllMocks()
})

test('should create AsyncStorageProvider when no storageProvider is provided in config', () => {
  render(
    <FlagProvider config={givenConfig}>
      <div>Test</div>
    </FlagProvider>
  )

  expect(AsyncStorageProvider).toHaveBeenCalledWith(givenConfig.appName)

  const passedProps = baseProvider.BaseFlagProvider.mock.calls[0]?.[0]
  expect(passedProps?.config).toEqual(
    expect.objectContaining({
      ...givenConfig,
      storageProvider: expect.any(Object)
    })
  )
})

test('should use provided storageProvider from config instead of creating AsyncStorageProvider', () => {
  const customStorageProvider = { get: vi.fn(), save: vi.fn() }
  const configWithStorageProvider = {
    ...givenConfig,
    storageProvider: customStorageProvider
  }

  render(
    <FlagProvider config={configWithStorageProvider}>
      <div>Test</div>
    </FlagProvider>
  )

  expect(AsyncStorageProvider).not.toHaveBeenCalled()

  const passedProps = baseProvider.BaseFlagProvider.mock.calls[0]?.[0]
  expect(passedProps?.config).toEqual(
    expect.objectContaining({
      ...givenConfig,
      storageProvider: customStorageProvider
    })
  )
})

test('should pass startTransition function with default implementation', () => {
  const inner = vi.fn()

  render(
    <FlagProvider config={givenConfig}>
      <div>Test</div>
    </FlagProvider>
  )

  const passedProps = baseProvider.BaseFlagProvider.mock.calls[0]?.[0]
  expect(typeof passedProps?.startTransition).toBe('function')

  passedProps?.startTransition?.(inner)
  expect(inner).toHaveBeenCalledTimes(1)
})

test('should use custom startTransition function when provided', () => {
  const customStartTransition = vi.fn(fn => fn())

  render(
    <FlagProvider config={givenConfig} startTransition={customStartTransition}>
      <div>Test</div>
    </FlagProvider>
  )

  const passedProps = baseProvider.BaseFlagProvider.mock.calls[0]?.[0]
  expect(passedProps?.startTransition).toBe(customStartTransition)
})

test('should handle config being undefined', () => {
  render(
    <FlagProvider>
      <div>Test</div>
    </FlagProvider>
  )

  expect(screen.getByText('Test')).toBeInTheDocument()

  const passedProps = baseProvider.BaseFlagProvider.mock.calls[0]?.[0]
  expect(passedProps?.config).toBeUndefined()
})

test('should preserve all other config properties when adding storageProvider', () => {
  const extendedConfig = {
    ...givenConfig,
    disableSDK: false,
    refreshInterval: 5000
  }

  render(
    <FlagProvider config={extendedConfig}>
      <div>Test</div>
    </FlagProvider>
  )

  expect(screen.getByText('Test')).toBeInTheDocument()

  const passedProps = baseProvider.BaseFlagProvider.mock.calls[0]?.[0]
  expect(passedProps?.config).toEqual(
    expect.objectContaining({
      ...extendedConfig,
      storageProvider: expect.any(Object)
    })
  )
})

test('should forward non-config props to BaseFlagProvider', () => {
  render(
    <FlagProvider
      config={givenConfig}
      startClient={false}
      stopClient={true}
      unleashClient={{} as any}
    >
      <div>Test</div>
    </FlagProvider>
  )

  const passedProps = baseProvider.BaseFlagProvider.mock.calls[0]?.[0]
  expect(passedProps).toEqual(
    expect.objectContaining({
      startClient: false,
      stopClient: true,
      unleashClient: expect.any(Object)
    })
  )
})
