<!--
 * @Description:
 * @Author: 86
 * @Date: 2023-02-23 22:10:10
 * @LastEditTime: 2023-04-19 19:42:55
-->
<template>
  <div class="message">
    <!-- 导航栏 -->
    <van-nav-bar title="消息" />
    <!-- 内容 -->
    <div class="content">
      <van-notice-bar left-icon="volume-o" text="暂无更多消息" />
      <img src="@/assets/img/message/icon_message.png" alt="" srcset="" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content {
  img {
    width: 100%;
    height: 100%;
  }

  h2 {
    text-align: center;
  }
}
</style>
