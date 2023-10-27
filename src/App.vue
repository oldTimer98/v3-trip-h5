<template>
  <div class="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

    <tab-bar v-if="!route.meta?.hideTabBar" />
  </div>
</template>
<script setup>
import TabBar from "@/components/tab-bar/TabBar.vue"
import { useRoute } from "vue-router"
const route = useRoute()
</script>

<style scoped></style>
