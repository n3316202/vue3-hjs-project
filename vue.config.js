const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../src/main/resources/static', // Build Directory
  devServer: {
    proxy: 'http://3.37.128.156' // Spring Boot Server
  }
})
