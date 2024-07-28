module.exports = {
    env: {
      node: true,
      es2021: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          bracketSpacing: false,
          singleQuote: true,
        },
      ],
      'no-extra-semi': 'error',
      'prefer-const': 'error',
      'object-curly-spacing': ['error', 'never'],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-unused-vars': 'error',
    },
    overrides: [
      {
        files: ['**/__tests__/**/*.ts'],
        rules: {
          'prettier/prettier': 'off',
        },
      },
    ],
  }
  