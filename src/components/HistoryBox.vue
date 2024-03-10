<script setup lang="ts">
import { useQueriesStore } from '@/stores/queries'
import { DArrowRight, Delete } from '@element-plus/icons-vue'
const queriesStore = useQueriesStore()

function runQuery(query: any) {
  if (
    queriesStore.queryHistoryData.filter((historyQuery) => {
      if (historyQuery.id === query.id) {
        return query
      }
    })?.length
  ) {
    queriesStore.setCurrentTab(query.name)
    return
  }
  const item: any = queriesStore.savedQueriesData.find((query) => query.name === query.name)
  queriesStore.saveQueryToList('currentQueries', item)
  queriesStore.setCurrentTab(query.name)
}
function deleteQuery(query: any) {
  queriesStore.removeHistoryQuery(query.id)
}
</script>

<template>
  <div class="mx-2 border-t border-l">
    <el-table
      table-layout="auto"
      :height="'20vh'"
      :data="queriesStore.queryHistoryData"
      class="w-full"
      :key="queriesStore.queryHistoryCount"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="time" label="Time" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="query" label="Query" />
      <el-table-column prop="message" label="Message" width="180" />
      <el-table-column prop="duration" label="Duration" width="120" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-tooltip content="Run Query" :show-arrow="false">
            <el-button circle type="success" plain :icon="DArrowRight" @click="runQuery(scope.row)">
            </el-button>
          </el-tooltip>
          <el-tooltip content="Delete Query" :show-arrow="false">
            <el-button type="danger" :icon="Delete" plain circle @click="deleteQuery(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
