import axios from "axios"
import { config } from "./config"

class yzzRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })
    this.instance.interceptors.request.use(
      config => {
        return config
      },
      err => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        return res.data
      },
      err => {
        return err
      }
    )
  }

  request(config) {
    return this.instance.request(config)
    // return new Promise((resolve, reject) => {
    //   this.instance
    //     .request(config)
    //     .then(res => {
    //       resolve(res.data)
    //     })
    //     .catch(err => {
    //       reject(err)
    //     })
    // })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}
const Request = new yzzRequest(config.BASE_URL, config.TIMEOUT)
export default Request
