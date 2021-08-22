import '../public/css/index.css'
import Icon from '../public/images/icon.png'

function component(){
    const element = document.createElement('div')
    element.classList.add('hello')
    const myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)
    return element
}

document.body.appendChild(component())

