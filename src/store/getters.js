const getters = {
  username: state => state.user.username, 
  email: state => state.user.email,
  token: state => state.user.token,
  user_id: state => state.user.user_id,
  roles: state => state.user.roles,
  promotions: state => state.user.promotions,
  userBase: state => state.user.userBase, 
  userAccount: state => state.user.userAccount, 
  joined_date: state => state.user.joined_date, 
  celebrity: state => state.user.celebrity,
  merchant: state => state.user.merchant,
  currentRouter: state => state.personal.currentRouter,
  countryInfo: state => state.personal.countryInfo,
  addRouters: state => state.permisstion.addRouters
}

export default getters