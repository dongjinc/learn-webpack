// env 环境变量
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log(process.env.goal)

/** @type {import('webpack').Configuration} */
module.exports = (env) => {
    console.log(process.env.production, env)
    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}