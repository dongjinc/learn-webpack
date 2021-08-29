const HtmlWebpackPlugin = require("html-webpack-plugin");
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 清除dist
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
// https://github.com/tcoopman/image-webpack-loader
const path = require("path");
/** @type {import('webpack').Configuration} */
const config = {
    mode: "production",
    entry: {
        index: "./src/index.js",
        print: "./src/print.js"
    },
    devtool: 'inline-source-map',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        publicPath: ''
        // library: {
        //     // type: 'commonjs'
        // }
        // https://webpack.docschina.org/guides/asset-modules/
        // 自定义输出文件名
        // assetModuleFilename: 'images/[hash][ext][query]'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // 如果配置template模板，会导致title不生效，可通过 <%= htmlWebpackPlugin.options.title %> 获取配置的变量
            template: 'public/index.ejs',
            title: '管理输出'
        }),
        new WebpackManifestPlugin()
        // new CleanWebpackPlugin(),
    ],
    optimization: {
        runtimeChunk: false,
        minimize: false, // If yu want to run it also in development set the optimization.minimize option to true. becasue enable CSS optimization only in production mode
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e `terser-webpack-plugin`)
            `...`,
            new CssMinimizerPlugin({
                include: /main.css/gi, // include files to include. refers to output xx.css files
                parallel: true, // enable/disable multi-process parallel running eg: number | boolean
                // minify: CssMinimizerPlugin.cleanCssMinify
            }),
        ],
        // splitChunks: {
        //     chunks: 'all',
        //     minChunks: 1,
        //     cacheGroups: {
        //         defaultVendor: {
        //             filename: '[name].bundle.js'
        //         }
        //     }
        // }
    },
};

module.exports = config;
