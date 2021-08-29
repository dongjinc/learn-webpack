import '../public/css/index.css'
import Icon from '../public/images/icon.png'
function component(){
    console.log(__webpack_public_path__, 'import.meta.url')
    const element = document.createElement('div')
    element.classList.add('hello')
    const myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)
    element.innerHTML = logo
    return element
}

document.body.appendChild(component())

