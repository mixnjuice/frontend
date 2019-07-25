module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/*.js'],
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  modulePaths: ['<rootDir>/src/'],
  globals: {
    API_URL: 'http://localhost:3000'
  }
};
