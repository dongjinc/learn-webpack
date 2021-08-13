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

- 了解下 source-map
  webpack 指南
- 管理资源
  1). 加载 css - loader style-loader、css-loader 自下往上执行-从右往左 - plugin mini-css-extract-plugin(提取 css)、css-minimizer-webpack-plugin(压缩 css)

       optimization: {
           minimizer: [

           ]
       }

<!-- https://segmentfault.com/a/1190000023734704 -->
