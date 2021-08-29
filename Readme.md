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

- loader webpack只能理解JavaScript和JSON文件。loader让webpack能够去处理其他类型的文件，并将其转换为有效的模块，以供应用程序使用。
 1.postcss-loader
  loader将会从下面几个地方搜索目录树来寻找配置文件
  package.json中的postcss属性
  JSON或YAML格式的.postcssrc文件
  .postcss.json、.postcss.yaml、.postcss.yml、.postcss.js 或者 .postcss.cjs 文件
  postcss.config.js 或者 postcss.config.cjs 导出一个对象的 CommonJS 模块（推荐）

  plugins: [postcss-preset-env, autoprefixer]
  postcss-preset-env包含autoprefixer，注意：使用该插件前提要加 browserslist，在package.json
  ```json
    "browserslist": [
      "last 1 version",
      "> 1%",
      "IE 10"
    ]
  ```
  stage共分为5个阶段，分别是：

  stage-0 非官方草案
  stage-1 编辑草案或早期工作草案
  stage-2 工作草案
  stage-3 候选版本
  stage-4 推荐标准
2.加载images图像
在webpack5中使用 Asset Modules，可以将这些内容混入系统中。
Asset Modules 资源模块一种模块类型，允许使用资源文件(字体，图标)而无需配置额外loader
在webpack5之前，通常使用raw-loader、url-loader、file-loader
资源模块类型(asset module type)，通过添加4种新的模块类型，来替换所有这些loader
asset/resource asset/inline asset/source asset

resource资源
自定义输出文件名
output: {
  assetModuleFilename: 'images/[hash][ext][query]'
}


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

npm info webpack 查看webpack版本
nrm 管理 npm源
nrm ls 查看有哪些源(镜像)可以使用
nrm use xxx
nrm test

path.resolve() 两个相对路径变成绝对路径

file-loader 
1.发现图片模块
2.打包到dist目录下，改名字，自定义
3.移动到dist目录下后，得到图片的名称
4.返回使用图片名称
npm webpack --config webpack.config.js