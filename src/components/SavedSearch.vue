<script setup lang="ts">
import { reactive, computed, defineAsyncComponent } from 'vue'
import { useQueriesStore } from '@/stores/queries'
import { Search } from '@element-plus/icons-vue'
const SavedQuery = defineAsyncComponent(() => import('./SavedQuery.vue'))

const queriesStore = useQueriesStore()

const state = reactive({
  searchQuery: ''
})

const filteredQueries = computed(() => {
  return queriesStore.savedQueriesData.filter((query) => {
    return query.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  })
})
</script>

<template>
  <header>
    <el-input
      v-model="state.searchQuery"
      class="px-2 mt-2"
      size="large"
      placeholder="Search..."
      :suffix-icon="Search"
    />
  </header>
  <ul class="overflow-y-auto h-[calc(72vh-8rem)]">
    <li v-for="query in filteredQueries" :key="query.id">
      <saved-query :query="query" />
    </li>
  </ul>
</template>

<style scoped></style>
