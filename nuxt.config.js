module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/icon/style.css' }
      // { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-default/index.css' }
    ],
    script: [
        { src: '/js/jquery.min.js' }
        // { src: 'https://unpkg.com/element-ui/lib/index.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
      // 'element-ui/lib/theme-default/index.css',
      '~/assets/css/main.css',
      // 项目中的 Sass 文件
      { src: '~/assets/scss/main.scss', lang: 'scss' } // 指定 scss 而非 sass
  ],
  // plugins: ['~plugins/element-ui'],
  /*
  ** Add axios globally
  */
  build: {
    postcss: [
        require('autoprefixer')(),
        require('postcss-nested')(),
        require('postcss-responsive-type')(),
        require('postcss-hexrgba')()
    ],
    vendor: ['axios','element-ui'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
