<script setup lang="ts">
import { VideoCamera } from '@element-plus/icons-vue'

function restartWalkthrough() {
  // @ts-ignore
  ElNotification({
    title: 'Info',
    message: 'Walkthrough creation is still under progress.',
    duration: 2000,
    type: 'info',
    position: 'bottom-right'
  })
}
</script>

<template>
  <header class="nav-bar px-4 flex justify-between items-center">
    <div class="flex">
      <h1 class="text-blue-400 font-bold mr-4">
        <RouterLink to="/">SQL QZ</RouterLink>
      </h1>
      <span class="mr-4 text-gray-700">
        <RouterLink to="/sql">SQL Parser</RouterLink>
      </span>
      <span class="text-gray-700">
        <RouterLink to="/csv">CSV Reader</RouterLink>
      </span>
    </div>
    <el-tooltip :show-arrow="false" content="Play Walkthrough" placement="bottom">
      <el-button plain type="info" circle :icon="VideoCamera" @click="restartWalkthrough" />
      ></el-tooltip
    >
  </header>
</template>

<style lang="scss" scoped>
.nav-bar {
  height: 5vh;
}
.router-link-exact-active {
  font-weight: bold;
}
</style>
