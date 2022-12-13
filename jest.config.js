module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*Interfaces.ts',
    '!<rootDir>/src/**/*Helper.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/app.ts',
    '!<rootDir>/src/**/main/**',
    '!**/interfaces/**',
    '!**/@types/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
