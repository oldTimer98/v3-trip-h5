# vue-trip

一款旅游移动端程序

## 技术栈

- 框架: vue3
- 打包工具: vite
- 状态管理工具: pinia
- UI 库: Vant4

## 初始

1. npm i
2. npm i scss -D && npm i sass -D
3. npm run dev | npm run build
4. 修改 publlic => favicon.io
5. 修改 index.html => title
6. css 样式重置(normalize.css && reset.css)

## 目录结构

- assets => img/css/font/audio/video
- components => 组件
  - common 多个项目都会用的组件
  - content 当前项目多个页面的公用组件
- router => 路由
- hooks => 多个组件的代码逻辑
- stores => 状态管理(pinia)
- mock => 模拟数据(服务器暂时没有数据时)
- service => 网络请求
- views => 视图页面
- utils => 工具

## router 基本配置

1. router => index.js

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: () => import('@/views/home/home.vue') },
	],
})

export default router
```

2. main

```js
import router from './router'
app.use(router)
```

## pinia 基本配置

1. stores => index.js

```js
import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia
```

2. main

```js
import pinia from './stores'
app.use(pinia)
```

3. stores => modules

```js
import { defineStore } from 'pinia'

const useSearchStore = defineStore('search', {
	state: () => ({
		searchData: [],
	}),
	actions: {},
})

export default useSearchStore
```

## tabber 组件封装

1. assets => data => tabber.js

````js
const tabbarData = [
  {
    text: '首页',
    image: 'tabber/home.png',
    imageActive: 'tabber/home-active.png',
    path: '/home',
  },
  {
    text: '收藏',
    image: 'tabber/favor.png',
    imageActive: 'tabber/favor-active.png',
    path: '/favor',
  }
]

export default tabbarData```
````

2. utils => get-assets.js

```js
export const getAssetURL = (image) => {
	// 参数一:相对路径 参数二:当前路径的URL
	return new URL(`../assets/img/${image}`, import.meta.url).href
}
```

3. components => tabber => tabber.vue

```vue
<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	import tabbarData from '@/assets/data/tabber.js'
	import { getAssetURL } from '@/utils/get-assets.js'

	const currentIndex = ref(0)
	const router = useRouter()
	function activeClick(index, item) {
		currentIndex.value = index
		router.push(item.path)
	}
</script>

<template>
	<div class="tab-bar">
		<template
			v-for="(item, index) in tabbarData"
			:key="index">
			<div
				class="tab-bar-item"
				:class="{ active: currentIndex === index }"
				@click="activeClick(index, item)">
				<img
					v-if="currentIndex !== index"
					:src="getAssetURL(item.image)"
					alt=""
					class="img" />
				<img
					v-else
					:src="getAssetURL(item.imageActive)"
					alt=""
					class="img" />
				<span class="text">{{ item.text }}</span>
			</div>
		</template>
	</div>
</template>
```

## tabber 隐藏:

1. App.vue

```vue
<script setup>
	import TabBerVant from './components/tab-bar/tab-ber-vant.vue'
	import { useRoute } from 'vue-router'

	const route = useRoute()
</script>

<template>
	<div class="app">
		<router-view></router-view>
		<!-- 拿到路由里的数据判断是否显示 -->
		<tab-ber-vant v-if="!route.meta.hideTabBar"></tab-ber-vant>
	</div>
</template>
```

2. router => index.js

```js
const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/city',
			component: () => import('@/views/city/city.vue'),
			// 是否显示
			meta: {
				hideTabBar: true,
			},
		},
	],
})
```

3. 另一种解决方案 ctiy.vue

```css
.city {
	position: relative;
	z-index: 999;
	height: 100vh;
	background-color: #fff;
	overflow-y: auto;
}
```

## 修改第三方 UI 组件的样式

1. 用插槽 => 直接在局部中修改元素
2. 全局定义一个变量 => assets

```css
:root {
	--van-search-left-icon-color: #45cfff !important;
}
```

3. 布局定义一个变量 => style

```css
.city {
	--van-search-left-icon-color: #45cfff !important;
}
```

4. 直接查找对应的组件,修改子组件的样式 => :deep(.选择器){覆盖}

```css
.city {
	:deep(.van-search__field .van-field__left-icon) {
		--van-search-left-icon-color: #45cfff !important;
	}
}
```

## 网络请求封装

1. service => request 封装 axios

```js
// index.js
import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

class XBRequest {
	constructor(baseURL, timeout = 10000) {
		this.instance = axios.create({
			baseURL,
			timeout,
		})
	}

	request(config) {
		return new Promise((resolve, reject) => {
			this.instance
				.request(config)
				.then((res) => {
					resolve(res.data)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	get(config) {
		return this.request({ ...config, method: 'get' })
	}

	post(config) {
		return this.request({ ...config, method: 'post' })
	}
}

export default new XBRequest(BASE_URL, TIMEOUT)
```

```js
// config.js 统一 api 地址
// const BASE_URL = 'http://codercba.com:1888/api/city/all'
export const BASE_URL = 'http://api.xbin.cn'
export const TIMEOUT = 10000
```

2. service => modules

```js
// 1. 发送网络请求 => stores
import XBRequest from '@/service/request'

export function getCityAll() {
	// 网络请求:城市数据
	return XBRequest.get('/data/city.json').then((res) => {
		return res
	})
}
```

3. service = > index.js

```js
// 统一导出
export * from './modules/city'
export * from './modules/home'
```

4. stores => index.js

```js
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

5. stores => modules

```js
// 2. 管理网络请求 => city
import { defineStore } from 'pinia'
// 引入网络请求方法
import { getCityAll } from '@/service'

export const useCityStore = defineStore('city', {
	state: () => ({
		// 热门城市数据|列表
		allcities: {},
		// 选中城市数据
		currentCity: {
			cityName: '大理',
		},
	}),
	actions: {
		async fetchAllCitiesData() {
			const res = await getCityAll()
			this.allcities = res.data
		},
	},
})
```

6. views => city/vity.vue

```js
import { storeToRefs } from 'pinia'
import { useCityStore } from '@/stores/modules/city'

// 网络请求不封装:城市数据
const allcities = ref({})
getCityAll().then((res) => {
	allcities.value = res.data
})

//3. 网络请求封装:从 stores 中获取数据
const cityStore = useCityStore()
// 发送网络请求
cityStore.fetchAllCitiesData()
// 解构出数据
const { allcities } = storeToRefs(cityStore)
```

```html
<div class="city">
	<div class="top">
		<!-- 搜索框 -->
		<van-search
			v-model="searchValue"
			shape="round"
			show-action
			placeholder="城市/区域/位置"
			@cancel="cancelClick" />

		<!-- tab切换 -->
		<van-tabs
			v-model:active="cityActive"
			color="#45cfff">
			<!-- value:对象里面的数据 key:对象名 index:索引 -->
			<template
				v-for="(value, key, index) in allcities"
				:key="key">
				<van-tab
					:title="value.title"
					:name="key"></van-tab>
			</template>
		</van-tabs>
	</div>

	<div class="content">
		<!-- 索引栏 -->
		<template
			v-for="(value, key, index) in allcities"
			:key="key">
			<div v-show="cityActive === key">
				<city-group
					v-show="cityActive === key"
					:groupData="value">
				</city-group>
			</div>
		</template>
	</div>
</div>
```

7. views => city => components => city-group.vue

```js
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCityStore } from '@/stores/modules/city'

// 定义props
const props = defineProps({
	groupData: {
		type: Object,
		default: () => ({}),
	},
})

// 动态列表
const indexList = computed(() => {
	const list = props.groupData.cities.map((item) => item.group)
	list.unshift('#')
	return list
})

// 监听城市点击
const router = useRouter()
const cityStore = useCityStore()
const onHotCity = (hot) => {
	// 选中城市
	cityStore.currentCity = hot
	// 返回上一级
	router.back()
}
```

```html
<div class="city-group">
	<van-index-bar
		highlight-color="#45cfff"
		:index-list="indexList">
		<!-- 热门 -->
		<van-index-anchor index="#">热门</van-index-anchor>
		<div class="hot">
			<template
				v-for="(hot, index) in groupData.hotCities"
				:key="index">
				<div
					class="hot-item"
					@click="onHotCity(hot)">
					{{ hot.cityName }}
				</div>
			</template>
		</div>
		<!-- 列表 -->
		<template
			v-for="(group, index) in groupData.cities"
			:key="index">
			<van-index-anchor :index="group.group" />
			<template
				v-for="(city, index) in group.cities"
				:key="index">
				<van-cell
					:title="city.cityName"
					@click="onHotCity(hot)" />
			</template>
		</template>
	</van-index-bar>
</div>
```

## 日期格式化封装

```js
import { formatMonthDay, getDiffDays } from '@/utils/format-date'

// 日期范围的处里
// 获取最新时间
const nowDate = new Date()
// 最新时间天数加1
const newData = new Date().setDate(nowDate.getDate() + 1)

// 入住时间:传入最新时间
const startDate = ref(formatMonthDay(nowDate))
// 离开时间:最新时间天数加1
const endDate = ref(formatMonthDay(newData))
// 入住天数
const stayDay = ref(getDiffDays(nowDate, newData))

const showCalendar = ref(false)
const onConfirm = (value) => {
	// 1.设置日期
	const selectStarDate = value[0]
	const selectEndDate = value[1]
	startDate.value = formatMonthDay(selectStarDate)
	endDate.value = formatMonthDay(selectEndDate)
	stayDay.value = getDiffDays(selectStarDate, selectEndDate)
	// 2.隐藏日期
	showCalendar.value = false
}
```

```js
// @/utils/format-date
import dayjs from 'dayjs'

export function formatMonthDay(date) {
	return dayjs(date).format('MM月DD日')
}

export function getDiffDays(startDate, endDate) {
	return dayjs(endDate).diff(startDate, 'day')
}
```

## 滚动刷新

```js
import useScroll from '@/hooks/useScroll.js'

const { isReachCallback, scrollTop } = useScroll()
watch(isReachCallback, (newValue) => {
	if (newValue) {
		homeStore.houselistAction().then(() => {
			// 获取到数据关闭滚动刷新
			isReachCallback.value = false
		})
	}
})
```

```js
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'
// 防抖
import { throttle } from 'underscore'
// @/hooks/useScroll.js
export default function useScroll() {
	const isReachCallback = ref(false)

	const clientHeight = ref(0)
	const scrollTop = ref(0)
	const scrollHeight = ref(0)
	const myScroll = ref(0)

	// 监听window创建的滚动
	// 防抖/节流
	const scorllListenerHandler = throttle(() => {
		// 自身屏幕高度
		clientHeight.value = document.documentElement.clientHeight
		// 滚动高度
		scrollTop.value = document.documentElement.scrollTop
		// 文档高度
		scrollHeight.value = document.documentElement.scrollHeight
		myScroll.value = clientHeight.value + scrollTop.value
		if (scrollHeight.value - myScroll.value <= 300) {
			// homeStore.houselistAction()
			console.log('滚动到底部')
			isReachCallback.value = true
		}
	}, 500)

	// 进入监听
	onMounted(() => {
		window.addEventListener('scroll', scorllListenerHandler)
		console.log('onMounted')
	})
	onActivated(() => {
		window.addEventListener('scroll', scorllListenerHandler)
		console.log('onActivated')
	})
	// 移除监听
	onUnmounted(() => {
		window.removeEventListener('scroll', scorllListenerHandler)
		console.log('onUnmounted')
	})
	onDeactivated(() => {
		window.removeEventListener('scroll', scorllListenerHandler)
		console.log('onDeactivated')
	})

	return {
		isReachCallback,
		clientHeight,
		scrollTop,
		scrollHeight,
	}
}
```
