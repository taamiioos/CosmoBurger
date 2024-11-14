export default {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom', 
  collectCoverage: true,
  coverageDirectory: 'coverage',
  clearMocks: true,
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  
    '^.+\\.(js|jsx)$': 'babel-jest',  
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  verbose: true,
};
