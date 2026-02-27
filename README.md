# Unleash React Native SDK

Unleash is a private, secure, and scalable feature management platform built to reduce the risk of releasing new features and accelerate software development. This React Native / Expo SDK is designed to help you integrate with Unleash and evaluate feature flags inside your application.

You can use this SDK with [Unleash Enterprise](https://www.getunleash.io/pricing) or [Unleash Open Source](https://github.com/Unleash/unleash).

Full documentation: https://docs.getunleash.io/sdks/react-native

## Installation

### npm

```sh
npm install @unleash/unleash-react-native-sdk unleash-proxy-client
```

### Yarn

```sh
yarn add @unleash/unleash-react-native-sdk unleash-proxy-client
```

### Expo

```sh
npx expo install @unleash/unleash-react-native-sdk unleash-proxy-client
```

## Quick start

```tsx
import { FlagProvider, useFlag } from '@unleash/unleash-react-native-sdk';

const config = {
  url: 'https://<your-unleash-instance>/api/frontend',
  clientKey: '<your-frontend-token>',
  appName: 'my-app',
};

function MyComponent() {
  const isEnabled = useFlag('my-feature');
  return isEnabled ? <NewFeature /> : <OldFeature />;
}

export default function App() {
  return (
    <FlagProvider config={config}>
      <MyComponent />
    </FlagProvider>
  );
}
```

For configuration options, context management, bootstrapping, testing, and troubleshooting, see the [full documentation](https://docs.getunleash.io/sdks/react-native).

## Contributing

### Requirements

- Node.js 18 or later
- Yarn

### Local development

```sh
git clone https://github.com/Unleash/unleash-react-native-sdk.git
cd unleash-react-native-sdk
yarn install
```

### Running tests

```sh
yarn test
```

### Building

```sh
yarn build
```

### Code style and formatting

See the [Unleash contribution guide](https://github.com/Unleash/unleash/blob/main/CONTRIBUTING.md) for general guidelines.

### Releasing

Releases are published to npm under the `@unleash` scope.

## License

Apache-2.0
