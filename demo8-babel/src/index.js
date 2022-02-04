import helloworld from './hello-world'
import imgSrc from './assets/hetun.png'
import './style.css'
import './style.less'
helloworld();

const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)


document.body.classList.add('hello')
