// node -> webpack-dev-middleware和webpack-hot-middleware
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

var config = {
  mode: 'development',
  entry: [
    // Add the client which connects to our middleware
    // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    // useful if you run your app from another point like django
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    // And then the actual application
    './src/index.js',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  // devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin()
  ],
}
var compiler = webpack(config)
const express = require('express')

const app = express()
app.use(express.static('.'));

app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))
app.use(WebpackHotMiddleware(compiler))

// var router = express.Router()
// router.get('/', function (req, res, next) {
//   res.render('index', { message: 'Hey there!'});
// })

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});
// app.use(router)

app.listen(8080, function () {
  console.log('Listening on 8080')
})
