/* Layout */
// import Layout from '@/layout'

// 动态路由
export default [
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   children: [
  //     {
  //       path: "/table",
  //       name: "table",
  //       component: () => import("@/views/table/index.vue"),
  //       meta: {
  //         title: "表格"
  //       },
  //     }
  //   ]
  // },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
    meta: {
      title: "参保查询",
    },
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/usermanage',
  //   name: 'test',
  //   meta: { title: '系统管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: "usermanage",
  //       name: "usermanage",
  //       component: () => import("@/views/usermanage/index.vue"),
  //       meta: {
  //         title: "角色管理"
  //       },
  //     },
  //     {
  //       path: "rolemanage",
  //       name: "rolemanage",
  //       component: () => import("@/views/rolemanage/index.vue"),
  //       meta: {
  //         title: "用户管理"
  //       },
  //     },
  //   ]
  // },
  {
    path: "*",
    name: "404",
    hidden: true,
    component: () => import("@/views/error/index.vue"),
  },
];
