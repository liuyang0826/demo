const fs = require('fs')
// 读取JSON
function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'UTF-8' }, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}
// 写入svg
function writeFile (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, { encoding: 'UTF-8' }, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('创建成功')
      }
    })
  })
}

async function createSvgStr (path) {
  let data = JSON.parse(await readFile(path))
  let content = ''
  data.forEach((item) => {
    let d = `M0 0H${item.width}V${item.height}H0V0`
    item.content.forEach((i) => {
      if (Array.isArray(i.width)) { // width可数组可单个数字
        i.width.forEach((w, index) => {
          Array.isArray(i.space) || (i.space = Array.from({length: i.width.length - 1}).fill(i.space)) // space可数组可单个数字
          let x = i.x
          Array.from({length: index + 1}).forEach((_, index) => {
            x += (i.width[index - 1] || 0) + (i.space[index - 1] || 0)
          })
          d += `M${x} ${i.y}h${w}v${i.height}h${-w}v${-i.height}`
        })
      } else {
        d += `M${i.x} ${i.y}h${i.width}v${i.height}h${-i.width}v${-i.height}`
      }
    })
    content += `<symbol id="${item.name}" viewBox="0 0 ${item.width} ${item.height}">\r\t\t<path d="${d}" fill="currentColor" fill-rule="evenodd"/>\r\t</symbol>\r\t<path d="${d}" fill="currentColor" fill-rule="evenodd"/>\r\t`
  })
  return content
}

async function json2svg (path) {
  await createSvgStr(path)
  writeFile('export.svg', `<svg viewBox="0 0 750 240" version="1.1" style="display: none;" xmlns="http://www.w3.org/2000/svg">\r\t${content}\r</svg>`)
}

json2svg('svg.json')
