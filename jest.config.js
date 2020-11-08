module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/*.js'],
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  setupFiles: ['jest-localstorage-mock', 'jest-prop-type-error'],
  setupFilesAfterEnv: ['./test-setup.js'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  globals: {
    API_URL: 'http://localhost:3000'
  }
};
