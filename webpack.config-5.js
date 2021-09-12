// 缓存
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        // another: './src/another-module.js',
        // vendors: ['lodash', 'axios']
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Caching'
        })
    ],
    optimization: {
        // moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // default: false, // 禁用任何默认缓存组
                // lodash: { // 处理第三方库
                //     test: /[\\/]node_modules[\\/]lodash[\\/]/,
                //     name: 'lodash',
                //     chunks: 'all',
                //     minChunks: 1 ,
                // },
                // axios: { // 处理第三方库
                //     test: /[\\/]node_modules[\\/]axios[\\/]/,
                //     name: 'axios',
                //     chunks: 'all',
                //     minChunks: 1 ,
                // },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // cacheGroupKey here is `commons` as the key of the cacheGroup
                    name(module, chunks, cacheGroupKey) {
                      const moduleFileName = module
                        .identifier()
                        .split('/')
                        .reduceRight((item) => item);
                      const allChunksNames = chunks.map((item) => item.name).join('~');
                      return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    }
                  },
                // vendors: {
                //     test: 'vendor',
                //     chunks: 'all',
                //     enforce: true
                // }
            }
        }
    }
}
