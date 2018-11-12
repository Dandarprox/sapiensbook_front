const setJwt = (state, payload) => {
  state.jwt = payload;
}

const setCurrentUser = (state, payload) => {
  state.currentUser = payload;
}

export default {
  setJwt,
  setCurrentUser
}