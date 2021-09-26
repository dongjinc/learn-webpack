// 构建性能
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const glob = require('glob')
const argv = require('yargs-parser')(process.argv.slice(2))
const { resolve } = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const customExtractor = (content) => content.match(/[A-z0-9-:/]+/g) || [];
const PATHS = {
  src: path.join(__dirname, "src"),
};

console.log(glob.sync(path.join(__dirname, './src/**/*'), { nodir: true }))

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: {
    bundle: './src/index.js'
  },
  output: {
    // filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      // https://webpack.docschina.org/loaders/babel-loader/
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"), // 通过使用include字段，仅将loader应用在实际需要将其转换的模块
        use: [
            // 'thread-loader', 如果小项目，文件不多无需开启多进程打包，反而会变慢，因为开启进程时需要花费时间的。
            {
                loader: 'babel-loader', // babel-loader @babel/core @babel/preset-env
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        useBuiltIns: "entry",
                        targets: { chrome: "68" }, // 通过targets 控制包输出的结果是否兼容对应目标浏览器
                      },
                    ],
                  ],
                },
              }
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(path.join(__dirname, './src/**/*'), { nodir: true }),
      styleExtensions: [".css"],
      safelist: ["safelisted"],
      only: ["bundle"],
      extractors: [
        {
          extractor: customExtractor,
          extensions: ["html", "js"],
        },
      ],
    }),
    
  ],
  // optimization: {
  //   innerGraph: true
  //   runtimeChunk: true
  // },
  //   optimization: {
  //       splitChunks: {
  //           chunks: 'all'
  //       }
  //   }
  //   resolve: {
  //       extensions: []
  //   }
  optimization: {
    splitChunks: {
      // cacheGroups: {
      //   styles: {
      //     name: 'styles',
      //     test: /\.css$/,
      //     chunks: 'all',
      //     enforce: true
      //   }
      // }
    }
  }
};
