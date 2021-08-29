import '../public/css/index.css'
import Icon from '../public/images/icon.png'
import Data from '../public/data.csv'

function component(){
    console.log(__webpack_public_path__, 'import.meta.url')
    const element = document.createElement('div')
    element.classList.add('hello')
    const myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)
    element.innerHTML = '123'
    console.log(Data, 'Data')
    
    return element
}


function love(){
    try{
        return 1
    } finally{
        console.log('hello word')
    }
}

document.body.appendChild(component())

