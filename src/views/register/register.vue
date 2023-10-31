<template>
  <div class="register">
    <van-form @submit="onSubmit">
      <h1>请注册</h1>
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
          :rules="[{ required: true, message: '请填写账号!' }]"
          label="账号"
          name="账号"
          placeholder="账号"
        />
        <van-field
          v-model="password"
          :rules="[{ required: true, message: '请填写密码!' }]"
          label="密码"
          name="密码"
          placeholder="密码"
          type="password"
          right-icon="browsing-history"
          @click-right-icon="showPassword"
          clearable
        />
        <van-field
          v-model="checkPassword"
          :rules="[{ required: true, message: '请确认密码!' }]"
          label="确认密码"
          name="确认密码"
          placeholder="确认密码"
          type="password"
          right-icon="browsing-history"
          @click-right-icon="showPassword"
          clearable
        />
      </van-cell-group>

      <div id="register">
        <van-button plain class="defaultLogin" native-type="submit" round type="primary">
          <van-icon name="lock" />
          账号密码注册
        </van-button>
      </div>
    </van-form>
    <span class="login" @click="gotoLogin">已有账号？点击登录</span>
  </div>
</template>
<script setup name="register">
import { ref } from "vue"
import myAxios from "@/plugins/myAxios"
import { useRouter } from "vue-router"
import { showFailToast, showSuccessToast } from "vant"

const router = useRouter()
const userAccount = ref("")
const password = ref("")
const checkPassword = ref("")
const onSubmit = async () => {
  // const register = await myAxios.post("/api/user/register", {
  //   userAccount: userAccount.value,
  //   userPassword: password.value,
  //   checkPassword: checkPassword.value,
  // })
  // if (register.code === 0) {
  showSuccessToast("注册成功")
  await router.push("/login")
  // } else {
  //   showFailToast(register.message)
  // }
}

// 显示密码
const showPassword = el => {
  const passwordRef = el.target.offsetParent.childNodes[1].childNodes[0]
  passwordRef.type = passwordRef.type === "text" ? "password" : "text"
}
const gotoLogin = () => {
  router.push("/login")
}
</script>

<style scoped lang="scss">
.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.register {
  h1 {
    text-align: center;
    color: var(--primary-color);
    margin: 50px 20px;
  }

  #register {
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
.login {
  color: gray;
  float: right;
  margin-top: 10px;
}
</style>
