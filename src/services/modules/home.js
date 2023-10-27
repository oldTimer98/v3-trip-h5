import Request from '@/services/request';

export function getHomeHotSuggests(){
  return Request.get({
    url:"/home/hotSuggests"
  })
}
export function getHomeCategories() {
  return Request.get({
    url: "/home/categories",
  });
}
