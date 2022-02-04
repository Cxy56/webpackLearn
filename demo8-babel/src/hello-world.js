
function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello~~~')
    }, 2000)
  })
}
async function helloworld() {
  const str = await getString()
  console.log('helloworld===', str)
}

export default helloworld
