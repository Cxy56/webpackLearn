
// 执行开发模式的打包命令： npx webpack -c ./config/webpack.config.dev.js
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'scripts/[name].bundle.js',
  },
  devServer: {
    static: './dist'
  },
}
