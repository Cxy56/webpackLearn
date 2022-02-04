// npx webpack -c ./config/webpack.config.prod.js
const paths = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  output: {
    path: paths.resolve(__dirname, '../dist'),
    clean: true,
    assetModuleFilename: 'images/[name]-[contenthash][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    }),
    // 提取css到单独的文件
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }

      }
    ]
  },
  optimization: {
    splitChunks: {
      // 所有模块单独打包
      // chunks: 'all'
      // 缓存第三方文件，到单独的打包文件
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  performance: {
    // 关闭打包时的提示
    hints: false
  }
}
