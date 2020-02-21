const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  configureWebpack: {//引入jquery
    plugins: [
      new CompressionPlugin({//gzip压缩配置
        test: /\.js$|\.html$|\.css/,//匹配文件名
        threshold: 10240,//对超过10kb的数据进行压缩
        deleteOriginalAssets: false,//是否删除原文件
      })
    ]
  },
}