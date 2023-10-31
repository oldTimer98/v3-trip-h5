<template>
  <van-nav-bar :title="titleName" left-text="我的" left-arrow @click-left="onClickLeft" />
  <div class="edit">
    <van-form @submit="onSubmit">
      <div v-if="editKey === 'gender'" style="margin: 15px">
        <van-field
          v-model="currentValue"
          is-link
          readonly
          label="性别："
          placeholder="选择性别"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker :columns="gender" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div v-if="editKey !== 'gender'">
        <van-cell-group inset>
          <van-field
            v-model="currentValue"
            :name="editKey"
            :label="editName + '：'"
            :placeholder="`请输入${editName}`"
            :rules="[{ required: true, message: '请填写' + editName + '!' }]"
          />
        </van-cell-group>
      </div>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup name="userEdit">
import { useRoute, useRouter } from "vue-router"
import { ref, computed } from "vue"
import { genderMap, gender, genderId } from "@/model/userMap"
import myAxios from "@/plugins/myAxios.js"
import { showFailToast, showSuccessToast } from "vant"

const route = useRoute()
const router = useRouter()

const showPicker = ref(false)

const editKey = ref(route.query.editKey)
const currentValue = ref(route.query.currentValue)
const editName = ref(route.query.editName)
const titleName = computed(() => {
  return editKey === "gender" ? "编辑性别" : `编辑${editName.value}`
})
if (editKey.value === "gender") {
  currentValue.value = genderMap[currentValue]
}
let UpdateValue = () => {
  let newEditValue = ref()
  if (editKey.value === "gender") {
    newEditValue.value = genderId[currentValue.value]
  } else {
    newEditValue.value = currentValue.value
  }
  console.log(editKey.value)
  return newEditValue.value
}
const onConfirm = selectedOptions => {
  showPicker.value = false
  currentValue.value = selectedOptions.selectedOptions[0].text
}
const onSubmit = async () => {
  // const updateData = await myAxios.post("/api/user/update/my", {
  //   [editKey.value]: UpdateValue(),
  // })
  // if (updateData.code === 0 && updateData.data > 0) {
  router.back()
  showSuccessToast("更新成功")
  // } else {
  //   showFailToast("更新失败")
  // }
}
const onClickLeft = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.edit {
  display: flex;
  align-items: flex-start;
  height: 100vh;
  padding-top: 20px;
}
</style>
