/* Layout */
import Layout from "@/layout";

// 遍历asyncRoutes动态路由
export function forSearchArr(route, index) {
  let addrouter = [];
  for (const i in route) {
    if (route[i].children.length === 0 && index === "1") {
      addrouter.push({
        path: route[i].url || `/${route[i].id}`,
        component: Layout,
        meta: {
          title: route[i].name,
        },
        children: [
          {
            path: route[i].url,
            name: route[i].id,
            component: () => import(`@/views${route[i].url}/index.vue`),
            meta: {
              title: route[i].name,
            },
          },
        ],
      });
    } else {
      addrouter.push({
        path: route[i].url || `/${route[i].id}`,
        component:
          index === "1"
            ? Layout
            : () => import(`@/views${route[i].url}/index.vue`),
        name: route[i].id,
        meta: {
          title: route[i].name,
        },
      });
    }
    if (route[i].children.length > 1) {
      addrouter[i].children = forSearchArr(route[i].children, "2");
    }
  }
  return addrouter;
}
