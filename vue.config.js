module.exports = {
 // sass 写法
 css: {
      loaderOptions: {
        sass: {
          prependData: `@import '@/styles/global.scss';`,
        },
      },
  }
}