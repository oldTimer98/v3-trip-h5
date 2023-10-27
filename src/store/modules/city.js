import { getCityAll, getCurrentCity } from "@/services"
import { defineStore } from "pinia"

export const useCityStore = defineStore("city", {
  state: () => {
    return {
      allCities: {},
      currentCity: {
        cityName: "加载中...",
      },
    }
  },
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    },
    async fetchCurrentCityData(){
      const res = await getCurrentCity()
      console.log(res);
    }
  },
})
