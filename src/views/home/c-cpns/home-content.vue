<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <HomeItemV3 v-if="item.discoveryContentType === 3" :item-data="item.data" @click="itemClick(item.data)" />
        <HomeItemV9 v-if="item.discoveryContentType === 9" :item-data="item.data" @click="itemClick(item.data)" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/store/modules/home"
import { storeToRefs } from "pinia"
import HomeItemV3 from "@/components/home-item-v3/HomeItemV3.vue"
import HomeItemV9 from "@/components/home-item-v9/HomeItemV9.vue"
import { useRouter } from "vue-router"

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)
const router = useRouter()
const itemClick = item => {
  router.push("/detail/" + item.houseId)
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
    margin: 0;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
