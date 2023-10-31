<template>
  <div class="search">
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <h2>开始时间: {{ startDate }}</h2>
    <h2>结束时间: {{ endDate }}</h2>
    <h2>当前城市: {{ currentCity }}</h2>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const { startDate, endDate, currentCity } = route.query;
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;

  .van-search {
    width: 100%;
    max-width: 400px;
    border: none;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    .van-search__label {
      display: none;
    }

    .van-search__action {
      color: #999;
    }

    .van-search__input {
      font-size: 16px;
      color: #333;
      padding: 10px;
    }
  }

  h2 {
    margin-top: 20px;
    font-size: 18px;
    color: #666;
  }
}
</style>

