module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Always keep this last
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
