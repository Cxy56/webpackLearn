// 动态导入import
// 应用：懒加载
function getComponent(){
  return import('lodash').then(({
    default: _
  }) => {
    const element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'webpack'], ' ')
    return element
  })
}
getComponent().then(element => {
  document.body.appendChild(element)
})
