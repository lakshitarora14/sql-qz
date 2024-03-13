<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useQueriesStore } from '@/stores/queries'

const SqlEditor = defineAsyncComponent(() => import('./SqlEditor.vue'))
const ListingTable = defineAsyncComponent(() => import('./ListingTable.vue'))
const queriesStore = useQueriesStore()

let tabIndex = 0

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    if (queriesStore.currentQueriesCount > 9) {
      // @ts-ignore
      ElNotification({
        title: 'Error',
        message: 'Maximum Tab Limit Reached!!',
        duration: 2000,
        type: 'error',
        position: 'bottom-right'
      })
      return
    }
    const name = `New Tab ${++tabIndex}`
    queriesStore.saveQueryToList('currentQueries', {
      name,
      query: ''
    })
    queriesStore.setCurrentTab(name)
  } else if (action === 'remove') {
    if (tabIndex > 0) {
      --tabIndex
    }
    let activeName = queriesStore.getCurrentTab
    if (activeName === targetName) {
      queriesStore.currentQueriesData.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab =
            queriesStore.currentQueriesData[index + 1] || queriesStore.currentQueriesData[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    queriesStore.setCurrentTab(activeName)
    queriesStore.removeCurrentQuery(targetName)
  }
}
</script>

<template>
  <div class="ml-2 pl-3 border-l">
    <el-tabs
      v-model="queriesStore.getCurrentTab"
      type="card"
      editable
      class="mr-4"
      :closable="true"
      :stretch="true"
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in queriesStore.currentQueriesData"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      >
        <div class="outer-container">
          <sql-editor
            class="outer-container__sql-editor"
            :sqlQuery="item.query"
            @on:search="(e) => (item.query = e)"
          />
          <listing-table class="outer-container__listing-table" :query="item.query" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
