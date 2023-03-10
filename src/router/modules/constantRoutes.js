/* Layout */
import Layout from '@/layout'

// 静态路由,不会添加到导航栏
export default [
  { path: '/', redirect: '/home'},
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登陆"
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Example',
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "首页"
        },
      }
    ]
  }
];