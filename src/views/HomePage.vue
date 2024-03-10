<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TabSection from '@/components/TabSection.vue'
import InformationSection from '@/components/InformationSection.vue'
const LeftSection = defineAsyncComponent(() => import('./../components/LeftSection.vue'))
const HistoryBox = defineAsyncComponent(() => import('./../components/HistoryBox.vue'))
</script>

<template>
  <div class="h-screen outer-container">
    <tab-section class="outer-container__tab-section mt-4" />
    <left-section class="outer-container__left-section mt-4" />
    <information-section class="outer-container__information-section mt-4" />
    <history-box class="outer-container__history-box mt-4" />
  </div>
</template>

<style scoped lang="scss">
.outer-container {
  height: 95vh;
  display: grid;
  grid-template-rows: 72vh 23vh;
  grid-template-columns: 20vw 80vw;
  &__tab-section {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
  &__left-section {
    grid-row: 1/ 2;
    grid-column: 1 / 2;
  }
  &__information-section {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
  &__history-box {
    grid-row: 2 / 3;
    grid-column: 2 / 4;
  }
}
</style>
