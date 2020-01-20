module.exports = {
  'extends': 'eslint:recommended',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': [2, 'never'],
    'no-unused-vars': ['off', { 'vars': 'local', 'args': 'after-used', 'ignoreRestSiblings': true }],
    'quotes': ['error', 'single', 'avoid-escape'],
    'semi': [2, 'always']
  },
  'globals': {
    'fetch': false
  }
}