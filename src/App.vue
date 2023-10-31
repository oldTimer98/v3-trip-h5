<template>
  <div class="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->

    <router-view v-slot="props">
      <keep-alive :include="['home', 'favor', 'city', 'order']">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <tab-bar v-show="!route.meta?.hideTabBar" />
    <Loading />
  </div>
</template>
<script setup>
import TabBar from "@/components/tab-bar/TabBar.vue"
import Loading from "@/components/loading/index.vue"
import { useRoute } from "vue-router"
const route = useRoute()
</script>

<style scoped></style>
