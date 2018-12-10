const getJwt = (state) => {
  return state.jwt ;
}

const getCurrentUser = (state) => {
  return state.currentUser ;
}

const getCurrentProject = (state) => {
  return state.currentProject ;
}

export default {
  getJwt,
  getCurrentUser,
  getCurrentProject
}