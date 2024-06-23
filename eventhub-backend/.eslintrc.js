module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
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
}
