
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


console.log(process.cwd(), 'process')
// https://github.com/tcoopman/image-webpack-loader
const path = require('path')
/** @type {import('webpack').Configuration} */
const config = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // MiniCssExtractPlugin.loader
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'public/index.ejs',
        //     title: 'aaa'
        // })
    ],
    optimization: {
        runtimeChunk: false,
        minimize: false, // If yu want to run it also in development set the optimization.minimize option to true. becasue enable CSS optimization only in production mode
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e `terser-webpack-plugin`)
            `...`,
            new CssMinimizerPlugin({
                include: /main.css/ig, // include files to include. refers to output xx.css files
                parallel: true, // enable/disable multi-process parallel running eg: number | boolean
                // minify: CssMinimizerPlugin.cleanCssMinify
            })
        ],
    }
}

module.exports = config