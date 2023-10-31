import myAxios from "@/plugins/myAxios"
import { useMainStore } from "@/store/modules/main.js"
import pinia from "@/store"

const mainStore = useMainStore(pinia)
export const getCurrentUser = async () => {
  const res = await myAxios.get("/api/user/get/login")
  if (res.code === 0 && res.data) {
    mainStore.userInfo = res.data
    return res.data
  }
  return null
}
