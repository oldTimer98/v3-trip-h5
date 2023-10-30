import Request from "@/services/request"

export function getDetailInfos(houseId) {
  return Request.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  })
}
