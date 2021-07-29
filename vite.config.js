import { defineConfig } from 'vite'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [
    reactRefresh(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       libDirectory: 'es',
    //       style: name => `antd/es/${name}/style`
    //     }
    //   ]
    // })
  ],
  // publicPath
  base: '/',
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: 'local.baas.uban360.net',
    port: '8080',
    open: true,
    proxy: {
      '/baas-ops': {
        target: 'https://ioc.uban360.com:21007',
        changeOrigin: true
      },
      '/dev-ops': {
        target: 'https://ioc.uban360.com:21007',
        changeOrigin: true
      },
      '/awg-admin': {
        target: 'http://10.0.20.90:7514',
        changeOrigin: true
      },
      '/POST': {
        target: 'https://mock.api.jituancaiyun.com/app/mock/166',
        changeOrigin: true
      },
      '/GET': {
        target: 'https://mock.api.jituancaiyun.com/app/mock/166',
        changeOrigin: true
      },
    }
  }
})
