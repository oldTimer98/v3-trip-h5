<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    我是内容
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
