module.exports = {
    setupFilesAfterEnv: ['./jest.setup.cjs'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,  // Automatically collect coverage on every test run
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/index.tsx" // optionally exclude files
    ],
    coverageDirectory: "coverage", // folder to output coverage reports
    coverageReporters: ["text", "lcov"], // formats: text in console, lcov for HTML reports

};