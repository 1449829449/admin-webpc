import Vue from 'vue';
import VueRouter from 'vue-router';
import getPageTitle from '@/libs/get-page-title';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// permissions
// import store from '@/store';
import storage from 'store';

// 模块引入
/* Router Modules */
const ms = require.context('./modules', false, /\.js$/);
const routes = (ms.keys().map((item) => ms(item).default || [])).flat(2);

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start();
  const token = storage.get('ACCESS_TOKEN');
  if(token && token !== 'undefined') {
    if(to.path === '/login'){
      next(false)
      NProgress.done();
    }else{
      next()
    }
  } else {
    if (to.path === '/login') {
      next() 
    } else {
      next({
        name: 'login',
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
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 解决重复点击路由报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

export default router;
