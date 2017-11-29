//随机字符串

export default function RandomString () {
  const timeStamp = Date.now()
  const RandonNum = parseInt( Math.random() * 100000 )+ "1"
  return parseInt(RandonNum + timeStamp).toString(32).slice(1,6)
}

export function base64Encode (string) {
  
  var base64 = require('js-base64').Base64
  return  base64.encode(RandomString()+string)
}
export function base64Decode (string) {
  var base64 = require('js-base64').Base64
  return base64.decode(string).slice(5)
}