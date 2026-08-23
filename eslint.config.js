// @ts-check
const tseslint = require("typescript-eslint")
const reactHooks = require("eslint-plugin-react-hooks")
const reactRefresh = require("eslint-plugin-react-refresh").default
const prettier = require("eslint-config-prettier")

module.exports = tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "smart"],
    },
  },
  {
    files: ["**/*.config.{js,cjs,mjs}", "tests/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettier
)
