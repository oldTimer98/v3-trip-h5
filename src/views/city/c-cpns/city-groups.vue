<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList" highlight-color="#ff9854">
      <van-index-anchor index="热门"></van-index-anchor>
      <div class="list">
        <template v-for="(city, index) in groupData?.hotCities" :key="city">
          <div class="city" @click="cityClick(city)">{{ city?.cityName }}</div>
        </template>
      </div>
      <template v-for="(group, index) in groupData?.cities" :key="index">
        <van-index-anchor :index="group.group"></van-index-anchor>
        <template v-for="city in group.cities">
          <van-cell :title="city?.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useCityStore } from "@/store//modules/city.js"
import { useRouter } from "vue-router"
// props数据
const props = defineProps({
  groupData: {
    type: Object,
    default: () => {},
  },
})
// indexList的映射
const indexList = computed(() => {
  return ["#", ...props?.groupData?.cities.map(item => item.group)]
})

// 城市点击
const CityStore = useCityStore()
const router = useRouter()
const cityClick = city => {
  CityStore.currentCity = city
  router.back()
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>
