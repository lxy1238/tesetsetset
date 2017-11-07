const getters = {
  username: state => state.user.username, 
  avatar: state => state.user.avatar, 
  joinedDate: state => state.user.joinedDate, 
  memberLever: state => state.user.memberLever, 
  couponsPosted: state => state.user.couponsPosted, 
  lastPostedDate: state => state.user.lastPostedDate, 
  oneLevel: state => state.product.oneLevel,
  productId: state => state.product.productId
}

export default getters