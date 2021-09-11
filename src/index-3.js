import printMe from "./print";
// let i = 0
function component() {
  console.log(__webpack_public_path__, "import.meta.url");
  const element = document.createElement("div");
  const btn = document.createElement("button");
  // setInterval(() => {
  //   element.innerText = i++
  // }, 1600)
  btn.innerHTML = "Click me 1l21223232322233";
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}


if (module.hot) {
  document.getElementById('app').innerHTML = ""
  document.getElementById('app').appendChild(component())
  module.hot.accept();
}
