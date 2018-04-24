module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,mjs}"
  ],
  setupFiles: [
    "<rootDir>/config/polyfills.js",
    "<rootDir>/__tests__/setup.js",
    "<rootDir>/__tests__/setupEnzyme.js",
    "jest-localstorage-mock",
  ],
  testMatch: [
    "<rootDir>/__tests__/**/*.{js,jsx,mjs}"
  ],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
  ],
  coveragePathIgnorePatterns: [
    "node_modules/",
    "__tests__/",
    "assets/",
    "lib/",
    ".*/index.js",
    ".*/types.js",
    "src/registerServiceWorker.js"
  ],
  testPathIgnorePatterns: [
    "node_modules/",
    "assets/",
    "__tests__/setup.js",
    "__tests__/setupEnzyme.js",
    "__tests__/setupStoreMock.js",
    "__tests__/fixtures.js",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web"
  },
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  moduleFileExtensions: [
    "web.js",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node",
    "mjs"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
};
