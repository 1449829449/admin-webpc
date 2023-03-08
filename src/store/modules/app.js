const appx = {
  namespaced: true,
  state:{
    opened: false,
  },
  mutations:{
    SET_OPENED(state) {
      state.opened = !state.opened
    }
  }
}
export default appx