// 引入插件
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    // 去除没有用到的css
    purgecss({
      content: [`./public/**/*.html`,`./src/**/*.vue`, `./src/**/*.js`], // 需要分析的内容
      defaultExtractor(content) {  // 分析style内联样式
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
      },
      safelist: [/^el/], // 指明哪些选择器可以安全地被保留在最终的 CSS 中
    }),
  ]
};