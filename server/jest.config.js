/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  modulePathIgnorePatterns: ["<rootDir>/build/"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
};