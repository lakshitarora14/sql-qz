import { Papa } from 'papaparse'

onmessage = function (file) {
  console.log('file', file)
  const data = parseFile(file)
  const columns = generateColumns(data[0])
  postMessage(data, columns)
}

function parseFile(file: any) {
  let res = []
  Papa.parse(file, {
    skipEmptyLines: true,
    header: true,
    complete: (results) => {
      res = results.data
    }
  })
  return res
}
function generateColumns(data: Record<string, any>) {
  const result = []
  Object.keys(data).forEach((key) => {
    result.push({
      key: key,
      dataKey: key,
      title: key,
      width: 150
    })
  })
  return result
}
