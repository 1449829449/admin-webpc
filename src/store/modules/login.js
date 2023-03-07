import { login, editPassword } from '@/api/login'
import cookie from 'js-cookie'
import router from '@/router'
const loginx = {
  namespaced: true,
  state: {
    token:'',
    userInfo: {}
  },
  getters: {},
  mutations: {
    ACCESS_TOKEN:(state,value) =>{
      state.token = value
    },
    userInfo:(state,value)=>{
      state.userInfo = value
    }
  },
  actions: {
    toLogin({commit}, info){
      return new Promise((resolve, reject) => {
        login(info).then((res) => {
          if(res.code === '200'){
            console.log(res)
            commit('token', res.data)
            commit('userInfo', {ms_name:info.name, user_id:res.message})
            cookie.set('ms_name', info.name)
            cookie.set('token', res.data)
            cookie.set('user_id', res.message)
            resolve(res)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 退出登录
    logOut({ commit }) {
      commit('token', '')
      commit('userInfo', {})
      cookie.remove('token')
      cookie.remove('ms_name')
      cookie.remove('user_id')
      router.push('login')
    },
    // 重置密码
    czCode({commit}, info){
      return new Promise((resolve, reject) => {
        editPassword(info).then((res)=>{
          commit('ACCESS_TOKEN', '')
          commit('userInfo', '')
          cookie.remove('token')
          cookie.remove('ms_name')
          cookie.remove('user_id')
          router.push('login')
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  },

};
export default loginx;