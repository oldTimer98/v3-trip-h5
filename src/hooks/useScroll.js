import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from "underscore"
export function useScroll(elRef) {
  let el = window

  let isReachBottom = ref(false)
  let clientHeight = ref(0)
  let scrollTop = ref(0)
  let scrollHeight = ref(0)

  const scrollHandler = throttle(() => {
    if (elRef) {
      scrollTop.value = elRef.value.scrollTop
      clientHeight.value = elRef.value.clientHeight
      scrollHeight.value = elRef.value.scrollHeight
    } else {
      scrollTop.value = document.documentElement.scrollTop
      clientHeight.value = document.documentElement.clientHeight
      scrollHeight.value = document.documentElement.scrollHeight
    }
    console.log(scrollTop.value, clientHeight.value, scrollHeight.value)
    if (Math.ceil(scrollTop.value + clientHeight.value) >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollHandler)
  })
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollHandler)
  })
  return {
    isReachBottom,
    scrollTop,
    clientHeight,
    scrollHeight,
  }
}
