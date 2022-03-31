module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  runtimeCompiler: true,
  configureWebpack: {
    devtool: 'source-map'
  },
  "configureWebpack" : {
    devServer : {
      // https://github.com/vuejs-templates/webpack/issues/378
      watchOptions: {
        poll: true,
      },
    }
  }
}