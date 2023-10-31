import { createRouter, createWebHashHistory } from "vue-router"
import { getCurrentUser } from "@/plugins/modules/user"
import { showFailToast } from "vant"
import { getToken } from "@/utils"
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
    meta: {
      title: "收藏",
    },
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/message/index.vue"),
    meta: {
      title: "消息",
    },
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order/index.vue"),
    meta: {
      title: "订单",
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/profile/user.vue"),
    meta: {
      title: "我的",
    },
  },
  {
    path: "/user/edit",
    name: "userEdit",
    component: () => import("@/views/profile/cpns/user-edit-page.vue"),
    meta: {
      title: "编辑信息",
    },
  },
  {
    path: "/city",
    name: "city",
    component: () => import("@/views/city/index.vue"),
    meta: {
      title: "城市",
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/search.vue"),
    meta: {
      hideTabBar: true,
      title: "搜索",
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/views/detail/index.vue"),
    meta: {
      title: "房屋详情",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      hideTabBar: true,
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register/register.vue"),
    meta: {
      hideTabBar: true,
      title: "注册",
    },
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/notFound/notFound.vue"),
    meta: {
      hideTabBar: true,
      title: "404",
    },
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || "时光民宿"
  // const currentUser = await getCurrentUser() // 检查用户是否已登录
  const token = getToken()
  if (to.path === "/user" && token === null) {
    showFailToast("用户未登录")
    next("/login")
  } else if (to.path === "/login") {
    if (token !== null) {
      return "/home"
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
