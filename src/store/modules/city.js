import { defineStore } from "pinia"

export const useCityStore = defineStore("city", {
  state: () => {
    return {
      cities: [],
    }
  },
  actions: {},
})
