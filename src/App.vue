<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="main-container">
    <nav-bar class="nav-bar border-b"></nav-bar>
    <RouterView />
  </div>
</template>

<style scoped>
.main-container {
  height: 100vh;
  display: grid;
  grid-template-rows: 5vh 95vh;
}
</style>
