module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'eslint-config-airbnb-typescript'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    settings: {
      react: { version: '17' },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': { typescript: {} }
    },
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    rules: {
      'arrow-spacing': ['error', { before: true, after: true }],
      'max-len': ['error', { code: 120 }],
      'no-use-before-define': 'off',
      'no-shadow': 'off',

      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',

      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      '@typescript-eslint/member-delimiter-style': ['error'],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    }
  }
