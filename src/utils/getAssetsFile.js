export const getAssetsFile = image => {
  return new URL(`../assets/img/tabbar/${image}`, import.meta.url).href
}
