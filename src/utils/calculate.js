// 用于浮点数的计算

//加法
export function NumAdd (a, b) {
  var c, d, e
  
  try {
    c = (a + '').split('.')[1].length
  } catch(f) {
    c = 0
  }
  try {
    d = (b + '').split('.')[1].length
  } catch(f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (a * e + b * e)/ e
}

//减法
export function Numsub (a, b) {
  var c, d, e
  
  try {
    c = (a + '').split('.')[1].length
  } catch(f) {
    c = 0
  }
  try {
    d = (b + '').split('.')[1].length
  } catch(f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (a * e - b * e) / e
}

//乘法运算 0.03  * 0.05 变成3 * 5 / 10^4
export function NumMul (a, b) {
  var n = 0
  var c = a.toString(10)
  var d = b.toString(10)
  try {
    n += c.split('.')[1].length
  } catch (f) {}
  try {
    n += d.split('.')[1].length
  } catch (f) {}
  return (+c.replace('.', '')) * (+d.replace('.', '')) / Math.pow(10, n)
}

//除法运算
export function NumDev (a, b) {
  var c, d, e, f
  try {
    c = (a + '').split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = (b + '').split('.')[1].length
  } catch (f) {
    d = 0
  }
  return e = (a + '').replace('.', '') , f = (b + '').replace('.', ''), NumMul(e / f, Math.pow(10, d - c))
}