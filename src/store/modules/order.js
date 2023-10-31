import { defineStore } from "pinia";
import { getOrderList } from "@/services";

const useOrderStore = defineStore("Order", {
  state: () => ({
    hotOrderList: [], //存储收藏数据
  }),
  actions: {
    async fetchHotOrderList() {
      const res = await getOrderList();
      this.hotOrderList = res.data.data;
    },
  },
});

export default useOrderStore;
