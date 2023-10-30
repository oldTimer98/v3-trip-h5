<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" />
      </div>
      <div class="img-cover"></div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate :model-value="itemScore" color="#fff" :size="15" readonly allow-half />
          <div class="new">¥ {{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
const props = defineProps({
  itemData: {
    type: Object,
    default: () => {},
  },
})
const itemScore = computed(() => {
  return Number(props.itemData.commentScore)
})
</script>

<style lang="scss" scoped>
.house-item {
  width: 50%;

  .item-inner {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }
    .img-cover {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 4px;
      height: 60%;
      background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 3%, rgba(41, 40, 40, 0.9) 100%);
    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;

      .summary {
        font-size: 12px;
      }

      .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        color: #ff9645;
      }
    }
  }
}
</style>
