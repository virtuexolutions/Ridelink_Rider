const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');


/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(getDefaultConfig(__dirname), {
    resolver: {
      assetExts: [
        'png',
        'jpg',
        'jpeg',
        'svg',
        'gif',
        'webp',
        'mp4',
        'mp3',
        'wav',
      ],
      sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],
    },
  }),
);