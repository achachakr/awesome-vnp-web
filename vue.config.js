const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 개발 서버에서 저장할 때 ESLint 검사 안 함
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8080", // 스프링 부트 서버
        changeOrigin: true,
      },
        '^/uploads': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
