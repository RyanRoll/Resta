import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    svgr(),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: 'src', replacement: path.resolve(__dirname, './src') },
    ],
  },
  base: './',
  define: {
    'process.env': process.env,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    modules: {
      localsConvention: 'dashesOnly',
    },
  },
  server: {
    port: 4150,
  },
})
