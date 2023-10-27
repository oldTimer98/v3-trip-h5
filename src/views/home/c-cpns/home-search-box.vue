<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick()">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick()">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="section" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ 111 }}</span>
        </div>
      </div>
      <div class="stay">共{{ 111 }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ 111 }}</span>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" @confirm="onConfirm" />
    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 热门建议 -->
  </div>
</template>

<script setup>
import { useCityStore } from "@/store/modules/city"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()
// 城市点击
const cityClick = () => {
  router.push("/city")
}
// 位置获取
const positionClick = () => {
  // navigator.geolocation.getCurrentPosition(
  //   res => {
  //     console.log("获取位置成功:", res)
  //   },
  //   err => {
  //     console.log("获取位置失败:", err)
  //   },
  //   {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   }
  // )
}
// 当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
// 日期范围的选择
const showCalendar = ref(false)
const onConfirm = value => {
  console.log(value)

  // 隐藏日历
  showCalendar.value = false
}
</script>

<style lang="scss" scoped>
.search-box {
  --van-calendar-popup-height: 80%;
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
      color: #333;
      font-size: 15px;
    }
    .position {
      width: 74px;
      display: flex;
      align-items: center;

      .text {
        position: relative;
        top: 2px;
        color: #666;
        font-size: 12px;
      }

      img {
        margin-left: 5px;
        width: 18px;
        height: 18px;
      }
    }
  }
  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
      flex: 1;
      display: flex;
      height: 44px;
      align-items: center;
    }

    .end {
      min-width: 30%;
      padding-left: 20px;
    }

    .date {
      display: flex;
      flex-direction: column;

      .tip {
        font-size: 12px;
        color: #999;
      }

      .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .date-range {
    height: 44px;

    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
