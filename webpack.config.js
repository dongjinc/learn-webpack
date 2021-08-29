const HtmlWebpackPlugin = require("html-webpack-plugin");
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 清除dist
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// https://github.com/tcoopman/image-webpack-loader
const path = require("path");
/** @type {import('webpack').Configuration} */
const config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        // library: {
        //     // type: 'commonjs'
        // }
        // https://webpack.docschina.org/guides/asset-modules/
        // 自定义输出文件名
        // assetModuleFilename: 'images/[hash][ext][query]'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                // MiniCssExtractPlugin.loader
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                          // 选项
                                        },
                                      ]
                                ]
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/inline', // 'asset/resource' | 'asset/inline' | 'asset/source' | 'asset'
                // Rule.generator.filename 与 output.assetModuleFilename 相同，并且仅适用于 asset 和 asset/resource 模块类型。
                // 'asset/resource' -> 自定义输出文件名
                // generator: {
                //     filename: 'static/[hash][ext][query]'
                // }

                // 'asset/inline' -> 自定义 data URI 生成器
                // generator:{
                //     dataUrl: content => {
                //         content = content.toString();
                //         // const svgToMiniDataURI = require('mini-svg-data-uri')
                //         return svgToMiniDataURI(content)
                //     }
                // }
                // use: [
                //     "file-loader",
                //     {
                //         // loader: 'image-webpack-loader',
                //         // options: {}
                //     },
                // ],
            },
            // {
            //     test: /\.html/,
            //     type: 'asset/resource',
            //     generator:{
            //         filename: 'static/[hash][ext][query]'
            //     }
            // }
            {
                test: /\.txt/,
                type: 'asset/source' // 所有 .txt 文件将原样注入到 bundle 中
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'public/index.ejs',
        //     title: 'aaa'
        // }),
        new CleanWebpackPlugin(),
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
