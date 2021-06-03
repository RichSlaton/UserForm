module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    rules: {
      'react-hooks/exhaustive-deps': 'error', // added "react-hooks/exhaustive-deps"
    },
  },
  plugins: ['react', 'react-hooks', 'jest', 'material-ui'],
  rules: {
    'no-async-promise-executor': 'off',
    'no-case-declarations': 'off',
    'no-implicit-any': 'off',
    'no-tabs': 'off',
    'no-useless-escape': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',

    semi: 'off',
  },
};
