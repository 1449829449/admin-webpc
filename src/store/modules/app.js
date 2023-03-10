const appx = {
  namespaced: true,
  state:{
    opened: false,
    addRoutes: []
  },
  mutations: {
    SET_OPENED(state) {
      state.opened = !state.opened
    },
    SET_ROUTES(state, value) {
      state.addRoutes = value
    }
  },
  actions: {
    getAsyncRoutes({ commit}, value) {
      return new Promise(resolve => {
        commit('SET_ROUTES', value)
        resolve(value)
      })
    }
  }
}
export default appx