export default {
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    moduleFileExtensions: ["js", "ts", "tsx"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: [
      "**/tests/**/*.spec.ts",
    ],
    testEnvironment: "node",
  };