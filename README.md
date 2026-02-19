# unleash-react-native

A React Native / Expo SDK for Unleash.

```sh
yarn add @unleash/unleash-react-native unleash-proxy-client
```

Check out the demo app: [unleash-react-native-demo](https://github.com/nunogois/unleash-react-native-demo).

A successor to [proxy-client-react-native](https://github.com/nunogois/proxy-client-react-native). Unlike the previous version, this SDK is a slim React Native-focused wrapper around the existing Unleash's React SDK, [proxy-client-react](https://github.com/Unleash/proxy-client-react), with built-in out-of-the-box support for React Native by implementing the recommended workarounds, making it easier to maintain and ensure compatibility between the two.

You should refer to the documentation of [proxy-client-react](https://github.com/Unleash/proxy-client-react) for more information on how to use the SDK. Simply replace the import statements from `@unleash/proxy-client-react` to `@unleash/unleash-react-native-sdk`.
