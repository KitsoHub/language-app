// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:testing-library/react'],
  ignorePatterns: ['/dist/*'],
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
  files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  overrides:{ "env": {
        "jest/globals": true
      }}
};
