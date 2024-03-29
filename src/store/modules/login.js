import { login, editPassword } from "@/api/login";
import { addRoute } from "@/api/login";
import { forSearchArr } from "@/libs/frameway";
import cookie from "js-cookie";
import router from "@/router";

const loginx = {
  namespaced: true,
  state: {
    token: "",
    userInfo: {},
    addRoutes: [],
  },
  getters: {},
  mutations: {
    ACCESS_TOKEN: (state, value) => {
      state.token = value;
    },
    userInfo: (state, value) => {
      state.userInfo = value;
    },
    SET_ROUTES(state, value) {
      state.addRoutes = value;
    },
  },
  actions: {
    // 登陆
    toLogin({ commit }, info) {
      return new Promise((resolve, reject) => {
        login(info)
          .then((res) => {
            if (res.code === "200") {
              commit("token", res.data);
              commit("userInfo", { ms_name: info.name, user_id: res.message });
              cookie.set("ms_name", info.name);
              cookie.set("token", res.data);
              cookie.set("user_id", res.message);
              resolve(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取权限
    getAsyncRoutes({ commit }, value) {
      return new Promise((resolve, reject) => {
        addRoute()
          .then((res) => {
            let routes = [...forSearchArr(res.data.children, "1"), ...value];
            commit("SET_ROUTES", routes);
            resolve(routes);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 退出登录
    logOut({ commit }) {
      commit("ACCESS_TOKEN", "");
      commit("userInfo", {});
      commit("SET_ROUTES", []);
      cookie.remove("token");
      cookie.remove("ms_name");
      cookie.remove("user_id");
      router.push("/login");
    },
    // 重置密码
    czCode({ commit }, info) {
      return new Promise((resolve, reject) => {
        editPassword(info)
          .then((res) => {
            commit("ACCESS_TOKEN", "");
            commit("userInfo", "");
            commit("SET_ROUTES", []);
            cookie.remove("token");
            cookie.remove("ms_name");
            cookie.remove("user_id");
            router.push("login");
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
export default loginx;
