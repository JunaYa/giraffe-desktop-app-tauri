<script setup lang="ts">
import { useHandleSignInCallback } from '@logto/vue'
const { isLoading } = useHandleSignInCallback(() => {
  // 完成时跳转至根路由
})
</script>

<template>
  <!-- 当登录认证尚未完成时 -->
  <p v-if="isLoading">
    正在重定向...
  </p>
</template>
