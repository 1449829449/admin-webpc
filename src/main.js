import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./libs/addelement";
// 在main.js引入图标
import "./icons";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
