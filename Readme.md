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

webpack-dev-server ⚠️：不提供bundle.js自动注入，需手动注入
在webpack5中 devServer配置有过改动，v3与v4有不同
新增了static，去掉了contentBase
static: {
  directory: '', // 基座，告诉服务器从哪里提供内容。
  publicPath: '' // 告诉服务器在哪个URL提供static.directory的内容
}
访问地址 http://[devServer.host]:[devServer.port]/[static.publicPath]/[output.filename]

<!-- 模块热替换 -->
官方 dev-server.js config配置中plugin少写了一个s导致，还请注意


1.webpack-dev-middleware是一个封装器，可以把webpack处理过的文件发送到一个server，webpack-dev-server在内部使用了它。然而它也可以作为一个单独的package来使用，一边根据需求进行更多自定义设置
其中webpack-dev-middleware并不支持liveReload，如果要支持reload需要借助 webpack-hot-middleware
目前官方提供了webpack-dev-server，由于局限性比较大，单方面对于只提供了使用权限，为了便于扩展性，特此出了 dev-server和hot-middleware
考虑：1.在使用 webpack-dev-middleware和hot-middleware时，是不是可以扩展微前端
2.webpack-dev-middleware和hot-middleware 会导致 innerHTML两次 ？？

2.HMR加载样式
借助于style-loader，使用模块热替换来加载css。主要是因为loader幕后使用了module.hot.accept

## 代码分离
- 概述：此特性能够把代码分离到不同的bundle中，然后可以按需加载或并行加载这些文件。
- 方法：
  - 1).**入口起点**：使用entry配置手动地分离代码 
  - 2).**使用entry**：dependencies或者splitChunksPlugin去重和分离chunk
  - 3).**动态导入**：通过模块的内联函数调用来分离代码

#### 入口起点
- src/index.js和src/another-module.js共同引入lodash。会存在一下隐患
  - 如果入口chunk之间包含一些重复模块，那些重复模块都会被引入到各个bundle中
  - 方法不够灵活，不能动态地将核心应用程序、逻辑代码拆分出来
  - 为了解决以上重复模块问题。

   ```
   entry: {
        index: {
            import: './src/index.js',
            dependOn: 'shared'
        },
        another:{
            import: './src/another-module.js',
            dependOn: 'shared'
        },
        shared: ['lodash'] // 可以在多个chunk之间共享模块
    },
    <!-- 需要学习下 -->
    optimization: { // 知识点 一个模块永远不会被多次实例化这很重要。 https://bundlers.tooling.report/code-splitting/multi-entry/
        runtimeChunk: 'multiple' / 'single'
    }
   ```
#### splitChunksPlugin
- 概述：将公共依赖模块提取到已有的入口chunk中，或者提取到一个新生成的chunk。
- 在webpack v4之前使用 CommonsChunkPlugin 来避免。目前webpack v4以后移除了 CommonsChunkPlugin。取而代之的是 optimization.splitChunks
  - webpack根据以下条件自动拆分 chunks:
    - 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
    - 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
    - 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
    - 当加载初始化页面时，并发请求的最大数量小于或等于 30

```
 optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
```
- 移除重复的依赖模块，插件将load分离到单独的chunk，并将其从main bundle中移除，减轻大小。mini-css-extract-plugin 用于将css从主应用程序中分离

#### 动态导入
- 概述：涉及动态代码拆分时，webpack提供了两个类似的技术。第一种import() 第二个webpack特定的 require.ensure()
- ⚠️：import调用会在内部用到promises。如果在旧版浏览器，使用import，记得使用一个polyfill库
```
  return import('lodash').then(({default: _}) => {
        const element = document.createElement('div')
        element.innerHTML = _.join(['Hello', 'webpack'])
        return element
    })
```
#### 预获取/预加载模块(prefetch/preload module)
- webpack v4.6.0+ 增加了对预获取和预加载的支持
- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要的资源
```
  import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
  

    if((!__webpack_require__.o(installedChunks, chunkId) || installedChunks[chunkId] === undefined) && true) {
  /******/ 				installedChunks[chunkId] = null;
  /******/ 				var link = document.createElement('link');
  /******/ 		
  /******/ 				if (__webpack_require__.nc) {
  /******/ 					link.setAttribute("nonce", __webpack_require__.nc);
  /******/ 				}
  /******/ 				link.rel = "prefetch";
  /******/ 				link.as = "script";
  /******/ 				link.href = __webpack_require__.p + __webpack_require__.u(chunkId);
  /******/ 				document.head.appendChild(link);
  /******/ 			}
  <!-- 会生成<link rel="prefetch" href="login-modal-chunk.js"> 并追加到页面头部 -->，指示
```
- ⚠️：只要父chunk完成加载，webpack就会添加prefetch hit(预取提示)

- 不同点
 - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
 - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
 - preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
浏览器支持程度不同。

<!-- https://www.jiqizhixin.com/articles/2020-07-24-12 -->

## 缓存
- 概述：通过webpack打包我们模块化后的应用程序，webpack会生成一个可部署的/dist目录，然后把打包后的内容放置在此目录中。将dist文件放在服务器上，用户(client)获取资源时比较耗费资源，由此产生浏览器缓存技术，可降低网络流量，使网站加载速度更快。
#### 输出文件的文件名
```
  output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'Caching'
      })
  ]
```
- 在老webpack版本中，相对于打包出的文件名来说，可能通过配置会有所差异，webpack5.0会保持一致的contenthash。官方表明老版本会存在不一致的情况
  - 产生原因： webpack在入口chunk中，包含了某些boilerplate（引导模版），特别是runtime和manifest。(boilerplate指webpack运行时的引导代码)


#### 提取引导模版
- 1). 通过 SplitChunksPlugin 可以用于将模块分离到独立的bundle中。webpack还提供了一个优化功能，可以使用 optimization.runtimeChunk选项将runtime代码拆分为一个单独的chunk。将其设置为single来为所有chunk创建一个runtime code

```
  optimization: {
    runtimeChunk: 'single'
  }
```

- 将第三方库(library) 提取到单独的vendor chunk文件中，比较推荐的做法。这是因为，它们很少像本地的源代码那样频繁修改。通过使用 SplitChunksPlugin插件的CacheGroups选项来实现

```
  splitChunks: {
    cacheGroups: {
      <!-- vendor -->
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }

```

#### 模块标识符
- 官方例子中新增了 print.js，修改main时，期望是指对 main bundle的hash发生变化。
官方指出会对第三方的vendor hash也会产生变化。在最新的webpack5.0中未体现出这样的问题。可能是老版本问题，产生原因：每个module.id会默认地基于解析顺序进行增量。当解析顺序发生变化，ID也会随之改变(module.id)
  - main bundle 会随着自身的新增内容的修改，而发生变化
  - vendor bundle 会随着自身的module.id的变化，而发生变化
  - manifest runtime 会因为现在包含一个新模块的引用，而发生变化
- 第一个和最后一个符合预期的行为，vendor hash发生变化是需要修复的。将optimization.moduleIds设置为 ‘deterministic’ - 确定性
```
  optimization: {
    moduleIds: 'deterministic'
  }
```

#### 扩展 @TODO: 继续研究
- 扩展 cacheGroups 可以单独配置第三方库(由于一个项目内引入第三方库会比较多，导致vendor文件大小会特别大，考虑以下几种方式，对vendor做拆分处理)
```
<!-- 第一种方式 -->
  lodash: { // 处理第三方库
      test: /[\\/]node_modules[\\/]lodash[\\/]/, // webpack处理路径时，始终包含Unix系统中的 / 和 Windows系统中 \。 使用[\\/]来表示路径分隔符的原因
      name: 'lodash',
      chunks: 'all',
      minChunks: 1 ,
  },
  axios: { // 处理第三方库
      test: /[\\/]node_modules[\\/]axios[\\/]/,
      name: 'axios',
      chunks: 'all',
      minChunks: 1 ,
  }
<!-- 第二种方式 -->
在entry入口配置引入第三方库的名称，来进行打包
splitChunks: {
  chunks: 'all', // 先将 引入模块 拆分出一个bundle
  cacheGroups: {
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
          },
        },
  }
}
```
- splitChunks.cacheGroups.{cacheGroup}.reuseExistingChunk // 如果当前chunk包含已从主bundle中拆分出的模块，则它将被重用，而不是生成新的模块

#### 创建library(字典) @TODO: 继续研究
- 如果打算开发js库时，类似lodash库都理应安装为devDependencies,而不是dependencies。因为我们不需要将其打包到我们的库中，这样我们库的体积会很容易变大
- 暴露library,通过output.library配置项暴露入口从而导出内容
``` 
entry: {
      index: './src/index.js'
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].webpack-numbers.js',
      clean: true,
      library: 'webpackNumbers', // 通过library暴露出入口导出的内容
  },
  plugins: [
      new HtmlWebpackPlugin()
  ],
  optimization: {
      runtimeChunk: 'single',
      splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '~'
      }
  }
<!-- 以上会只能通过script标签引用而发挥作用，不能CommonJs、AMD、Nodejs等环境 -->
<!-- 解决方式如下 -->
 library: { 
      name: 'webpackNumbers',
      type: 'umd'
  }
  <!-- 注意几个问题 -->
  通过👆配置：对于
  export function xxx(){}
  使用时
  import xxx from 'xxxx'
  xxx会提示undefined，使用时理应改成 import {xxx} from 'xxxx' 或者  通过
  output: {
        library: { // 输入一个库，作为你的入口做导出
            name: 'webpackNumbers',
            export: 'numToWord', // __webpack_exports__ = __webpack_exports__.numToWord[export]; 暴露指定方法
            type: 'umd'
        }
    }
  <!-- 产生的原因是因为 _xxx__WEBPACK_IMPORTED_MODULE_2__.default，而xxx未导出default -->
```
#### 外部化lodash 对于开发库来说，库内有使用其他依赖包时更倾向于把 其他依赖包当作 peerDependency
- 1.通过 externals 定义当前包用到的相关库
externals: {
    lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
    }
}
- 拓展 (本地包调试: npm link/yarn link)
  - 第一步 在开发插件库中 使用npm link命令。⚠️:在使用前修改下 package.json中name字段，因为通过npm link命令后，会在全局文件生成[packageName]文件夹，其中packageName取自插件库 package.json中name字段
  - 第二步 使用插件的项目中，使用npm link [packageName]命令，将会创建一个从全局安装的packageName到当前文件内node_modules下的符号链接
  - 第三步 解除link，在项目中，使用 npm unlink [packageName]。建议将插件库link通过 npm unlink解除掉
 ```  
    npm link [packageName]
    npm unlink [packageName]
   ```
- 拓展（peerDependencies）
  - 开发第三方插件库时，如果依赖了某个第三方包时，比如(lodash),通过设置peerDependencies暴露给插件的使用者依赖内需要使用的lodash版本号。
  - 简述：peerDependencies 用来防止多次引入相同的库。对于开发插件来说，都知道使用者一定会提供宿主自身，因此不必在插件库中重复打包安装相同宿主自身。
  - 🌰：vuex作为状态管理器，vuex并没有dependencies。我们都知道vuex一定会依赖vue。因此vuex知道你如果要使用他，就一定会使用vue。所以他也就不会在dependencies中写入。比如webpack、babel、eslint等他们的插件都知道使用者一定会提供宿主自身
  - 开发第三方插件库时，package.json main字段指向打包后的路径文件地址

## 环境变量 
- 要想消除webpack.config.js在开发环境和生产环境之间的差异。是需要环境变量
- Tips 1.webpack环境变量与操作系统中的bash和CMD.exe这些shell环境变量不同
```
webpack命令行 --env参数，可以允许你传入任意数量的环境变量。在webpack.config.js中可以访问到这些环境变量 --env production --env global=local
⚠️：如果设置env变量，却没有赋值，--env production默认表示将env.production设置为true
⚠️：通常module.exports指向配置对象。要使用env变量，你必须将module.exports转换成一个函数

module.exports = (env) => {
  console.log(env.production, env) //
  return {
      entry: './src/index.js',
      output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist')
      }
  }
}
```

## 构建性能
#### 通用环境
- loader将应用于最少数量的必须模块。
```
  module: {
        rules: [
            // https://webpack.docschina.org/loaders/babel-loader/
            {
                test: /.js$/,
                include: path.resolve(__dirname, 'src'), // 通过使用include字段，仅将loader应用在实际需要将其转换的模块
                loader: 'babel-loader' // babel-loader @babel/core @babel/preset-env
            }
        ]
    }
```
- 每个额外的loader/plugin都有其启动时间。尽量地使用工具
- 解析（@TODO: 研究一下）
  - 减少resolve.modules、extensions、mainFiles、descriptionFiles中条目数量，因为他们会增加文件系统调用的次数
  - 如果不使用symlinks（例如 npm link 或 yarn link），可以设置resolve.symlinks: false
  - 如果使用自定义resolve plugin规则，并且没有制定context上下文。可以设置resolve.cacheWithContext: false

- dll 使用DllPlugin为更改不频繁的代码生成单独的编译结果。这可以提供应用程序的编译速度，尽管它增加了构建过程的复杂度（@TODO:）
``` 
<!-- dllPlugin和dllReferencePlugin -->
DllPlugin就是将包含大量复用模块且不频繁更新的库进行编译，只需要编译一次。编译完成后存在指定的文件（这里称为动态链接库）。
在之后的构建过程中不会对这些模块进行编译，而是直接使用DllReferencePlugin来引用动态链接库的代码。从而大大提高构建速度
⚠️：第一次打包，请先运行dllPlugin生成动态链接库（用于让 DllReferencePlugin 能够映射到相应的依赖上）
⚠️：DllPlugin创建动态链接时，需要单独创建一个js文件，用webpack进行输出dll.js和manifest.json文件。一般只针对第三方库而言建议使用DllPlugin。例如react、react-dom、lodash
⚠️：在打包项目配置文件中，加入dllReferencePlugin,来引入DllPlugin创建出的manifest.json。打包会输出 delegated（委托）标识符
https://juejin.cn/post/6844903777296728072#heading-18
https://github.com/webpack/webpack/tree/main/examples/dll
```
- 减少编译结果的整体大小，以提高构建性能。尽量保持chunk体积小。
  - 使用数量更少、体积更小的library
  - 在多页面应用程序中使用SplitChunksPlugin。并开启async模式
  - 移除未引用代码
  - 只编译你当前正开发的那些代码

- worker池（worker pool）
  thread-loader可以将非常消耗资源的loader分流给一个worker pool
```
rules: [
  // https://webpack.docschina.org/loaders/babel-loader/
  {
    test: /\.js$/,
    include: path.resolve(__dirname, "src"), // 通过使用include字段，仅将loader应用在实际需要将其转换的模块
    use: [
        // 'thread-loader', 如果小项目，文件不多无需开启多进程打包，反而会变慢，因为开启进程时需要花费时间的。
        {
            loader: 'babel-loader', // babel-loader @babel/core @babel/preset-env
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "entry",
                    targets: { chrome: "68" }, // 通过targets 控制包输出的结果是否兼容对应目标浏览器
                  },
                ],
              ],
            },
          }
    ],
  },
]

```
- webpack cache（持久化） @TODO: 非常棒的功能

#### 开发环境
https://webpack.docschina.org/guides/build-performance/

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



git push origin --delete main
git -vv
find .git/refs
git remote set-head origin master


https://github.com/kaola-fed/blog/issues/238


http://jartto.wang/2018/12/11/git-rebase/

https://segmentfault.com/a/1190000005614604?_ea=868190
https://www.zoo.team/article/webpack

研究 1.git rebase和git merge 区别

git rebase 
1).可以对提交的commit进行合并，整理commit提交历史
2).合并其他分支。
例如：
git checkout experiment
git rebase master

原理：首先找到这两个分支，即当前分支experiment、变基操作的目标基底分支master的最近共同祖先C2.对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件

研究 2.https和ssh