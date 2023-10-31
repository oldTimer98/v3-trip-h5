<template>
  <div class="order">
    <!-- 导航栏 -->
    <van-nav-bar class="order-header" title="订单" />
    <!-- 内容 -->
    <div class="order-content">
      <van-swipe-cell
        class="order-item"
        v-for="(item, index) in hotOrderList.orders"
        :key="index"
        :before-close="beforeClose"
      >
        <van-card
          :num="item.cityTerritoryType"
          :price="item.prepayAmount"
          :desc="item.hotelName"
          :title="item.unitName"
          :thumb="item.unitPicture"
        >
          <template #tags>
            <van-tag plain type="primary">{{ item.cityName }}</van-tag>
            <van-tag plain type="primary">{{ item.orderStatusDesc }}</van-tag>
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script setup name="order">
import useOrderStore from "@/store/modules/order"
import { storeToRefs } from "pinia"
import { showConfirmDialog } from "vant"
// 发送请求
const orderStore = useOrderStore()
// 获取订单商品
orderStore.fetchHotOrderList()
// 结构数据
const { hotOrderList } = storeToRefs(orderStore)
// position 为关闭时点击的位置
const beforeClose = ({ position }) => {
  switch (position) {
    case "left":
    case "cell":
    case "outside":
      return true
    case "right":
      showConfirmDialog({
        title: "确定删除吗？",
        beforeClose: () => {
          return new Promise(resolve => {
            resolve(true)
          })
        },
      })
  }
}
</script>

<style lang="scss" scoped>
.order-header {
  background-color: #fff;
  border-bottom: none;
  box-shadow: none;
  color: #333;
}

.delete-button {
  height: 100%;
}

.order-content {
  margin-top: 10px;
}

.order-item {
  margin-bottom: 10px;
}
</style>
