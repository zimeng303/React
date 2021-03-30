/**
 * CommonJs 语法
 */

const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api1', { // 遇见 /api1 前缀的请求，就会触发该代理配置
      target: 'http://localhost:5000', // 请求转发给谁
      changeOrigin: true, // 控制服务器收到的请求头中 Host 字段的值，Host 表示本次请求是从哪里发出的，欺骗服务器 Host 字段的值
      pathRewrite: { // 重写请求路径
        '^/api1': ''
      }
    }),
    proxy('/api2', {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {
        '^/api2': ''
      }
    })
  )
}