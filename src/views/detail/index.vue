<template>
  <div class="detail top-page" ref="detailRef">
    <TabControl v-if="showTabControl" class="tabs" :titles="names" @tab-item-click="tabClick" ref="tabControlRef" />
    <van-nav-bar title="房屋详情" left-text="民宿" left-arrow @click-left="onClickLeft" />
    <div class="main" v-if="mainPart">
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <DetailInfos :ref="getSectionRef" name="描述" :top-infos="mainPart.topModule" />
      <DetailFacility
        :ref="getSectionRef"
        name="设施"
        :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <DetailLandlord :ref="getSectionRef" name="房东" :landlord="mainPart.dynamicModule.landlordModule" />
      <DetailComment :ref="getSectionRef" name="评论" :comment="mainPart.dynamicModule.commentModule" />
      <DetailNotice :ref="getSectionRef" name="须知" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <DetailMap :ref="getSectionRef" name="周边" :position="mainPart.dynamicModule.positionModule" />
      <DetailIntro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">南浔民宿, 永无止境!</div>
    </div>
    <DetailActionBar :current-house="detailInfos.currentHouse" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { getDetailInfos } from "@/services/modules/detail"
import { ref, computed, watch } from "vue"
import DetailSwipe from "./c-cpns/detail-01-swipe.vue"
import DetailInfos from "./c-cpns/detail-02-infos.vue"
import DetailFacility from "./c-cpns/detail-03-facility.vue"
import DetailLandlord from "./c-cpns/detail-04-landlord.vue"
import DetailComment from "./c-cpns/detail-05-comment.vue"
import DetailNotice from "./c-cpns/detail-06-notice.vue"
import DetailMap from "./c-cpns/detail-07-map.vue"
import DetailIntro from "./c-cpns/detail-08-intro.vue"
import DetailActionBar from "./c-cpns/detail-action-bar.vue"
import TabControl from "@/components/tab-control/index.vue"
import { useScroll } from "@/hooks/useScroll"
const route = useRoute()
const router = useRouter()
const houseId = route.params.id
// 发送网络请求获取数据
const detailInfos = ref({})
console.log(houseId)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})
const mainPart = computed(() => detailInfos.value.mainPart)
// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

//tabControl相关的操作---显示tabControl
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
// 取出所有ref里的name数据
const getSectionRef = value => {
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

//点击tab事件
let isClick = false // 是否是点击滚动
let currentDistance = 0 // 当前滚动的位置
const tabClick = index => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  distance = !index ? 0 : distance - 44

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth",
  })
}

// 监听滚动，tab的索引切换
const getCurrentIndex = (values, currentValue) => {
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > currentValue + 44) {
      index = i - 1
      break
    }
  }
  if (index === -1) return
  return index
}
const tabControlRef = ref()
watch(scrollTop, newVal => {
  if (currentDistance === newVal) {
    isClick = false
  }
  if (isClick) return
  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  const value = els.map(item => item.offsetTop)
  // 2.根据newValue去匹配想要索引
  // 根据页面滚动的scrollTop值，去匹配value
  // 一直再变化的一个值(scrollTop)，去一个数组里面寻找位置的一个算法
  const index = getCurrentIndex(value, newVal)
  // 3、设置tabControl索引
  tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="scss" scoped>
.detail::-webkit-scrollbar {
  display: none;
}
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
