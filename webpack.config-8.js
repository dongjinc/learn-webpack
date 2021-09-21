// 构建性能
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
//   cache: {
//       type: 'filesystem',
//       allowCollectingMemory: false,
//       version: '1.3'
//   },
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
    //   vendors: ['lodash']
  },
//   output: {
//     filename: "[name].dll.js",
//     path: path.resolve(__dirname, "dist"),
//     library: "[name]_[hash]",
//     clean: true,
//   },
  output: {
    filename: '[name].[contenthash].js',
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
    ],
  },
  plugins: [
    // new webpack.DllPlugin({
    //     context: __dirname,
    //     name: '[name]_[hash]',
    //     path: path.join(__dirname, './manifest.json'),
    //   }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./manifest.json"),
    }),
    new HtmlWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: true
  }
  //   optimization: {
  //       splitChunks: {
  //           chunks: 'all'
  //       }
  //   }
  //   resolve: {
  //       extensions: []
  //   }
};
