import helloworld from './hello-world'
import imgSrc from './assets/hetun.png'
import './style.css'
import './style.less'
import './async-module.js'
helloworld();

const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)

document.body.classList.add('hello')


const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click', () => {
  import(/*webpackChunkName: 'math', webpackPrefetch: true */'./math.js').then(({ add }) => {
    console.log(add(4,5))
  })
})

document.body.appendChild(button)
