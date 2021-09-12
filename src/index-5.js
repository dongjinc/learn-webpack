import _ from 'lodash'
import print from './print'
import axios from 'axios'

function component(){
    console.log(__webpack_public_path__, 'import.meta.url')
    const element = document.createElement('div')
    element.classList.add('hello211')
    _.add(1, 2)
    axios.get()
    element.innerHTML = '123'
    element.onclick = print.bind(null, 'webpack', axios)
    
    return element
}

document.body.appendChild(component())


