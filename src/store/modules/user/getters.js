const getJwt = (state) => {
  return state.jwt ;
}

const getCurrentUser = (state) => {
  return state.currentUser ;
}

export default {
  getJwt,
  getCurrentUser
}