<template>
  <div class="user">
    <div v-if="!userInfo">
      <van-empty image="search" description="暂无数据" />
    </div>
    <div v-else>
      <div style="padding-top: 15px"></div>
      <div class="center">
        <van-uploader :after-read="afterRead" :max-count="1" :max-size="5000 * 1024" @oversize="onOversize">
          <div>
            <img
              :alt="userInfo.userName"
              class="img"
              :src="userInfo.userAvatar ? userInfo.userAvatar : defaultPicture"
            />
          </div>
        </van-uploader>
      </div>
      <div style="padding-top: 30px">
        <van-cell
          :value="userInfo.userName"
          icon="manager-o"
          is-link
          @click="update('userName', '昵称', userInfo.userName)"
        >
          <template #title>
            <span class="custom-title">昵称</span>
          </template>
        </van-cell>
        <van-cell :value="userInfo.userAccount" icon="user-circle-o">
          <template #title>
            <span class="custom-title">账号</span>
          </template>
        </van-cell>
        <van-cell
          :value="genderMap[userInfo.gender]"
          is-link
          icon="like-o"
          @click="update('gender', '性别', userInfo.gender)"
        >
          <template #title>
            <span class="custom-title">性别</span>
          </template>
        </van-cell>
        <van-cell :value="userInfo.phone" icon="phone-o" is-link @click="update('phone', '联系方式', userInfo.phone)">
          <template #title>
            <span class="custom-title">联系方式</span>
          </template>
        </van-cell>
        <van-cell :value="userInfo.email" icon="envelop-o" is-link @click="update('email', '联系方式', userInfo.email)">
          <template #title>
            <span class="comment-o">邮箱</span>
          </template>
        </van-cell>
        <van-cell title="简介" icon="chat-o" is-link @click="update('userProfile', '简介', userInfo.userProfile)">
          <template #value>
            <div v-if="userInfo.userProfile" class="van-multi-ellipsis--l2">
              {{ userInfo.userProfile }}
            </div>
            <div v-if="!userInfo.userProfile" class="van-ellipsis">暂无简介</div>
          </template>
        </van-cell>
      </div>
      <div style="margin: 16px">
        <van-button round block type="primary" @click="loginOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>
<script setup name="user">
import { onMounted, ref } from "vue"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { showNotify, showFailToast, showSuccessToast } from "vant"
// import { getCurrentUser } from "@/plugins/modules/user"
import { defaultPicture, genderMap } from "@/model/userMap"
import { useMainStore } from "@/store/modules/main"
// import myAxios from "@/plugins/myAxios"
import { getToken } from "@/utils"

const router = useRouter()
const mainStore = useMainStore()
const { userInfo } = storeToRefs(mainStore)

const show_UserAvatarUrl_pop = ref("true")
// 获取登录信息
onMounted(async () => {
  // const currentUser = await getCurrentUser()
  const token = getToken()

  if (token) {
    const show_updateUserAvatarUrl = sessionStorage.getItem("userAvatarUrl")
    show_UserAvatarUrl_pop.value = show_updateUserAvatarUrl ? show_updateUserAvatarUrl : show_UserAvatarUrl_pop.value
    if (show_UserAvatarUrl_pop.value === "true") {
      showNotify({ message: "点击头像可更换默认头像", type: "primary", duration: 2000 })
      show_UserAvatarUrl_pop.value = "false"
      sessionStorage.setItem("userAvatarUrl", show_UserAvatarUrl_pop.value)
    }
  }
  if (!token) {
    showFailToast("用户未登录")
  }
})

// 更新头像

const afterRead = async file => {
  // 此时可以自行将文件上传至服务器
  // console.log(file.file, "头像信息");
  const fileFile = file.file
  // const res = await myAxios.post(
  //   "/api/file/upload",
  //   {
  //     file: fileFile,
  //     biz: "user_avatar",
  //   },
  //   {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   }
  // )

  // const updateUserAvatarUrl = await myAxios.post("/api/user/update/my", {
  //   userAvatar: res.data,
  // })

  if (true) {
    // await getCurrentUser()
    showSuccessToast("更新成功")
  }
}
const onOversize = () => {
  showFailToast("头像上传大小不能超过500kb")
}
// 退出登录
const loginOut = async () => {
  // const res = await myAxios.post("/api/user/logout")
  sessionStorage.removeItem("token")
  // if (res.code === 0 && res.data) {
  await router.replace("/home")
  showSuccessToast("退出成功")
  // }
}

// 更新用户信息
const update = (editKey, editName, currentValue) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue,
    },
  })
}
</script>

<style lang="scss" scoped>
.center {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.img {
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
  border-radius: 20%;
  height: 135px;
  width: 135px;
}

.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}
</style>
