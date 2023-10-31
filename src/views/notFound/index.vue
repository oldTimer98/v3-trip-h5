<template>
    <div class="notFound">
        <van-empty image="error" :description="'错误页面:  ' + pathMatch" />
        <van-button type="primary" @click="onBack">返回上一页</van-button>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const { pathMatch } = route.params;
const onBack = () => router.go(-1)
</script>

<style lang="scss" scoped>
.notFound {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        margin-top: 10px;
    }
}
</style>
