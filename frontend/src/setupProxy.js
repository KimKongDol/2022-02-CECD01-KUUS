const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //백포트로 프록시
      target: 'http://localhost:5000',
      changeOrigin: true,
      connection: 'upgrade',
    })
  );
};