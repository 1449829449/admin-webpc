// 这是项目发布阶段需要用到的babel插件
const prodPlugins = [];
if (process.env.VUE_APP_ENV === "prod") {
  prodPlugins.push("transform-remove-console");
}
module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    ["@babel/preset-env", { modules: false }],
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
    ...prodPlugins,
  ],
};
