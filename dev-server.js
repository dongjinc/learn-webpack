// node和webpack-dev-server
const webpack = require("webpack");
const DevServer = require("webpack-dev-server");
const path = require("path");

// https://webpack.docschina.org/configuration/dev-server/
const config = {
  mode: "development",
  entry: [
    // Runtime code for hot module replacement
    'webpack/hot/dev-server.js',
    // Dev server client for web socket transport, hot and live reload logic
    'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    // Your entry
    './src/index.js',
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
  plugins: [
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
  ],
};
const compiler = webpack(config);
// // `hot` and `client` options are disabled because we added them manually
const server = new DevServer(
  {
    hot: true,
    client: false,
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
      },
    ],
  },
  compiler
);
server.startCallback(() => {
  console.log("Starting server on http://localhost:8080");
});
