module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  plugins: [
    "@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  ignorePatterns: ["build/**", ".eslintrc.cjs"],
  rules: {
    "no-undefined": "warn",
    "no-console": "warn",
    "no-unneeded-ternary": "warn",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "no-var": "error",
    "no-underscore-dangle": "error",
    "no-plusplus": "error",
    "no-lonely-if": "error",
    "no-eval": "error",
    "no-alert": "error",
    "max-len": ["error", { "code": 120 }],
    "eqeqeq": "error",
    "func-style": ["error", "expression"],
    "no-duplicate-imports": "error",
    "no-trailing-spaces": "error", // deprecated moved to stylistic
    "@typescript-eslint/comma-spacing": "error", // deprecated moved to stylistic
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/semi": "error", // deprecated moved to stylistic
    "@typescript-eslint/brace-style": "error", // deprecated moved to stylistic
    "@typescript-eslint/key-spacing": "error"
  }
}
  