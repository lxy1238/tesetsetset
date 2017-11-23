import Cookie from 'js-cookie'

const EMAIL = 'email'
const PASSWORD = 'password'
const TOKEN = 'token'

//查询领取人的信息时要用到的，防止页面强制刷新后数据丢失

const expiresData = 30

export function getEmail () {
  return Cookie.get(EMAIL)
}

export function setEmail (email) {
  // return Cookie.set(EMAIL, email)
  return Cookie.set(EMAIL, email, { expires: expiresData })
}

export function removeEmail() {
  return Cookie.remove(EMAIL)
}


export function getPass () {
  return Cookie.get(PASSWORD)
}

export function setPass (pass) {
  // return Cookie.set(PASSWORD, pass)
  return Cookie.set(PASSWORD, pass, { expires: expiresData })
}

export function removePass() {
  return Cookie.remove(PASSWORD)
}

export function getToken () {
  return Cookie.get(TOKEN)
}

export function setToken (token) {
  // return Cookie.set(TOKEN, token)
  return Cookie.set(TOKEN, token, { expires: expiresData })
}

export function removeToken() {
  return Cookie.remove(TOKEN)
}
