// const name = 'Card'
// const module = require(`./component/${name}/index`)
// console.log(module)
import './index.css'

/** 
 * 参数一 指定目录
 * 参数二 是否还搜索其子目录
 * 参数三 表达匹配文件表达式
 */
//  const context = require.context('./component/', true, /\.js$/)
//  console.log(context.keys())
//  context.keys().map(it => {
  //  console.log(context.resolve(it), lodash.isRegExp)
//  })
function component() {
  const element = document.createElement("div");
  element.classList.add("md:w-2/3");
  return element;
}

document.body.appendChild(component());