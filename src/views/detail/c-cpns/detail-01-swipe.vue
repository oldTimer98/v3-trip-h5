<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="item in swipeData" ::key="item.url">
        <van-swipe-item class="item" @click="clickPicItem(item)">
          <img :src="item.url" />
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
    <van-image-preview
      v-model:show="showPreview"
      :images="images"
      @change="showPreviewChange"
      :start-position="currentIndex"
    >
      <template v-slot:index>第{{ currentIndex + 1 }}页</template>
    </van-image-preview>
  </div>
</template>

<script setup>
import { showImagePreview } from "vant"
import { ref, computed } from "vue"
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
})
// 数据处理
const swipeGroup = {}
//  一次循环
for (const item of props.swipeData) {
  let valueArr = swipeGroup[item.enumPictureCategory]
  if (!valueArr) {
    valueArr = []
    swipeGroup[item.enumPictureCategory] = valueArr
  }
  valueArr.push(item)
}
//  两次循环
// for (const item of props.swipeData) {
//   swipeGroup[item.enumPictureCategory] = []
// }
// for (const item of props.swipeData) {
//   const valueArray = swipeGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }
// console.log(swipeGroup)

//定义数据转化的方法
const nameReg = /【(.*?)】/i

const getName = name => {
  // return name.replace("：", "").replace("】", "").replace("【", "")
  const results = nameReg.exec(name)
  return results[1]
}

const getCategoryIndex = item => {
  const valueArr = swipeGroup[item.enumPictureCategory]
  return valueArr.findIndex(data => data === item) + 1
}

const images = props.swipeData.map(i => i.url)
const showPreview = ref(false)
const currentIndex = ref(0)
// 查看图片
const clickPicItem = item => {
  const index = props.swipeData.findIndex(i => i === item)
  currentIndex.value = index
  showPreview.value = true
}
const showPreviewChange = newIndex => {
  currentIndex.value = newIndex
}
</script>

<style lang="scss" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);

      .item {
        margin: 0 3px;

        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>
