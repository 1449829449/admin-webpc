const path = require('path')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_ENV === 'prod' ? 'CDN' : '', // 打包路径
  // vue.config.js
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_BASE_HTTP, // 后台接口域名
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        // pathRewrite: {
        //   "^/hmb-admin-base": "/hmb-admin-base",
        // },
      },
    },
  },
  // sass 写法
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/global.scss';`,
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer').use(
        new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
          openAnalyzer: false, // 在默认浏览器中是否自动打开报告，默认 true
        })
      )
    }
    // vue.config.js svg 图标进行自动注册
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
    // 压缩svg图片
    // .use('svgo-loader')
    // .loader('svgo-loader')
    // .end()
  },
}
