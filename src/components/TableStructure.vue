<script setup lang="ts">
import { TABLES } from '@/datasets/tables'
import TableDropdown from '@/components/TableDropdown.vue'
import { reactive, computed } from 'vue'
import { Search, Collection } from '@element-plus/icons-vue'

const state = reactive({
  searchQuery: '' as string,
  showSchemas: true as boolean
})

const filteredTables = computed(() => {
  return TABLES.filter((table) => {
    return table.name.toLowerCase().includes(state.searchQuery.toLowerCase())
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
  <div class="text-gray-700 overflow-y-auto h-[calc(72vh-7.5rem)] m-2 p-2 border rounded-md">
    <div
      class="flex items-center m-2 cursor-pointer"
      @click="state.showSchemas = !state.showSchemas"
    >
      <el-icon class="text-gray-600 mr-2"><Collection /></el-icon>
      <div>Schemas</div>
    </div>
    <div v-if="state.showSchemas" class="ml-6 border-l">
      <div class="ml-2" v-for="table in filteredTables" :key="table.name">
        <TableDropdown class="mb-2" :table="table" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
