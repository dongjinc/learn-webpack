- webpack 最出色的功能之一，除了引入 JavaScript 还可以通过 loader 引入任何其他类型的文件。
- webpack 静态模块打包工具，内部构件一个依赖图
- 4.0 开始，webpack 可以不用在引入一个配置文件来打包项目
- 入口 entry {
  默认 path -> src/index.js
  数组方式 - ['src/file_1.js', 'src/file_2.js'] 所谓 "multi-main entry" 一次注入多个依赖文件
  对象方式 - {
  dependOn: 当前入口所依赖的入口。它们必须在该入口被加载前被加载
  }
  分离 app（应用程序）和 vendor（第三方库入口）
  entry: {
  main: 'src/app.js' ,
  vendor: 'src/vendor.js', // 存入未作修改的必要 library 或文件（如 jQuery、图片、Bootstrap），然后将它们打包在一起成为单独的 chunk，内容哈希保持不变，从而使浏览器可以独立缓存它们，减少加载时间。
  }
  output: '[name].[contenthash].bundle.js'
  webpack < 4 版本中，通过将 vendor 作为单独入口起点添加到 entry 选项中 与 CommonsChunkPlugin 结合使用
  而在 webpack4 中不鼓励这么做。使用 optimization.splitChunks 选项
  }

- loader webpack 只能理解 JavaScript 和 JSON 文件。loader 让 webpack 能够去处理其他类型的文件，并将其转换为有效的模块，以供应用程序使用。
  1.postcss-loader
  loader 将会从下面几个地方搜索目录树来寻找配置文件
  package.json 中的 postcss 属性
  JSON 或 YAML 格式的.postcssrc 文件
  .postcss.json、.postcss.yaml、.postcss.yml、.postcss.js 或者 .postcss.cjs 文件
  postcss.config.js 或者 postcss.config.cjs 导出一个对象的 CommonJS 模块（推荐）

  plugins: [postcss-preset-env, autoprefixer]
  postcss-preset-env 包含 autoprefixer，注意：使用该插件前提要加 browserslist，在 package.json

  ```json
    "browserslist": [
      "last 1 version",
      "> 1%",
      "IE 10"
    ]
  ```

  stage 共分为 5 个阶段，分别是：

  stage-0 非官方草案
  stage-1 编辑草案或早期工作草案
  stage-2 工作草案
  stage-3 候选版本
  stage-4 推荐标准

  2.加载 images 图像
  在 webpack5 中使用 Asset Modules，可以将这些内容混入系统中。
  Asset Modules 资源模块一种模块类型，允许使用资源文件(字体，图标)而无需配置额外 loader
  在 webpack5 之前，通常使用 raw-loader、url-loader、file-loader
  资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader
  asset/resource asset/inline asset/source asset

resource 资源
自定义输出文件名
output: {
assetModuleFilename: 'images/[hash][ext][query]'
}

3.加载字体
使用 asset/resource

4.加载数据(csv,tsv,xml)
在使用 d3 等工具实现某些数据可视化时，这个功能极其有用。
自定义 JSON 模块 parser
https://webpack.docschina.org/guides/asset-management/#customize-parser-of-json-modules

- 管理输出

  1.通过配置 entry,多入口文件时，会生成多个 bundle，不可能一次次手动写入 html 文件内，可借助 HtmlWebpackPlugin 来解决这个文件

  2.HtmlWebpackPlugin 变量、选项配置
  htmlWebpackPlugin.options.xxx 通过这种方式获取
  还可以在模板中 获取 webpack definePlugin 定义的环境变量 process.env.NODE_ENV

  3.清理 /dist 文件夹
  1).通过 output:{} clean 选项设置 true 5.20.0+
  2).借助 clean-webpack-plugin

原理: webpack 和 webpack 插件似乎知道应该生成哪些文件。答案是 webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射 --> manifest
manifest 通过 webpack-manifest-plugin 插件打包出来的 manifest.json 文件，用来生成一份资源清单，为后端渲染服务 (要学习**\***)

webpack5 中，output.publicPath: "auto" ，导致 webpack-manifest-plugin 输出资源带有 auto prefix 字样,通过使用静态 output.publicPath: "" 替代 https://github.com/shellscape/webpack-manifest-plugin/issues/229

- 开发环境 1.使用 source map，当 webpack 打包源代码时，可能会很难追踪到 error(错误)和 warning(警告)
  例如如果将三个源文件(a.js,b.js,c.js)打包到一个 bundle 中，其中一个源文件包含一个错误，那么堆栈追踪就会直接指向到 bundle.js。可你需要准确地知道错误来源自哪个源文件。
  为了更容易地追踪 error 和 warning。js 提供了 source maps 功能，可以将编译后的代码映射到原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你
  通过使用 devtool: inline-source-map 选项，获取报错的源文件行数
  <!-- https://webpack.docschina.org/configuration/devtool/ -->
  2.开发工具
  1).webpack's watch mode
  2).webpack-dev-server
  3.webpack-dev-middleware

使用 watch mode(观察模式)
可以指示 webpack"watch"依赖图中所有文件的更改。如果其中一个文件被更新，代码将被重新编译。
唯一缺点是：看到修改后的实际效果，需要刷新浏览器。如果能自动刷新浏览器更好，需要通过 webpack-dev-server 实现此功能

使用 webpack-dev-server 具有 live reloading(实时重新加载功能)
webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。

webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 devMiddleware.publicPath 选项进行修改。

<!-- https://webpack.docschina.org/guides/development/#using-source-maps -->
如果根据webpack官方文档配置到webpack-dev-server时，通过webpack serve --open命令启动时，浏览器会报错，警告提示，控制台也会有相似错误。1
解决办法：
1).通过webpack -> performance:{} hints: false，即可关闭控制台错误和浏览器错误
2).通过webpack -> devServer: {
  client:{
    overlay:{
      error: true // 可解决浏览器报错问题
    }
  }
}
<!-- https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md -->

- webpack 打包进度条 
webpackbar
progress-bar-webpack-plugin

- plugin 打包优化、资源管理，注入环境变量

- 了解下 source-map
  webpack 指南
- 管理资源
  1). 加载 css - loader style-loader、css-loader 自下往上执行-从右往左 - plugin mini-css-extract-plugin(提取 css)、css-minimizer-webpack-plugin(压缩 css)

       optimization: {
           minimizer: [

           ]
       }

<!-- https://segmentfault.com/a/1190000023734704 -->

npm info webpack 查看 webpack 版本
nrm 管理 npm 源
nrm ls 查看有哪些源(镜像)可以使用
nrm use xxx
nrm test

path.resolve() 两个相对路径变成绝对路径

file-loader 1.发现图片模块 2.打包到 dist 目录下，改名字，自定义 3.移动到 dist 目录下后，得到图片的名称 4.返回使用图片名称
npm webpack --config webpack.config.js
