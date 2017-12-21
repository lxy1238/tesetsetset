//随机字符串
import { parseTime } from './date'
export default function RandomString () {
  const timeStamp = Date.now()
  const RandonNum = parseInt( Math.random() * 100000 )+ '1'
  return parseInt(RandonNum + timeStamp).toString(32).slice(1,6)
}

export function base64Encode (string) {
  
  let base64 = require('js-base64').Base64
  return  base64.encode(RandomString()+string)
}
export function base64Decode (string) {
  if (string === undefined) {
    return ''
  }
  let base64 = require('js-base64').Base64
  return base64.decode(string).slice(5)
}


//生成随便订单编号，唯一的
export  function RandomPayNumber () {
  let newTime = new Date()
  let randomNumber = parseTime(newTime, '{y}{m}{d}{h}{i}{s}')
  let RandonNum = parseInt( Math.random() * 100000000000 ) + ''
  randomNumber = randomNumber + RandonNum.slice(1,9) 
  return randomNumber
}