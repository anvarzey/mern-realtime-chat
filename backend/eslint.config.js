import config from "eslint-config-standard";

export default [
  ...[].concat(config),
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      indent: ['error', 2],
      'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: true }]
    }
  }
];