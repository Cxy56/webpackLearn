const paths = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env) => {
  console.log('env=====================', env)
  return {
    mode: env.production ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    // 抽离公共代码lodash
    // entry: {
    //   index: {
    //     import: './src/index.js',
    //     dependOn: 'shared'
    //   },
    //   another: {
    //     import: './src/another-module.js',
    //     dependOn: 'shared'
    //   },
    //   shared: 'lodash'
    // },
    output: {
      // 输出文件名：hash值，以缓存不变的文件
      filename: 'scripts/[name].[contenthash].bundle.js',
      path: paths.resolve(__dirname, './dist'),
      clean: true,
      assetModuleFilename: 'images/[name]-[contenthash][ext]',
      // 前缀
      publicPath: 'http://localhost:8080/'
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
    devServer: {
      static: './dist'
    },
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
      minimizer: [
        // 压缩css
        new CssMinimizerWebpackPlugin(),
        // 需要再配置一下terser才能压缩js
        new TerserPlugin()
      ],
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
    }
  }
}
