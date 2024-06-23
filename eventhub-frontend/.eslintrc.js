module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'semi': ['error', 'never'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: false,
          singleQuote: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
  