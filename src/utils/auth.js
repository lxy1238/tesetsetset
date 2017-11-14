import Cookie from 'js-cookie'

const EMAIL = 'email'
const PASSWORD = 'password'
const TOKEN = 'token'

export function getEmail () {
  return Cookie.get(EMAIL)
}

export function setEmail (email) {
  return Cookie.set(EMAIL, email)
  // return Cookie.set(EMAIL, email, { expires: 30 })
}

export function removeEmail() {
  return Cookie.remove(EMAIL)
}


export function getPass () {
  return Cookie.get(PASSWORD)
}

export function setPass (pass) {
  return Cookie.set(PASSWORD, pass)
  // return Cookie.set(PASSWORD, pass, { expires: 30 })
}

export function removePass() {
  return Cookie.remove(PASSWORD)
}

export function getToken () {
  return Cookie.get(TOKEN)
}

export function setToken (token) {
  return Cookie.set(TOKEN, token)
  // return Cookie.set(USERKEY, name, { expires: 30 })
}

export function removeToken() {
  return Cookie.remove(TOKEN)
}
