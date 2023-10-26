<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in TabBarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img :src="getAssetsFile(currentIndex !== index ? item.image : item.imageActive)" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue"
import { TabBarData } from "@/assets/data/tabbar.js"
import { getAssetsFile } from "@/utils"
import { useRoute } from "vue-router"
const currentIndex = ref(0)
const route = useRoute()
// 监听路由改变时, 找到对应的索引, 设置currentIndex
// watch(route, newRoute => {
//   const index = TabBarData.findIndex(item => item.path === newRoute.path)
//   currentIndex.value = index
// })
</script>

<style lang="scss" scoped>
.tab-bar {
  // 局部定义一个变量: 只针对.tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类, 对类中的CSS属性重写
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    font-size: 50px;
  }
  img {
    height: 26px;
  }
}
</style>
