import router from "@/router"


export function getToken() {
  const token = sessionStorage.getItem("token")
  if (token) {
    return token
  } else {
    return null
  }
}

// 检查令牌是否过期

export function checkTokenExpired() {
  const tokenStr = sessionStorage.getItem("token")
  if (tokenStr) {
    const token = JSON.parse(tokenStr)
    if (Date.now() > token) {
      sessionStorage.removeItem("token")
      router.push("/login")
    }
  }
}
