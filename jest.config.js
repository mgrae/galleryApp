module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@context/(.*)$': '<rootDir>/src/context/$1',
        '^@types/(.*)$': '<rootDir>/src/types/$1',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
};
