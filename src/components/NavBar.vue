<script setup lang="ts">
import { VideoCamera } from '@element-plus/icons-vue'

function restartWalkthrough() {
  console.log('Restarting Walkthrough')
}
</script>

<template>
  <header class="nav-bar px-4 flex justify-between items-center">
    <div class="flex">
      <h1 class="text-blue-400 font-bold mr-4">
        <a href="#/">SQL QZ</a>
      </h1>
      <span class="mr-4 text-gray-700">
        <a href="#/sql">SQL Parser</a>
      </span>
      <span class="text-gray-700">
        <a href="#/csv">CSV Reader</a>
      </span>
    </div>
    <el-tooltip :show-arrow="false" content="Play Walkthrough" placement="bottom">
      <el-button plain type="primary" circle :icon="VideoCamera" @click="restartWalkthrough" />
      ></el-tooltip
    >
  </header>
</template>

<style lang="scss" scoped>
.nav-bar {
  height: 5vh;
}
</style>
