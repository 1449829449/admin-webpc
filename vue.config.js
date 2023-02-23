const path = require('path')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_ENV === 'prod' ? 'CDN' : '', // 打包路径
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
      .use('svgo-loader')
      .loader('svgo-loader')
      .end()
      
  },
}
