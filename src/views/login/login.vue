<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <h1>请登录</h1>
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
          <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
          <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
          <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
      <van-divider />
      <van-cell-group inset>
        <van-field
          v-model="userAccount"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          autocomplete
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userPassword"
          autocomplete
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          right-icon="browsing-history"
          @click-right-icon="showPassword"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div id="login">
        <van-button plain class="defaultLogin" native-type="submit" round type="primary">
          <van-icon name="lock" />
          账号密码登录
        </van-button>
      </div>
      <van-cell to="/register" value="还没有账号？点击注册"></van-cell>
    </van-form>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue"
import { useMainStore } from "@/store/modules/main"
import { useRouter } from "vue-router"
import myAxios from "@/plugins/myAxios"
// import { showFailToast } from "vant"

const userInfo = reactive({
  userAccount: "",
  userPassword: "",
})
const { userAccount, userPassword } = toRefs(userInfo)

const mainStore = useMainStore()
const router = useRouter()
const onSubmit = async values => {
  mainStore.isLoading = true
  // const res = await myAxios.post("/api/user/login", {
  //   userAccount: userAccount.value,
  //   userPassword: userPassword.value,
  // })
  sessionStorage.setItem(
    "userInfo",
    JSON.stringify({ userAccount: userAccount.value, userPassword: userPassword.value })
  )
  // if (res.code === 0 && res.data) {
  mainStore.isLoading = false
  const token = Date.now() + 10 * 60 * 60 * 1000 // 10小时后过期
  sessionStorage.setItem("token", JSON.stringify(token))
  // mainStore.userInfo = res.data
  await router.push("/home")
  // }
  //  else {
  //   showFailToast(res.message)
  //   mainStore.isLoading = false
  // }
}
// 显示密码
const showPassword = el => {
  const passwordRef = el.target.offsetParent.childNodes[1].childNodes[0]
  passwordRef.type = passwordRef.type === "text" ? "password" : "text"
}
</script>

<style lang="scss" scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.login {
  h1 {
    text-align: center;
    color: var(--primary-color);
    margin: 50px 20px;
  }

  #login {
    margin: 16px 14px 0 12%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .defaultLogin {
    flex: auto;
    min-width: 140px;
    margin-right: 10px;
  }
}
</style>
