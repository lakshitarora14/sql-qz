self.onmessage = (event: any) => {
  if (event.data && event.data.task === 'count') {
    const parsedData = JSON.parse(event.data.data)
    const res = parsedData.length
    postMessage(res)
    return
  }
  const parsedData = JSON.parse(event.data.data)
  const searchQuery = event.data.searchQuery
  const searchColumnFilter = event.data.searchColumnFilter
  const result = parsedData.filter((item: any) => {
    return item[searchColumnFilter].toLowerCase().includes(searchQuery.toLowerCase())
  })
  postMessage(result)
}
