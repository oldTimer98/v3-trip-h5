import Request from "../request"
// 获取收藏数据
export function getFavorList() {
  return Request.get({
      url: '/favor/list'
  })
}

