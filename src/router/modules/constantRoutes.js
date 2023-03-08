/* Layout */
import Layout from '@/layout'
// 静态路由
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
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "首页"
        },
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/About.vue"),
        meta: {
          title: "参保查询"
        },
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component:() => import('@/views/error/index.vue')
  }
];