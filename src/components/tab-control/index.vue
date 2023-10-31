<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div class="tab-control-item" @click="itemClick(index)" :class="{ active: index === currentIndex }">
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue"

defineProps({
  titles: {
    type: Array,
    default: () => [],
  },
})

let currentIndex = ref(0)

const emits = defineEmits(["tabItemClick"])

const itemClick = index => {
  currentIndex.value = index
  emits("tabItemClick", index)
}

const setCurrentIndex = index => {
  currentIndex.value = index
}
defineExpose({
  setCurrentIndex,
})
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item.active {
  color: var(--primary-color);
  font-weight: 700;
}

.tab-control-item.active span {
  border-bottom: 3px solid var(--primary-color);
  padding: 8px;
}
</style>
