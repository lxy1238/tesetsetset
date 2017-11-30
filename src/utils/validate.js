
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

/* 验证图片是否存在 */

export function validateImg (imgUrl) {
  var ImgObj = new Image()//判断图片是否存在  
  ImgObj.src = imgUrl  
  if (ImgObj.width > 0 && ImgObj.height > 0) {  
    return true  
  } else {  
    return false
  }  
}