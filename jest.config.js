module.exports = {
  collectCoverageFrom: [
    "<rootDir>/__tests__/**/*.{js,jsx,mjs}"
  ],
  setupFiles: [
    "<rootDir>/config/polyfills.js",
    "<rootDir>/__tests__/setup.js"
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
  coveragePathIgnorePatterns: ["node_modules/", "__tests__/", "assets/", "lib/"],
  testPathIgnorePatterns: [
    "node_modules/",
    "assets/",
    "__tests__/setup.js",
    "__tests__/setupEnzyme.js",
    "__tests__/setupStoreMock.js"
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
  ]
};
