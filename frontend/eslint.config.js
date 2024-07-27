const prettier = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      react,
      '@typescript-eslint': typescriptPlugin,
    },
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
      'quotes': ['error', 'single'], // Enforce single quotes
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
