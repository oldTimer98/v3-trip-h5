import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router"
import pinia from "@/store"

import "normalize.css"
import "@/assets/css/index.scss"

// 引入vant css
import 'vant/es/toast/style';
import 'vant/es/notify/style';
import 'vant/es/dialog/style';

const app = createApp(App)
app.use(router)
app.use(pinia)

app.config.errorHandler = function (err, vm, info) {
  console.error(err, "全局错误")
}
console.log(import.meta.env.MODE, "环境")
app.mount("#app")
