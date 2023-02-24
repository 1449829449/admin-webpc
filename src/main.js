import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./libs/addelement";
// 在main.js引入图标
import "./icons";
// 全局指令
import Directives from "./libs/directives";
Vue.use(Directives);

// ◆导入
import * as filters from "./libs/filter";
// ◆循环注册过滤器里面的函数
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false
process.env.VUE_APP_ENV !== 'prod' && require('../mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
