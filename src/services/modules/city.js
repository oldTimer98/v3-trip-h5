import Request from "@/services/request"
import axios from "axios"
export function getCityAll() {
  return Request.get({
    url: "/city/all",
  })
}
export function getCurrentCity() {
  return axios.get("https://ip.testcode.icu/api/ip")
}
