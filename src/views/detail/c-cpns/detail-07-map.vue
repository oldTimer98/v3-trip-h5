<template>
  <div class="map">
    <DetailSection title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"
import { ref, onMounted } from "vue"

const props = defineProps({
  position: {
    type: Object,
    default: () => ({}),
  },
})
const mapRef = ref()

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value)
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude)
  map.centerAndZoom(point, 15)
  const marker = new BMapGL.Marker(point)
  map.addOverlay(marker)
})
</script>

<style lang="scss" scoped>
.baidu {
  height: 250px;
}
</style>
