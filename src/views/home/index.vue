<template>
  <div class="home" ref="homeRef">
    <HomeNavBar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeSearchBox />
  </div>
</template>

<script setup>
import HomeSearchBox from "@/views/home/c-cpns/home-search-box.vue"
import HomeNavBar from "./c-cpns/home-nav-bar.vue"
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
}
</style>
