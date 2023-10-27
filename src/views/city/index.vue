<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search v-model="searchValue" shape="round" show-action placeholder="城市/区域/位置" @cancel="cancelClick" />
      <!-- 2.tab的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(val, key, index) in allCities" :key="key">
        <CityGroups v-show="tabActive === key" :group-data="val" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCityStore } from "@/store/modules/city"
import { storeToRefs } from "pinia"
import CityGroups from "./c-cpns/city-groups.vue"
// 搜索框功能
const searchValue = ref("")
const router = useRouter()
const cancelClick = () => {
  router.back()
}
// tabs功能
const tabActive = ref(0)

// 城市获取
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore) // 使用storeToRefs将store里的数据转换为响应式数据
</script>

<style lang="scss" scoped>
.city {
  // --van-tabs-line-height: 30px;

  // top固定定位
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  // .content {
  //   margin-top: 98px;
  // }
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
