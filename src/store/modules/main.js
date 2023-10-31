import { defineStore } from "pinia"

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)
export const useMainStore = defineStore("main", {
  state: () => {
    return {
      token: "",
      userInfo: {},

      startDate: startDate,
      endDate: endDate,
      isLoading: false,
    }
  },
  // 所有数据持久化
  // persist: true,
  // 持久化存储插件其他配置
  persist: {
    enabled: true,
    strategies: [
      {
        key: "token",
        storage: sessionStorage,
      },
      {
        key: "userInfo",
        storage: sessionStorage,
      },
    ],
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    // path: ["userInfo"],
  },
})
