module.exports = {
  parser: 'babel-eslint',
  extends: [
    './rules/base',
  ].map(require.resolve),
}
