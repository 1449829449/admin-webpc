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

Vue.config.productionTip = false
process.env.VUE_APP_ENV !== 'prod' && require('../mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
