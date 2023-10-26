<template>
  <div class="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

    <tab-bar />
    <router-link to="/home">home</router-link>
    <router-link to="/favor">favor</router-link>
    <router-link to="/message">message</router-link>
    <router-link to="/order">order</router-link>
  </div>
</template>
<script setup>
import TabBar from "@/components/tab-bar/TabBar.vue"
</script>

<style scoped></style>
