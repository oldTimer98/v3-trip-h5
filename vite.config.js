import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import Components from "unplugin-vue-components/vite"
import { VantResolver } from "@vant/auto-import-resolver"
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/variables.scss";`,
      },
    },
  },
})
