import axios from "axios"

const isDev = import.meta.env.MODE === "development"

const myAxios = axios.create({
  baseURL: isDev ? "http://localhost:8101" : "线上地址",
})
myAxios.defaults.withCredentials = true

myAxios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return err
  }
)

myAxios.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return err
  }
)

export default myAxios
