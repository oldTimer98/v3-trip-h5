import { defineStore } from "pinia"

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      cities: [],
    }
  },
  actions: {},
})
