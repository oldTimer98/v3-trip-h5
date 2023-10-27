import { getHomeCategories, getHomeHotSuggests } from "@/services"
import { defineStore } from "pinia"

export const useHomeStore = defineStore("home", {
  state: () => {
    return {
      hotSuggests: [],
      categories: [],
    }
  },
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
  },
})
