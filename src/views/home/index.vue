<template>
  <div class="home" ref="homeRef">
    <HomeNavBar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeSearchBox />
    <HomeCategories />
    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar />
    </div>
    <HomeContent />
  </div>
</template>

<script setup name="home">
// 注释
import HomeSearchBox from "@/views/home/c-cpns/home-search-box.vue"
import HomeCategories from "@/views/home/c-cpns/home-categories.vue"
import HomeContent from "@/views/home/c-cpns/home-content.vue"
import HomeNavBar from "./c-cpns/home-nav-bar.vue"
import SearchBar from "@/components/search-bar/index.vue"
import { useHomeStore } from "@/store/modules/home"
import { useCityStore } from "@/store/modules/city"
import { computed, onActivated, onMounted, ref, watch } from "vue"
import { useScroll } from "@/hooks/useScroll"
// 发送网络请求

const homeStore = useHomeStore()
homeStore.fetchCategoriesData()
homeStore.fetchHotSuggestData()
homeStore.fetchHouseListData()
// const cityStore = useCityStore()
// cityStore.fetchCurrentCityData()
//监听滚动消息
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)

watch(isReachBottom, newVal => {
  if (newVal) {
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})
// 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})

onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  })
})
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
  .banner {
    img {
      width: 100%;
    }
  }
  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
