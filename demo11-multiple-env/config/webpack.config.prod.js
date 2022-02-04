// npx webpack -c ./config/webpack.config.prod.js
const paths = require('path');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  output: {
    // 输出文件名：hash值，以缓存不变的文件
    filename: 'scripts/[name].[contenthash].bundle.js',
    // 前缀
    publicPath: 'http://localhost:8080/'
  },
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerWebpackPlugin(),
      // 需要再配置一下terser才能压缩js
      new TerserPlugin()
    ],
  },
  performance: {
    // 关闭打包时的提示
    hints: false
  }
}
