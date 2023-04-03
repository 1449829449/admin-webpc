import Vue from "vue";
import VueRouter from "vue-router";
import getPageTitle from "@/libs/get-page-title";
// 静态路由

import asyncRoutes from "./modules/asyncRoutes";
import constantRoutes from "./modules/constantRoutes";
// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// permissions
import store from "@/store";
import cookie from "js-cookie";

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: 'history',
  routes: constantRoutes,
  base: process.env.BASE_URL,
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start();
  const token = cookie.get("token");
  if (token && token !== "undefined") {
    if (to.path === "/login") {
      next(false);
      NProgress.done();
    } else {
      const hasRoles = store.state.login.addRoutes.length > 0;
      if (hasRoles) {
        next();
      } else {
        // debugger
        const addRou = await store.dispatch(
          "login/getAsyncRoutes",
          asyncRoutes
        );
        router.addRoutes(addRou);
        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true });
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({
        name: "login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
});

router.afterEach((to) => {
  // 进度条
  NProgress.done();
  // 设置浏览器标题
  document.title = getPageTitle(to.meta.title);
});

// 解决重复点击路由报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

// 解决重复点击路由报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

export default router;
