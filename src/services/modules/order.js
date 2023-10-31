import Request from "../request"
// 获取收藏数据
export function getOrderList() {
  return Request.get({
    url: "/order/list?type=all",
  })
}
