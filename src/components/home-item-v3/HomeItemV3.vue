<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" />
      </div>
      <div class="img-cover"></div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="" />
          <span>{{ itemData.location }}</span>
        </div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="new">¥ {{ itemData.finalPrice }}</div>
          <div class="old">¥ {{ itemData.productPrice }}</div>
          <div class="tip">
            {{ itemData?.priceTipBadge?.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>
.house-item {
  width: 50%;

  .item-inner {
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    /* height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between; */
    position: relative;

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
      height: 50%;
      background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 3%, rgba(41, 40, 40, 0.9) 100%);
    }
    .info {
      padding: 6px 10px;
      color: #666;
      font-size: 12px;
    }

    .location {
      display: flex;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
      }

      .text {
        margin-left: 2px;
        font-size: 12px;
        color: #666;
      }
    }

    .name {
      margin: 5px 0;
      font-size: 14px;
      color: #333;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      display: flex;
      align-items: flex-start;
      position: relative;

      margin: 8px 0;
      .new {
        color: #ff9645;
        font-size: 14px;
      }

      .old {
        margin: 0 3px;
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }

      .tip {
        background-image: linear-gradient(270deg, #f66, #ff9f9f);
        color: #fff;
        padding: 2px 6px;
        border-radius: 8px;
        font-size: 11px;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
