import { getHomeCategories, getHomeHotSuggests, getHomeHouseList } from "@/services"
import { defineStore } from "pinia"

export const useHomeStore = defineStore("home", {
  state: () => {
    return {
      hotSuggests: [],
      categories: [],
      currentPage: 1,
      houseList: [],
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
    async fetchHouseListData() {
      const res = await getHomeHouseList(this.currentPage)
      this.houseList.push(...res.data)
      this.currentPage++
    },
  },
})
