import printMe from "./print";

function component() {
  console.log(__webpack_public_path__, "import.meta.url");
  const element = document.createElement("div");
  const btn = document.createElement("button");

  btn.innerHTML = "Click me and check the console";
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}
document.body.appendChild(component());
