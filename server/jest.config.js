module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  modulePaths: [
    '<rootDir>/node_modules/',
  ],
  unmockedModulePathPatterns: [
    '/^node_modules/',
  ],
};
