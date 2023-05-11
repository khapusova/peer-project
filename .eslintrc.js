module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'comma-dangle': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-spaced-func': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'arrow-body-style': ['error', 'as-needed'],
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'error',
    'prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': 'error',
    'react/no-array-index-key': 'off',
    'react/prop-types': ['error'],
    'react/jsx-wrap-multilines': 'off',
    'import/no-named-default': 'off',
    'import/no-unresolved': 'off',
    'react/function-component-definition': 'off',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1
      }
    ],
    'max-len': [
      'warn',
      {
        code: 120
      }
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        variables: false
      }
    ],
    'object-curly-newline': [
      'warn',
      {
        consistent: true
      }
    ],
    indent: 'off'
  }
};
