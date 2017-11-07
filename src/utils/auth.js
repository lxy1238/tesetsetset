import Cookie from 'js-cookie'

const USERKEY = 'username'

export function getUser () {
  return Cookie.get(USERKEY)
}

export function setUser (name) {
  return Cookie.set(USERKEY, name, { expires: 30 })
}

export function removeUser() {
  return Cookie.remove(USERKEY)
}