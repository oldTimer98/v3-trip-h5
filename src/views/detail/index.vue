<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋详情" left-text="民宿" left-arrow @click-left="onClickLeft" />
    <div class="main" v-if="mainPart">
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <DetailInfos name="描述" :top-infos="mainPart.topModule" />
      <DetailFacility name="设施" :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <DetailLandlord name="房东" :landlord="mainPart.dynamicModule.landlordModule" />
      <DetailComment name="评论" :comment="mainPart.dynamicModule.commentModule" />
      <DetailNotice name="须知" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { getDetailInfos } from "@/services/modules/detail"
import { ref, computed } from "vue"
import DetailSwipe from "./c-cpns/detail-01-swipe.vue"
import DetailInfos from "./c-cpns/detail-02-infos.vue"
import DetailFacility from "./c-cpns/detail-03-facility.vue"
import DetailLandlord from "./c-cpns/detail-04-landlord.vue"
import DetailComment from "./c-cpns/detail-05-comment.vue"
import DetailNotice from "./c-cpns/detail-06-notice.vue"
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
</script>

<style lang="scss" scoped></style>
