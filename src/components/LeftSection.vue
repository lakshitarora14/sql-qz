<script setup lang="ts">
import { reactive } from 'vue'
import { defineAsyncComponent } from 'vue'
const TableStructure = defineAsyncComponent(() => import('./TableStructure.vue'))
const SavedSearch = defineAsyncComponent(() => import('./SavedSearch.vue'))
const state = reactive({
  currentComponent: 'tableStructure' as string
})
</script>

<template>
  <div>
    <div class="mx-2 w-full">
      <el-button
        plain
        class="w-[46%]"
        :type="state.currentComponent === 'tableStructure' ? 'primary' : ''"
        @click="state.currentComponent = 'tableStructure'"
        >Table Structure</el-button
      >
      <el-button
        plain
        class="w-[46%]"
        :type="state.currentComponent === 'savedSearch' ? 'primary' : ''"
        @click="state.currentComponent = 'savedSearch'"
        >Saved Searches</el-button
      >
    </div>
    <div class="mb-2">
      <TableStructure v-if="state.currentComponent === 'tableStructure'"></TableStructure>
      <SavedSearch v-else-if="state.currentComponent === 'savedSearch'"></SavedSearch>
    </div>
  </div>
</template>

<style scoped></style>
