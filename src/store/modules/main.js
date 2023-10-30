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
})
