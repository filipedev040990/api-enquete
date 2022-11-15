module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*Interfaces.ts',
    '!<rootDir>/src/**/*Helper.ts',
    '!<rootDir>/src/**/index.ts',
    '!**/interfaces/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
