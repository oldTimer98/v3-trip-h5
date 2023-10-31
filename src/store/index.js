import { createPinia } from "pinia"
import piniaPluginPresistedState from "pinia-plugin-persistedstate"
const pinia = createPinia()
pinia.use(piniaPluginPresistedState)
export default pinia
