import { defineConfig } from 'vite-plus'

export default defineConfig({
  lint: {
    env: {
      es2023: true,
      node: true,
    },
    ignorePatterns: ['dist/**', 'node_modules/**'],
    rules: {
      'no-debugger': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'typescript/no-explicit-any': 'off',
    },
  },
  fmt: {
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
    semi: false,
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
  pack: {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    deps: {
      neverBundle: ['@unocss/core'],
    },
  },
})
