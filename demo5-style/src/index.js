import helloworld from './hello-world'
import imgSrc from './assets/hetun.png'
import imgSrcSVG from './assets/hetun.svg'
import helloTxt from './assets/hello.txt'
import imgSrcJPG from './assets/wuhuang.jpg'
import './style.css'
import './style.less'
helloworld();

const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)

const imgSvg = document.createElement('img')
imgSvg.style.cssText = 'width: 100px; height: 100px'
imgSvg.src = imgSrcSVG
document.body.appendChild(imgSvg)

const block = document.createElement('div')
block.textContent = helloTxt

document.body.appendChild(block)

const imgJPG = document.createElement('img')
imgJPG.style.cssText = 'width: 100px; height: 100px'
imgJPG.src = imgSrcJPG
document.body.appendChild(imgJPG)

document.body.classList.add('hello')
