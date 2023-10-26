module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // Uses eslint-config-prettier to disable ESLint rules -
    // from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier',
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false
      }
    ],
    '@typescript-eslint/no-var-requires': 0,
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'react/jsx-closing-tag-location': 2,
    'no-duplicate-imports': 2,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': 0,
    'no-cond-assign': ['error', 'always'],
    'no-console': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'react/display-name': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react/prop-types': [2, { ignore: ['children'] }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        parser: 'typescript'
      }
    ]
  }
}
