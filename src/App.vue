<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
const HomePage = defineAsyncComponent(() => import('./views/HomePage.vue'))
const CsvReader = defineAsyncComponent(() => import('./views/CsvReader.vue'))
const LandingPage = defineAsyncComponent(() => import('./views/LandingPage.vue'))

const routes = {
  '/': LandingPage,
  '/sql': HomePage,
  '/csv': CsvReader
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed<any>(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>

<template>
  <div class="main-container">
    <nav-bar class="nav-bar border-b"></nav-bar>
    <component class="component" :is="currentView" />
  </div>
</template>

<style scoped>
.main-container {
  height: 100vh;
  display: grid;
  grid-template-rows: 5vh 95vh;
}
</style>
