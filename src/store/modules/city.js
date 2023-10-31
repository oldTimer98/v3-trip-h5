import { getCityAll, getCurrentCity } from "@/services"
import { defineStore } from "pinia"

export const useCityStore = defineStore("city", {
  state: () => {
    return {
      allCities: {},
      currentCity: {
        cityName: "请选择城市",
      },
    }
  },
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    },
    async fetchCurrentCityData() {
      const {
        data: {
          ipData: { city, region, country },
        },
      } = await getCurrentCity()
      this.currentCity.cityName = city || region || country
    },
  },
})
