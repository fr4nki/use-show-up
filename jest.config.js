module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/examples/'],
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
};
