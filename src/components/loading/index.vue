<template>
  <div class="loading" v-show="mainStore.isLoading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "@/store/modules/main.js"
const mainStore = useMainStore()
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.2);
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 104px;
    background: url("@/assets/img/home/loading-bg.png") 0 0 / 100% 100%;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
  }
}
</style>
