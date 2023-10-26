import { createRouter, createWebHashHistory } from "vue-router"
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/favor",
    name: "favor",
    component: () => import("@/views/favor/index.vue"),
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/message/index.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order/index.vue"),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
