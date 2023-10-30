import Request from "@/services/request"

export function getHomeHotSuggests() {
  return Request.get({
    url: "/home/hotSuggests",
  })
}
export function getHomeCategories() {
  return Request.get({
    url: "/home/categories",
  })
}

export function getHomeHouseList(currentPage) {
  return Request.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  })
}
