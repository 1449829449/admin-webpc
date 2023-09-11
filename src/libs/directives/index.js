//多模块引入简写、
let ms = require.context("./global", false, /\.js$/);
let modules = {};

ms.keys().forEach((k) => {
  let n = k.substring(2, k.length - 3);
  modules[n] = ms(k).default;
});

export default {
  install(Vue) {
    Object.keys(modules).forEach((key) => {
      Vue.directive(key, modules[key]);
    });
  },
};
