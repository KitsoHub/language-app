/** @type {import('jest').Config} */
const config = {
	preset: "jest-expo",
	verbose: true,
	setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
transformIgnorePatterns: [
    'node_modules/(?!(expo|expo-modules-core|expo-haptics|expo-router|expo-linear-gradient|expo-status-bar|react-native-reanimated|react-native|@react-native|@react-navigation|@expo|@unimodules)/)',
  ],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = config;
