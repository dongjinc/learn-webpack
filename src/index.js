// const name = 'Card'
// const module = require(`./component/${name}/index`)
// console.log(module)
/** 
 * 参数一 指定目录
 * 参数二 是否还搜索其子目录
 * 参数三 表达匹配文件表达式
 */
 const context = require.context('./component/', true, /\.js$/)
 console.log(context.keys())
 context.keys().map(it => {
   console.log(context.resolve(it))
 })
 console.log(context.id)
