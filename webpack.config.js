// 代码分离
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        // another: './src/another-module.js',
    },
    // entry: {
    //     index: {
    //         import: './src/index.js',
    //         dependOn: 'shared'
    //     },
    //     another:{
    //         import: './src/another-module.js',
    //         dependOn: 'shared'
    //     },
    //     shared: ['lodash'] // 可以在多个chunk之间共享模块
    // },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    // optimization: { // 知识点 一个模块永远不会被多次实例化这很重要。 https://bundlers.tooling.report/code-splitting/multi-entry/
    //     runtimeChunk: 'single'
    // }
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
}
