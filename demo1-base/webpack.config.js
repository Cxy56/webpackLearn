const paths = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: paths.resolve(__dirname, './dist')
  }
}
