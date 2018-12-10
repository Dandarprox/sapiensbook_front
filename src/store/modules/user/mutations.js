const setJwt = (state, payload) => {
  state.jwt = payload;
}

const setCurrentUser = (state, payload) => {
  state.currentUser = payload;
}

const setCurrentProject = (state, payload) => {
  state.currentProject = payload;
}

export default {
  setJwt,
  setCurrentUser,
  setCurrentProject
}