import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from "underscore"
export function useScroll(elRef) {
  let el = window

  let isReachBottom = ref(false)
  let clientHeight = ref(0)
  let scrollTop = ref(0)
  let scrollHeight = ref(0)

  const scrollHandler = throttle(() => {
    scrollTop.value = elRef ? elRef.value.scrollTop : document.documentElement.scrollTop
    clientHeight.value = elRef ? elRef.value.clientHeight : document.documentElement.clientHeight
    scrollHeight.value = elRef ? elRef.value.scrollHeight : document.documentElement.scrollHeight
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      console.log(scrollTop.value, clientHeight.value, scrollHeight.value)
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
