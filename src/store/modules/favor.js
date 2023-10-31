import { defineStore } from "pinia";
import { getFavorList } from "@/services";

const useFavorStore = defineStore("favor", {
  state: () => ({
    hotFavorList: [], //存储收藏数据
  }),
  actions: {
    async fetchHotFavorList() {
      const res = await getFavorList();
      this.hotFavorList = res.data.data;
    },
  },
});

export default useFavorStore;
