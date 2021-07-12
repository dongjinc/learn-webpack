- webpack 最出色的功能之一，除了引入 JavaScript 还可以通过 loader 引入任何其他类型的文件。

- 了解下 source-map
  webpack 指南
- 管理资源
  1). 加载 css - loader style-loader、css-loader 自下往上执行-从右往左 - plugin mini-css-extract-plugin(提取 css)、css-minimizer-webpack-plugin(压缩 css)

       optimization: {
           minimizer: [

           ]
       }

- git remote -v 查看当前远程仓库列表
  git remote add origin xxx
  git remote set-url origin xxx
  git remote rm xx
  git remote rename origin xxx 重命名远程仓库
  git log --pretty=oneline

- git reset --hard/soft commitId/HEAD~x

- 当本地仓库只有一次 commit ，reset 命令无法回退上次的提交状态
  git update-ref -d HEAD 来清除所有提交版本并清空工作空间

<!-- https://segmentfault.com/a/1190000023734704 -->
