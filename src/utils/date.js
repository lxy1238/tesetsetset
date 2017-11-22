//时间函数

//时间戳转化成需求中需要的格式
export  function timestampFormat(timestamp) {
  var date = new Date() 
  date.setTime(timestamp * 1000)
  var dateString = date.toDateString()
  return dateString.slice(4, 7) +" "+ dateString.slice(-4)
}