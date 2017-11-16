const getters = {
  username: state => state.user.username, 
  email: state => state.user.email,
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar, 
  user_id: state => state.user.user_id,
  joinedDate: state => state.user.joinedDate, 
  memberLever: state => state.user.memberLever, 
  couponsPosted: state => state.user.couponsPosted, 
  lastPostedDate: state => state.user.lastPostedDate, 
  oneLevel: state => state.product.oneLevel,
  productId: state => state.product.productId,
  currentRouter: state => state.personal.currentRouter,
  addRouters: state => state.permisstion.addRouters
}

export default getters