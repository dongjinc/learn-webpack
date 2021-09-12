// library
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].webpack-numbers.js',
        clean: true,
        // library: 'webpackNumbers', // 通过library暴露出入口导出的内容
        library: { // 输入一个库，作为你的入口做导出
            name: 'webpackNumbers',
            // export: 'numToWord',
            type: 'umd'
        }
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    optimization: {
        // runtimeChunk: 'single',
        // splitChunks: {
        //     chunks: 'all',
        //     automaticNameDelimiter: '~'
        // }
    }
}
