<template>
  <div class="favor">
    <!-- 导航栏 -->
    <van-nav-bar title="收藏" fixed placeholder />
    <!-- 下方收藏产品 -->
    <template v-for="(item,index) in hotFavorList.items" :key="index">
        <FavorListItem :item-data="item" />
    </template>
  </div>
</template>
<script setup name="favor">
import FavorListItem from './c-cpns/favor-list-item.vue'
import useFavorStore from '@/store/modules/favor';
import { storeToRefs } from 'pinia';

// 发送请求
const favorStore = useFavorStore()

// 获取收藏产品
favorStore.fetchHotFavorList()

//结构后用于渲染数据到页面
const { hotFavorList } = storeToRefs(favorStore)

</script>

<style lang="scss" scoped>
</style>
