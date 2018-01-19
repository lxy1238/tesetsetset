
/* 小写字母*/
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}


/* 验证邮箱 */

export function validateEmail (str) {
  const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  return reg.test(str)
}

/* 合法uri*/
export function validateURL (textval) {
  const urlregex = /^((https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}


/* 获取链接的host 和 子体asin码 */
export function validateAmazonHost (textval) {
  // const urlregex =/(www.amazon.[a-z]*)(\/[a-zA-Z0-9-]*)?(\/gp\/([A-Z0-9]+))?(\/dp\/([A-Z0-9]+))?/
  const urlregex = /(www.amazon.[a-z|.]*)[\/a-zA-Z0-9|-]*\/[gp|dp]*\/([A-Z0-9]*)/
  return urlregex.exec(textval)
}

//获取关键字

export function validateKeyword (textval) {
  // const urlregex =/(www.amazon.[a-z]*)(\/[a-zA-Z0-9-]*)?(\/gp\/([A-Z0-9]+))?(\/dp\/([A-Z0-9]+))?/
  const urlregex = /keywords=([a-zA-Z0-9|%20|.|_|\+]+)/
  return urlregex.exec(textval)
}

/* 验证图片是否存在 */

// export function validateImg (imgUrl) {
//   var ImgObj = new Image()//判断图片是否存在  
//   ImgObj.src = imgUrl  
//   if (ImgObj.width > 0 && ImgObj.height > 0) {  
//     return true  
//   } else {  
//     return false
//   }  
// }