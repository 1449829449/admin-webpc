import { login } from '@/api/login'
const loginx = {
  namespaced: true,
  state: {
    ACCESS_TOKEN:'666',
    userInfo: ''
  },
  getters: {},
  mutations: {
    ACCESS_TOKEN:(state,value) =>{
      state.ACCESS_TOKEN = value
    },
    userInfo:(state,value)=>{
      state.userInfo = value
    }
  },
  actions: {
    toLogin({commit}, info){
      return new Promise((resolve, reject) => {
        login(info).then((res) => {
          commit('ACCESS_TOKEN', res)
          window.localStorage.setItem('ACCESS_TOKEN', res)
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  },
};
export default loginx;